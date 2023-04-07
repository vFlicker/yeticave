<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

$category_id = $_GET['id'] ? intval($_GET['id']) : null;

$cur_page = $_GET['page'] ?? 1;
$page_items = 6;

$sql_count = "SELECT COUNT(l.id ) AS `count` FROM lots l
                JOIN `categories` c ON l.category_id = c.id
                WHERE c.id = $category_id";

$sql_query_count = mysqli_query($DB, $sql_count);

if ($category_id && $sql_query_count) {
    $items_count = mysqli_fetch_assoc($sql_query_count)['count'];
    $pages_count = ceil($items_count / $page_items);
    $offset = ($cur_page - 1) * $page_items;

    $pages = range(1, $pages_count);

    $sql_lots = "SELECT l.id, `title`, `url_image`, `start_price`, `step_price`, `date_end`, c.name AS `category` 
                FROM `lots` l
                JOIN `categories` c ON l.category_id = c.id
                WHERE c.id =$category_id
                ORDER BY date_create DESC
                LIMIT $page_items
                OFFSET $offset";

    $sql_query_lots = mysqli_query($DB, $sql_lots);

    if (!$sql_query_lots) {
        $page_content = include_template('error.php', ['error_title' => 'Ошибка', 'error_text' => mysqli_error($DB)]);
    }

    $sql_category = "SELECT `name` FROM `categories`
                        WHERE `id` = $category_id";

    $sql_query_category = mysqli_query($DB, $sql_category);

    if (!$sql_query_category) {
        $page_content = include_template('error.php', ['error_title' => 'Ошибка', 'error_text' => mysqli_error($DB)]);
    }

    if ($sql_query_lots && $sql_query_category) {
        $is_get = true;

        $url = $_SERVER['REQUEST_URI'];
        $url = explode('&page', $url)[0];

        $lots = mysqli_fetch_all($sql_query_lots, MYSQLI_ASSOC);
        $category_name = mysqli_fetch_assoc($sql_query_category)['name'];

        if ($lots) {
            $page_content = include_template('all-lots.php', [
                'is_get' => $is_get,
                'category_name' => $category_name,
                'url' => $url,
                'lots' => $lots, 
                'nav_menu' => $nav_menu,
                'pages' => $pages,
                'pages_count' => $pages_count,
                'cur_page' => $cur_page
            ]);
        } else {
            $page_content = include_template('error.php', ['error_title' => 'Данная страница не найдена']);
        }
    }
} else {
    $page_content = include_template('error.php', ['error_title' => 'Данная страница не найдена']);
}

$page_layout = include_template('layout.php', [
    'title' => 'Все лоты',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);