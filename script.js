let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartSummary() {
    document.getElementById('cart-icon').textContent = `Carrito (${cart.length})`;
}

function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} (Talla: ${item.talla}) - $${item.price}`;
        cartItems.appendChild(li);
    });
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const product = event.target.getAttribute('data-product');
        const price = parseFloat(event.target.getAttribute('data-price'));
        const talla = event.target.parentElement.querySelector('.select-talla').value;
        cart.push({ product, price, talla });
        localStorage.setItem('cart', JSON.stringify(cart));
        mostrarCarrito();
        updateCartSummary();
        alert('Producto añadido');
    });
});

document.querySelectorAll('.show-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const description = button.previousElementSibling;
        if (description.classList.contains('expanded')) {
            description.classList.remove('expanded');
            button.textContent = 'Mostrar más';
        } else {
            description.classList.add('expanded');
            button.textContent = 'Mostrar menos';
        }
    });
});

document.querySelectorAll('.image-slider').forEach(slider => {
    const images = slider.querySelectorAll('.product-image');
    let currentIndex = 0;

    slider.querySelector('.right-arrow').addEventListener('click', () => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
    });

    slider.querySelector('.left-arrow').addEventListener('click', () => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].style.display = 'block';
    });
});

document.getElementById('finalize-purchase').addEventListener('click', (event) => {
    event.preventDefault();
    let message = 'Hola, me gustaría comprar los siguientes productos:%0A';
    cart.forEach(item => {
        message += `- ${item.product} (Talla: ${item.talla}): $${item.price}%0A`;
    });
    window.open(`https://wa.me/921838549?text=${message}`, '_blank');
});

function vaciarCarrito() {
    cart = [];
    localStorage.removeItem('cart');
    mostrarCarrito();
    updateCartSummary();
    alert('Carrito vaciado.');
}

updateCartSummary();
mostrarCarrito();
