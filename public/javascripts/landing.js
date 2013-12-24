var roomInfra = io.connect('/room_infra');
var positions_taken=[];
var ship_chosen ="";
var ship_active;
var size = 0;
var orientation_hor = true;
$(function(){
  var username="";
  var scrollwidth = $('#terminal').width();
  $('#terminal').css({'height':((scrollwidth/4)*5)+10 + 'px'});
  if(document.cookie){
      username=document.cookie;
      roomInfra.emit("set_username",username);
      console.log(typeof(username));
      step2(username);
      }else{
  $( "#username").keypress(function( event ){
    if ( event.which === 13 ) {
      event.preventDefault();
      username = $('#username').val();
      document.cookie = username;
      roomInfra.emit("set_username",username);
      step2(username);
    };
    });
      };
    function step2(username){
      var $target= $('#terminal');
      $target.html('<h1> Well done ' + username + '</h1><span class="small">Not ' + username + '? please click <a href="" class ="reset_username">reset username</a></span>');
      $('.reset_username').on('click',function(e){
          e.preventDefault();
          document.cookie = username + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          location.reload();
      });
      var el= $('<div id="info"/>');
      var message = "<p> Let's take a look at your battle strategy";
      message += "<ul>";
      message += "<li> Select a Ship.</li>";
      message += "<li> Choose oriëntation horizontal/vertical.</li>";
      message += "<li> select a place on the grid. </li>";
      message += "<li> Do this for all 5 ships. </li>";
      message += "</ul></p>";
      message += "When you're satisfied with you setup click: ";
      message += "<input type='button' id= 'accept' value='continue'>";
      message += "<div id ='errorbox'></div>";
      $target.append(el.html(message));
       //opbouwen van het grid 
      var alpha=['A','B','C','D','E','F','G','H','I','J'];
      var target = $("#grid");
      var firstrow = $('<div class="row"></div>');
      var firstcel = $('<div class="cell"></div>var');
      firstrow.append(firstcel);
      for(var i= 0; i<10 ; i++){
        var el = $('<div class="cell"></div>');
        el.html(i);
        firstrow.append(el);
      }
      target.append(firstrow);
      for(var i=0;i<10;i++){
        var row=$('<div class="row"></div>');
        var firstel= $('<div class="cell"></div>');
        firstel.html(alpha[i]);
        row.append(firstel);
        for(var j=0; j<10;j++){
        var linkel= $('<a href="#" class="cell free_field" itemprop= '+ i+j+'></a>');
        row.append(linkel);
        }
        target.append(row);
      }
      var gamewidth= $('#grid').width();
      $('#grid').css({'height':gamewidth + 'px'});
      $('.cell').css({'height':gamewidth/11 +'px'});
      $('.cell').css({'padding':gamewidth/30 + 'px'});
    
      $(window).resize(function(){
        var gamewidth= $('#grid').width();
        $('#grid').css({'height':gamewidth + 'px'});
        $('.cell').css({'height':gamewidth/11 +'px'});
        $('.cell').css({'padding':gamewidth/30 + 'px'});
      });
      $('.cell').on('click',function(event){
   event.preventDefault();
   if(ship_chosen !=="" && size !== 0){
    if(orientation_hor !==false){
      $el =$(this);
      var free_field=true;
      for (var i = 0 ; i<size; i++){  
        var check = (parseInt($el.attr('itemprop'))%10)+i;
        if(check >9){
          free_field=false;
          $('#errorbox').html("ship can't be placed here");
        }
        for (var j=0; j<positions_taken.length; j++){
          for (var k=0; k<size;k++){
            if(free_field!=false){
            if((parseInt($el.attr('itemprop'))+k) == positions_taken[j]){
              free_field=false;
              $('#errorbox').html('this would cause overlapsing sir');
            }
            }
          }
        }
        }
      if(free_field != false){
      for (var i = 0 ; i<size ;i++){
        $el.toggleClass("free_field chosen");
        
        positions_taken.push($el.attr('itemprop'));
        
        $el= $el.next();
      }
      ship_active.placed=1
      ship_chosen = "";
      size=0;
      }
    }else{
      $el =$(this);
      var free_field=true;
      for (var i=0; i<size;i++){
        if((parseInt($el.attr("itemprop"))+(i*10))>100){
          free_field=false;
        }
        for (var j=0; j<positions_taken.length; j++){
          for (var k=0; k<size;k++){
            if(free_field!=false){
            if((parseInt($el.attr('itemprop')))+(k*10) == positions_taken[j]){
              free_field=false;
              $('#errorbox').html('this would cause overlapsing sir');
            }
            }
          }
        }
      }
      if(free_field!==false){
        for(var i=0;i<size;i++){
          var propvalue= parseInt($(this).attr('itemprop'))+(i*10);
          console.log(propvalue);
          $('.free_field').each(function(){
            if($(this).attr('itemprop')== propvalue){
              $(this).toggleClass('free_field chosen');
              
              
              positions_taken.push($(this).attr('itemprop'));
            }
          });
        }
        ship_chosen  ="";
        size=0;
        ship_active.placed=1;
      }
    }
   
 }
   });
  
   var ship_prop =[
     {name:"Carrier",size:5, placed:0},
     {name:"Battleship",size:4, placed:0},
     {name:"Cruiser",size:3, placed:0},
     {name:"Submarine",size:3, placed:0},
     {name:"Destroyer",size:2 ,placed:0}
   ];   
   $('.ship').on('click',function(e){
     e.preventDefault();
     $('#errorbox').html('');
     ship_chosen = $(this).attr('id');
     for(var i=0 ;i<ship_prop.length; i++){
       if(ship_chosen===ship_prop[i].name){
         if(ship_prop[i].placed !==1){
             $('.ship').each(function(){
                 $(this).removeClass('active');
             });
             $(this).addClass('active');
         size= ship_prop[i].size;
         ship_active=ship_prop[i];
       } else {
           $('#errorbox').html('this ship is already taken commander please select a other ship')
         }
       }
     }
   });
   $('.horizontal').on('click',function(event){
       event.preventDefault();
       $(this).addClass('active');
       $('.vertical').removeClass('active');
     orientation_hor = true;
   });
   $('.vertical').on('click', function(event){
       event.preventDefault();
       $(this).addClass('active');
       $('.horizontal').removeClass('active');
     orientation_hor = false;
   });
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
          localStorage.coords= JSON.stringify(coords);
        }
        else
        { 
          document.cookie= coords;
        }
        step3();
        }else{
          $('#errorbox').html("fleet not ok please check if all ships are in place");
        }
        
      });
  };
  function step3(){
    
    var target= $('#terminal');
    target.html('<h1>Rooms</h1><span>Select a room from the list to join a battle or create your own</span><input type="text" id="new_room" placeholder="create room")>');
    var el=$('<div id="rooms_list"></div>');
    target.append(el);
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
  $('#new_room').keypress(function(e){
    if (e.which===13){
        e.preventDefault();
    window.location = '/gameroom?room=' + $('#new_room').val();
    }
  });
  }
});


