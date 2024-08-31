document.addEventListener('DOMContentLoaded', function() {
    // Array to store cart items
    let cartItems = [];

    // Function to update the cart count
    function updateCartCount() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.innerHTML = `<i class="fas fa-shopping-bag"></i> ${cartItems.reduce((total, item) => total + item.quantity, 0)}`;
    }

    // Function to show the checkout modal
    function showCheckoutModal() {
        // Save cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Redirect to checkout.html
        window.location.href = 'checkout.html';
    }

    // Event listener for adding items to the cart
    document.querySelector('.add-to-cart').addEventListener('click', () => {
        const productName = document.querySelector('.product-title').textContent;
        const productImage = document.getElementById('main-image').src;
        const productPrice = 28.00; // Replace with the actual price if dynamic
        const productSize = document.getElementById('size').value; // Get the selected size

        const existingItem = cartItems.find(item => item.name === productName && item.size === productSize);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name: productName, image: productImage, price: productPrice, size: productSize, quantity: 1 });
        }

        updateCartCount();
        alert(`${productName} (${productSize}) has been added to your cart!`);
    });

    // Event listener for the cart icon
    document.querySelector('.cart-icon').addEventListener('click', showCheckoutModal);
});
