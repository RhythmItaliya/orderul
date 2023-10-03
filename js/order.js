let tableNumber = '';
const currentUrl = window.location.href;
const uuidRegex = /uuid=([0-9a-fA-F-]+)/;
const match = currentUrl.match(uuidRegex);
const uuid = match ? match[1] : null;
if (uuid) {
    $.ajax({
        url: 'http://localhost:8080/all/tables',
        method: 'GET',
        async: false,
        success: function (data) {
            const filteredData = data.filter(item => item.uuid === uuid);
            (filteredData.length > 0)
            const tableName = filteredData[0].table;
            tableNumber = tableName;
        },
    });
}
console.log(tableNumber);

const urlParams = new URLSearchParams(window.location.search);
const uuid1 = urlParams.get('uuid');

$.ajax({
    url: 'http://localhost:8080/all/tables',
    method: 'GET',
    success: function (res) {
        var options = '';

        res.forEach((tablenu) => {
            if (tablenu.uuid === uuid1) {
                options += `<option value="${tablenu.uuid}" selected="selected">Table ${tablenu.table}</option>`;
            } else {
                options += `<option value="${tablenu.uuid}" hidden>Table ${tablenu.table}</option>`;
            }
        });

        $('#tableSelect').html(options);
    },
    error: function () {
        alert('Failed to fetch categories.');
    },
});

$.ajax({
    url: 'http://localhost:8080/all/menuitem',
    success: function (res) {
        let itemList = '';
        let itemNo = 0;

        res.map((menuItem) => {
            itemNo++;
            itemList +=
                `<div id="allorderitem" class="gap-2 p-3  d-flex border-bottom-main" data-id="${menuItem.id}" data-price="${menuItem.itemPrice}">
                    <div class="rounded-2 main1">
                        <input type="checkbox" class="w-100 mt-2 menuitem">
                    </div>
                    <div class="rounded-2 main2 overflow-x-hidden user-select-none">
                        <label for="" class="w-100 rounded-2 p-2 d-inline-block w-100">${menuItem.name}&nbsp&nbsp - &nbsp₹${menuItem.itemPrice}</label>
                    </div>
                    <div class="rounded-2 text-center main3" data-item="item user-select-none" data-value="-1" id="minus">
                        <span class="plus-minus">
                            <svg class="mt-3" xmlns="http://www.w3.org/2000/svg" height="0.6em" viewBox="0 0 448 512">
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </span>
                    </div>
                    <div class="rounded-2 text-center user-select-none main4">
                        <input type="number" class="text-center user-select-none rounded-2 w-100 item-quantity" min="0" max="30" value="1" id="num">
                    </div>
                    <div class="rounded-2 text-center user-select-none main3" data-item="item" data-value="1" id="plus">
                        <span class="plus-minus"><svg class="mt-3" xmlns="http://www.w3.org/2000/svg" height="0.6em" viewBox="0 0 448 512">
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg></span>
                    </div>
                </div>`;
        });
        $('#displayorderrecode').html(itemList);
    },
    error: function () {
        alert('Failed to fetch menu items.');
    },
});

$.ajax({
    url: 'http://localhost:8080/all/categories',
    method: 'GET',
    success: function (res) {
        let options = '<option value="">Select Category</option>';
        res.map((category) => {
            options += `<option value="${category.id}">${category.name}</option>`;
        });
        $('#orderAllcategroy').html(options);
    },
    error: function () {
        alert('Failed to fetch categories.');
    },
});

// display....
const itemnulist = {};
$(document).on('change', '.menuitem', function () {
    if ($(this).prop('checked')) {
        let itemid = $(this).parent().parent().data('id');
        let price = $(this).parent().parent().data('price');
        let qty = $(this).parent().parent().find('.item-quantity').val();
        let itemName = $(this).parent().parent().find('.main2 label').text();

        itemnulist[itemid] = { name: itemName, price: price, qty: qty };

        updateItemDisplay();

    } else {
        let itemid = $(this).parent().parent().data('id');
        delete itemnulist[itemid];

        updateItemDisplay();
    }
});

function updateItemDisplay() {
    let itemNameDisplay = '';
    let itemQuantityDisplay = '';

    for (let itemid in itemnulist) {
        let item = itemnulist[itemid];
        itemNameDisplay += `${item.name}<br>`;
        itemQuantityDisplay += `${item.qty}<br>`;
    }

    $('#itemNameDisplay').html(itemNameDisplay);
    $('#itemQuantityDisplay').html(itemQuantityDisplay);

}

$('#button22').click(function () {
    let requestData = {
        items: itemnulist,
        tableNumber: tableNumber
    };

    $.ajax({
        url: 'http://localhost:8080/add/orders',
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json',
        success: function () {
            window.location.href = `/popup.html?uuid=${uuid1}`;
            jaishreeram();
        },
        error: function (error) {
            console.error('Error');
        }
    });
});