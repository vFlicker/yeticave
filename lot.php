<?php
require_once('functions.php');
require_once('data.php');
require_once('config.php');

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

$page_content = include_template('lot.php', [
    'lot' => $lot
]);

$page_layout = include_template('layout.php', [
    'title' => $lot['title'],
    'page_content' => $page_content,
    'categories' => $categories,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);
