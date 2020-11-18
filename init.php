<?php

$db = [
    'host' => 'localhost',
    'user' => 'root',
    'password' => 'root',
    'database' => 'yaticave'
];

$link = mysqli_connect($db['host'], $db['user'], $db['password'], $db['database']);
mysqli_set_charset($link, 'utf-8');

