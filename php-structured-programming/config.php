<?php

session_start();

$user_avatar = 'img/user.png';

$is_auth = false;
$user_name = null;

if (isset($_SESSION['user'])) {
    $user_name = $_SESSION['user']['name'];
    $is_auth = true;
}