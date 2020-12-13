<main class="container">
    <section class="promo">
    <h2 class="promo__title">Нужен стафф для катки?</h2>
    <p class="promo__text">На нашем интернет-аукционе ты найдёшь самое эксклюзивное сноубордическое и
        горнолыжное снаряжение.</p>
    <ul class="promo__list">
        <?php foreach ($nav_menu as $menu_item): ?>
        <li class="promo__item promo__item--<?= $menu_item['class_mod'] ?>">
            <a class="promo__link" href="<?= "all-lots.php?id=$menu_item[id]" ?>">
                <?php print_r($menu_item['name']) ?>
            </a>
        </li>
        <?php endforeach; ?>
    </ul>
    </section>
    <section class="lots">
        <div class="lots__header">
            <h2>Открытые лоты</h2>
        </div>
        <ul class="lots__list">
            <?php foreach ($lots as $lot): ?>
            <li class="lots__item-wrapper">
                <div class="lots__item lot">
                    <div class="lot__image">
                        <a class="text-link" href="<?= "lot.php?id=$lot[id]" ?>">
                            <img src="<?= $lot['url_image'] ?>" width="350" height="260" alt="<?= $lot['title']; ?>">
                        </a>
                    </div>
                    <div class="lot__info">
                        <span class="lot__category"><?= $lot['category'] ?></span>
                        <h3 class="lot__title">
                            <a class="text-link" href="<?= "lot.php?id=$lot[id]" ?>">
                                <?= $lot['title']; ?>
                            </a>
                        </h3>
                        <div class="lot__state">
                        <div class="lot__rate">
                            <span class="lot__amount">Стартовая цена</span>
                            <span class="lot__cost"><?= price_format($lot['start_price']) ?></span>
                        </div>
                        
                        <?php $time = get_remaining_time($lot['date_end']); ?>

                        <div class="lot__timer timer <?= $time['hours'] < 12 ? 'timer--finishing' : '' ?> ">
                            <?= $time['hours'] . ':' . $time['minutes'] . ':' . $time['seconds'] ?>
                        </div>
                        </div>
                    </div>
                </div>
            </li>
            <?php endforeach ?>
        </ul>

        <?php require_once('_paggination.php') ?>
    </section>
</main>
