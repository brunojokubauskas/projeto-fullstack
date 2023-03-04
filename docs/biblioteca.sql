CREATE TABLE livro (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  data_emprestado DATE NOT NULL,
  dataprev_devo DATE NOT NULL,
  data_devolucao DATE,
  multa FLOAT(5, 2)
);

INSERT INTO livro
  VALUES
    (
      DEFAULT,
      'O Manifesto Comunista',
      'Karl Marx & Friedrich Engels',
      '2023-03-03',
      '2023-03-10',
      NULL,
      10.00
    ),
    (
      DEFAULT,
      'Assim Falou Zaratustra',
      'Friedrich Nietszche',
      '2023-03-03',
      '2023-03-15',
      NULL,
      20.55
    );
