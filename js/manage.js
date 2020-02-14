$(document).ready( _ => {
    loadAllRoomsInDelete();
    document.querySelector('#delete-room').addEventListener('click', e => {
        e.preventDefault();
        var sel = document.querySelector('#all-rooms-for-delete');
        var id = sel.options[sel.selectedIndex].value;
        $.get(url + "/room/delete/"+id);
        location.reload();
    });
    var addqroomform = document.querySelector('#add-qroom');
    addqroomform.addEventListener('submit', e => {
        e.preventDefault();
        var v = addqroomform['add-room-course'].value.trim();
        var lec = addqroomform['add-room-lector'].value.trim();
        var lok = addqroomform['add-room-classroom'].value.trim();
        if(v.length < 1) return;
        if(lec.length < 1) return;
        if(lok.length < 1) return; // CHECK IF VALID
        var body = '{ "lector": "'+lec+'", "vak": "'+v+'", "lokaal": "'+lok+'" }';
        $.ajax({
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Accept", "application/json");
            },
            url: url + "/room/create",                                                                                    
            type: "POST",
            datatype: "json",
            data: body,
            success: e => {addqroomform.reset();location.reload()}
        });
    });
});

function loadAllRoomsInDelete(){
    var select = document.querySelector('#all-rooms-for-delete');
    $.get( "http://server.arne.tech:8080/room/all", function( data ) {
        for(var i = 0; i < data.length; i++){
            var roomname = data[i].vak + "   |   " + data[i].lector +
            "   |   " + data[i].lokaal;
            
            var option = document.createElement("option");
            option.value = data[i].id;
            option.textContent = roomname;
            select.append(option);
        }
    }, "json" );
}