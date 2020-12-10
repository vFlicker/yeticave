<?php
/**
 * Подключает шаблон, передает туда данные и возвращает итоговый HTML контент.
 * 
 * @param string $src Путь к файлу шаблона относительно папки templates.
 * @param array $data Ассоциативный массив с данными для шаблона.
 * 
 * @return string Итоговый HTML.
 */
function include_template($src, $data) {
    $name = 'templates/'  . $src;

    if (!file_exists($name)) {
    return $result = '';
    };

    $result = '';

    ob_start();
    extract($data);
    require $name;
    $result = ob_get_clean();

    return $result;
};

/**
 * Преобразует специмволы в HTML-сущности. 
 * 
 * @param array $post Данный из формы.
 * 
 * @return array Ассоциативный массив с преобразуемыми спецсимволами.
 */
function esc_array($post) {
    $array = [];

    foreach ($post as $field => $value) {
        $array[$field] = htmlspecialchars($value);
    }

    return $array;
}

/**
 * Создает подготовленное выражение на основе готового SQL запроса и переданных данных
 *
 * @param $link mysqli Ресурс соединения
 * @param $sql string SQL запрос с плейсхолдерами вместо значений
 * @param array $data Данные для вставки на место плейсхолдеров
 *
 * @return mysqli_stmt Подготовленное выражение
 */
function db_get_prepare_stmt($db_connection, $sql, $data = []) {
    $stmt = mysqli_prepare($db_connection, $sql);

    if ($stmt === false) {
        $errorMsg = 'Не удалось инициализировать подготовленное выражение: ' . mysqli_error($db_connection);
        die($errorMsg);
    }

    if ($data) {
        $types = '';
        $stmt_data = [];

        foreach ($data as $value) {
            $type = 's';

            if (is_int($value)) {
                $type = 'i';
            } else if (is_string($value)) {
                $type = 's';
            } else if (is_double($value)) {
                $type = 'd';
            }

            if ($type) {
                $types .= $type;
                $stmt_data[] = $value;
            }
        }

        $values = array_merge([$stmt, $types], $stmt_data);

        $func = 'mysqli_stmt_bind_param';
        $func(...$values);

        if (mysqli_errno($db_connection) > 0) {
            $errorMsg = 'Не удалось связать подготовленное выражение с параметрами: ' . mysqli_error($db_connection);
            die($errorMsg);
        }
    }

    return $stmt;
}

/**
 * Форматирует цену товара, добавляет знака рубля в конце.
 *
 * @param int $value Цена.
 * 
 * @return string Готовый HTML.
 */
function price_format($value) {
    $rounded_value = ceil($value);
    $ruble_symbol = '<b class="rub">р</b>';

    if ($rounded_value  > 999) {
        return number_format($rounded_value, 0, '', ' ') . $ruble_symbol;
    }

    return $rounded_value . $ruble_symbol;
};

/**
 * Идентифицирует пользователя по E-mail.
 *
 * @param string $email Проверяемая почта.
 * 
 * @return string Возвращает массив с данными пользователя.
 */
function search_user_by_email($db_connection, $email) {
    $result = null;

    $email = mysqli_real_escape_string($db_connection, $email);
    $sql = "SELECT * FROM `users` WHERE `email` = '$email'";
    $sql_query = mysqli_query($db_connection, $sql);

    if(!$sql_query) {
        $errorMsg = 'Ошибка: ' . mysqli_error($db_connection);
        die($errorMsg);
    }

    $comparation_result = mysqli_fetch_assoc($sql_query);

    if ($comparation_result !== NULL) {
        $result = $comparation_result;
    }

    return $result;
}

/**
 * Валидирует форму регистрации.
 *
 * @param array $post Ассоциативный массив из POST запроса.
 * @param array $db_connection Данные подчклюения к БД.
 * 
 * @return array Массив с ошибками. При остусвтии ошибок возвращает пустой массив.
 */
function validate_form_registration($db_connection, $post) {
    $max_nub_of_simbols = 64;
    $max_length_of_message = 500;
    $errors = [];

    foreach ($post as $field => $value) {

        if ($field == 'email') {
            if (empty($value)) {
                $errors[$field] = 'Введите E-mail';
            }
            if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[$field] = 'E-mail должен быть корректным';
            }
            if (strlen($value) > $max_nub_of_simbols) {
                $errors[$field] = "E-mail должен иметь до $max_nub_of_simbols символов";
            }

            $email = mysqli_real_escape_string($db_connection, $value);
            $sql = "SELECT `email` FROM `users` WHERE `email` = '$email'";
            $sql_query = mysqli_query($db_connection, $sql);

            if(!$sql_query) {
                $errorMsg = 'Ошибка: ' . mysqli_error($db_connection);
                die($errorMsg);
            }

            $result = mysqli_fetch_assoc($sql_query);

            if ($result !== NULL) {
                $errors[$field] = 'Этот E-mail уже используется другим пользователем';
            }
        }

        if ($field == 'password') {
            // if (strlen($value) < 8) {
            //     $errors[$field] = 'Пароль должен иметь не меньше 8 символов';
            // }
            if (empty($value)) {
                $errors[$field] = 'Введите пароль';
            }
            if (strlen($value) > $max_nub_of_simbols) {
                $errors[$field] = "Пароль должен иметь до $max_nub_of_simbols символов";
            }
        }

        if ($field == 'name') {
            if (empty($value)) {
                $errors[$field] = 'Введите имя';
            }
            if (strlen($value) > $max_nub_of_simbols) {
                $errors[$field] = "Имя должено иметь до $max_nub_of_simbols символов";
            }
        }

        if ($field == 'message') {
            if (empty($value)) {
                $errors[$field] = 'Напишите как с вами связаться';
            }
            if (strlen($value) > $max_length_of_message) {
                $errors[$field] = "Это поле должен иметь до $max_length_of_message символов";
            }
        }
    }
    
    return $errors;
}

/**
 * Валидирует форму входа.
 *
 * @param array $post Ассоциативный массив из POST запроса.
 * @param array $db_connection Данные подчклюения к БД.
 * 
 * @return array Массив с ошибками. При остусвтии ошибок возвращает пустой массив.
 */
function validate_form_login($db_connection, $post) {
    $max_nub_of_simbols = 64;
    $errors = [];

    foreach ($post as $field => $value) {

        $user = search_user_by_email($db_connection, $post['email']);

        if ($field == 'email') {
            if (!$user) {
                $errors[$field] = "Пользователь не найден";
            }
            if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[$field] = 'E-mail должен быть корректным';
            }
            if (empty($value)) {
                $errors[$field] = 'Введите E-mail';
            }
            if (strlen($value) > $max_nub_of_simbols) {
                $errors[$field] = "E-mail должен иметь до $max_nub_of_simbols символов";
            }
        }

        if ($field == 'password') {
            if (empty($value)) {
                $errors[$field] = 'Введите пароль';
            }
        }

        if (!count($errors) && $user) {
            if (password_verify($post['password'], $user['password'])) {
                $_SESSION['user'] = $user;
            }
            else {
                $errors['password'] = 'Неверный пароль';
            }
        } 
    }

    return $errors;
}

/**
 * Валидирует форму добавления лота.
 *
 * @param array $post Ассоциативный массив из POST запроса.
 * @param array $db_connection Данные подчклюения к БД.
 * 
 * @return array Массив с ошибками. При остусвтии ошибок возвращает пустой массив.
 */
function validate_form_add_lot($post) {
    $errors = [];

    foreach ($post as $field => $value) {
        $max_length_of_lot_name = 255;

        if ($field == 'lot-name') {
            if (empty($value)) {
                $errors[$field] = 'Введите наименование лота';
            }
            if (strlen($value) > $max_length_of_lot_name) {
                $errors[$field] = "Длина наименования лота не должна превышать $max_length_of_lot_name символов";
            }
        }

        if ($field == 'category') {
            if ($value == 'Выберите категорию') {
                $errors[$field] = 'Выберите категорию';
            }
        }

        if ($field == 'message') {
            if (empty($value)) {
                $errors[$field] = 'Напишите описание лота';
            }
        }

        if ($field == 'lot-rate') {
            if (!is_numeric($value)) {
                $errors[$field] = 'Цена должна быть числом';
            }
            if (($value < 0)) {
                $errors[$field] = 'Цена должна быть больше 0';
            }
            if (empty($value)) {
                $errors[$field] = 'Введите начальную цену';
            }
        }

        if ($field == 'lot-step') {
            if (!is_numeric($value)) {
                $errors[$field] = 'Ставка должена быть числом';
            }
            if (($value < 0)) {
                $errors[$field] = 'Ставка должена быть больше 0';
            }
            if (empty($value)) {
                $errors[$field] = 'Введите вашу ставку';
            }
        }

        if ($field == 'lot-date') {
            if (strtotime($value) <= strtotime(date("Y-m-d"))) {
                $errors[$field] = 'Указанная дата больше текущей даты, хотя бы на один день';
            }
            if (empty($value)) {
                $errors[$field] = 'Выберите дату';
            }
        }

        if ($field == 'lot-photo') {
            if ($value['file_type'] !== 'image/jpeg') {
                $errors['file'] = 'Неизвестный формат изображения';
            }
            if (empty($value)) {
                $errors['file'] = 'Загрузите картинку в формате jpeg';
            }
        }
    }

    return $errors;
}

/**
 * Находит id-категории по её названию.
 *
 * @param string $category Название категории.
 * @param array $db_connection Данные подчклюения к БД.
 *
 * @return int $id id-категории.
 */
function search_id_by_category($db_connection, $category) {
    $sql = "SELECT `id` FROM `categories` WHERE `name` = '$category'";
    $sql_query = mysqli_query($db_connection, $sql);

    if(!$sql_query) {
        $errorMsg = 'Ошибка: ' . mysqli_error($db_connection);
        die($errorMsg);
    }

    $id = mysqli_fetch_assoc($sql_query)['id'];

    return $id;
}

/**
 * Получить минимально доступную ставку.
 *
 * @param int $price Текущая цена.
 * @param int $step Шаг ставки.
 * 
 * @return int Текст ошибки. При остусвтии ошибки возвращает null.
 */
function get_min_bet($price, $step) {
    $sum = $price + $step;

    return $sum;
}

/**
 * Валидирует форму добавления ставки.
 *
 * @param array $post Ассоциативный массив из POST запроса.
 * @param array $db_connection Данные подчклюения к БД.
 * 
 * @return int Текст ошибки. При остусвтии ошибки возвращает null.
 */
function validate_form_add_bet($db_connection, $post) {
    $error = null;

    $id = $post['lot_id'];
    $bet = $post['cost'];


    $sql = "SELECT `start_price`, `step_price`, MAX(b.price) AS `max_bet` FROM `lots` l
                JOIN `bets` b ON l.id = b.lot_id
                WHERE l.id = '$id'";

    $sql_query = mysqli_query($db_connection, $sql);

    if(!$sql_query) {
        $errorMsg = 'Ошибка: ' . mysqli_error($db_connection);
        die($errorMsg);
    }

    $lot = mysqli_fetch_ASSOC($sql_query);
    
    $price = $lot['max_bet'] ?? $lot['start_price'];
    $step = $lot['step_price'];

    if (get_min_bet($price, $step) > $bet) {
        $error = 'Ставка меньше минимальной';
    }

    if (!is_numeric($bet)) {
        $error = 'Ставка должна быть числом';
    }

    if (empty($bet)) {
        $error = 'Введите вашу ставку';
    }

    return $error;
}

/**
 * Показывает сколько времени прошло после добавления новой ставки.
 *
 * @param string $date_create Время добавления новой ставки.
 * 
 * @return string Сколько времени прошло.
 */
function get_timer($date_create) {
    date_default_timezone_set("Europe/Kiev");

    $curtime_ts = time();
    $date_create_ts = strtotime($date_create);
    $time_has_passed = $curtime_ts - $date_create_ts;

    $hours = floor($time_has_passed / 3600);
    $minutes = floor(($time_has_passed % 3600) / 60);
    
    return "$hours часов $minutes минуты назад";
};


/**
 * Форматирует время до закрытия лота.
 *
 * @param int $time Час, минута, секунда.
 * 
 * @return string Правильный формат
 */
function formation_remaining_time($time) {

    if ($time < 0) {
        $time = '00';
    } else if ($time < 10) {
        $time = "0$time";
    }

    return $time; 
};


/**
 * Показывает сколько осталось до закрытия лота.
 *
 * @param string $date_end Время закрытия лота.
 * 
 * @return array $time Массив из часов, минут, секунд.
 */
function get_remaining_time($date_end) {
    date_default_timezone_set("Europe/Kiev");

    $curtime_ts = time();
    $date_end_ts = strtotime($date_end);
    $time_left_ts = $date_end_ts - $curtime_ts;

    $hours = formation_remaining_time(floor($time_left_ts / 3600));
    $minutes = formation_remaining_time(floor(($time_left_ts % 3600) / 60));
    $seconds = formation_remaining_time($time_left_ts % 60);

    $time = [
        'hours' => $hours,
        'minutes' => $minutes,
        'seconds' => $seconds
    ];

    return $time; 
};