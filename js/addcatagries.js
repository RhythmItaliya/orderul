function loadCategories() {
    $.ajax({
        url: 'http://localhost:8080/all/categories',
        success: function (res) {
            let categoryList = '';

            res.forEach(category => {
                categoryList += `<div>
                    <ul class="list-group mt-3">
                        <li class="list-group-item d-flex" data-uuid="${category.uuid}">
                            <div class="col-10">${category.name}</div>
                            <div class="col-2 text-center text-info">
                                <a href="#" class="text-primary update-category">Edit</a> &nbsp; | &nbsp; 
                                <a href="#" class="text-danger delete-category">Delete</a>
                            </div>
                        </li>
                    </ul>
                </div>`;
            });

            $('#categoriesList').html(categoryList);
        },
        error: function () {
            alert('Failed to fetch categories.');
        },
    });
}

// Add a click event handler for deleting categories
$('#categoriesList').on('click', '.delete-category', function (e) {
    e.preventDefault();

    const listItem = $(this).closest('.list-group-item');
    const categoryUuid = listItem.data('uuid');

    if (confirm('Are you sure you want to delete this category?')) {
        $.ajax({
            url: `http://localhost:8080/up/menucategories/delete/` + categoryUuid,
            method: 'DELETE',
            success: function () {
                alert('Category has been successfully deleted.');
                listItem.remove();
            },
            error: function () {
                alert('Failed to delete the category.');
            },
        });
    }
});

$('#categoriesList').on('click', '.update-category', function (e) {
    e.preventDefault();

    const listItem = $(this).closest('.list-group-item');
    const categoryUuid = listItem.data('uuid');
    const updatedName = prompt('Enter the updated category name:', listItem.find('.col-10').text().trim());

    if (updatedName !== null) {
        const updatedData = {
            name: updatedName,
        };

        $.ajax({
            url: `http://localhost:8080/up/menucategories/update/` + categoryUuid,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: function () {
                alert('Category has been updated successfully.');
                loadCategories();
            },
            error: function () {
                alert('Category update failed.');
            },
        });
    }
});

$('#btnCategory').click(function () {
    let categoryname = $('#categoryName').val();

    const categoryData = {
        name: categoryname,
    };

    if (!categoryname) {
        alert('Please fill in the field.');
        return false;
    }

    $.ajax({
        url: 'http://localhost:8080/add/categories',
        method: 'POST',
        data: JSON.stringify(categoryData),
        contentType: 'application/json',
        success: function (res) {
            alert('Category has been successfully added.');
            $('#categoryName').val('');
         
            loadCategories();
        },
        error: function () {
            alert('Failed to add the category.');
        },
    });
});

loadCategories();
