var ul = document.querySelector('#rooms-list');
$(document).ready( _ => {
    $.get( url+"/room/all", function( data ) {
        for(var i = 0; i < data.length; i++){
            var li = document.createElement('li');
            var p = document.createElement('p');
            var button = document.createElement('button');

            var roomname = data[i].vak + "   |   " + data[i].lector +
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