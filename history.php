<?php
require_once('functions.php');
require_once('data.php');
require_once('config.php');

$advertisement_history = [];

if (isset($_COOKIE['lot_history'])) {
    $arr_cookie = unserialize($_COOKIE['lot_history']);

    foreach ($advertisement as $advertisement_key => $advertisement_value) {
        foreach ($arr_cookie as $arr_cookie_key => $arr_cookie_value) {
            if ($advertisement_key == $arr_cookie_value) {
                $advertisement_history[] = $advertisement_value;
            }
        }
    }
}

$page_content = include_template('history.php', [
    'advertisement_history' => $advertisement_history
]);

$page_layout = include_template('layout.php', [
    'title' => 'История просмотров',
    'page_content' => $page_content,
    'categories' => $categories,
    'is_auth' => $is_auth,
    'user_name' => $user_name,
    'user_avatar' => $user_avatar
]);

print($page_layout);
