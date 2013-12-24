var chatInfra = io.connect('/chat_infra');
$(function(){
    var screenratio = screen.width/screen.height;
    var target= $('#chatcontainer');
    if(screenratio>1.6){
      target.css({'height':screen.height/4-10 +'px'});
    }else{
      if(screenratio>1.3){
          target.css({'height':(screen.height/5)*2-30 + 'px'});
      }else{
          target.css({'height':(screen.height/5)*2+22 + 'px'});
      }
  }
    var username="";
    $('#message').keypress(function(e){
      if(e.which===13){
        if(document.cookie){
          username= document.cookie;  
          e.preventDefault();
          var message= $('#message').val();
          var el= $('<div class="own_message"></div>');
          el.html(username + ': ' + message);
          $('#messages').append(el);
          $("#messages").scrollTop($("#messages")[0].scrollHeight+16);
          chatInfra.emit('send_message', username, message);
          $('#message').val('');
          console.log(message);
          } else{
             var el=$('<div class ="systemmessage"></div>');
             var message= 'username is required to chat please set a username';
             el.html(message);
             $('#messages').append(el);
             $("#messages").scrollTop($("#messages")[0].scrollHeight);
          }
        };   
      });
      chatInfra.on('message_recieved',function(user,message){
          var el = $('<div class="recieved_message"></div>');
          var message= '<span class="user">' + user +': '+ message +'</span>';
          el.html(message);
          $('#messages').append(el);
          $("#messages").scrollTop($("#messages")[0].scrollHeight);
      });
});


