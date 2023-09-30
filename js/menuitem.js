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
              <li class="list-group-item d-flex">
                <div class="col-11">${menuItem.name}&nbsp&nbsp - &nbsp${menuItem.itemPrice}₹</div>
                <div class="col-1 text-center text-decoration-underline text-info">
                  <a href="#">Delete</a>
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
