<?php
require_once('functions.php');
require_once('data.php');

$title = 'Главная';

$is_auth = (bool) rand(0, 1);
$user_name = 'Константин';
$user_avatar = 'img/user.jpg';


$page_content = include_template('index.php', ['advertisement' => $advertisement]);

$page_layout = include_template('layout.php', [
    'title' => $title,
    'page_content' => $page_content,
    'categories' => $categories,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);
