$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/all/orders',
        method: 'GET',
        success: function (res) {
            const lastOrder = res[res.length - 1];
            let billOrderDisplay = '';

            lastOrder.items.forEach((item) => {
                billOrderDisplay +=
                    `<tr>
                        <td>${item.name}</td>
                        <td class="text-center">${item.qty}</td>
                        <td class="text-center">$50</td>
                    </tr>`;
            });

            $('#billdisplay').html(billOrderDisplay);
        },
        error: function () {
            alert('Failed to fetch orders.');
        },
    });
});