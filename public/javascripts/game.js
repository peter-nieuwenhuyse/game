var roomInfra = io.connect('/room_infra');
var gameCom = io.connect('/game_com');
var coords = JSON.parse(localStorage.coords);
var messages_miss=[
  'That was a miss Commander',
  'May i suggest a new pair of glasses',
  'ever thought about giving up the wine sir?',
  'this will be a long battle',
  'what happened with your aim sir',
  'have you been drinking'
]
var messages_hit =[
  "whoeha that's a hit",
  "keep up the good work commander",
  "whahahaha i smell victory",
  "that's the way aha aha i like it aha aha",
  "he shoots........... he scooooores......",
  "annihilation"
];

var turn = 0;
var first_attack=0; 
var win = 17;
var roomName = decodeURI((RegExp("room" + '=' + '(.+?)(&|$)').exec(location.search)|| [, null])[1]);
if(roomName){
  var username= document.cookie;
  console.log (username);
  roomInfra.emit('join_room', {'name':roomName});
  gameCom.on('attack_recieved',function(attacked){
    turn = 0;
    if(first_attack !==0){
    $('#turn').toggleClass('hidden');
    $('#Oturn').toggleClass('hidden');
    }
    $('#attacks').html('<h1>' + attacked + '</h1>');
    var hit = false;
    for ( var i=0; i<coords.length; i++){
      if (attacked === coords[i]){
        hit = true;
      }
    }
    $(".own_field").each(function(){
      if($(this).attr("itemprop")===attacked){
      if (hit === true){ 
          $(this).css({'background-color':'green'});
          $('#result').html('<h1>HIT</h1>');
        }else{
          $(this).css({'background-color':'red'});
          $('#result').html('<h1>Miss</h1>');
        }
      }
   });
   gameCom.emit('response_on_attack',hit,attacked);
   
});
gameCom.on('attack_result',function(result,field){
  if (result===true){
    var i = Math.floor(Math.random()*5);
    console.log(i);
    $('#game_messages').html('<h1>HIT</h1>' + messages_hit[i]);
    $('.free_field').each(function(){
      if($(this).attr('itemprop')=== field){
        $(this).css({'background-color':'green'}).removeClass('free_field');
        win = win - 1;
        if(win === 0){
          turn=1;
          gameCom.emit('win');
          var el= $('<div/>');
          el.html('<h1> WINNER</h1>');
          $('#game_messages').append(el);
        }
      }
    });
  }else{
    $('#game_messages').html('<h1>MISS</h1>' + messages_miss[Math.floor(Math.random()*5)]);
    $('.free_field').each(function(){
      if($(this).attr('itemprop')=== field){
        $(this).css({'background-color':'gray'}).removeClass('free_field');
        
      }
    });
  }
});
gameCom.on('lose',function(){
  turn=1;
  $('#game_messages').html('Better luck next time commander');
  var el = $('<div/>');
  el.html('<h1> You LOSE </h1>');
  $('#game_messages').append(el);
});
  $(function(){
      $('#terminal2').css({'height': ($('#terminal2').width()/4)*5 + 'px'})
      $('#chatcontainer2').css({'top':($('#terminal2').height()+25)+'px'});
    $('.free_field').on('click', function(event){
      event.preventDefault();
      if(turn !== 1){
        first_attack=1;
        var el=this;
        var itemprop = el.getAttribute('itemprop');
        gameCom.emit('send_attempt',itemprop);
        $('#turn').toggleClass('hidden');
        $('#Oturn').toggleClass('hidden');
        turn =1;
        console.log (el);
      }
    });  
  });
 }

