<?php

$sql = "SELECT * FROM `categories` 
            ORDER BY `id`";
$sql_query = mysqli_query($DB, $sql);

if (!$sql_query = mysqli_query($DB, $sql)) {
    $errorMsg = 'Ошибка: ' . mysqli_error($DB);
    die($errorMsg);
}

$nav_menu = mysqli_fetch_all($sql_query, MYSQLI_ASSOC);