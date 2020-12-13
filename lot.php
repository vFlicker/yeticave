<?php
require_once('config.php');
require_once('init.php');
require_once('nav_menu.php');

$lot_id = $_GET['id'] ? intval($_GET['id']) : null;


$cookie_name = "lot_history";
$cookie_expire = strtotime("+30 days");

$cookie_value = [];

if (isset($_COOKIE['lot_history'])) {
    $cookie_value = json_decode($_COOKIE['lot_history'], true);
}

if (!in_array($lot_id, $cookie_value)) {
    $cookie_value[] = $lot_id;
}

setcookie($cookie_name, json_encode($cookie_value), $cookie_expire);


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $form_add_bet = esc_array($_POST);
    $user_id = $_SESSION['user']['id'];

    $error = validate_form_add_bet($DB, $form_add_bet);

    if (empty($error)) {
        $sql = "INSERT INTO `bets` (`price`, `user_id`, `lot_id`) VALUES (?, ?, ?)";
        $stmt = db_get_prepare_stmt($DB, $sql, [$form_add_bet['cost'], $user_id, $form_add_bet['lot_id']]);
        $result = mysqli_stmt_execute($stmt);

        if ($result) {
            header("Location:" . "lot.php?id=" . $form_add_bet['lot_id']);
            exit();
        }
    }

    if ($error) {
        header("Location:" . "lot.php?id=" . $form_add_bet['lot_id'] . '&error=' . $error);
    }
}

if ($lot_id) {
    $sql_get_lot = "SELECT l.id, `title`, `description`, `url_image`, `start_price`, `step_price`, `date_end`, c.name
                        AS `category` FROM `lots` l
                        JOIN `categories` c ON l.category_id = c.id
                        WHERE l.id = '$lot_id'";

    $sql_query_get_lot = mysqli_query($DB, $sql_get_lot);

    if (!$sql_query_get_lot) {
        $page_content = include_template('error.php', ['error_title' => 'Ошибка', 'error_text' => mysqli_error($DB)]);
    }

    $sql_get_bets = "SELECT `date_create`, `price`, u.name AS `name` FROM `bets` b
                        JOIN `users` u ON b.user_id = u.id
                        WHERE `lot_id` = '$lot_id'";

    $sql_query_get_bets = mysqli_query($DB, $sql_get_bets);

    if (!$sql_query_get_bets) {
        $page_content = include_template('error.php', ['error_title' => 'Ошибка', 'error_text' => mysqli_error($DB)]);
    }
    
    $sql_get_max_bet = "SELECT MAX(`price`) AS max_bet FROM `bets`
	                        WHERE `lot_id` = '$lot_id'";

    $sql_query_max_bet = mysqli_query($DB, $sql_get_max_bet);

    if (!$sql_query_max_bet) {
        $page_content = include_template('error.php', ['error_title' => 'Ошибка', 'error_text' => mysqli_error($DB)]);
    }

    if ($sql_query_get_lot && $sql_query_get_bets && $sql_query_max_bet) {
        $lot = mysqli_fetch_assoc($sql_query_get_lot);
        $bets = mysqli_fetch_all($sql_query_get_bets, MYSQLI_ASSOC);
        $max_bet = mysqli_fetch_assoc($sql_query_max_bet)['max_bet'];

        if ($lot) {
            $page_content = include_template('lot.php', ['lot' => $lot, 'bets' => $bets, 'max_bet' => $max_bet, 'is_auth' => $is_auth]);
        } else {
            $page_content = include_template('error.php', ['error_title' => 'Ошибка', 'error_text' => 'Данная страница не найдена.']);
        }
        
    }
} else {
    $page_content = include_template('error.php', ['error_title' => 'Ошибка', 'error_text' => 'Данная страница не найдена.']);
}

$page_layout = include_template('layout.php', [
    'title' => $lot['title'] ?? 'Ошибка',
    'page_content' => $page_content,
    'nav_menu' => $nav_menu,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);