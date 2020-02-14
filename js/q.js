var id = localStorage.getItem("Q");
var length = 0;

$(document).ready( _ => {
    // /room/queue/id
    // /room/join/id/name
    $.get( url+"/room/queue/"+id, function( data ) {
        var queue = document.querySelector('#q');
        for(var i = 0; i < data.length; i++){
            length++;
            var span = document.createElement('span');
            span.textContent = data[i];
            queue.append(span);
        }
        document.querySelector('#amount-in-q').innerHTML = 
            "There are <strong>" + length + "</strong> students waiting to ask a question!";
    } );
} );