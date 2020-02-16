let name = "";
let url = "http://server.arne.tech:8080";
$(document).ready( _ => {
    name = Cookies.get("name");
    if(typeof name == "undefined"){
        $('#modal-login').css('display', 'block');
    }
    createAndShowCreateQroom();
    let loginform = document.querySelector('#login-form');
    loginform.addEventListener('submit', e => {
        e.preventDefault();
        let newName = loginform['login-name'].value.trim();
        if (newName.length < 1) return; // U NEED TO HAVE A USERNAME
        Cookies.set('name', newName);
        location.reload();
    });
    let loginformadmin = document.querySelector('#login-form-admin');
    loginformadmin.addEventListener('submit', e => {
        e.preventDefault();
        let username = loginformadmin['login-admin-username'].value.trim();
        let password = loginformadmin['login-admin-password'].value.trim();
        if (username.length < 1) return;
        if (password.length < 1) return; // FIELDS MAY NOT BE EMPTY
        Cookies.set("name", username);
        $.get(url + "/authenticate", data => {
            location.reload();
        });
    });
    document.querySelector('#signout').addEventListener('click', e => {
        e.preventDefault();
        Cookies.clear("name");
        $.get(url + "/unAuthenticate");
        $('#modal-login').css('display', 'block');
    });
    let headerrooms = document.querySelector('#qrooms-dropdown');
    $.get( url+"/room/all", function( data ) {
        for(let i = 0; i < data.length; i++){
            let a = document.createElement('a');

            let roomname = data[i].vak + "   |   " + data[i].lector +
            "   |   " + data[i].lokaal;
            
            a.textContent = roomname;
            a.id = data[i].id;
            a.onclick = redirectHelper;
            headerrooms.append(a);
        }
    }, "json" );
    document.querySelector('#logo').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = "index.html";
    } );
});

function createAndShowCreateQroom(){
    // DO NOTHING WHEN NOT LOGGED IN AS ADMIN
    $.get( url + "/isAuthenticated", data => {  
        if(data){
            let div = $('#create-qroom');
            let a = document.createElement('a');
            a.href = "manageQrooms.html";
            a.textContent = "Manage Q-Rooms";
            div.append(a);
            div.css('display', 'inline-block');
        }
    }, "json");
}

function redirectHelper(clicked) { 
    //localStorage.setItem("Q",this.id);
    Cookies.set("id", this.id);
    document.location.href = "q.html";
}  

// ONLY VISUAL THINGS
function myFunction(x) {
    if (x.matches) {
        document.querySelector("#signout").textContent = "Sign out";
    } else {
        document.querySelector("#signout").textContent = "Sign in as another user";
    }
}
let x = window.matchMedia("(max-width: 540px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
