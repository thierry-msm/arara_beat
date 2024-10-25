// Função para carregar produtos da API DummyJSON
let produtosCarregados = []; // Variável global para armazenar os produtos carregados

function carregarProdutos() {
    const smartphonesPromise = fetch('https://dummyjson.com/products/category/smartphones').then(res => res.json());
    const laptopsPromise = fetch('https://dummyjson.com/products/category/laptops').then(res => res.json());
    const mobileAccessoriesPromise = fetch('https://dummyjson.com/products/category/mobile-accessories').then(res => res.json());
    const tabletsPromise = fetch('https://dummyjson.com/products/category/tablets').then(res => res.json());

    Promise.all([smartphonesPromise, laptopsPromise, mobileAccessoriesPromise, tabletsPromise])
        .then(results => {
            // Combinar os produtos de todas as categorias
            produtosCarregados = [
                ...results[0].products,
                ...results[1].products,
                ...results[2].products,
                ...results[3].products
            ];

            exibirProdutos(produtosCarregados); // Exibir todos os produtos carregados
        })
        .catch(error => {
            console.error('Erro ao carregar produtos:', error);
        });
}

function exibirProdutos(produtos) {
    const listaProdutos = document.getElementById('product-list');
    listaProdutos.innerHTML = '';  // Limpar lista antes de preencher

    const categorias = {
        'smartphones': [],
        'laptops': [],
        'tablets': [],
        'mobile-accessories': []
    };

    // Organizar os produtos em suas respectivas categorias
    produtos.forEach(produto => {
        if (categorias[produto.category]) {
            categorias[produto.category].push(produto);
        }
    });

    // Função para criar blocos de produtos
    function criarBloco(categoria, produtos) {
        const bloco = document.createElement('div');
        bloco.classList.add('product-category');
        bloco.innerHTML = `<h2>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>`;
        
        const containerProdutos = document.createElement('div');
        containerProdutos.classList.add('product-container');

        produtos.forEach(produto => {
            const produtoElemento = document.createElement('div');
            produtoElemento.classList.add('product');
            produtoElemento.innerHTML = `
                <img src="${produto.thumbnail}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p>Marca: ${produto.brand}</p>
                <p>R$${produto.price.toFixed(2)}</p>
                <button onclick="mostrarDetalhes(${produto.id})">...</button>
                <div id="detalhes-${produto.id}" class="product-details" style="display: none;">
                    <p>${produto.description}</p>
                </div>
                <button onclick="adicionarAoCarrinho(${produto.id}, '${produto.title}', ${produto.price}, '${produto.thumbnail}', '${produto.brand}')">Adicionar ao Carrinho</button>
            `;
            containerProdutos.appendChild(produtoElemento);
        });

        bloco.appendChild(containerProdutos);
        listaProdutos.appendChild(bloco);
    }

    // Criar blocos para cada categoria
    Object.keys(categorias).forEach(categoria => {
        criarBloco(categoria, categorias[categoria]);
    });
}

function mostrarDetalhes(id) {
    const detalhes = document.getElementById(`detalhes-${id}`);
    if (detalhes.style.display === 'none') {
        detalhes.style.display = 'block';
    } else {
        detalhes.style.display = 'none';
    }
}









// Função de busca
document.getElementById('search').addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    const produtosFiltrados = produtosCarregados.filter(produto => 
        produto.title.toLowerCase().includes(termo) || 
        produto.description.toLowerCase().includes(termo)
    );
    exibirProdutos(produtosFiltrados); // Exibir produtos filtrados
});

// Chame a função para carregar os produtos ao iniciar a página
carregarProdutos();


// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(id, title, price, thumbnail, brand) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        // Se o produto já existe no carrinho, aumenta a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Se o produto não existe no carrinho, adiciona como novo item
        const produto = { id, title, price, thumbnail, brand, quantidade: 1 };
        carrinho.push(produto);
    }

    // Atualiza o localStorage com o carrinho atualizado
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Exibe uma mensagem de confirmação
    alert(`${title} foi adicionado ao carrinho!`);
}

function exibirProdutosFiltrados(produtosFiltrados) {
    const listaProdutos = document.getElementById('product-list');
    listaProdutos.innerHTML = '';

    produtosFiltrados.forEach(produto => {
        const produtoElemento = document.createElement('div');
        produtoElemento.classList.add('product');
        produtoElemento.innerHTML = `
            <img src="${produto.thumbnail}" alt="${produto.title}">
            <h3>${produto.title}</h3>
            <p>Marca: ${produto.brand}</p>
            <p>R$${produto.price.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produto.id}, '${produto.title}', ${produto.price}, '${produto.thumbnail}')">Adicionar ao Carrinho</button>
        `;
        listaProdutos.appendChild(produtoElemento);
    });
}