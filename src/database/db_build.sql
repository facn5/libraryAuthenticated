BEGIN;

DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE if not exists books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    year INTEGER,
    shortDesc VARCHAR(1000) NOT NULL,
    reserved INTEGER DEFAULT 0
);



CREATE TABLE if not exists users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(1000),NOT NULL,

    reservedBooks INTEGER
);



INSERT INTO books (name, author, year, shortDesc, reserved) VALUES
    ('Linux is a nutshell','AbuSalma',2009, 'a book describing the whole abu salma story',1),
    ('Linux is a not nutshell','Abu-Salma',2011, 'a book describing the whole abu salma story',0),
    ('Linux is a nothing','AbuSalma1',1999, 'a book describing the whole abu salma story',1),
    ('Windows is a nutshell','Abu',1965, 'a book describing the whole abu salma story',0);


    INSERT INTO users (name) VALUES
        ('John smith1','john','hashed'),
        ('Karam Ashqar','karam23223','hashed');
