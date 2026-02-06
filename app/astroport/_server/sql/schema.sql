DROP TABLE IF EXISTS gates;

CREATE TABLE gates (
    gate_number INT NOT NULL,
    ship_name VARCHAR(255) NULL
);

insert into gates (gate_number, ship_name) values
(1, null),
(2, null),
(3, null)
;