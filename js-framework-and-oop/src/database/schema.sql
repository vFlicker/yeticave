DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id INT GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE(category_name)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(64) NOT NULL,
  avatar_url VARCHAR(255) NOT NULL DEFAULT '/img/user.png',
  create_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contacts TEXT NOT NULL,
  PRIMARY KEY(id),
  UNIQUE(email)
);

DROP TABLE IF EXISTS lots;
CREATE TABLE lots (
  id INT GENERATED ALWAYS AS IDENTITY,
  category_id INT NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  lot_description TEXT NOT NULL,
  price INT NOT NULL,
  step INT NOT NULL,
  create_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMPTZ NOT NULL CHECK (end_date > create_date),
  PRIMARY KEY(id),
  CONSTRAINT fk_lot_category
    FOREIGN KEY(category_id)
      REFERENCES categories(id)
      ON DELETE CASCADE,
  CONSTRAINT fk_lot_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS bets;
CREATE TABLE bets (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  lot_id INT NOT NULL,
  price INT NOT NULL,
  create_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_winner BOOLEAN DEFAULT FALSE,
  PRIMARY KEY(id),
  CONSTRAINT fk_bet_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,
  CONSTRAINT fk_bet_lot
    FOREIGN KEY(lot_id)
      REFERENCES lots(id)
      ON DELETE CASCADE
);
