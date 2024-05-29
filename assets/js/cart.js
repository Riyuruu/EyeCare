document.addEventListener("DOMContentLoaded", function () {
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  var cartContainer = document.querySelector(".cart");

  function renderCart() {
    cartContainer.innerHTML = "";
    cartItems.forEach(function (item) {
      var cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <div class="item-details">
                    <h3>${item.productName}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            `;
      cartContainer.appendChild(cartItem);
    });

    var subtotal = cartItems.reduce(function (acc, item) {
      return acc + item.price * item.quantity;
    }, 0);
    document.querySelector(
      ".subtotal-amount"
    ).textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector(".total-amount").textContent = `$${subtotal.toFixed(
      2
    )}`;
  }

  renderCart();
});
