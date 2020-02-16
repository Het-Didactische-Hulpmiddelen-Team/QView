let id = localStorage.getItem("Q");
let length = 0;
let auth = false;
let q = [];
let webSocket;

$(document).ready( _ => {
    openSocket();
    $.get(url+"/isAuthenticated", res => {
        auth = res;
        $.get(url+"/room/queue/"+id, function( data ) {
            for(let i = 0; i < data.length; i++){
                length++;
                q.push(data[i]);
            }
            $.get(url+"/room/get/"+id, data => {
                let str = data.vak+"   |   "+data.lector+"   |   "+data.lokaal;
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
    } );
    document.querySelector('#enter-q').addEventListener('click', _ => {
        let nameToAdd = Cookies.get('name');
        webSocket.send(`${nameToAdd}-${id}-join`);
        //$.get(url+"/room/join/"+id+"/"+nameToAdd);
    });
    document.querySelector('#leave-q').addEventListener('click', _ => {
        let nameToRemove = Cookies.get('name');
        webSocket.send(`${nameToRemove}-${id}-leave`);
        //$.get(url+"/room/leave/"+id+"/"+nameToRemove);
    });
} );

function draw(){
    let first = document.querySelector('#firstSix');
    let second = document.querySelector('#secondSix');
    first.innerHTML = "";
    second.innerHTML = "";
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
        let span = document.createElement('span');
        span.textContent = (i+1)+": " + q[i];
        length < 7 ? span.className = "diff span" : span.className = "span";
        if(auth){
            let btn = document.createElement('button');
            btn.className = "close-popup no-margin";
            btn.innerHTML = "&times;";
            btn.id = q[i];
            btn.onclick = deleteFromQueue;
            span.append(btn);
        }
        parent.append(span);
    }
}
function deleteFromQueue(){
    $.get(url+"/room/leave/"+id+"/"+this.id);
}

function openSocket() {
    webSocket = new WebSocket("ws://server.arne.tech:8080/echo");

    webSocket.onopen = function (event) {
        webSocket.send("open");
    };

    webSocket.onmessage = function (event) {
        writeResponse(event.data);
    };

    webSocket.onclose = function (event) {
        console.log("onclose");
    };
}

function closeSocket() {
    webSocket.close();
}

function writeResponse(text) {
    let splittedText = text.split("-");
    console.log(id,splittedText[1])
    if(this.id = splittedText[1]){
        q = splittedText[0].replace("[","").replace("]","").split(", ");
        draw();
    }    
}