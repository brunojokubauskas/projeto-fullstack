DROP DATABASE IF EXISTS biblioteca;

CREATE DATABASE biblioteca CHARSET = UTF8 COLLATE utf8_general_ci;
USE biblioteca; 

CREATE TABLE 
  livro (
    id INT NULL PRIMARY KEY AUTO_INCREMENT;
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    data_emprestado DATE NOT NULL,
    dataprev_devo DATE NOT NULL,
    data_devolucao DATE, 
    multa FLOAT(5, 2)   
  );

  INSERT INTO 
    livro
  VALUES 
    (
      DEFAULT, 
      "O Manifesto Comunista",
      "Karl Marx & Friedrich Engels", 
      10.00, 
      "2023-03-03",
      "2023-03-10",
      DEFAULT,
    ),
    (
      DEFAULT, 
      "Assim Falou Zaratustra",
      "Friedrich Nietszche", 
      20.55,
      "2023-03-03",
      "2023-03-15",
      DEFAULT,
      DEFAULT
    )

