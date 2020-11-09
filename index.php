<?php
require_once('functions.php');
require_once('data.php');
require_once('config.php');

$page_content = include_template('index.php', [
    'advertisement' => $advertisement
]);

$page_layout = include_template('layout.php', [
    'title' => 'Главная',
    'page_content' => $page_content,
    'categories' => $categories,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);
