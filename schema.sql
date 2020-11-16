DROP DATABASE IF EXISTS yaticave;
CREATE DATABASE yaticave
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

USE yaticave;


DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    name                    CHAR(64) NOT NULL UNIQUE
    -- symbol_code             CHAR(32) NOT NULL UNIQUE
);

CREATE INDEX c_name ON categories(name);


DROP TABLE IF EXISTS lots;
CREATE TABLE lots (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    date_create             TIMESTAMP NOT NULL,
    title                   CHAR(255) NOT NULL,
    description             TEXT NOT NULL,
    url_image               CHAR(128) NOT NULL,
    start_price             INT NOT NULL,
    date_end                TIMESTAMP NOT NULL,
    step_price              INT NOT NULL,
    likes                   INT,

    user_id                 INT NOT NULL,
    winner_id               INT,
    category_id             INT NOT NULL
);

-- CREATE INDEX date_create ON lots(date_create);
-- CREATE INDEX lot_title ON lots(title);
-- CREATE INDEX date_end ON lots(date_end);


DROP TABLE IF EXISTS bets;
CREATE TABLE bets (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    date_create             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price                   INT NOT NULL,

    user_id                 INT,
    lot_id                  INT
);


DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    date_registration       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email                   CHAR(64) NOT NULL UNIQUE,
    name                    CHAR(64) NOT NULL,
    password                CHAR(64) NOT NULL,
    contacts                TEXT
);

-- CREATE INDEX u_name ON users(name);