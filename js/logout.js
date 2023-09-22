if (window.localStorage.getItem('X-Access-Token') == null) {
    window.location.href = "/login.html";
}
let userName = window.localStorage.getItem('name');
$('#dashbordname').html(userName);
$('#logout').click(function () {
    window.localStorage.removeItem('X-Access-Token');
    window.location.href = "/login.html";
});