const connection = require('../dao/connect');
const Livro = require('../models/livro');

const teste = (req, res) => {
  res.json("Respondendo.").end();
};

const criar = (req, res) => {
  const livro = new Livro(req.body);
  const sql = 'INSERT INTO item SET ?';
  connection.query(sql, livro, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err).end();
    } else {
      res.status(201).end();
    }
  });
};

const listar = (req, res) => {
  const sql = 'SELECT * FROM item';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err).end();
    } else {
      res.json(result).end();
    }
  });
};

const excluir = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM item WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err).end();
    } else if (result.affectedRows > 0) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
};

module.exports = {
  teste,
  criar,
  listar,
  excluir,
};
