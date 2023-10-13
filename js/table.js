function loadTables() {
    $.ajax({
        url: 'http://localhost:8080/all/tables',
        method: 'GET',
        success: function (res) {

            let options = '';

            res.map((table) => {
                options += `
            <div>
            <ul class="list-group mt-3">
            <li class="list-group-item d-flex" data-uuid="${table.uuid}">
                <div class="col-11">Table ${table.table}</div>
                <div class="col-1 text-center text-decoration-underline text-info">
                <a href="#" class="delete-table">Delete</a>
            </div>
              </li>
            </ul>
          </div>`;
            });
            $('#tablemangelist').html(options);
        },
        error: function () {
            alert('Failed to fetch tables.');
        },
    });
}
loadTables();

$('#createTable').click(function () {
    let createTable = $('#tableNumber').val();
    const createData = {
        table: createTable,
    };

    $.ajax({
        url: 'http://localhost:8080/new/tables',
        method: 'POST',
        data: JSON.stringify(createData),
        contentType: 'application/json',
        data: JSON.stringify(createData),
        success: function (res) {
            const newTable = `
            <div class="col-md-2">
                <a href="/order.html?uuid=${res.uuid}">
                    <img src="./img/coffee-table.png" alt="" width="100" height="100" style="cursor: pointer;" class="custom-div user-select-none"> 
                </a>
                <h4 class="h4 user-select-none">Table ${res.table}</h4>
            </div>`;
            $('#abc').append(newTable);

            alert('Table created successfully.');
            loadTables();
        },
        error: function () {
            alert('Failed to create the table.');
        },
    });
});

$.ajax({
    url: 'http://localhost:8080/all/tables',
    method: 'GET',
    success: function (res) {

        let options = '';
        res.map((table) => {
            options += `
            <div class="col-md-2">
            <a href="/order.html?uuid=${table.uuid}">
                <img src="./img/coffee-table.png" alt="" width="100" height="100" style="cursor: pointer;" class="custom-div user-select-none"> 
            </a>
            <h4 class="h4 user-select-none"> Table ${table.table}</h4>
        </div>`;
        });
        $('#abc').html(options);
    },
    error: function () {
        alert('Failed to fetch tables.');
    },
});

$('#tablemangelist').on('click', 'a.delete-table', function (e) {
    e.preventDefault();

    const listItem = $(this).closest('.list-group-item');
    const tableUuid = listItem.data('uuid');

    if (confirm('Are you sure you want to delete this table?')) {
        $.ajax({
            url: `http://localhost:8080/up/tables/delete/${tableUuid}`,
            method: 'DELETE',
            success: function () {
                alert('Table has been successfully deleted.');
                listItem.remove();

                // Reload the table list after deletion
                loadTables();
            },
            error: function () {
                alert('Failed to delete the table.');
            },
        });
    }
});



