<?php

function include_template($src, $data) {
  $name = 'templates/'  . $src;

  if (!file_exists($name)) {
    return $result = '';
  };

  ob_start();
  extract($data);
  require_once($name);
  $result = ob_get_clean();

  return $result;
};

function price_format($value) {
  $rounded_value = ceil($value);
  $ruble_symbol = '<b class="rub">р</b>';

  if ($rounded_value  > 999) {
    return number_format($rounded_value, 0, '', ' ') . $ruble_symbol;
  }

  return $rounded_value . $ruble_symbol;
};

function getTimer() {
  date_default_timezone_set("Europe/Moscow");

  $curtime = time();
  $ts_midnight = strtotime('tomorrow');
  $secs_to_midnight = $ts_midnight - $curtime;

  $hours = floor($secs_to_midnight / 3600);
  $minutes = floor(($secs_to_midnight % 3600) / 60);

  return "$hours часов $minutes минут";
};

function searchUserByEmail($email, $users) {
    $result = null;
    foreach ($users as $user) {
        if ($user['email'] == $email) {
            $result = $user;
        break;
        }
    }

    return $result;
}
