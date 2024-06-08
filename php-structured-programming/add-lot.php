<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $lot = esc_array($_POST);

    $lot['lot-photo'] = null;

    if ($_FILES['lot-photo']['size'] !== 0) {
        $lot['lot-photo'] = $_FILES['lot-photo'];
    }

    if (isset($lot['lot-photo'])) {
        $tmp_name = $lot['lot-photo']['tmp_name'];
        $file_name = $lot['lot-photo']['name'];
        $file_path = __DIR__ . '/img/';

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $lot['lot-photo']['file_type'] = finfo_file($finfo, $tmp_name);

        move_uploaded_file($tmp_name, $file_path . $file_name);
        $lot['lot-photo']['file-path'] = 'img/' . $file_name;
    }

    $errors = validate_form_add_lot($lot);

    if (isset($errors)) {
        $cetegory_id = search_id_by_category($DB, $lot['category']);

        $sql = "INSERT INTO `lots` (`date_create`, `title`, `description`, `url_image`, `start_price`, `date_end`,
                                    `step_price`, `fav_count`, `user_id`, `winner_id`, `category_id`)
                VALUES (NOW(), ?, ?, ?, ?, ?, ?, NULL, ?, NULL, ?)";

        $stmt = db_get_prepare_stmt($DB, $sql, [$lot["lot-name"], $lot["message"], $lot["lot-photo"]["file-path"],
                $lot["lot-rate"], $lot["lot-date"], $lot["lot-step"],  $_SESSION["user"]["id"], "$cetegory_id"]);

        $result = mysqli_stmt_execute($stmt);
        
        if ($result) {
            $lot_id = mysqli_insert_id($DB);
            header("Location: lot.php?id=" . $lot_id);
        }
    }

    $page_content = include_template('add-lot.php', [
        'lot' => $lot,
        'errors' => $errors
    ]);
}
else {
    if (!$is_auth) {
        $page_content = include_template('error.php', [
            'error' => 'Ошибка',
            'error_log' => 'Данная страница не найдена'
        ]);
    } else {
        $page_content = include_template('add-lot.php', []);
    }
}

$page_layout = include_template('layout.php', [
    'title' => 'Добавление лота',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);