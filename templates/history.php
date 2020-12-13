<main>
    <div class="container">
        <section class="lots">
            <h2>История просмотров</h2>
            <ul class="lots__list">
                <?php foreach ($lots as $lot): ?>
                <li class="lots__item-wrapper">
                    <div class="lots__item lot">
                        <div class="lot__image">
                            <a href="<?= "lot.php?id=$lot[id]" ?>">
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
        </section>

        <?php require_once('_paggination.php') ?>
    </div>
</main>
