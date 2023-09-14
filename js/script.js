// function isEmail(email) {
//     const emailrejex = /^([a-zA-Z\.\-0-9]+\@[a-z0-9]+(\.\w+.\w+|\.\w+))$/;
//     return emailrejex.test(email);
// }
$('#loginbtn').click(function () {
    let email = $('#email').val();
    let password = $('#password').val();
    // if (!isEmail(email)) {
    //     $('#email').addClass('is-invalid');
    //     $('#invalidFeedback').removeClass('d-none');
    //     return;
    // }
    jsonLogin = JSON.stringify({
        userName: email,
        password: password
    });
    $.ajax({
        url: 'http://localhost:8080/users/login',
        method: 'POST',
        data: jsonLogin,
        contentType: 'application/json',
        success: function () {
            alert('You are now logged in');
        },
        error: function (value) {
            if (value.status == 403) {
                alert('Plse check your confirm email');
                return false;
            }
            if (value.status == 401) {
                alert('Your username or password is incorrect');
                return false;
            }
        },
    });
});
