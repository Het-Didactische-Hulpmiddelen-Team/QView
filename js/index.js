let ul = document.querySelector('#rooms-list');
$(document).ready( _ => {
    $.get( url+"/room/all", function( data ) {
        for(let i = 0; i < data.length; i++){
            let li = document.createElement('li');
            let p = document.createElement('p');
            let button = document.createElement('button');

            let roomname = data[i].vak + "   |   " + data[i].lector +
            "   |   " + data[i].lokaal;
            
            p.textContent = roomname;
            button.className = "no-margin";
            button.id = data[i].id;
            button.innerHTML = "Join &raquo;";
            button.onclick = redirectHelper;
            li.append(p);
            li.append(button);
            ul.append(li);
        }
    }, "json" );
});   