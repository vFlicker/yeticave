<?php if ($pages_count > 1): ?>
    <ul class="pagination-list">
        <li class="pagination-item pagination-item-prev <?= $cur_page <= 1 ? 'pagination-item--disabled' : '' ?>">
            <a <?= $cur_page > 1 ? 'href="' . '?page=' . ($cur_page - 1) . '"' : '' ?>>Назад</a>
        </li>
        <?php foreach ($pages as $page): ?>
            <li class="pagination-item <?= $page == $cur_page ? 'pagination-item--active' : '' ?>">
                <a href="<?= "?page=$page" ?>">
                    <?= $page ?>
                </a>
            </li>
        <?php endforeach ?>
        <li class="pagination-item pagination-item-next <?= $cur_page >= $pages_count ? 'pagination-item--disabled' : '' ?>">
            <a <?= $cur_page < $pages_count ? 'href="' . '?page=' . ($cur_page + 1) . '"' : '' ?>>Вперед</a>
        </li>
    </ul>
<?php endif; ?>