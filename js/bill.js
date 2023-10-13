let allOrders1 = [];

function harharmahadev() {
    $.ajax({
        url: 'http://localhost:8080/all/orders',
        method: 'GET',
        success: function (res) {
            allOrders1 = res;
            displayOrders(allOrders1);
        },
        error: function () {
            alert('Failed to fetch orders.');
        },
    });
}

$.ajax({
    url: 'http://localhost:8080/all/tables',
    method: 'GET',
    success: function (res) {
        var options = '';
        res.map((bill) => {
            options += `<option value="${bill.uuid}">Table ${bill.table}</option>`;
        });
        $('#billSelect1').html(options);
    },
    error: function () {
        alert('Failed to fetch tables.');
    },
});

function displayOrders(orders) {
    if (orders.length > 0) {
        let kitchenOrderDisplay = '';
        orders.forEach((order) => {
            kitchenOrderDisplay += `
                <table class="col-12 table table-bordered table-striped mt-4">
                    <thead>
                        <tr class="text-center">
                            <th>Table number : <span id="tableName">${order.tableNumber}</span> </th>
                            <th class="text-center" colspan="2">
                                <button class="btn btn-warning rounded-2 printbill" data-uuid="${order.uuid}">Print Bill</button>
                            </th>
                        </tr>
                        <tr class="text-center">
                            <th><span>Items name</span></th>
                            <th><span>Quantity</span></th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            order.items.forEach((item) => {
                kitchenOrderDisplay += `
                    <tr>
                        <td><span class="m-3">${item.name}</span></td>
                        <td class="text-center"><span>${item.qty}</span></td>
                    </tr>
                `;
            });

            // Calculate the total price based on order items and display it
            let totalPrice = calculateTotalPrice(order.items);
            kitchenOrderDisplay += `
                </tbody>
                <tfoot>
                    <tr>
                        <td class="text-center fw-bold">Total Price:</td>
                        <td class="text-center"><span>${totalPrice}$</span></td>
                    </tr>
                </tfoot>
                </table>`;
        });

        $('#billdisplay').html(kitchenOrderDisplay);
    } else {
        $('#billdisplay').html('<p>No orders available</p>');
    }
}


function calculateTotalPrice(items) {
    let totalPrice = 0;
    items.forEach((item) => {
        var price1 = item.name.split('-').pop().trim().replace('₹', '');
        totalPrice += price1 * item.qty;
    });
    return totalPrice;
}

harharmahadev();

$('#billdisplay').on('click', '.printbill', function () {
    const uuid = $(this).data('uuid');

    if (confirm('Are you sure you want to print this bill?')) {
        fetch(`http://localhost:8080/orders/delete/` + uuid, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert('Bill printed successfully.');
                    harharmahadev();
                } else {
                    alert('Bill printing failed.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Bill printing failed due to a network error.');
            });
    }
});

