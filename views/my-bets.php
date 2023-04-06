<main>
    <section class="rates container">
        <h2>Мои ставки</h2>
        <table class="rates__list">
            <tr class="rates__item">
                <th class="rates__title rates__title--info">Наименование</th>
                <th class="rates__title rates__title--category">Категория</th>
                <th class="rates__title rates__title--timer">Окончание торгов</th>
                <th class="rates__title rates__title--price">Цена</th>
                <th class="rates__title rates__title--time">Время ставки</th>
            </tr>

            <?php foreach ($my_bets as $bet): ?>
                
            <?php 
                // $bet['winner_id'] == $_SESSION['user']['id'] ? $is_winner = true : $is_winner = false;

                $time = get_remaining_time($bet['date_end']);
                $red_timer = $time['hours'] < 12 ? true : false;
                $end_timer =  bargaining_is_over($bet['date_end']);
            ?>

            <tr class="rates__item <?= $end_timer ? 'rates__item--end' : '' ?> <?= $is_winner ? 'rates__item--win' : '' ?>">
                <td class="rates__info">
                    <div class="rates__img">
                        <img src="<?= $bet['url_image'] ?>" width="54" height="40" alt="<?= $bet['title'] ?>">
                    </div>
                    <div>
                        <h3 class="rates__title">
                            <a href="<?= "lot.php?id=$bet[lot_id]" ?>">
                                <?= $bet['title'] ?>
                            </a>
                        </h3>
                        <p>
                            <?= $bet['contacts'] ?>
                        </p>
                    </div>
                </td>
                <td class="rates__category">
                    <?= $bet['category'] ?>
                </td>
                <td class="rates__timer">
                    <div class="timer <?php 
                        if ($end_timer) { echo('timer--end'); }
                        elseif ($red_timer) { echo('timer--finishing'); }
                        // elseif ($is_winner) { echo('timer--win'); }
                        else { echo(''); }
                    ?>">
                        <?php 
                            if ($end_timer) { echo('Торги окончены'); }
                            // elseif ($is_winner) { echo('Ставка выиграла'); }
                            else { echo($time['hours'] . ':' . $time['minutes'] . ':' . $time['seconds']); }
                        ?>
                    </div>
                </td>
                <td class="rates__price">
                    <?= $bet['price'] . ' руб' ?>
                </td>
                <td class="rates__time">
                    <?= get_timer($bet['date_create']) ?>
                </td>
            </tr>
            <?php endforeach ?>
        </table>
    </section>
</main>
