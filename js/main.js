var name = decodeURIComponent(document.cookie).split(';')[0].split("=")[1];
if(name == "undefined"){
    $('#modal-login').css('display', 'block');
}
var loginform = document.querySelector('#login-form');
loginform.addEventListener('submit', e => {
    e.preventDefault();
    var name = loginform['login-name'].value.trim();
    document.cookie = "name=" + name;
    $('#modal-login').css('display', 'none');
});
document.querySelector('#signout').addEventListener('click', e => {
    e.preventDefault();
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    $('#modal-login').css('display', 'block');
});