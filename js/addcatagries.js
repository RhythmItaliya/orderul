$('#btnCategory').click(function () {
    let categoryName = $('#categoryName').val();

    const addCategory = {
        name: categoryName,
    };

    if (!categoryName) {
        alert('Please Add categoties....');
    }
    $.ajax({
        url: 'http://localhost:8080/categoties',
        method: 'POST',
        data: JSON.stringify(addCategory),
        contentType: 'application/json',
        success: function (res) {
            alert('categoties has been successfully...');
            return false;
        },
        error: function () {
            if (value.status == 403) {
                alert('Please Add categoties....');
                return false;
            }
        },
    });
});


