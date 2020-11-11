<?php
require_once('config.php');

unset($_SESSION['user']);
header('Location: ./index.php');