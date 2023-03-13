const uri = "http://localhost:3000/item";
const cadastro = document.querySelector("#cadastro");
const corpo = document.querySelector("#corpo");
const total = document.querySelector("#total");
var valTotal = 0;

cadastro.addEventListener("submit", (e) => {
  e.preventDefault();
  let linha = document.createElement("tr");
  let col1 = document.createElement("td");
  let col2 = document.createElement("td");
  let col3 = document.createElement("td");
  let col4 = document.createElement("td");
  let col5 = document.createElement("td");
  let del = document.createElement("button");
  del.innerHTML = "[-]";
  del.setAttribute("onclick", "excluirItem(this)");
  col1.innerHTML = cadastro.id.value;
  col2.innerHTML = cadastro.nome.value;
  col3.innerHTML = cadastro.descricao.value;
  col4.innerHTML = cadastro.valor.value;
  col5.appendChild(del);
  linha.appendChild(col1);
  linha.appendChild(col2);
  linha.appendChild(col3);
  linha.appendChild(col4);
  linha.appendChild(col5);
  corpo.appendChild(linha);
  valTotal += parseFloat(cadastro.valor.value);
  total.value = valTotal;
});

function excluirItem(i) {
  i.parentNode.parentNode.remove();
}

// Integraçao...

fetch(uri + "/listar", { method: "GET" })
  .then((resp) => resp.json())
  .then((resp) => montarTabela(resp))
  .catch((err) => console.error(err));

cadastro.addEventListener("submit", (e) => {
  e.preventDefault();

  const body = {
    id: cadastro.id.value,
    nome: cadastro.nome.value,
    descricao: cadastro.descricao.value,
    valor: cadastro.valor.value,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  options.body = JSON.stringify(body);

  fetch(uri + "/criar", options)
    .then((resp) => resp.status)
    .then((resp) => {
      if (resp == 201) window.location.reload();
      else alert("Erro ao enviar dados");
    });
});

function montarTabela(vetor) {
  vetor.forEach((e) => {
    let linha = document.createElement("tr");
    let col1 = document.createElement("td");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");
    let col4 = document.createElement("td");
    let col5 = document.createElement("td");
    let del = document.createElement("button");
    del.innerHTML = "[-]";
    del.setAttribute("onclick", `excluirItem('${e.id}')`);
    col1.innerHTML = e.id;
    col2.innerHTML = e.nome;
    col3.innerHTML = e.descricao;
    col4.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(e.valor);
    col5.appendChild(del);
    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    linha.appendChild(col4);
    linha.appendChild(col5);
    corpo.appendChild(linha);
    valTotal += e.valor;
    total.value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valTotal);
  });
}

function excluirItem(i) {
  if (confirm("Valida Exclusao"))
    fetch(uri + "/excluir/" + i, { method: "DELETE" })
      .then((resp) => resp.status)
      .then((resp) => {
        if (resp == 204) window.location.reload();
        else alert("Erro ao enviar dados");
      });
}

function copiarTabela() {
  const elTable = document.querySelector("#tblDados");

  let range, sel;

  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    sel.removeAllRanges();
    try {
      range.selectNodeContents(elTable);
      sel.addRange(range);
    } catch (e) {
      range.selectNode(elTable);
      sel.addRange(range);
    }
  } else if (document.selection && document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(elTable);
    range.select();
  }

  document.execCommand("copy");
}
