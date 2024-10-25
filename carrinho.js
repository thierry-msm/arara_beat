// Carregar o carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Exibir os produtos no carrinho
function carregarCarrinho() {
    const listaCarrinho = document.getElementById('cart-list');
    const totalValueElem = document.getElementById('total-value');
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((produto, index) => {
        const produtoElemento = document.createElement('div');
        produtoElemento.classList.add('product-cart'); // Mantenha a classe correta para o estilo do carrinho
        produtoElemento.innerHTML = `
            <img src="${produto.thumbnail}" alt="${produto.title}">
            <h3>${produto.title}</h3>
            <p>Marca: ${produto.brand}</p>
            <p>R$${produto.price.toFixed(2)}</p>
            <p>Quantidade: <input type="number" value="${produto.quantidade}" min="1" onchange="alterarQuantidade(${index}, this.value)"></p>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        listaCarrinho.appendChild(produtoElemento);
        total += produto.price * produto.quantidade; // Acumula o preço total de todos os produtos no carrinho
    });

    totalValueElem.textContent = total.toFixed(2); // Atualiza o valor total do carrinho
}

// Função para remover produto do carrinho
function removerDoCarrinho(index) {
    if (confirm("Tem certeza que deseja remover este produto?")) {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho(); // Atualiza o carrinho após a remoção
    }
}

// Função para alterar quantidade
function alterarQuantidade(index, quantidade) {
    carrinho[index].quantidade = parseInt(quantidade);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho(); // Atualiza o valor total do carrinho após a alteração
}

// Inicializar carrinho ao carregar a página
window.onload = carregarCarrinho;

// Finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', function() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
    } else {
        window.location.href = "checkout.html";  // Redirecionar para a página de checkout
    }
});
