class Livro {
  constructor(i) {
    this.id = i.id;
    this.titulo = i.titulo;
    this.autor = i.autor;
    this.preco = i.preco;
    this.data_emprestado = i.data_emprestado;
    this.data_prev_dev = i.data_prev_dev;
    this.data_devolucao = i.data_devolucao;
    this.multa = this.calcularMulta();
  }
  
  create() {
    return `INSERT INTO livro VALUES('${this.id}','${this.titulo}','${this.autor}',${this.preco},'${this.data_emprestado}','${this.data_prev_dev}')`;
  }
  
  read() {
    if (this.id === undefined) {
      return `SELECT * FROM livro`;
    } else {
      return `SELECT * FROM livro WHERE id = '${this.id}'`;
    }
  }
  
  update() {
    if (this.data_devolucao === undefined) {
      return `UPDATE livro SET titulo = '${this.titulo}', autor = '${this.autor}', preco = ${this.preco}, data_emprestado = '${this.data_emprestado}', data_prev_dev = '${this.data_prev_dev}', data_devolucao = NULL, multa = NULL WHERE id = ${this.id}`;
    } else {
      return `UPDATE livro SET titulo = '${this.titulo}', autor = '${this.autor}', preco = ${this.preco}, data_emprestado = '${this.data_emprestado}', data_prev_dev = '${this.data_prev_dev}', data_devolucao = '${this.data_devolucao}', multa = ${this.multa} WHERE id = ${this.id}`;
    }
  }

  delete() {
    return `DELETE FROM livro WHERE id = ${this.id}`;
  }

  calcularMulta() {
    if (this.data_devolucao !== undefined && this.data_prev_dev !== undefined) {
      const dataDevolucao = new Date(this.data_devolucao);
      const dataPrevDev = new Date(this.data_prev_dev);
      const diferenca = dataDevolucao.getTime() - dataPrevDev.getTime();
      const dias = Math.round(diferenca / (1000 * 3600 * 24));
      const taxaDiaria = this.preco * 0.01;
      return dias * taxaDiaria;
    }
    return null;
  }
}

module.exports = Livro;
