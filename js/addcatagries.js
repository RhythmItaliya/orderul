$('#btnCategory').click(function () {
    let categoryname = $('#categoryName').val();

    const loginData = {
        name: categoryname,
    };

    if (!categoryname) {
        alert('Plse fill the filed...');
        return false;
    }

    $.ajax({
        url: 'http://localhost:8080/add/categories',
        method: 'POST',
        data: JSON.stringify(loginData),
        contentType: 'application/json',
        success: function (res) {
            alert('categoties has been successfully...');
            return false;
        },
        error: function () {
            alert('categoties add failed');
            return false;
        },
    });
});

$.ajax({
    url: 'http://localhost:8080/all/categories',
    success: function (res) {
        ststring = '',
            stno = 0;
        res.map(r => {
            stno = stno + 1;
            ststring += `<div>
            <ul class="list-group mt-3">
                <li class="list-group-item d-flex ">
                    <div class="col-11">${r.name}</div>
                    <div class="col-1 text-center text-decoration-underline text-info">
                        <a href="#">Delete</a>
                    </div>
                </li>
            </ul>
        </div>`
        });
        $('#categoriesList').html(ststring);
    }
});