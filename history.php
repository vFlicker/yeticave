<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

$lots = [];

if (isset($_COOKIE['lot_history'])) {
    $cookies = json_decode($_COOKIE['lot_history']);
    $lots = implode(', ', $cookies);


    $cur_page = $_GET['page'] ?? 1;
    $page_items = 6;

    $sql_count = "SELECT COUNT(*) as `count` 
                    FROM `lots` 
                    WHERE id IN ($lots)";
    $sql_query_count = mysqli_query($DB, $sql_count);

    if ($sql_query_count) {
        $items_count = mysqli_fetch_assoc($sql_query_count)['count'];
        $pages_count = ceil($items_count / $page_items);
        $offset = ($cur_page - 1) * $page_items;

        $pages = range(1, $pages_count);

        $sql = "SELECT l.id, `title`, `description`, `url_image`, `start_price`, `step_price`, `date_end`, c.name
                    AS `category` 
                    FROM `lots` l
                    JOIN `categories` c ON l.category_id = c.id
                    WHERE l.id IN ($lots)
                    LIMIT $page_items
                    OFFSET $offset";

        if ($sql_query = mysqli_query($DB, $sql)) {
            $lots = mysqli_fetch_all($sql_query, MYSQLI_ASSOC);
            $page_content = include_template('history.php', [
                'lots' => $lots, 
                'nav_menu' => $nav_menu,
                'pages' => $pages,
                'pages_count' => $pages_count,
                'cur_page' => $cur_page
            ]);
        }
        else {
            $page_content = include_template('error.php', ['error' => 'Ошибка','error_log' => mysqli_error($DB)]);
        }
    }
    else {
        $page_content = include_template('error.php', ['error' => 'Ошибка','error_log' => mysqli_error($DB)]);
    }
}
else {
    $page_content = include_template('history.php', ['lots' => $lots, 'nav_menu' => $nav_menu,]);
}

$page_layout = include_template('layout.php', [
    'title' => 'История просмотров',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);
