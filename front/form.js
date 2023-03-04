const API_URL = "http://localhost:3000/livro";
const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    titulo: form.titulo.value,
    autor: form.autor.value,
    preco: form.preco.value,
    data_emprestado: form.data_emprestado.value,
    data_prev_dev: form.data_prev_dev.value,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${API_URL}/create`, options);
    if (response.status === 201) {
      window.location.reload();
    } else {
      throw new Error("Erro ao enviar dados");
    }
  } catch (error) {
    alert(error.message);
  }
});
