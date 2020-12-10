<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');


$page_content = include_template('my-bets.php', []);

$page_layout = include_template('layout.php', [
    'title' => 'Главная',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'can_show_top_menu' => $can_show_top_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);