<?php

$email = $form_login['email'] ?? '';
$password = $form_login['password'] ?? '';

$email_error = $errors['email'] ?? '';
$password_error = $errors['password'] ?? '';

?>

<main>
    <form class="form container <?= isset($errors) ? 'form--invalid' : '' ?>" action="login.php" method="post">
        <h2>Вход</h2>
        <div class="form__item <?= isset($errors['email']) ? 'form__item--invalid' : '' ?>">
            <label for="email">E-mail <sup>*</sup></label>
            <input id="email" type="text" name="email" placeholder="Введите e-mail" value="<?= $email ?>">
            <span class="form__error"><?= $email_error ?></span>
        </div>
        <div class="form__item form__item--last <?= isset($errors['password']) ? 'form__item--invalid' : '' ?>">
            <label for="password">Пароль <sup>*</sup></label>
            <input id="password" type="text" name="password" placeholder="Введите пароль" value="<?= $password ?>">
            <span class="form__error"><?= $password_error ?></span>
        </div>
        <?= isset($canLogin) ? "<span class='form-can-login'>$canLogin</span>" : '' ?>
        <span class="form__error form__error--bottom">Пожалуйста, исправьте ошибки в форме.</span>
        <button type="submit" class="button">Войти</button>
    </form>
</main>
