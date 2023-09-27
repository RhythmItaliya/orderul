$.ajax({
    url: 'http://localhost:8080/all/menuitem',
    success: function (res) {
        let itemList = '';
        let itemNo = 0;

        res.forEach((menuItem) => {
            itemNo++;
            itemList +=
                `<div id="allorderitem" class="gap-2 p-3  d-flex border-bottom-main" data-id="${menuItem.id}" data-price="${menuItem.itemPrice}">
                <div class="rounded-2 main1">
                    <input type="checkbox" class="w-100 mt-2 menuitem">
                </div>
                <div class="rounded-2 main2 overflow-x-hidden user-select-none">
                    <label for="" class="w-100 rounded-2 p-2 d-inline-block w-100">${menuItem.name}&nbsp&nbsp - &nbsp₹${menuItem.itemPrice}</label>
                </div>
                <div class="rounded-2 text-center main3" data-item="item user-select-none" data-value="-1">
                    <span class="plus-minus">
                        <svg class="mt-3" xmlns="http://www.w3.org/2000/svg" height="0.6em"
                            viewBox="0 0 448 512">
                            <path
                                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                        </svg>
                    </span>
                </div>
                <div class="rounded-2 text-center user-select-none main4">
                    <input type="number" class="text-center rounded-2 w-100 item-quantity"
                        min="0" max="30" value="1">
                </div>
                <div class="rounded-2 text-center user-select-none main3" data-item="item" data-value="1">
                    <span class="plus-minus"><svg class="mt-3"
                            xmlns="http://www.w3.org/2000/svg" height="0.6em"
                            viewBox="0 0 448 512">
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                    </span>
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
        res.forEach((category) => {
            options += `<option value="${category.id}">${category.name}</option>`;
        });
        $('#orderAllcategroy').html(options);
    },
    error: function () {
        alert('Failed to fetch categories.');
    },
});

// const itemnulist = []; $('.menuitem').change(function () {
//     if ($(this).prop('checked')) {
//         let itemid = $(this).parent().parent().data('id');
//         let price = $(this).parent().parent().data('price');
//         let qty = $(this).parent().parent().children()[3].childNodes[1].value;
//         itemnulist['item-' + itemid] = { price: price, qty: qty };
//     }
// });