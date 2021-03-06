var io = require('socket.io');

exports.initialize = function(server){
 io = io.listen(server);
 
 io.set('authorization', function(data, accept){
   if(data.headers.cookie){
     data.cookie = require('cookie').parse(data.headers.cookie);
     data.sessionID = data.cookie['express.sid'].split('.')[0];
     data.username = data.cookie['username'];
    }else{
      return accept('No cookie transmitted.', false);
    }
    accept(null, true);
 });//end of io.set('authorization')
 var self = this;
 this.roominfra = io.of('/room_infra');
 this.roominfra.on('connection',function(socket){
   socket.on('set_username',function(name){  
       socket.set('nickname',name,function(){
           console.log(name);
       });
   });  
   socket.on('join_room',function(room){
     socket.get('nickname',function(name){
       console.log ('this socket has id:',name)
       socket.join(room.name);
       var chatCom= self.chatInfra.sockets[socket.id];
       chatCom.join(room.name);
       chatCom.room=(room.name);
       var comSocket = self.gameCom.sockets[socket.id];
       comSocket.join(room.name);
       comSocket.room= room.name;
       socket.in(room.name).broadcast.emit('player_entered', {'name':name});
     });
   });//end join_room
   socket.on("get_rooms", function(){
        var rooms = {};
        for(var room in io.sockets.manager.rooms){
          if(room.indexOf("/room_infra/")== 0){
            var roomName = room.replace("/room_infra/","");
            rooms[roomName] = io.sockets.manager.rooms[room].length;
          }//end if
        }//end for
        socket.emit("rooms_list", rooms);
      });//end socket.on
 });//end socket.on connection
 this.gameCom = io.of('/game_com');
 this.gameCom.on('connection',function(socket){
   socket.on("send_attempt",function(coords){
     socket.broadcast.to(socket.room).emit('attack_recieved',coords);
   });
   socket.on("response_on_attack",function(hit, field){
     socket.broadcast.to(socket.room).emit('attack_result',hit, field);
   });
  socket.on('win',function(){
    socket.broadcast.to(socket.room).emit('lose');
  });
 });
 this.chatInfra = io.of('/chat_infra');
 this.chatInfra.on('connection', function(socket){
   socket.on('send_message', function(username,message){
       socket.broadcast.to(socket.room).emit('message_recieved',username,message);
   });
 });
};//end initialize
