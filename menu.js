const comidas = [
    { id: 1, name: 'CARNE', price: 10.00, image: 'imagens/carne.jpg' },
    { id: 2, name: 'FRANGO', price: 10.00, image: 'imagens/frango.jpg' },
    { id: 3, name: 'PEIXE', price: 10.00, image: 'imagens/peixe.png' },
    { id: 4, name: 'PORCO', price: 10.00, image: 'imagens/porco.jpg' },
];

// Produtos de bebidas
const bebidas = [
    { id: 5, name: 'Coca-Cola', price: 1.99, image: 'imagens/coca.jpg' },
    { id: 6, name: 'Água Mineral', price: 0.99, image: 'imagens/agua.jpg' },
    { id: 7, name: 'Suco de Laranja', price: 4.00, image: 'imagens/suco.png' },
    { id: 8, name: 'Açaí', price: 5.00, image: 'imagens/açai.jpg' },
];

const cart = [];
const comidasGrid = document.getElementById('comidas-grid');
const bebidasGrid = document.getElementById('bebidas-grid');

function renderProducts(products, container) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">Adicionar</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    cartItemsContainer.innerHTML = ''; // Limpa os itens do carrinho

    // Renderiza cada item no carrinho
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item'); // Adiciona a classe do item do carrinho
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="remove-btn" data-index="${index}">X</button> <!-- Botão de remover -->
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = cart.length; // Atualiza a contagem do carrinho
}

function addToCart(productId) {
    const product = [...comidas, ...bebidas].find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function showCart() {
    document.getElementById('cart-sidebar').style.transform = 'translateX(0)';
}

function hideCart() {
    document.getElementById('cart-sidebar').style.transform = 'translateX(100%)';
}

// Função para submeter o pedido
function submitOrder() {
    const checkoutButton = document.getElementById('checkout-btn');

    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
        showNotification("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
        return; // Impede o envio do pedido
    }

    // Adiciona a classe 'loading' para ativar a animação de carregamento
    checkoutButton.classList.add('loading');

    // Aguarda alguns segundos para simular o tempo de processamento
    setTimeout(() => {
        // Redireciona para a página de conclusão
        window.location.href = 'realizado.html';
    }, 2000); // Tempo da animação antes do redirecionamento (2 segundos)
}

// Função para exibir a notificação
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    notification.style.opacity = 1;

    // Oculta a notificação após 3 segundos
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500); // Tempo para a transição de opacidade
    }, 3000);
}

// Função para voltar ao menu
function goTorealizado() {
    window.location.href = 'realizado.html'; // Redireciona para a página do menu
}

// Função para alternar o menu
function toggleMenu() {
    const menu = document.getElementById('hamburger-menu'); // Seleciona o menu
    menu.classList.toggle('show'); // Alterna a classe "show" para mostrar/ocultar o menu
}

// Eventos
document.getElementById('cart-icon').addEventListener('click', showCart);
document.getElementById('close-cart').addEventListener('click', hideCart);

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
    if (e.target.classList.contains('remove-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        removeFromCart(index);
    }
});

// Renderiza os produtos nas respectivas seções
renderProducts(comidas, comidasGrid);
renderProducts(bebidas, bebidasGrid);

// bota de voltar menu
function goBack() {
    window.history.back();
}

// Recupera o último pedido do Local Storage
document.addEventListener("DOMContentLoaded", function () {
    const lastOrder = localStorage.getItem("lastOrder");
    const lastOrderInfo = document.getElementById("last-order-info");
    
    if (lastOrder) {
        lastOrderInfo.textContent = lastOrder; // Exibe o último pedido
    }
});
