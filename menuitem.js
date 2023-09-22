$('#btnmenuitem').click(function () {
    let menuitemName = $('#menuItemName').val();
    let itemPrice = $('#itemPrice').val();
    let menuCategory = $('#menuCategory').val()

    const additemname = {
        name: menuitemName,
        itemPrice: itemPrice,
        categoryId: menuCategory
    };

    if (!menuitemName || !itemPrice || !menuCategory) {
        alert('Please Add itemname....');
    }

    $.ajax({
        url: 'http://localhost:8080/itemname',
        method: 'POST',
        data: JSON.stringify(additemname),
        contentType: 'application/json',
        success: function () {
            alert('itemname has been successfully...');
            return false;
        },
        error: function () {
            if (value.status == 403) {
                alert('Please Add itemname....');
                return false;
            }
        },
    });
});
