document.addEventListener("DOMContentLoaded", function() {
    // Retrieve cart items from local storage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // Get the tbody element where cart items will be rendered
    
    const tbody = document.querySelector("#cart tbody");
    let totalQuantity = 0
    // Loop through each cart item and render it in the table
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.dataset.itemId = item.id;
        totalQuantity = totalQuantity+item.quantity
        row.innerHTML = `
            <td><button class="delete-btn"><i class="fa-regular fa-circle-xmark"></i></button></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" value="${item.quantity}"></td>
            <td>#${item.price}</td>
        `;
        tbody.appendChild(row);
    });
    const lgBagSpan = document.querySelector("#lg-bag span");
    lgBagSpan.textContent = totalQuantity.toString();

    const table = document.querySelector("#subtotal table")

    table.innerHTML = `
    <tr>
                    <td>Cart Subtotal</td>
                    <td>$${calculateSubtotal(cart).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>Free</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>${calculateSubtotal(cart).toFixed(2)}</strong></td>
                </tr>`
                function calculateSubtotal(cart) {
                    return cart.reduce((total, item) => {
                        const price = parseFloat(item.price.replace('$', ''));
                        return total + (price * item.quantity)}, 0);
                }
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Get the parent row of the button
            const row = this.closest("tr");

            const itemId = row.dataset.itemId;

            // Remove the row from the table
            row.remove();

            // Add the item to deletedItems in local storage
            addToLocalStorage(itemId);

            // Remove deleted items from cart
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem("cart", JSON.stringify(cart));

            // Perform any other actions you need (e.g., update total)
            alert("Item removed from cart.");
        });
    });
    
});

// Function to extract item details from a table row
function getItemDetailsFromRow(row) {
    const cells = row.querySelectorAll("td");
    const itemDetails = {
        id: row.dataset.itemId,
        image: cells[1].querySelector("img").src,
        product: cells[2].textContent,
        price: cells[3].textContent,
        quantity: cells[4].querySelector("input").value
    };
    return itemDetails;
}

function addToLocalStorage(itemId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Remove the item from the cart
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cart));
}