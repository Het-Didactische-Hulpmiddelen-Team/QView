$(document).ready( _ => {
    loadAllRoomsInDelete();
    document.querySelector('#delete-room').addEventListener('click', e => {
        e.preventDefault();
        let sel = document.querySelector('#all-rooms-for-delete');
        let id = sel.options[sel.selectedIndex].value;
        $.get(url + "/room/delete/"+id, _ => location.reload());
    });
    let addqroomform = document.querySelector('#add-qroom');
    addqroomform.addEventListener('submit', e => {
        e.preventDefault();
        let v = addqroomform['add-room-course'].value.trim();
        let lec = addqroomform['add-room-lector'].value.trim();
        let lok = addqroomform['add-room-classroom'].value.trim();
        if(v.length < 1) return;
        if(lec.length < 1) return;
        if(lok.length < 1) return; // CHECK IF VALID
        let body = '{ "lector": "'+lec+'", "vak": "'+v+'", "lokaal": "'+lok+'" }';
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
    let select = document.querySelector('#all-rooms-for-delete');
    $.get(url + "/room/all", function( data ) {
        for(let i = 0; i < data.length; i++){
            let roomname = data[i].vak + "   |   " + data[i].lector +
            "   |   " + data[i].lokaal;
            
            let option = document.createElement("option");
            option.value = data[i].id;
            option.textContent = roomname;
            select.append(option);
        }
    }, "json" );
}