<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

$lots = [];

mysqli_query($DB, 'CREATE FULLTEXT INDEX lot_ft_search ON lots(`title`, `description`)');

$search = $_GET['search'] ?? '';

if($search) {
    $cur_page = $_GET['page'] ?? 1;
    $page_items = 1;

    $sql = "SELECT COUNT(*) AS `count`
                FROM `lots` l
                WHERE MATCH(`title`, `description`) AGAINST(?)";

    $stmt = db_get_prepare_stmt($DB, $sql, [$search]);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        $items_count = mysqli_fetch_assoc($result)['count'];
        $pages_count = ceil($items_count / $page_items);
        $offset = ($cur_page - 1) * $page_items;

        $pages = range(1, $pages_count);

        $sql = "SELECT l.id, `title`, `description`, `url_image`, `start_price`, `step_price`, `date_end`, c.name AS `category`
                    FROM `lots` l
                    JOIN `categories` c ON l.category_id = c.id
                    WHERE MATCH(`title`, `description`) AGAINST(?)
                    LIMIT $page_items
                    OFFSET $offset";

        $stmt = db_get_prepare_stmt($DB, $sql, [$search]);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($result) {
            $is_get = true;
            $url = $_SERVER['REQUEST_URI'];
            $url = explode('&page', $url)[0];

            $lots = mysqli_fetch_all($result, MYSQLI_ASSOC);

            $page_content = include_template('search.php', [
                'is_get' => $is_get,
                'url' => $url,
                'search' => $search,
                'lots' => $lots,
                'nav_menu' => $nav_menu,
                'pages' => $pages,
                'pages_count' => $pages_count,
                'cur_page' => $cur_page
            ]);

            if (!count($lots)) {
                $page_content = include_template('error.php', ['error_title' => 'По вашему запросу ничего не найдено']);
            }
        }
    }
}
else {
    $page_content = include_template('error.php', ['error_title' => 'По вашему запросу ничего не найдено']);
}

$page_layout = include_template('layout.php', [
    'title' => 'Поиск',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);