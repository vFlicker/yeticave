<?php
require_once('functions.php');
require_once('data.php');

$lot = null;

if (isset($_GET['lot_id'])) {
    $lot_id = $_GET['lot_id'];

    foreach ($advertisement as $key => $value) {
        if ($lot_id == $key) {
            $lot = $value;
            break;
        }
    }
}

if (!$lot) {
    exit(http_response_code(404));
}



$title = $lot['title'];

$is_auth = (bool) rand(0, 1);
$user_name = 'Константин';
$user_avatar = 'img/user.jpg';

$page_content = include_template('lot.php', [
    'advertisement' => $advertisement,
    'lot' => $lot
]);

$page_layout = include_template('layout.php', [
    'title' => $title,
    'page_content' => $page_content,
    'categories' => $categories,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);



print($page_layout);
