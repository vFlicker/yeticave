DROP TABLE IF EXISTS category;
CREATE TABLE category (
  category_id INT GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(category_id),
  UNIQUE(category_name)
);

DROP TABLE IF EXISTS app_user;
CREATE TABLE app_user (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(64) NOT NULL,
  avatar_url VARCHAR(255) NOT NULL DEFAULT '/img/user.png',
  create_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contacts TEXT NOT NULL,
  PRIMARY KEY(user_id),
  UNIQUE(email)
);

DROP TABLE IF EXISTS lot;
CREATE TABLE lot (
  lot_id INT GENERATED ALWAYS AS IDENTITY,
  category_id INT NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  lot_description TEXT NOT NULL,
  price INT NOT NULL,
  step INT NOT NULL,
  create_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMPTZ NOT NULL CHECK (end_date > create_date),
  PRIMARY KEY(lot_id),
  CONSTRAINT fk_lot_category
    FOREIGN KEY(category_id)
      REFERENCES category(category_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_lot_user
    FOREIGN KEY(user_id)
      REFERENCES app_user(user_id)
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS bet;
CREATE TABLE bet (
  bet_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  lot_id INT NOT NULL,
  price INT NOT NULL,
  create_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(bet_id),
  CONSTRAINT fk_bet_user
    FOREIGN KEY(user_id)
      REFERENCES app_user(user_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_bet_lot
    FOREIGN KEY(lot_id)
      REFERENCES lot(lot_id)
      ON DELETE CASCADE
);
