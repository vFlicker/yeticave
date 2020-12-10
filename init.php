<?php
require_once(__DIR__ . '/inc/functions.php');
require_once(__DIR__ . '/inc/config.php');

$DB = mysqli_connect($db_config['host'], $db_config['user'], $db_config['password'], $db_config['database']);
mysqli_set_charset($DB, 'utf-8');

if ($DB == false) {
    $errorMsg = 'Ошибка подключения: ' . mysqli_connect_error();
    die($errorMsg);
}