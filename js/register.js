$('#register-btn').click(function () {
    const username = $('#rusename').val();
    const email = $('#remail').val();
    const password = $('#rpassword').val();
    const repeatPassword = $('#rrepetatpassword').val();
    const role = $('#loginrole').val();

    if (!username || !email || !password || !repeatPassword || !role) {
        alert('Please fill in all fields.');
        return false;
    }
    if (password !== repeatPassword) {
        alert('Passwords do not match.');
        return false;
    }

    const userData = {
        userName: username,
        emailId: email,
        password: password,
        role: role,
    };

    $.ajax({
        url: 'http://localhost:8080/register',
        method: 'POST',
        data: JSON.stringify(userData),
        contentType: 'application/json',
        success: function (res) {
            alert('Registration successful. Please check your email for confirmation.');
            window.location.href = '/login.html';
        },
        error: function () {
            alert('Registration failed');
            return false;
        },
    });
});

