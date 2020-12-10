<?php

$title = $lot['title'] ?? '';
$image_url = $lot['url_image'] ?? '';
$description = $lot['description'] ?? '';
$category = $lot['category'] ?? '';
$price = $max_bet ?? $lot['start_price'];
$step_price = $lot['step_price'] ?? '';
$id = $lot['id'] ?? '';

$error = $_GET['error'] ?? null;

?>

<main>
    <section class="lot-item container">
        <h2><?= $title ?></h2>
        <div class="lot-item__content">
            <div class="lot-item__left">
                <div class="lot-item__image">
                    <img src="<?= $image_url ?>" width="730" height="548" alt="Сноуборд" />

                </div>
                <p class="lot-item__category">
                    Категория: <span><?= $category ?></span>
                </p>
                <p class="lot-item__description">
                    <?= $description ?>
                </p>
            </div>
            <div class="lot-item__right">
                <?php if ($is_auth): ?>
                <div class="lot-item__state">
                    <div class="lot-item__timer timer">10:54:12</div>
                    <div class="lot-item__cost-state">
                        <div class="lot-item__rate">
                            <span class="lot-item__amount">Текущая цена</span>
                            <span class="lot-item__cost"><?= $price ?></span> 
                        </div>
                        <div class="lot-item__min-cost">
                            Мин. ставка &ndash;&nbsp;<span><?= get_min_bet($price, $step_price) . ' руб.' ?></span>
                        </div>
                    </div>
                    <form class="lot-item__form <?= isset($error) ? 'form--invalid' : '' ?>" action="lot.php" method="post">
                        <div class="lot-item__form-item <?= isset($error) ? 'form__item--invalid' : '' ?>">
                            <label for="cost">Ваша ставка</label>
                            <input id="lot_id" name="lot_id" value="<?= $id; ?>" type="hidden">
                            <input id="cost" class="input-cost" type="number" name="cost" placeholder="<?= get_min_bet($price, $step_price) ?>">
                            <span class="form__error form__error--bet"><?= $error ?></span>
                        </div>
                        <button type="submit" class="button">Сделать ставку</button>
                    </form>
                </div>
                <?php endif; ?>
                <div class="history">
                    <h3>История ставок (<span>10</span>)</h3>
                    <table class="history__list">
                        <?php foreach ($bets as $bet): ?>
                        <tr class="history__item">
                            <td class="history__name"><?= $bet['name'] ?></td>
                            <td class="history__price"><?= $bet['price'] . ' руб.' ?></td>
                            <td class="history__time"><?= get_timer($bet['date_create']) ?></td>
                        </tr>
                        <?php endforeach ?>
                    </table>
                </div>
            </div>
        </div>
    </section>
</main>
