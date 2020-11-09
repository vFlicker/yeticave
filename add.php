<?php
require_once('functions.php');
require_once('data.php');
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $lot = $_POST;
    $lot_photo = $_FILES['lot-photo'];

    $required = ['lot-name', 'category', 'message', 'lot-rate', 'lot-step', 'lot-date'];
    $errors = [];

    foreach ($required as $key) {
        if (empty($lot['lot-name'])) {
            $errors['lot-name'] = 'Введите наименование лота';
        }
        if ($lot['category'] == 'Выберите категорию') {
            $errors['category'] = 'Выберите категорию';
        }
        if (empty($lot['message'])) {
            $errors['message'] = 'Напишите описание лота';
        }
        if (empty($lot['lot-rate'])) {
            $errors['lot-rate'] = 'Введите начальную цену';
        }
        if (empty($lot['lot-step'])) {
            $errors['lot-step'] = 'Введите шаг ставки';
        }
        if (empty($lot['lot-date'])) {
            $errors['lot-date'] = 'Введите дату завершения торгов';
        }
    }

    if (isset($lot_photo)) {
        $tmp_name = $lot_photo['tmp_name'];
        $file_name = $lot_photo['name'];
        $file_path = __DIR__ . '/uploads/';

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $file_type = finfo_file($finfo, $tmp_name);

        if ($file_type !== 'image/jpeg') {
            $errors['file'] = 'Загрузите картинку в формате jpeg';
        } else {
            move_uploaded_file($tmp_name, $file_path . $file_name);
            $lot['file-path'] = 'uploads/' . $file_name;
        }
    }

    if (count($errors)) {
        $page_content = include_template('add.php', [
            'lot' => $lot,
            'errors' => $errors
        ]);
    }
    else {
        $page_content = include_template('lot.php', [
            'lot' => $lot,
        ]);
    }
}

else {
    $page_content = include_template('add.php', []);
}

$page_layout = include_template('layout.php', [
    'title' => 'Добавление лота',
    'page_content' => $page_content,
    'categories' => $categories,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);
