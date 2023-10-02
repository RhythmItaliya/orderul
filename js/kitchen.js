let allOrders = [];

function jayshreekrishn() {
    $.ajax({
        url: 'http://localhost:8080/all/orders',
        method: 'GET',
        success: function (res) {
            allOrders = res;
            displayOrders(allOrders);
        },
        error: function () {
            alert('Failed to fetch orders.');
        },
    });
}

function displayOrders(orders) {
    if (orders.length > 0) {
        let kitchenOrderDisplay = '';

        orders.forEach((order, index) => {
            kitchenOrderDisplay += `
                <table class="col-12 table table-bordered table-striped mt-4">
                    <thead>
                        <tr class="text-center">
                        <th>Table number : <span>${order.tableNumber}</span> </th>
                            <td class="text-center">
                                <button class="btn btn-warning rounded-2" onclick="markOrderAsReady(${index})">Done</button>
                            </td>
                        </tr>
                    </thead>
                    <thead>
                        <tr class="text-center">
                            <th><span>Item Name</span></th>
                            <th><span>Quantity</span></th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            order.items.forEach((item) => {
                kitchenOrderDisplay += `
                    <tr>
                        <td class="text-center">${item.name}</td>
                        <td class="text-center">${item.qty}</td>
                    </tr>
                `;
            });

            kitchenOrderDisplay += '</tbody></table>';
        });

        $('#kitchenedisplay').html(kitchenOrderDisplay);
    } else {
        $('#kitchenedisplay').html('<p>No orders available</p>');
    }
}

function markOrderAsReady(index) {
    allOrders.splice(index, 1);
    displayOrders(allOrders);
    alert('Order is ready');
}

$('#redirectpopup').click(function () {
    alert('Order sent...');
    window.location.href = "/table.html";
    jayshreekrishn();
});

jayshreekrishn();
