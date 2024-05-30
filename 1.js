document.addEventListener('DOMContentLoaded', function() {
    const paymentMethodLabels = document.querySelectorAll('.payment-options label');
    const paymentDetailsContainer = document.getElementById('payment-details');
    const defaultPaymentDetails = document.getElementById('default-details');
    const gcashPaymentDetails = document.getElementById('gcash-details');
    const codPaymentDetails = document.getElementById('cod-details');
    const paypalPaymentDetails = document.getElementById('paypal-details');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const addressSelect = document.getElementById('address-select');
    const checkoutButton = document.querySelector('.checkout');
    const paymentIcons = document.querySelectorAll('.payment-options label');

    // Initially hide GCash, COD, and PayPal details
    gcashPaymentDetails.style.display = 'none';
    codPaymentDetails.style.display = 'none';
    paypalPaymentDetails.style.display = 'none';

    // Set Visa as default payment method and activate its icon
    showDetails(defaultPaymentDetails);
    activatePaymentMethod('visa');

    // Event listener for payment method click
    paymentMethodLabels.forEach(function(label) {
        label.addEventListener('click', function() {
            const selectedMethod = label.getAttribute('for').replace('payment-method-', '');
            showPaymentDetails(selectedMethod);
            activatePaymentMethod(selectedMethod);
            updateCheckoutButtonState(); // Update checkout button state after selecting payment method
        });
    });

    // Helper function to show selected payment details
    function showPaymentDetails(selectedMethod) {
        switch (selectedMethod) {
            case 'default':
                showDetails(defaultPaymentDetails);
                break;
            case 'gcash':
                showDetails(gcashPaymentDetails);
                break;
            case 'cod':
                showDetails(codPaymentDetails);
                break;
            case 'paypal':
                showDetails(paypalPaymentDetails);
                break;
            default:
                showDetails(defaultPaymentDetails);
                break;
        }
    }

    // Helper function to show the selected details and hide others
    function showDetails(selectedDetails) {
        [defaultPaymentDetails, gcashPaymentDetails, codPaymentDetails, paypalPaymentDetails].forEach(function(details) {
            details.style.display = details === selectedDetails ? 'block' : 'none';
        });
    }

    // Function to update checkout button state based on payment details and address selection
    function updateCheckoutButtonState() {
        const selectedAddress = addressSelect.value;
        let paymentDetailsFilled = false;

        // Validate payment details based on selected payment method
        if (defaultPaymentDetails.style.display === 'block') {
            paymentDetailsFilled = validateDefaultPaymentDetails();
        } else if (gcashPaymentDetails.style.display === 'block') {
            paymentDetailsFilled = validateGCashPaymentDetails();
        } else if (codPaymentDetails.style.display === 'block') {
            paymentDetailsFilled = validateCODPaymentDetails();
        } else if (paypalPaymentDetails.style.display === 'block') {
            paymentDetailsFilled = validatePayPalPaymentDetails();
        }

        // Enable or disable checkout button based on validation
        if (paymentDetailsFilled && selectedAddress) {
            checkoutButton.disabled = false;
            checkoutButton.classList.remove('disabled');
        } else {
            checkoutButton.disabled = true;
            checkoutButton.classList.add('disabled');
        }

        // Update active state of payment icons
        updateActivePaymentIcon();
    }

    // Function to activate the selected payment method icon
    function activatePaymentMethod(method) {
        paymentIcons.forEach(function(icon) {
            if (icon.id === `payment-method-${method}`) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    }

    // Function to update active state of payment icons
    function updateActivePaymentIcon() {
        paymentIcons.forEach(function(icon) {
            const method = icon.id.replace('payment-method-', '');
            if (paymentDetailsContainer.querySelector(`#${method}-details`).style.display === 'block') {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    }

    // Quantity button click event
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('quantity-btn')) {
            const btn = event.target;
            const action = btn.getAttribute('data-action');
            const item = btn.closest('.cart-item');
            const quantityElement = item.querySelector('.quantity-text');
            let quantity = parseInt(quantityElement.textContent);

            if (action === 'decrease' && quantity > 1) {
                quantity--;
            } else if (action === 'increase') {
                quantity++;
            }

            quantityElement.textContent = quantity;
            item.setAttribute('data-quantity', quantity);
            const price = parseFloat(item.getAttribute('data-price'));
            const amountElement = item.querySelector('.amount');
            const amount = price * quantity;
            amountElement.textContent = `$${amount.toFixed(2)}`;

            // Update total after changing quantity
            updateCartTotal();
        }

        if (event.target.classList.contains('delete-btn')) {
            const item = event.target.closest('.cart-item');
            item.remove();
            updateCartTotal();
        }
    });

    // Checkout button click event
    checkoutButton.addEventListener('click', function() {
        const selectedAddress = addressSelect.value;
        let paymentDetailsFilled = false;

        // Validate payment details based on selected payment method
        if (defaultPaymentDetails.style.display === 'block') {
            paymentDetailsFilled = validateDefaultPaymentDetails();
        } else if (gcashPaymentDetails.style.display === 'block') {
            paymentDetailsFilled = validateGCashPaymentDetails();
        } else if (codPaymentDetails.style.display === 'block') {
            paymentDetailsFilled = validateCODPaymentDetails();
        } else if (paypalPaymentDetails.style.display === 'block') {
            paymentDetailsFilled = validatePayPalPaymentDetails();
        }

        // Check if payment details are filled
        if (!paymentDetailsFilled) {
            alert('Please fill out all payment details.');
            return;
        }

        // Check if address is selected
        if (!selectedAddress) {
            alert('Please select an address before proceeding.');
            return;
        }

        // Get and display total amount
        const totalAmount = updateCartTotal();

        // Alert based on payment method
        if (gcashPaymentDetails.style.display === 'block') {
            alert(`Your order totaling $${totalAmount.toFixed(2)} will be shipped to: ${selectedAddress}. Please check your GCash app for further payment confirmation.`);
        } else if (paypalPaymentDetails.style.display === 'block') {
            alert(`Your order totaling $${totalAmount.toFixed(2)} will be shipped to: ${selectedAddress}. Please check your email for further payment confirmation.`);
        } else {
            const receiverName = document.getElementById('receiver-name').value.trim();
            const receiverNumber = document.getElementById('receiver-number').value.trim();

            alert(`Your order totaling $${totalAmount.toFixed(2)} will be shipped to: ${selectedAddress}. Please make sure that your phone number ${receiverNumber} is active. Thank you!`);
        }

        // Clear payment details
        clearPaymentDetails();

        // Reset the cart after checkout
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(function(item) {
            item.remove();
        });
        updateCartTotal();

        // Reset payment method to default (Visa)
        showDetails(defaultPaymentDetails);
        activatePaymentMethod('visa');
    });

    // Function to clear payment details
    function clearPaymentDetails() {
        const defaultInputs = defaultPaymentDetails.querySelectorAll('input');
        defaultInputs.forEach(function(input) {
            input.value = '';
        });

        const gcashInputs = gcashPaymentDetails.querySelectorAll('input');
        gcashInputs.forEach(function(input) {
            input.value = '';
        });

        const codInputs = codPaymentDetails.querySelectorAll('input');
        codInputs.forEach(function(input) {
            input.value = '';
        });

        const paypalInputs = paypalPaymentDetails.querySelectorAll('input');
        paypalInputs.forEach(function(input) {
            input.value = '';
        });
    }

    // Function to validate default payment details
    function validateDefaultPaymentDetails() {
        const cardNumber = document.getElementById('card-number').value.trim();
        const expirationDate = document.getElementById('expiration-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        const name = document.getElementById('name').value.trim();

        if (!cardNumber || !expirationDate || !cvv || !name) {
            return false;
        }
        return true;
    }

    // Function to validate GCash payment details
    function validateGCashPaymentDetails() {
        const gcashNumber = document.getElementById('gcash-number').value.trim();

        if (!gcashNumber) {
            return false;
        }
        return true;
    }

    // Function to validate COD payment details
    function validateCODPaymentDetails() {
        const receiverName = document.getElementById('receiver-name').value.trim();
        const receiverNumber = document.getElementById('receiver-number').value.trim();

        if (!receiverName || !receiverNumber) {
            return false;
        }
        return true;
    }

    // Function to validate PayPal payment details
    function validatePayPalPaymentDetails() {
        const paypalEmail = document.getElementById('paypal-email').value.trim();

        if (!paypalEmail) {
            return false;
        }
        return true;
    }

    // Function to update cart total
    function updateCartTotal() {
        let total = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(function(item) {
            const quantity = parseInt(item.getAttribute('data-quantity'));
            const price = parseFloat(item.getAttribute('data-price'));
            total += price * quantity;
        });
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        return total;
    }

    // Update checkout button state on page load
    updateCheckoutButtonState();

    // Event listener for address selection change
    addressSelect.addEventListener('change', updateCheckoutButtonState);
});