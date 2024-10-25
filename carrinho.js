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
        produtoElemento.classList.add('product-cart'); // Classe para estilizar os produtos do carrinho
        produtoElemento.innerHTML = `
            <img src="${produto.thumbnail}" alt="${produto.title}">
            <h3>${produto.title}</h3>
            <div class="product-info">
                <p>Marca: ${produto.brand} <span class="product-price">R$${produto.price.toFixed(2)}</span></p>
                <div class="product-quantity">
                    <button class="quantity-btn" onclick="alterarQuantidade(${index}, ${produto.quantidade} - 1)">-</button>
                    <input type="number" value="${produto.quantidade}" min="1" onchange="alterarQuantidade(${index}, this.value)">
                    <button class="quantity-btn" onclick="alterarQuantidade(${index}, ${produto.quantidade} + 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removerDoCarrinho(${index})">Remover</button>
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

     // Garante que a quantidade nunca seja menor que 1
     quantidade = Math.max(1, parseInt(quantidade));

     // Atualiza a quantidade no carrinho
     carrinho[index].quantidade = quantidade;

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
