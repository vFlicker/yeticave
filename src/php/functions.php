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

    return "$hours ч. $minutes мин. назад";
};

/**
 * Определяет окончены торги или нет.
 *
 * @param string $date_end Время закрытия лота.
 *
 * @return bool Возвращает true если торни окончены.
 */
function bargaining_is_over($date_end) {
    $curtime_ts = time();
    $date_end_ts = strtotime($date_end);

    if ($date_end_ts - $curtime_ts < 0) {
        return true;
    }
};