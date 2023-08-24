const items = {};

function updateItemDetails(itemKey) {
    const itemNameDisplay = document.getElementById("itemNameDisplay");
    const itemQuantityDisplay = document.getElementById("itemQuantityDisplay");
    const checkbox = document.querySelector(`[onchange="updateItemDetails('${itemKey}')"]`);

    if (checkbox.checked) {
        const itemLabel = checkbox.parentElement.nextElementSibling.querySelector("label");
        const itemQuantityInput = checkbox.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("input[type='number']");

        items[itemKey] = {
            name: itemLabel.textContent,
            quantity: itemQuantityInput.value
        };

        // Update display
        updateDisplay();
    } else {
        delete items[itemKey];

        // Update display
        updateDisplay();
    }
}

function updateDisplay() {
    let itemNameContent = "";
    let itemQuantityContent = "";

    for (const key in items) {
        itemNameContent += `<div>${items[key].name}</div>`;
        itemQuantityContent += `<div>x ${items[key].quantity}</div>`;
    }

    const itemNameDisplay = document.getElementById("itemNameDisplay");
    const itemQuantityDisplay = document.getElementById("itemQuantityDisplay");

    itemNameDisplay.innerHTML = itemNameContent;
    itemQuantityDisplay.innerHTML = itemQuantityContent;
}
