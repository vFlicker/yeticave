<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

require_once('vendor/autoload.php');
require_once('getwinner.php');

$user_id = null;

if (isset($_SESSION['user']['id'])) {
    $user_id = $_SESSION['user']['id'];
}

$sql = "SELECT l.title, u.contacts, l.url_image, c.name AS category, l.date_end, `price`, b.date_create, l.id AS lot_id, l.winner_id
            FROM `bets` b
            JOIN `lots` l ON `lot_id` = l.id
            JOIN `categories` c ON l.category_id = c.id
            JOIN `users` u ON l.user_id = u.id
            WHERE b.user_id = '$user_id' AND b.price = (
                SELECT MAX(b2.price) 
                FROM bets AS b2 
                WHERE b2.user_id = b.user_id AND b2.lot_id = l.id
            )
            ORDER BY b.date_create DESC";

if ($sql_query = mysqli_query($DB, $sql)) {
    $my_bets = mysqli_fetch_all($sql_query, MYSQLI_ASSOC);

    $page_content = include_template('my-bets.php', [
        'my_bets' => $my_bets
    ]);
}
else {
    $page_content = include_template('error.php', ['error_title' => 'Ошибка','error_log' => mysqli_error($DB)]);
}

$page_layout = include_template('layout.php', [
    'title' => 'Мои ставки',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'can_show_top_menu' => $can_show_top_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);