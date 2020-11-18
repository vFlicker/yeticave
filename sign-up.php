<?php
require_once('functions.php');
require_once('data.php');
require_once('userdata.php');
require_once('config.php');
require_once('init.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $form_registration = $_POST;

    $required = ['email', 'password', 'name', 'message'];
    $errors = [];

    foreach ($form_registration as $field => $value) {       
        if ($field == 'email') {
            $email = mysqli_real_escape_string($link, $value);
            $sql = "SELECT `email` FROM `users` WHERE `email` = '$email'";
            $sql_query = mysqli_query($link, $sql);
            $result = mysqli_fetch_array ($sql_query);

            if ($result !== NULL) {
                $errors[$field] = 'Этот email уже используется другим пользователем';
            }

            if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[$field] = 'Email должен быть корректным';
            }
            if (empty($value)) {
                $errors[$field] = 'Введите e-mail';
            }
        }

        if ($field == 'password') {
            if (empty($value)) {
                $errors[$field] = 'Введите пароль';
            }
        }

        if ($field == 'name') {
            if (empty($value)) {
                $errors[$field] = 'Введите имя';
            }
        }

        if ($field == 'message') {
            if (empty($value)) {
                $errors[$field] = 'Напишите как с вами связаться';
            }
        }
    }

    if (count($errors)) {
        $page_content = include_template('sign-up.php', [
            'form_registration' => $form_registration,
            'errors' => $errors
        ]);
    }
    else {
        if (!$link) {
            $error = mysqli_connect_error();
            $page_content = include_template('error.php', ['error' => $error]);
        }
        else {
            $password_hash = password_hash($form_registration['password'], PASSWORD_DEFAULT);

            $email = mysqli_real_escape_string($link, $form_registration['email']);
            $name = mysqli_real_escape_string($link, $form_registration['name']);
            $password = mysqli_real_escape_string($link, $password_hash);
            $message = mysqli_real_escape_string($link, $form_registration['message']);

            $sql = "INSERT INTO users (`email`, `name`, `password`, `contacts`) VALUES ('$email', '$name', '$password', '$message')";
            $result = mysqli_query($link, $sql);

            if ($result) {
                setcookie('canLogin', 'Теперь вы можете войти, используя свой email и пароль');
                header('Location: ./login.php');
                exit();
            } 
            else {
                $error = mysqli_error($link);
                print_r($error);
            }
        }
    }
}
else {
    $page_content = include_template('sign-up.php', []);
}

// Если данные были сохранены успешно, то переадресовать пользователя на страницу входа, где показать сообщение над формой «Теперь вы можете войти, используя свой email и пароль».


$page_layout = include_template('layout.php', [
    'title' => 'Вход',
    'page_content' => $page_content,
    'categories' => $categories,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);