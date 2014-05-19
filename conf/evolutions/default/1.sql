# --- !Ups

CREATE TABLE User (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    isAdmin boolean NOT NULL,
    name varchar(255) NOT NULL,
    surname varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Card (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    CMC varchar(255) NOT NULL,
    color varchar(255) NOT NULL,
    magicSet varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    power varchar(255) NOT NULL,
    toughness varchar(255) NOT NULL,
    rarity varchar(255) NOT NULL,
    rules varchar(255),
    text varchar(255),
    subtype varchar(255),
    type varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Deck (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  owner_id bigint(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Deck_Card (
  card_id bigint(20) NOT NULL,
  deck_id bigint(20) NOT NULL,
  PRIMARY KEY (card_id, deck_id)
);

CREATE TABLE Sideboard_Card (
  card_id bigint(20) NOT NULL,
  deck_id bigint(20) NOT NULL,
  PRIMARY KEY (card_id, deck_id)
);
