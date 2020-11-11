<?php
require_once('functions.php');
require_once('data.php');
require_once('userdata.php');
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $form_enter = $_POST;

    $required = ['email', 'password'];
    $errors = [];

    foreach ($form_enter as $field => $value) {
        if ($field == 'email') {
            if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[$field] = 'Email должен быть корректным';
            }
        }
        if (empty($value)) {
            $errors[$field] = 'Это поле надо заполнить';
        }
    }

    if (!count($errors) and $user = searchUserByEmail($form_enter['email'], $users)) {
        if (password_verify($form_enter['password'], $user['password'])) {
            $_SESSION['user'] = $user;
        }
        else {
            $errors['password'] = 'Неверный пароль';
        }
    }
    else {
        $errors['email'] = 'Такой пользователь не найден';
    }

    if (count($errors)) {
        $page_content = include_template('enter.php', [
            'form_enter' => $form_enter,
            'errors' => $errors
        ]);
    }
    else {
        header('Location: ./index.php');
        exit();
    }
}
else {
    if (isset($_SESSION['user'])) {
        $page_content = include_template('index.php', [
            'advertisement' => $advertisement
        ]);
    }
    else {
        $page_content = include_template('enter.php', []);
    }
}

$page_layout = include_template('layout.php', [
    'title' => 'Вход',
    'page_content' => $page_content,
    'categories' => $categories,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);
