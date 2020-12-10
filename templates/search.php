<main>
    <div class="container">
        <section class="lots">
            <h2>Результаты поиска по запросу «<span><?= $search ?></span>»</h2>
            <ul class="lots__list">
                <?php foreach ($lots as $lot): ?>
                <li class="lots__item lot">
                    <div class="lot__image">
                        <img src="<?= $lot['url_image'] ?>" width="350" height="260" alt="Сноуборд">
                    </div>
                    <div class="lot__info">
                        <span class="lot__category"><?= $lot['category'] ?></span>
                        <h3 class="lot__title">
                            <a class="text-link" href="<?= "lot.php?id=$lot[id]" ?>">
                                <?= $lot['title'] ?>
                            </a></h3>
                        <div class="lot__state">
                            <div class="lot__rate">
                                <span class="lot__amount">Стартовая цена</span>
                                <span class="lot__cost"><?= price_format($lot['start_price']) ?></span>
                            </div>
                            <div class="lot__timer timer">
                                <?= $lot['date_create'] ?>
                            </div>
                        </div>
                    </div>
                </li>
                <?php endforeach ?>
            </ul>

            <?= !count($lots) ? 'По вашему запросу ничего не найдено' : '' ?>

            <ul class="pagination-list">
                <li class="pagination-item pagination-item-prev"><a>Назад</a></li>
                <li class="pagination-item pagination-item--active"><a>1</a></li>
                <li class="pagination-item"><a href="#">2</a></li>
                <li class="pagination-item"><a href="#">3</a></li>
                <li class="pagination-item"><a href="#">4</a></li>
                <li class="pagination-item pagination-item-next"><a href="#">Вперед</a></li>
            </ul>
        </section>
    </div>
</main>
