CREATE TABLE roles (
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(50) NOT NULL,

  CONSTRAINT roles_id_pk PRIMARY KEY (id)
);

INSERT INTO roles
  (name)
  VALUES
    ('ADMIN'),
    ('DEFAULT')