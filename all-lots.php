<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

$category_id = $_GET['id'] ? intval($_GET['id']) : null;

if ($category_id) {
    $sql_lots = "SELECT l.id, `title`, `start_price`, `url_image`, `step_price`, c.name
                AS `category`, `date_create`, `date_end` FROM lots l
                JOIN `categories` c ON l.category_id = c.id
                WHERE c.id = $category_id
                ORDER BY date_create DESC";

    $sql_query_lots = mysqli_query($DB, $sql_lots);

    if (!$sql_query_lots) {
        $page_content = include_template('error.php', ['error' => 'Ошибка', 'error_log' => mysqli_error($DB)]);
    }

    $sql_category = "SELECT `name` FROM `categories`
                        WHERE `id` = $category_id";

    $sql_query_category = mysqli_query($DB, $sql_category);

    if (!$sql_query_category) {
        $page_content = include_template('error.php', ['error' => 'Ошибка', 'error_log' => mysqli_error($DB)]);
    }

    if ($sql_query_lots && $sql_query_category) {
        $lots = mysqli_fetch_all($sql_query_lots, MYSQLI_ASSOC);
        $category_name = mysqli_fetch_assoc($sql_query_category)['name'];

        if ($lots) {
            $page_content = include_template('all-lots.php', ['lots' => $lots, 'nav_menu' => $nav_menu, 'category_name' => $category_name]);
        } else {
            $page_content = include_template('error.php', ['error' => 'Ошибка', 'error_log' => 'Данная страница не найдена.']);
        }
    }
} else {
    $page_content = include_template('error.php', ['error' => 'Ошибка', 'error_log' => 'Данная страница не найдена.']);
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