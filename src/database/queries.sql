INSERT INTO
  category (category_name)
VALUES
  ('Boards'),
  ('Attachment'),
  ('Boots'),
  ('Clothing'),
  ('Tools'),
  ('Other');

INSERT INTO
  app_user(user_name, email, user_password, contacts)
VALUES
  (
    'User 1',
    'user1@mail.com',
    '$2b$10$LxgZDTuX9zLGBpWjcu0T4uhymIKaMDciUFGTRrVLYnmlcvwMfPKOG',
    'jane@example.com\n123-555-7890'
  ),
  (
    'User 2',
    'user2@mail.com',
    '$2b$10$y.c8PTYujKQkGkOQXQq9m.MW6PCpfM.Pzes0jM9sN6E1l8q07tzm6',
    '1234567890\njohndoe@example.com\n123-456-7890'
  ),
  (
    'User 3',
    'user3@mail.com',
    '$2b$10$Qr1fyONIbD/f/I/BkuvNIOOgtxn6M9.pXgYswMIQSxIljAAhvSPx2',
    '555-123-7890\nbob@example.com\nbob@gmail.com'
  );

INSERT INTO
  lot (
    category_id,
    user_id,
    title,
    image_url,
    lot_description,
    price,
    step,
    end_date
  )
VALUES
  (
    1,
    1,
    '2014 Rossignol District Snowboard',
    '/img/lot-1.jpg',
    'The 2014 Rossignol District Snowboard is a versatile board that performs well in a variety of conditions. It has a twin shape and a medium flex, making it suitable for intermediate riders who are looking to improve their skills.',
    10999,
    100,
    '2023-04-25T17:17:03.305Z'
  ),
  (
    1,
    1,
    'DC Ply Mens 2016/2017 Snowboard',
    '/img/lot-2.jpg',
    'The DC Ply Mens 2016/2017 Snowboard is a high-performance board that is designed for advanced riders. It has a true twin shape and a medium flex, making it suitable for freestyle riding in the park or on the mountain.',
    159999,
    100,
    '2023-04-25T17:17:03.305Z'
  ),
  (
    2,
    2,
    'Union Contact Pro Bindings 2015 L/XL',
    '/img/lot-3.jpg',
    'The Union Contact Pro 2015 Bindings are designed for intermediate to advanced riders who want a lightweight and responsive binding. They have a size L/XL, making them suitable for riders with larger boot sizes.',
    8000,
    20,
    '2023-04-25T17:17:03.305Z'
  ),
  (
    3,
    2,
    'DC Mutiny Charcoal Snowboard Boots',
    '/img/lot-4.jpg',
    'The DC Mutiny Charcoal Snowboard Boots are designed for intermediate to advanced riders who want a comfortable and responsive boot. They have a medium flex and a traditional lacing system, making them easy to adjust for a customized fit.',
    10999,
    10,
    '2023-04-25T17:17:03.305Z'
  ),
  (
    4,
    3,
    'DC Mutiny Charcoal Snowboard Jacket',
    '/img/lot-5.jpg',
    'The DC Mutiny Charcoal Snowboard Jacket is designed for riders who want a warm and stylish jacket for their winter adventures. It features a waterproof and breathable shell, as well as a variety of pockets and ventilation options.',
    7500,
    10,
    '2023-04-23T17:17:03.305Z'
  ),
  (
    5,
    1,
    'Oakley Canopy Goggles',
    '/img/lot-6.jpg',
    'The Oakley Canopy Snowboard Goggles are designed for riders who want maximum visibility and protection on the mountain. They have a large lens and a comfortable fit, making them suitable for all-day riding in a variety of conditions.',
    5400,
    20,
    '2023-04-26T17:17:03.305Z'
  );

INSERT INTO
  bet (user_id, lot_id, price)
VALUES
  (1, 1, 11500),
  (3, 6, 6000),
  (2, 5, 8000),
  (3, 5, 8400);
