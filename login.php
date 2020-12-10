<?php
require_once('config.php');
require_once('init.php');
require_once('vendor/autoload.php');
require_once('nav_menu.php');

if (isset($_SESSION['user'])) {
    header('Location: ./index.php');
    exit();
}

$canLogin = NULL;

if (isset($_COOKIE['canLogin'])) {
    setcookie('canLogin', '');
    $canLogin = $_COOKIE['canLogin'];
} 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $form_login = esc_array($_POST);

    $errors = validate_form_login($DB, $form_login);

    if (empty($errors)) {
        header('Location: ./index.php');
        exit();
    }
    
    $page_content = include_template('login.php', [
        'form_login' => $form_login,
        'errors' => $errors
    ]);
}
else {
     $page_content = include_template('login.php', ['canLogin' => $canLogin]);
}

$page_layout = include_template('layout.php', [
    'title' => 'Вход',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);