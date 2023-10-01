$('#btnmenuitem').click(function () {

    const itemName = $('#itemName').val();
    const itemPrice = $('#itemPrice').val();
    const categoryId = $('#optionmenuCategorylist').val();

    if (!itemName || !itemPrice || !categoryId) {
        alert('Please fill in all fields.');
        return;
    }

    const itemData = {
        name: itemName,
        categoryId: categoryId,
        itemPrice: itemPrice,
    };

    $.ajax({
        url: 'http://localhost:8080/add/menuitem',
        method: 'POST',
        data: JSON.stringify(itemData),
        contentType: 'application/json',
        success: function (res) {
            alert('Menu item has been successfully added.');
            loadMenuitems();
            $('#itemName').val('');
            $('#itemPrice').val('');
        },
        error: function () {
            alert('Failed to add menu item.');
        },
    });
});


$.ajax({
    url: 'http://localhost:8080/all/categories',
    method: 'GET',
    success: function (res) {
        let options = '<option value="">Select Category</option>';
        res.forEach((category) => {
            options += `<option value="${category.id}">${category.name}</option>`;
        });
        $('#optionmenuCategorylist').html(options);
    },
    error: function () {
        alert('Failed to fetch categories.');
    },
});

function loadMenuitems() {
$.ajax({
    url: 'http://localhost:8080/all/menuitem',
    success: function (res) {
        let itemList = '';
        let itemNo = 0;

        res.map((menuItem) => {
            itemNo++;
            itemList += `
          <div>
            <ul class="list-group mt-3">
            <li class="list-group-item d-flex" data-uuid="${menuItem.uuid}">
                <div class="col-10">${menuItem.name}&nbsp&nbsp - &nbsp${menuItem.itemPrice}₹</div>
                <div class="col-2 text-center text-info">
                     <a href="#" class="text-primary update-category">Edit</a> &nbsp; | &nbsp; 
                    <a href="#" class="text-danger delete-category">Delete</a>
                </div>
              </li>
            </ul>
          </div>
        `;
        });
        $('#menuitemlist').html(itemList);
    },
    error: function () {
        alert('Failed to fetch menu items.');
    },
});
}
loadMenuitems()


// Edit Menu Item
$('#menuitemlist').on('click', '.update-category', function () {
    const listItem = $(this).closest('.list-group-item');
    const uuid = listItem.data('uuid');
    const updatedName = prompt('Enter the updated item name:', listItem.find('.col-10').text().trim().split(' - ')[0].trim());
    const updatedPrice = prompt('Enter the updated item price:', listItem.find('.col-11').text().trim().split('-').pop().trim());

    if (updatedName !== null && updatedPrice !== null) {
        const updatedData = {
            name: updatedName,
            itemPrice: updatedPrice,
        };

        $.ajax({
            url: `http://localhost:8080/up/menuitem/update/` + uuid,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: function () {
                alert('Menu item has been updated successfully.');
                loadMenuitems();
            },
            error: function () {
                alert('Menu item update failed.');
            },
        });
    }
});


$('#menuitemlist').on('click', '.delete-category', function() {
    const listItem = $(this).closest('.list-group-item');
    const uuid = listItem.data('uuid');

    if (confirm('Are you sure you want to delete this category?')) {
        $.ajax({
            url: `http://localhost:8080/menuitem/delete/` + uuid,
            method: 'DELETE',
            success: function () {
                alert('Category has been deleted successfully.');
                loadMenuitems();
            },
            error: function () {
                alert('Category delete failed.');
            },
        });
    }
});
