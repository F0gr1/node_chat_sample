
var express = require('express');//expressを使用
var app = express();
var http = require('http').Server(app);

const path = require('path');
const io = require('socket.io')(http);
const PORT = process.env.PORT || 4649;

app.get('/chat' , function(req, res){
    res.sendFile(__dirname+'/views/landing.html');//chat.htmlへ移動
});

app.get('/',function(req,res){
	res.sendFile(__dirname+'/views/home.html');
});

io.on('connection',function(socket){
    console.log("connections"); 
    // メッセージ送信処理
    socket.on('chat message', function(msg){
    //io.emit('chat message', msg);
    io.emit('chat message', {
        message: msg
    });

  });
});

http.listen(PORT, function(){
    console.log('server listening. Port(v)/:' + PORT);//PORT番ポートに接続
});

app.use(express.static(path.join(__dirname, 'views')));//chat_roomディレクトリを公開);
