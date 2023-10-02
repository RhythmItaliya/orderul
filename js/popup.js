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