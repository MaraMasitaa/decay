document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to display cart items on the checkout page
    function displayCartItems() {
        const orderSummary = document.querySelector('.order-summary');
        let totalPrice = 0;

        // Clear previous order items
        orderSummary.innerHTML = '';

        cartItems.forEach(item => {
            // Create order item element
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';

            // Create item image
            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.name;
            itemImage.style.width = '80px';
            itemImage.style.borderRadius = '5px';

            // Create item details
            const itemDetails = document.createElement('div');
            const itemName = document.createElement('h3');
            itemName.textContent = item.name;
            const itemSize = document.createElement('p');
            itemSize.textContent = `Quantity: ${item.quantity}`;

            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemSize);

            // Create item price
            const itemPrice = document.createElement('p');
            itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

            // Append elements to order item
            orderItem.appendChild(itemImage);
            orderItem.appendChild(itemDetails);
            orderItem.appendChild(itemPrice);

            // Append order item to order summary
            orderSummary.appendChild(orderItem);

            // Calculate total price
            totalPrice += item.price * item.quantity;
        });

        // Calculate subtotal, shipping fee, and total
        const shippingFee = 2.00;
        const subtotal = totalPrice;
        const totalWithShipping = subtotal + shippingFee;

        // Update display
        document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `Shipping: $${shippingFee.toFixed(2)}`;
        document.getElementById('total').textContent = `Total: $${totalWithShipping.toFixed(2)}`;
    }

    displayCartItems();
});
