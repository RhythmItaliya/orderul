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
            const newTable = `<div class="col-md-2">
                <img src="./img/coffee-table.png" alt="" width="100" height="100" style="cursor: pointer;" class="custom-div user-select-none"> 
                <h2><a href="#" class="h4 user-select-none">Table ${res.table}</a></h2>
            </div>`;
            $('#abc').append(newTable);

            alert('Table created successfully.');
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
                    <img src="./img/coffee-table.png" alt="" width="100" height="100" style="cursor: pointer;" class="custom-div user-select-none"> 
                    <h2><a href="#" class="h4 user-select-none">Table ${table.table}</a></h2>
                </div>`;
        });
        $('#abc').html(options);
    },
    error: function () {
        alert('Failed to fetch tables.');
    },
});

$.ajax({
    url: 'http://localhost:8080/all/tables',
    method: 'GET',
    success: function (res) {
        
        let options = ''; 

        res.map((table) => {
            options += `
            <div>
            <ul class="list-group mt-3">
              <li class="list-group-item d-flex">
                <div class="col-11">Table ${table.table}</div>
                <div class="col-1 text-center text-decoration-underline text-info">
                  <a href="#">Delete</a>
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



$('#table').click(function () {
    window.location.href = "/order.html";
});