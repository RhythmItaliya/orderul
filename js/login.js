// // function isEmail(email) {
// //     const emailrejex = /^([a-zA-Z\.\-0-9]+\@[a-z0-9]+(\.\w+.\w+|\.\w+))$/;
// //     return emailrejex.test(email);
// // }

if (window.localStorage.getItem('X-Access-Token') != null) {
    const role = window.localStorage.getItem('role');
    if (role === 'dashboardAdmin') {
        window.location.href = "/dashboard.html";
    } else if (role === 'billAdmin') {
        window.location.href = "/bill.html";
    } else if (role === 'kitchenAdmin') {
        window.location.href = "/kitchen.html";
    } else if (role === 'orderAdmin') {
        window.location.href = "/order.html";
    } else {
        alert('Unknown role');
    }
}

$('#loginbtn').click(function () {
    let emailOrUsername = $('#email').val();
    let password = $('#password').val();

    // if (!isEmail(email)) {
    //     $('#email').addClass('is-invalid');
    //     $('#invalidFeedback').removeClass('d-none');
    //     return;
    // }

    const loginData = {
        userName: emailOrUsername,
        password: password,
    };

    $.ajax({
        url: 'http://localhost:8080/users/login',
        method: 'POST',
        data: JSON.stringify(loginData),
        contentType: 'application/json',
        success: function (res) {
            token = res["X-Access-Token"];
            const role = res["role"];
            window.localStorage.setItem('X-Access-Token', token);
            window.localStorage.setItem('role', role);

            if (role === 'dashboardAdmin') {
                window.location.href = "/dashboard.html";
            } else if (role === 'billAdmin') {
                window.location.href = "/bill.html";
            } else if (role === 'kitchenAdmin') {
                window.location.href = "/kitchen.html";
            } else if (role === 'orderAdmin') {
                window.location.href = "/order.html";
            } else {
                alert('Unknown role');
            }

        },
        error: function (value) {
            if (value.status == 403) {
                alert('Please check your confirmation email');
                return false;

            } else if (value.status == 401) {
                alert('Your username or password is incorrect');
                return false;
            }
        },
    });
});
