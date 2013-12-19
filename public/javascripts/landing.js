
var roomInfra = io.connect('/room_infra');
var gameCom = io.connect('/game_com');
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
        
      setTimeout(function(){$('#terminal2').removeClass('hidden');},1500);
    }
  });
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
    
  $('.cell').on('click',function(event){
   event.preventDefault();
   $(this).toggleClass("free_field chosen");
 });
});


