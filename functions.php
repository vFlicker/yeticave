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
