DROP TABLE IF EXISTS gates;

CREATE TABLE gates (
    astroport_name VARCHAR(255) NOT NULL,
    gate_number INT NOT NULL,
    ship_name VARCHAR(255) NULL
);
