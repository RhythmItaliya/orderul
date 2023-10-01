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
        alert('Failed to fetch categories.');
    },
});

function displayOrders(orders) {
    if (orders.length > 0) {
        let kitchenOrderDisplay = '';

        orders.map((order) => {
            kitchenOrderDisplay += `
            <table class="col-12 table table-bordered table-striped mt-4">
                        <thead>
                        <tr class="text-center">
                            <th>Table number : <span id="tableName"</span> </th>
                            <th class="text-center" colspan="2">
                                <button class="btn btn-warning rounded-2">Print Bill</button>
                            </th>
                        </tr>
                            <tr class="text-center">
                                <th><span>Items name</span></th>
                                <th><span>Quantity</span></th>
                            </tr>
                        </thead>
                        
                        <tbody>

                        </tbody>
                        <tfoot>
                        <tr>
                            <td class="text-center fw-bold">Total Price:</td>
                            <td class="text-center"><span>50$</span></td>
                        </tr>
                    </tfoot>

            `;
            order.items.map((item) => {
                kitchenOrderDisplay += `
                    <tr class="text-center">
                        <td><span>${item.name}</span></td>
                        <td><span>${item.qty}</span></td>
                    </tr>
                `;
            });

            kitchenOrderDisplay += '</table>'
            ;
        });

        $('#billdisplay').html(kitchenOrderDisplay);
    } else {
        $('#billdisplay').html('<p>No orders available</p>');
    }
}


harharmahadev();

