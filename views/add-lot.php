<?php

$lot_name = $lot['lot-name'] ?? '';
$category = $lot['category'] ?? 'Выберите категорию';
$message  = $lot['message']  ?? '';
$lot_rate = $lot['lot-rate'] ?? '';
$lot_step = $lot['lot-step'] ?? '';
$lot_date = $lot['lot-date'] ?? '';

$lot['lot-photo'] ?? '';

$lot_name_error = $errors['lot-name'] ?? '';
$category_error = $errors['category'] ?? '';
$message_error = $errors['message'] ?? '';
$file_error = $errors['file'] ?? '';
$lot_rate_error = $errors['lot-rate'] ?? '';
$lot_step_error = $errors['lot-step'] ?? '';
$lot_date_error = $errors['lot-date'] ?? '';

?>

<main>
    <form class="form form--add-lot container <?= isset($errors) ? 'form--invalid' : '' ?>"
        enctype="multipart/form-data" action="add-lot.php" method="post">
        <h2>Добавление лота</h2>
        <div class="form__container-two">
            <div class="form__item <?= isset($errors['lot-name']) ? 'form__item--invalid' : '' ?>">
                <label for="lot-name">Наименование <sup>*</sup></label>
                <input id="lot-name" type="text" name="lot-name" placeholder="Введите наименование лота"
                    value="<?= $lot_name ?>" />
                <span class="form__error"><?= $lot_name_error ?></span>
            </div>
            <div class="form__item <?= isset($errors['category']) ? 'form__item--invalid' : '' ?>">
                <label for="category">Категория <sup>*</sup></label>
                <select id="category" name="category">
                    <option selected><?= $category ?></option>
                    <option>Доски и лыжи</option>
                    <option>Крепления</option>
                    <option>Ботинки</option>
                    <option>Одежда</option>
                    <option>Инструменты</option>
                    <option>Разное</option>
                </select>
                <span class="form__error"><?= $category_error ?></span>
            </div>
        </div>
        <div class="form__item form__item--wide <?= isset($errors['message']) ? 'form__item--invalid' : '' ?>">
            <label for="message">Описание <sup>*</sup></label>
            <textarea id="message" name="message" placeholder="Напишите описание лота"><?= $message ?></textarea>
            <!-- required -->
            <span class="form__error"><?= $message_error ?></span>
        </div>
        <div class="form__item form__item--file <?= isset($errors['file']) ? 'form__item--invalid' : '' ?>">
            <label>Изображение <sup>*</sup></label>
            <div class="preview">
                <div class="preview__remove-square"></div>
                <button class="preview__remove" type="button">Закрыть</button>
                <div class="preview__img">
                    <img src="img/avatar.jpg" width="113" height="113" alt="Изображение лота" />
                </div>
            </div>
            <div class="form__input-file">
                <input class="visually-hidden" type="file" id="photo" name="lot-photo" />
                <label for="photo">
                    <span>+ Добавить</span>
                </label>
            </div>
            <span class="form__error"><?= $file_error ?></span>
        </div>
        <div class="form__container-three">
            <div class="form__item form__item--small <?= isset($errors['lot-rate']) ? 'form__item--invalid' : '' ?>">
                <label for="lot-rate">Начальная цена <sup>*</sup></label>
                <input id="lot-rate" type="number" min="0" name="lot-rate" placeholder="0" value="<?= $lot_rate ?>" />
                <span class="form__error"><?= $lot_rate_error ?></span>
            </div>
            <div class="form__item form__item--small <?= isset($errors['lot-step']) ? 'form__item--invalid' : '' ?>">
                <label for="lot-step">Шаг ставки <sup>*</sup></label>
                <input id="lot-step" type="number" min="0" name="lot-step" placeholder="0" value="<?= $lot_step ?>" />
                <span class="form__error"><?= $lot_step_error ?></span>
            </div>
            <div class="form__item <?= isset($errors['lot-date']) ? 'form__item--invalid' : '' ?>">
                <label for="lot-date">Дата окончания торгов <sup>*</sup></label>
                <input class="form__input-date flatpickr-input active" id="lot-date" type="text" name="lot-date" placeholder="Введите дату в формате ГГГГ-ММ-ДД" readonly="readonly">
                <span class="form__error"><?= $lot_date_error ?></span>
            </div>
        </div>
        <span class="form__error form__error--bottom">Пожалуйста, исправьте ошибки в форме.</span>
        <button type="submit" class="button">Добавить лот</button>
    </form>
</main>