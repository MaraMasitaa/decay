document.addEventListener('DOMContentLoaded', function() {
    // Select all thumbnail images
    const thumbnails = document.querySelectorAll('.thumbnail');
    // Select the main image element
    const mainImage = document.getElementById('main-image');
    
    // Add a click event listener to each thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Change the source of the main image to the source of the clicked thumbnail
            mainImage.src = this.src;
        });
    });

    // Array to store cart items
    let cartItems = [];

    // Function to update the cart count
    function updateCartCount() {
        const cartIcon = document.querySelector('.cart-icon');
        // Update the cart icon with the item count
        cartIcon.innerHTML = `<i class="fas fa-shopping-bag"></i> ${cartItems.reduce((total, item) => total + item.quantity, 0)}`;
    }

    // Function to show the checkout modal
    function showCheckoutModal() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = 0;
        modalOverlay.style.left = 0;
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.zIndex = 999;

        // Create modal container
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#333';
        modal.style.padding = '20px';
        modal.style.borderRadius = '5px';
        modal.style.color = 'white';
        modal.style.zIndex = 1000;

        // Create list of items with images, names, and quantities
        const itemList = document.createElement('ul');
        let totalPrice = 0;
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';
            listItem.style.marginBottom = '10px';

            // Product image
            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.style.width = '50px';
            itemImage.style.height = '50px';
            itemImage.style.marginRight = '10px';
            itemImage.style.border = '1px solid #fff';

            // Product details
            const itemDetails = document.createElement('span');
            itemDetails.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)} each`;

            // Calculate total price for this item
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            listItem.appendChild(itemImage);
            listItem.appendChild(itemDetails);
            itemList.appendChild(listItem);
        });
        modal.appendChild(itemList);

        // Display total price
        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        totalPriceElement.style.marginTop = '10px';
        modal.appendChild(totalPriceElement);

        // Add a checkout button
        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Checkout';
        checkoutButton.style.marginTop = '10px';
        checkoutButton.style.padding = '10px 20px';
        checkoutButton.style.cursor = 'pointer';
        checkoutButton.addEventListener('click', () => {
            showQRCodeModal();
        });
        modal.appendChild(checkoutButton);

        // Add a close button to the modal
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
            document.body.removeChild(modal);
        });
        modal.appendChild(closeButton);

        document.body.appendChild(modalOverlay);
        document.body.appendChild(modal);
    }

    // Function to show the QR code modal
    function showQRCodeModal() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = 0;
        modalOverlay.style.left = 0;
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.zIndex = 999;

        // Create modal container
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#333';
        modal.style.padding = '20px';
        modal.style.borderRadius = '5px';
        modal.style.color = 'white';
        modal.style.zIndex = 1000;
        modal.style.textAlign = 'center';

        // Create QR code image
        const qrImage = document.createElement('img');
        qrImage.src = './img/ABA.jpg'; // Replace with your QR code image path
        qrImage.style.width = '200px';
        qrImage.style.height = '200px';
        qrImage.style.marginBottom = '20px';
        modal.appendChild(qrImage);

        // Create instruction text
        const instructionText = document.createElement('p');
        instructionText.textContent = 'Scan the QR code to complete the payment. Once scanned, click OK to proceed.';
        modal.appendChild(instructionText);

        // Add an OK button
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.marginTop = '10px';
        okButton.style.padding = '10px 20px';
        okButton.style.cursor = 'pointer';
        okButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
            document.body.removeChild(modal);
            window.location.href = 'https://www.instagram.com/direct/t/17843113272279213?hl=en'; // Replace with your Telegram channel or bot link
        });
        modal.appendChild(okButton);

        // Add a close button to the QR code modal
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
            document.body.removeChild(modal);
        });
        modal.appendChild(closeButton);

        document.body.appendChild(modalOverlay);
        document.body.appendChild(modal);
    }

    // Add event listener to the "Add to Cart" button
    document.querySelector('.add-to-cart').addEventListener('click', () => {
        const productName = document.querySelector('.product-title').textContent;
        const productImage = document.getElementById('main-image').src;
        const productPrice = 28.00; // Replace with the actual price if dynamic

        // Check if the item is already in the cart
        const existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Store the product name, image, price, and quantity in the cart
            cartItems.push({ name: productName, image: productImage, price: productPrice, quantity: 1 });
        }

        updateCartCount();
        alert(`${productName} has been added to your cart!`);
    });

    // Add event listener to the cart icon to show the checkout modal
    document.querySelector('.cart-icon').addEventListener('click', showCheckoutModal);
});
