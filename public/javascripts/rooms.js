var roomInfra = io.connect('/room_infra');
var gameCom = io.connect('/game_com');


roomInfra.on("connect", function(){
  getrooms();
});

$(function(){
  var fleet_ok = false;
  
  $('#accept').on('click',function(){
  var aantal= $('.chosen').length;
  var coords=[];
  if(aantal==17){
    $('.chosen').each(function(){
      var coord =$(this).attr('itemprop');
      coords.push(coord); 
    });
    if(typeof(Storage)!=="undefined")
    {
      //use localstorage
      console.log("localstorage ok");
      localStorage.coords= JSON.stringify(coords);
    }
    else
    {
      console.log("using cookie");
      document.cookie= coords;
    }
    fleet_ok = true;
  }else{
    console.log('fleet not ok');
    fleet_ok = false;
  } 
});

$('.room').on('click', function(event){
  event.preventDefault();
  if(fleet_ok = true){
    window.location = $(this).attr('href');
  }else{
    alert('there seems to be a problem with your fleet commander');
  }
})

  $('#new_room_btn').click(function(){
    if (fleet_ok == true){
    window.location = '/gameroom?room=' + $('#newroom').val();
  }else{
    alert('There seems to be a problem with your fleet setup commander');
  }
  });
  
  $('#refresh_rooms').click(function(){
    getrooms();
  });
});

function getrooms(){
  roomInfra.emit("get_rooms",{});
  roomInfra.on("rooms_list", function(rooms){
    $('rooms_list').empty();
    for(var room in rooms){
      var roomDiv = '<div class="room_div"><span class="room_name">' + room + '</span><span class="room_users">[' +rooms[room] + ' Users]</span>';
      if(rooms[room]<2){
      roomDiv += '    <a class="room" href="/gameroom?room=' + room + '"> Join</a>';
      }
  roomDiv +='</div></br>';
    $('#rooms_list').append(roomDiv);
    }
  });
}