<?php
require_once('config.php');
require_once('init.php'); 
require_once('nav_menu.php');

$lots = [];

mysqli_query($DB, 'CREATE FULLTEXT INDEX lot_ft_search ON lots(`title`, `description`)');

$search = $_GET['search'] ?? '';

if($search) {
        $sql = "SELECT l.id, `title`, `start_price`, `url_image`, `step_price`, c.name
                AS `category`, `date_create` 
                FROM lots l
                JOIN categories c ON l.category_id = c.id
                WHERE MATCH(`title`, `description`) AGAINST(?)";

    $stmt = db_get_prepare_stmt($DB, $sql, [$search]);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $lots = mysqli_fetch_all($result, MYSQLI_ASSOC);
}

$page_content = include_template('search.php', [
    'search' => $search,
    'lots' => $lots
]);

$page_layout = include_template('layout.php', [
    'title' => 'Поиск',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);