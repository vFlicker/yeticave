DROP DATABASE IF EXISTS yaticave;
CREATE DATABASE yaticave
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

USE yaticave;


DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    name                    CHAR(64) NOT NULL UNIQUE,
    class_mod             CHAR(32) NOT NULL UNIQUE
);

CREATE INDEX c_id ON categories(id);


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
    fav_count               INT,

    user_id                 INT NOT NULL,
    winner_id               INT,
    category_id             INT NOT NULL
);

CREATE INDEX date_create ON lots(date_create);

DROP TABLE IF EXISTS bets;
CREATE TABLE bets (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    date_create             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price                   INT NOT NULL,
    
    user_id                 INT,
    lot_id                  INT
);

CREATE INDEX date_create ON bets(date_create);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    date_registration       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email                   CHAR(64) NOT NULL UNIQUE,
    name                    CHAR(64) NOT NULL,
    password                CHAR(64) NOT NULL,
    contacts                TEXT(500)
);

CREATE INDEX u_name ON users(name);
CREATE INDEX u_email ON users(email);