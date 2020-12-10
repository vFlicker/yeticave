<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

if (!$DB) {
    $error = mysqli_connect_error();
    $page_content = include_template('error.php', ['error' => 'Ошибка подключения',  'error_log' =>  $error]);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $form_registration = esc_array($_POST);
    $errors = validate_form_registration($DB, $form_registration);

    if (empty($errors)) {
        $password_hash = password_hash($form_registration['password'], PASSWORD_DEFAULT);

        $sql = "INSERT INTO `users` (`email`, `name`, `password`, `contacts`) VALUES (?, ?, ?, ?)";
        
        $stmt = db_get_prepare_stmt($DB, $sql, [$form_registration['email'], $form_registration['name'], 
                $password_hash, $form_registration['message']]);

        $result = mysqli_stmt_execute($stmt);
    
        if ($result) {
            setcookie('canLogin', 'Теперь вы можете войти, используя свой email и пароль');
            header('Location: ./login.php');
            exit();
        } 
    }
    
    $page_content = include_template('sign-up.php', [
            'form_registration' => $form_registration,
            'errors' => $errors
    ]);
}

else {
    $page_content = include_template('sign-up.php', []);
}

$page_layout = include_template('layout.php', [
    'title' => 'Регистрация',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);