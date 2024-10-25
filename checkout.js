// Verificar e finalizar compra
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Previne o envio do formulário

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const cartao = document.getElementById('cartao').value;
    const validade = document.getElementById('validade').value;
    const cvv = document.getElementById('cvv').value;

    if (nome && endereco && cidade && cep && cartao && validade && cvv) {
        if (confirm("Deseja finalizar a compra?")) {
            alert("Compra finalizada com sucesso!");
            localStorage.removeItem('carrinho');
            window.location.href = "index.html";
        }
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
});
