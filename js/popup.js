function jaishreeram() {
    $.ajax({
        url: 'http://localhost:8080/all/orders',
        method: 'GET',
        success: function (res) {
            if (res.length > 0) {
                const lastOrder = res[res.length - 1];
                let itemNameDisplaypopup = '';
                let itemQuantityDisplaypopup = '';

                lastOrder.items.forEach((item) => {
                    itemNameDisplaypopup += `
                        <div class="p-2">${item.name}</div>
                        </div>`;
                    itemQuantityDisplaypopup +=
                        `<div>
                    <div class="p-2">${item.qty}</div>
                    </div>`;
                });

                $('#itemNameDisplaypopup').html(itemNameDisplaypopup);
                $('#itemQuantityDisplaypopup').html(itemQuantityDisplaypopup);

            } else {
                $('#itemNameDisplaypopup').html('No orders available');
                $('#itemQuantityDisplaypopup').html('');
            }
        },
        error: function () {
            alert('Failed to fetch orders.');
        },
    });
}

jaishreeram();


// let tableNumber = '';
// const currentUrl = window.location.href;
// const uuidRegex = /uuid=([0-9a-fA-F-]+)/;
// const match = currentUrl.match(uuidRegex);
// const uuid = match ? match[1] : null;
// if (uuid) {
//     $.ajax({
//         url: 'http://localhost:8080/all/tables',
//         method: 'GET',
//         async: false,
//         success: function (data) {
//             const filteredData = data.filter(item => item.uuid === uuid);
//             (filteredData.length > 0)
//             const tableName = filteredData[0].table;
//             tableNumber = tableName;
//             displayOrders(orders);
//         },
//     });
// }
// console.log(tableNumber);