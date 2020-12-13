<?php if ($pages_count > 1): ?>
    <ul class="pagination-list">

        <li class="pagination-item pagination-item-prev <?= $cur_page <= 1 ? 'pagination-item--disabled' : '' ?>">
            <?php if ($is_get): ?>
                <a <?= $cur_page > 1 ? 'href=' . "$url" . '&page=' . ($cur_page - 1) : '' ?>>Назад</a>
            <?php else: ?>
                <a <?= $cur_page > 1 ? 'href=' . "$url" . '?page=' . ($cur_page - 1) : '' ?>>Назад</a>
            <?php endif; ?>
        </li>

        <?php foreach ($pages as $page): ?>
            <li class="pagination-item <?= $page == $cur_page ? 'pagination-item--active' : '' ?>">
            <?php if ($is_get): ?>
                <a href="<?= "$url&page=$page" ?>">
                    <?= $page ?>
                </a>
            <?php else: ?>
                <a href="<?= "$url?page=$page" ?>">
                    <?= $page ?>
                </a>
            <?php endif; ?>
            </li>
        <?php endforeach ?>

        <li class="pagination-item pagination-item-next <?= $cur_page >= $pages_count ? 'pagination-item--disabled' : '' ?>">
            <?php if ($is_get): ?>
                <a <?= $cur_page < $pages_count ? 'href=' . "$url" . '&page=' . ($cur_page + 1) : '' ?>>Вперед</a>
            <?php else: ?>
                <a <?= $cur_page < $pages_count ? 'href=' . "$url" . '?page=' . ($cur_page + 1) : '' ?>>Вперед</a>
            <?php endif; ?>
        </li>

    </ul>
<?php endif; ?>