<?php
require_once('functions.php');
require_once('data.php');
require_once('config.php');

$lot = null;

$cookie_name = 'lot_history';
$lot_indices = [];
$cookie_expire = strtotime("+30 days");
$cookie_path = "/";

if (isset($_GET['lot_id'])) {
    $lot_id = $_GET['lot_id'];

    if (isset($_COOKIE['lot_history'])) {
        $lot_indices = unserialize($_COOKIE['lot_history']);

        if (!in_array($lot_id, $lot_indices)) {
            $lot_indices[] = $lot_id;
        }

        $cookie_value = serialize($lot_indices);
        setcookie($cookie_name , $cookie_value, $cookie_expire, $cookie_path);
    } else {
        $lot_indices[] = $lot_id;
        $cookie_value = serialize($lot_indices);
        setcookie($cookie_name , $cookie_value, $cookie_expire, $cookie_path);
    }

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
