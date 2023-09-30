const itemnulist = {};

$('.menuitem').change(function () {
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