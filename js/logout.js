if (window.localStorage.getItem('X-Access-Token') == null) {
    window.location.href = "/login.html";
}
$('#logout').click(function () {
    window.localStorage.removeItem('X-Access-Token');
    window.location.href = "/login.html";
});

