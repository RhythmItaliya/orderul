let allOrders = [];

function jayshreekrishn() {
    $.ajax({
        url: 'http://localhost:8080/all/orders',
        method: 'GET',
        success: function (res) {
            allOrders = res;
            allOrders = res.filter(order => order.isActive === false);
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

        orders.forEach((order) => {
            kitchenOrderDisplay += `
                <table class="col-12 table table-bordered table-striped mt-4">
                    <thead>
                        <tr class="text-center">
                            <th>Table number : <span>${order.tableNumber}</span> </th>
                            <td class="text-center">
                                <button class="btn btn-warning rounded-2 markAsReady" data-uuid="${order.uuid}">Done</button>
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

$(document).ready(function () {
    jayshreekrishn();
});

$('#redirectpopup').click(function () {
    alert('Order sent successfully...');
    window.location.href = "/table.html";
    jayshreekrishn();
});


$(document).on('click', '.markAsReady', function (e) {
    e.preventDefault();
    const uuid = $(this).data('uuid');
    console.log('UUID:', uuid);
    markOrderAsReady(uuid);
});

function markOrderAsReady(uuid) {
    $.ajax({
        url: `http://localhost:8080/orders/markready/${uuid}`,
        method: 'PUT',
        success: function () {
            alert('Order marked as ready successfully');
            jayshreekrishn();
        },
        error: function (error) {
            console.error('Error:', error);
            alert('Failed to mark order as ready');
        },   
    });
}