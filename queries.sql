USE yaticave;

INSERT INTO categories (name, class_mod)
VALUES
    ('Доски и лыжи', 'boards'),
    ('Крепления', 'attachment'),
    ('Ботинки', 'boots'),
    ('Одежда', 'clothing'),
    ('Инструменты', 'tools'),
    ('Разное', 'other');


INSERT INTO lots (date_create, title, description, url_image, start_price, date_end, step_price, fav_count, user_id, winner_id, category_id)
VALUES
(
    '2020-11-16 15:37', '2014 Rossignol District Snowboard', 'Описание для 2014 Rossignol District Snowboard', 'img/lot-1.jpg', 10999, '2020-11-20 12:00', 100, 4, 1, NULL, 1
),
(
    '2020-10-16 12:33', 'DC Ply Mens 2016/2017 Snowboard', 'Описание для DC Ply Mens 2016/2017 Snowboard', 'img/lot-2.jpg', 159999, '2020-11-30 12:00', 500, 10, 3, NULL, 1
),
(
    '2020-06-15 12:54', 'Крепления Union Contact Pro 2015 года размер L/XL', 'Описание для Крепления Union Contact Pro 2015 года размер L/XL', 'img/lot-3.jpg', 8000, '2020-06-20 10:33', 200, 1, 1, 3, 2
),
(
    '2020-11-16 23:59', 'Ботинки для сноуборда DC Mutiny Charocal', 'Описание для Ботинки для сноуборда DC Mutiny Charocal', 'img/lot-4.jpg', 10999, '2020-11-18 19:25', 300, 3, 3, NULL, 3
),
(
    '2020-11-21 17:36', 'Куртка для сноуборда DC Mutiny Charocal', 'Описание для Куртка для сноуборда DC Mutiny Charocal', 'img/lot-5.jpg', 7500, '2020-11-23 17:36', 100, 10, 1, NULL, 4
),
(
    '2020-11-26 21:33', 'Маска Oakley Canopy', 'Описание для Маска Oakley Canopy', 'img/lot-6.jpg', 5400, '2020-12-01 12:00:00', 200, 2, 1, NULL, 6
);


INSERT INTO bets (date_create, price, user_id, lot_id)
VALUES
(
    '2020-11-26 22:34', 11500, 1, 1
),
(
    '2020-11-28 12:34', 6000, 3, 6
),
(
    '2020-11-21 12:44', 8000, 2, 5
),
(
    '2020-11-21 19:54', 8400, 3, 5
);


INSERT INTO users (date_registration, email, name, password, contacts)
VALUES
(
    '2020-09-15 20:22',
    'ignat.v@gmail.com',
    'Игнат',
    '$2y$10$OqvsKHQwr0Wk6FMZDoHo1uHoXd4UdxJG/5UDtUiie00XaxMHrW8ka',
    'г. Кривой Рог, ул. Тамбовская 52, тел.098-291-00-16'
),
(
    '2020-06-12 14:24',
    'kitty_93@li.ru',
    'Леночка',
    '$2y$10$bWtSjUhwgggtxrnJ7rxmIe63ABubHQs0AS0hgnOo41IEdMHkYoSVa',
    'г. Киев, ул. Шевченко 2, тел.096-138-15-15'
),
(
    '2020-11-14 16:57',
    'warrior07@mail.ru',
    'Руслан',
    '$2y$10$2OxpEH7narYpkOT1H5cApezuzh10tZEEQ2axgFOaKW.55LxIJBgWW',
    NULL
);