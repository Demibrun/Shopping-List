let itemList = JSON.parse(localStorage.getItem('itemList')) || [];
    let table = document.getElementById('item-list');
    let totalElement = document.getElementById('total');
    function updateTable() {
        table.innerHTML = '';
        let total = 0;
        itemList.forEach((item, index) => {
            const row = table.insertRow(index);
            row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.quantity}</td>
    <td>$${item.price}</td>
    <td><button onclick="editItem(${index})">Edit</button></td>
    <td><button onclick="deleteItem(${index})">Delete</button></td>
    `;
            total += item.quantity * item.price;
        });
        totalElement.textContent = `Total: $${total}`;
        // Save itemList to localStorage
        localStorage.setItem('itemList', JSON.stringify(itemList));
    }
    function addItem() {
        let itemInput = document.getElementById('item');
        let quantityInput = document.getElementById('quantity');
        let priceInput = document.getElementById('price');
        let name = itemInput.value.trim();
        let quantity = parseInt(quantityInput.value);
        let price = parseFloat(priceInput.value);
        if (name && !isNaN(quantity) && !isNaN(price) && quantity > 0 && price > 0) {
            itemList.push({ name, quantity, price });
            updateTable();
            itemInput.value = '';
            quantityInput.value = '';
            priceInput.value = '';
        }
    }
    function editItem(index) {
        let item = itemList[index];
        let newName = prompt('Edit Item Name:', item.name);
        let newQuantity = parseInt(prompt('Edit Quantity:', item.quantity));
        let newPrice = parseFloat(prompt('Edit Price:', item.price));
        if (newName && !isNaN(newQuantity) && !isNaN(newPrice) && newQuantity > 0 &&
            newPrice > 0) {
            item.name = newName;
            item.quantity = newQuantity;
            item.price = newPrice;
            updateTable();
        }
    }
    function deleteItem(index) {
        itemList.splice(index, 1);
        updateTable();
    }