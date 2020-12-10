<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

$can_show_top_menu = false;

$cur_page = $_GET['page'] ?? 1;
$page_items = 6;

$sql_count = "SELECT COUNT(*) as `count` FROM `lots`";
$sql_query_count = mysqli_query($DB, $sql_count);

if ($sql_query_count) {
    $items_count = mysqli_fetch_assoc($sql_query_count)['count'];
    $pages_count = ceil($items_count / $page_items);
    $offset = ($cur_page - 1) * $page_items;

    $pages = range(1, $pages_count);

    $sql = "SELECT l.id, `title`, `start_price`, `url_image`, `step_price`, c.name
                AS `category`, `date_create`, `date_end` 
                FROM lots l
                JOIN `categories` c ON l.category_id = c.id
                -- WHERE date_end > NOW() AND winner_id IS NULL
                ORDER BY date_create DESC
                LIMIT $page_items 
                OFFSET $offset";

    if ($sql_query = mysqli_query($DB, $sql)) {
        $lots = mysqli_fetch_all($sql_query, MYSQLI_ASSOC);
        $page_content = include_template('index.php', [
            'lots' => $lots, 
            'nav_menu' => $nav_menu,
            'pages' => $pages,
            'pages_count' => $pages_count,
            'cur_page' => $cur_page
        ]);
    } else {
        $page_content = include_template('error.php', ['error' => 'Ошибка','error_log' => mysqli_error($DB)]);
    }
}
else {
    $page_content = include_template('error.php', ['error' => 'Ошибка','error_log' => mysqli_error($DB)]);
}

$page_layout = include_template('layout.php', [
    'title' => 'Главная',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'can_show_top_menu' => $can_show_top_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);