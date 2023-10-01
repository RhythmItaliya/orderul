// $('#placeorderinkitch').click(function () {
$.ajax({
    url: 'http://localhost:8080/all/orders',
    method: 'GET',
    success: function (res) {
        const lastOrder = res[res.length - 1];
        let kitchenOrderDisplay = '';

        lastOrder.items.forEach((item) => {
            kitchenOrderDisplay +=
                `<tr>
                    <td class="text-center">${item.name}</td>
                    <td class="text-center">${item.qty}</td>
                </tr>`;
        });
        $('#kitchenedisplay').html(kitchenOrderDisplay);
        // window.location.href = "/table.html";
    },
    error: function () {
        alert('Failed to fetch orders.');
    },
});
// });