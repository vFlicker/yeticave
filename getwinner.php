<?php
require_once('config.php');
require_once('init.php');

$sql = "SELECT l.id AS `lot_id`, l.title AS `lot_title`, b.user_id AS `user_id`, u.name AS `user_name`, u.email AS `user_email`
        FROM `lots` l
        JOIN `bets` b ON l.id = b.lot_id
        JOIN `users` u ON b.user_id = u.id
        WHERE b.price = (
            SELECT MAX(price)
            FROM `bets` b2
            WHERE  b2.lot_id = l.id
        ) AND l.date_end > NOW() AND winner_id IS NULL";

if ($sql_query = mysqli_query($DB, $sql)) {
    $winners = mysqli_fetch_all($sql_query, MYSQLI_ASSOC);

    if (!empty($winners)) {
        $sql_update_winners = "UPDATE `lots` SET `winner_id` = ? WHERE `id` = ?";

        foreach ($winners as $value) {
            /* Добавть победителей в БД */
            $stmt = db_get_prepare_stmt($DB, $sql_update_winners, [$value['user_id'], $value['lot_id']]);
            $result = mysqli_stmt_execute($stmt);

            /* Отправить сообщения на почту победителям */
            $transport = (new Swift_SmtpTransport('phpdemo.ru', 25))
            ->setUsername('keks@phpdemo.ru')
            ->setPassword('htmlacademy')
            ;
            
            $mailer = new Swift_Mailer($transport);

            $message_content = include_template('email.php', [
                'user_name' => $value['user_name'],
                'lot_id' => $value['lot_id'],
                'lot_title' => $value['lot_title']
            ]);

            $message = (new Swift_Message('Ваша ставка победила'))
                ->setFrom(['keks@phpdemo.ru' => 'keks@phpdemo.ru'])
                ->setTo([$value['user_email'] => $value['user_name']])
                ->addPart($message_content, 'text/html')
            ;

            $result = $mailer->send($message);
        }
    }
}
else {
    $page_content = include_template('error.php', ['error_title' => 'Ошибка','error_log' => mysqli_error($DB)]);
}