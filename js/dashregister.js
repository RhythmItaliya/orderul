$('#dash-registerbtn').click(function () {
    const username = $('#dash-rusename').val();
    const email = $('#dash-remail').val();
    const password = $('#dash-rpassword').val();
    const repeatPassword = $('#dash-rrepetatpassword').val();
    const role = $('#dash-loginrole').val();

    if (!username || !email || !password || !repeatPassword || !role) {
        alert('Please fill in all fields.');
        return false;
    } else {
        alert('Registration successfully....');
        window.location.href = "dashloginandreg.html"
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
            alert('Registration successful...');
        },
        error: function () {
            alert('Registration failed');
            return false;
        },
    });
});

