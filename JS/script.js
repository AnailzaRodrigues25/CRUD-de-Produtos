// Funções CRUD usando localStorage
function getProdutos() {
  return JSON.parse(localStorage.getItem("produtos")) || [];
}

function saveProdutos(produtos) {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Atualizar tabela de produtos
function atualizarTabela() {
  const listaProdutos = document.getElementById("listaProdutos");
  if (listaProdutos) {
    listaProdutos.innerHTML = ""; // limpa a tabela antes de atualizar
    const produtos = getProdutos();
    produtos.forEach(p => {
      const tr = document.createElement("tr");
      tr.classList.add("border-b");
      tr.innerHTML = `
        <td class="p-2">${p.nome}</td>
        <td class="p-2">R$ ${p.preco.toFixed(2)}</td>
        <td class="p-2">${p.categoria}</td>
        <td class="p-2">${p.origem}</td>
        <td class="p-2">${p.lote}</td>
        <td class="p-2">${p.validade}</td>
        <td class="p-2">
          <a href="editar.html?id=${p.id}" class="text-pink-600 font-bold hover:text-orange-500">Editar</a> |
          <button onclick="excluirProduto(${p.id})" class="text-orange-600 font-bold hover:text-pink-600">Excluir</button>
        </td>
      `;
      listaProdutos.appendChild(tr);
    });
  }
}

// Adicionar Produto
const formProduto = document.getElementById("formProduto");
if (formProduto) {
  formProduto.addEventListener("submit", adicionarProduto);
}

function adicionarProduto(e) {
  e.preventDefault();

  const produto = {
    id: Date.now(),
    nome: document.getElementById("nome").value.trim(),
    preco: parseFloat(document.getElementById("preco").value),
    categoria: document.getElementById("categoria").value.trim(),
    origem: document.getElementById("origem").value.trim(),
    lote: document.getElementById("lote").value.trim(),
    validade: document.getElementById("validade").value.trim()
  };

  // Validação
  if (!produto.nome || isNaN(produto.preco) || !produto.categoria || !produto.origem || !produto.lote || !produto.validade) {
    alert(" Preencha todos os campos corretamente!");
    return;
  }

  const produtos = getProdutos();
  produtos.push(produto);
  saveProdutos(produtos);

  alert("Produto adicionado!");
  formProduto.reset();
  atualizarTabela(); // atualiza lista 
}

// Excluir Produto 
function excluirProduto(id) {
  let produtos = getProdutos();
  produtos = produtos.filter(p => p.id !== id);
  saveProdutos(produtos);
  atualizarTabela();
}

// Editar Produto 
const formEditar = document.getElementById("formEditar");
if (formEditar) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  let produtos = getProdutos();
  let produto = produtos.find(p => p.id === id);

  if (produto) {
    document.getElementById("id").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("origem").value = produto.origem;
    document.getElementById("lote").value = produto.lote;
    document.getElementById("validade").value = produto.validade;
  }

  formEditar.addEventListener("submit", editarProduto);

  function editarProduto(e) {
    e.preventDefault();
    produto.nome = document.getElementById("nome").value.trim();
    produto.preco = parseFloat(document.getElementById("preco").value);
    produto.categoria = document.getElementById("categoria").value.trim();
    produto.origem = document.getElementById("origem").value.trim();
    produto.lote = document.getElementById("lote").value.trim();
    produto.validade = document.getElementById("validade").value.trim();

    if (!produto.nome || isNaN(produto.preco) || !produto.categoria || !produto.origem || !produto.lote || !produto.validade) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    saveProdutos(produtos);
    alert("Produto atualizado!");
    window.location.href = "listar.html"; // redireciona para lista
  }
}

// Atualiza tabela de produtos quando a página carregar
document.addEventListener("DOMContentLoaded", atualizarTabela);
