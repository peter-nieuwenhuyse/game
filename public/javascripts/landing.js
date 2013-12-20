
var roomInfra = io.connect('/room_infra');
var gameCom = io.connect('/game_com');
var positions_taken=[];
var ship_chosen ="";
var size = 0;
var orientation_hor = true;
$(function(){
  var username="";
  
  $( "#username").keypress(function( event ){
    if ( event.which === 13 ) {
      event.preventDefault();
      username =  $('#username').val();
      document.cookie = "username=" + username + ";; path=/";
      var target= $('#terminal');
      $('.user').html('objective 1 completed...');
      var el= $('<div/>');
      el.html('username has been set to: ' + username);
      target.append(el);
      //animeren van de tekst
      setTimeout(function(){
        var el=$('<p/>');
        el.html('scanning battle maps');
        target.append(el);
        },250);
      setTimeout(function(){
        var el=$('<p/>');
        el.html('battle maps scanned');
        target.append(el);
        },500);
        
      setTimeout(function(){
        var el=$('<p/>');
        el.html('searching for hostile fleets ');
        target.append(el);
        },750);
      setTimeout(function(){
        var el=$('<p/>');
        el.html('hostile fleets detected');
        target.append(el);
        },1000);
      setTimeout(function(){
        var el=$('<p/>');
        el.html( 'commander ' + username + ' prepare for battle');
        target.append(el);
        },1250);
      //na animatie de beschikbare kamers tonen  
      setTimeout(function(){$('#terminal2').removeClass('hidden');},1500);
    }
  });
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
        var linkel= $('<a href="#" class="cell free_field" itemprop= '+ i+j+'></a>')
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
  //het zetten van de schepen voorlopige versie nog geen controle op beschikbare plaats en correcte setup schepen  
  $('.cell').on('click',function(event){
   event.preventDefault();
   if(ship_chosen !=="" && size !== 0){
    if(orientation_hor !==false){
      $el =$(this);
      var free_field=true;
      for (var i = 0 ; i<size; i++){  
        var check = (parseInt($el.attr('itemprop'))%10)+i;
        console.log(check);
        if(check >9){
          free_field=false;
          alert("ship can't be placed here");
        }
        for (var j=0; j<positions_taken.length; j++){
          for (var k=0; k<size;k++){
            if(free_field!=false){
            if((parseInt($el.attr('itemprop'))+k) == positions_taken[j]){
              free_field=false;
              alert('this would cause overlapsing sir)');
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
              alert('this would cause overlapsing sir)');
            }
            }
          }
        }
      }
      if(free_field!=false){
        for(var i=0;i<size;i++){
          var propvalue= parseInt($(this).attr('itemprop'))+(i*10)
          console.log(propvalue);
          $('.free_field').each(function(){
            if($(this).attr('itemprop')==propvalue){
              $(this).toggleClass('free_field chosen');
              positions_taken.push($(this).attr('itemprop'));
              console.log(positions_taken);
            }
          });
        }
        ship_chosen  ="";
        size=0
      }
    }
   
 }
   });
  //
   var ship_prop =[
     {name:"Carrier",size:5, placed:0},
     {name:"Battleship",size:4, placed:0},
     {name:"Cruiser",size:3, placed:0},
     {name:"Submarine",size:3, placed:0},
     {name:"Destroyer",size:2 ,placed:0}
   ];   
   $('.ship').on('click',function(e){
     e.preventDefault();
     ship_chosen = $(this).attr('id');
     for(var i=0 ;i<ship_prop.length; i++){
       if(ship_chosen===ship_prop[i].name){
         if(ship_prop[i].placed !==1){
         size= ship_prop[i].size;
         ship_prop[i].placed=1;
       } else {
           alert('this ship is already taken commander please select a other ship')
         }
       }
     }
   });
   $('.horizontal').on('click',function(){
     orientation_hor = true;
   });
   $('.vertical').on('click', function(){
     orientation_hor = false;
   });
   
 
});


