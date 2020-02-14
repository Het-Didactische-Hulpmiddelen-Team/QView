var id = localStorage.getItem("Q");
var length = 0;
var auth = false;
var q = [];

$(document).ready( _ => {
    $.get(url+"/isAuthenticated", res => auth = res);
    $.get(url+"/room/queue/"+id, function( data ) {
        var queue = document.querySelector('#q');
        for(var i = 0; i < data.length; i++){
            length++;
            q.push(data[i]);
        }
        $.get(url+"/room/get/"+id, data => {
            var str = data.vak+"   |   "+data.lector+"   |   "+data.lokaal;
            document.querySelector('#amount-in-q').innerHTML = 
            str+" (<strong>" + length + "</strong> in queue)";
        });
        // DONT SHOW BUTTONS IF AUTH USER, BIGGER FONT FOR PROJECTION
        if(auth){
            document.querySelector('#div-q-head-buttons').innerHTML = "";
            document.querySelector("#div-q-head").style.fontSize = "2em";
            document.querySelector("#div-q-head").style.textAlign = "center";

        }
        draw(); // SHOW FIRST PPL IN QUEUE
    } );
    document.querySelector('#enter-q').addEventListener('click', _ => {
        var nameToAdd = Cookies.get('name');
        $.get(url+"/room/join/"+id+"/"+nameToAdd);
    });
    document.querySelector('#leave-q').addEventListener('click', _ => {
        var nameToRemove = Cookies.get('name');
        $.get(url+"/room/leave/"+id+"/"+nameToRemove);
    });
} );

function draw(){
    var first = document.querySelector('#firstSix');
    var second = document.querySelector('#secondSix');
    drawHelper(0, 6, first);
    drawHelper(6, 12, second);

    if(length < 7){
        document.querySelector('#q').style.display = 'block';
        document.querySelector('#vert-divider').style.display = 'none';
    }else{
        document.querySelector('#q').style.display = 'grid';
        document.querySelector('#vert-divider').style.display = 'block';
    }
}
function drawHelper(start, end, parent){
    for(let i = start; i < q.length && i < end; i++){
        var span = document.createElement('span');
        span.textContent = (i+1)+": " + q[i];
        length < 7 ? span.className = "diff span" : span.className = "span";
        if(auth){
            var btn = document.createElement('button');
            btn.className = "close-popup no-margin";
            btn.innerHTML = "&times;";
            btn.id = q[i];
            btn.onclick = deleteFromQueue;
        }

        span.append(btn);
        parent.append(span);
    }
}
function deleteFromQueue(){
    $.get(url+"/room/leave/"+id+"/"+this.id);
}