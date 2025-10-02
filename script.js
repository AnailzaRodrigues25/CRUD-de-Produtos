// Funções CRUD usando localStorage
function getProdutos() {
  return JSON.parse(localStorage.getItem("produtos")) || [];
}

function saveProdutos(produtos) {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Adicionar Produto
const formProduto = document.getElementById("formProduto");
if(formProduto){
  formProduto.addEventListener("submit", (e) => {
    e.preventDefault();
    const produto = {
      id: Date.now(),
      nome: document.getElementById("nome").value,
      preco: document.getElementById("preco").value,
      categoria: document.getElementById("categoria").value,
      origem: document.getElementById("origem").value,
      lote: document.getElementById("lote").value,
      validade: document.getElementById("validade").value
    };
    const produtos = getProdutos();
    produtos.push(produto);
    saveProdutos(produtos);
    alert("Produto adicionado!");
    formProduto.reset();
    location.reload();
  });
}

// Listar Produtos 
const listaProdutos = document.getElementById("listaProdutos");
if(listaProdutos){
  const produtos = getProdutos();
  produtos.forEach(p => {
    const tr = document.createElement("tr");
    tr.classList.add("border-b");
    tr.innerHTML = `
      <td class="p-2">${p.nome}</td>
      <td class="p-2">R$ ${p.preco}</td>
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

//  Excluir Produto 
function excluirProduto(id){
  let produtos = getProdutos();
  produtos = produtos.filter(p => p.id !== id);
  saveProdutos(produtos);
  location.reload();
}

// Editar Produto 
const formEditar = document.getElementById("formEditar");
if(formEditar){
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  let produtos = getProdutos();
  let produto = produtos.find(p => p.id === id);

  if(produto){
    document.getElementById("id").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("origem").value = produto.origem;
    document.getElementById("lote").value = produto.lote;
    document.getElementById("validade").value = produto.validade;
  }

  formEditar.addEventListener("submit", (e)=>{
    e.preventDefault();
    produto.nome = document.getElementById("nome").value;
    produto.preco = document.getElementById("preco").value;
    produto.categoria = document.getElementById("categoria").value;
    produto.origem = document.getElementById("origem").value;
    produto.lote = document.getElementById("lote").value;
    produto.validade = document.getElementById("validade").value;

    saveProdutos(produtos);
    alert("Produto atualizado!");
    window.location.href = "cadastrar.html";
  });
}


    
        
            
      

    
             
        
    


      
      
      