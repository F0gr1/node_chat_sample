var express= require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var $ = require('jquery');
var fs = require('fs');
var ejs = require("ejs");
const multer = require('multer');
var session = require('express-session'); // 追加
/*const upload = multer({
  dest: 'uploads/tmp'
})*/



const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
 password: '312312',
  database: 'cfp'
});

app . engine ( 'ejs' , ejs . renderFile ) ;

app.use(express.static('views'));

app . get ( '/' ,   function ( req ,   res ) {

            // ↓ ここから
            res.render('index.ejs', {
              title: 'はじめてのexpress',
              content: '<h1>Hello Express!</h1>',
              len:lengthq,
              lo2:lo2


            });
});




            // ↑ ここまでを編集
            var lengthq;
            var flg100;
          io.on('connection', function(socket){

            var loginUsers = []; //ログインユーザ
            // アカウント処理
            socket.on('acount', function(userInfo){
              flg2=1;
              i2=0;
              console.log(userInfo.userName2);
              var na='\''+userInfo.userName2+'\'';
              var pa='\''+userInfo.passWord2+'\'';

              var sql2 = 'select id,name,pass from cfp.account';
              con.query(sql2,function (error, rows) {

                var length2 = Object.keys(rows).length;
                console.log(   length2  +"length2す" );
                if(length2==0){
                  var sql = "INSERT INTO cfp.account (name, pass) VALUES ("+na+","+pa+")";
                  con.query(sql,function (error, results) {
                    if (error) console.log(error);
                    //console.log("ok cowboy!");
                  });
                  var sql2 = 'select * from cfp.account';
                  con.query(sql2, (err, result, fields) => {
                    if (err) throw err;
                    //console.log(result);
                  });
                }
                else {
                  while (flg2!=0) {
                    if (error) throw err;

                    if(rows[i2].name==userInfo.userName2){
                      flg2=0;

                    }
                    i2++;if(i2>=length2){break;}
                  }

                  if(flg2==1){
                        var sql = "INSERT INTO cfp.account (name, pass) VALUES ("+na+","+pa+")";
                        con.query(sql,function (error, results) {
                          if (error) console.log(error);
                          //console.log("ok cowboy!");
                        });
                        var sql2 = 'select * from cfp.account';
                        con.query(sql2, (err, result, fields) => {
                          if (err) throw err;
                          //console.log(result);
                        });
                  }
                }
                 console.log(flg2);
                 io.emit('kekkaa', {
                   flg2:flg2
                 });
                 io.to(socket.id).emit('TUTI', {
                   flg2:flg2
                 });




              });



            });

            socket.on('pro1', function(pro1){
              if(bana == undefined){

              }
              else{
              io.to(socket.id).emit('pro2',{
                p2na:bana

              });
            }
            });

            var bana;
            var bapa;
            //ログイン処理
            socket.on('logink', function(userInfo){
              console.log("a");
              flg=0;
              i=0;
              console.log("i");
                var sql2 = 'select * from cfp.account';
                console.log(sql2);
                con.query(sql2, (err, rows, fields) => {
                  console.log("e");
                    if(err){
                        console.log("k");
                        return false;
                    };
                    console.log("o");

                  var length = Object.keys(rows).length;
                  //console.log(   length   );
                    while (flg!=1) {
                      if (err) throw err;
                      //console.log(rows[i].name+" : "+rows[i].pass);
                      //console.log(userInfo.userName);
                      if(rows[i].name==userInfo.userNamek&&rows[i].pass==userInfo.passWordk){
                        flg=1;
                        if(err){
                            return farse;
                        };

                      }
                      i++;if(i>=length){break;}
                    }
                    bana = userInfo.userNamek;
                    bapa = "'"+userInfo.passWordk+"'";


                   //console.log(flg);
                   io.to(socket.id).emit('kekka', {
                     flg:flg
                   });


                });

                /*res.render('index.ejs', {
                  flg:flg//ここを途中で1にかえる
                });*/
            });
            socket.on('sakana', function(userInfo){
              flg100 = 1;
                socket.join('sakana');
                io.to(socket.id).emit('kusyon',{

                });
            });




             //プロフィール編集処理
               socket.on('profilek', function(userInfo){
                 flg=0;
                 i=0;
                 var sql2 = 'select id,name,pass from cfp.account';
                 var rena = userInfo.reuserNamek;
                 var repa = "'"+userInfo.repassWordk+"'";
                 var resta = userInfo.reStatusk;

                 var jak;
                 if(userInfo.reuserNamek && userInfo.repassWordk){

                     con.query(sql2, (err, rows, fields) => {

                       var length = Object.keys(rows).length;

                         while (flg!=1) {
                           if (err) throw err;
                           if(rows[i].name==userInfo.reuserNamek){

                             flg=1;
                           }
                           i++;if(i>=length){break;}
                         }

                         if(flg==0){
                           var sql4 = "UPDATE cfp.account SET name = '"+rena+"' , pass = "+repa+"  WHERE name ='"+bana+"' and pass = "+bapa+" ";
                           con.query(sql4,function (error, results) {
                             if (error) console.log(error);
                             io.emit('pkekka', {
                               flg:flg

                             });

                           });
                           bana = rena;
                           bapa = repa;
                         }
                         if(flg==1){
                           io.emit('pkekka', {
                             flg:flg
                           });
                         }
                       });
                                 // ユーザーネームとパスワード

                     }else if(userInfo.reuserNamek){
                       con.query(sql2, (err, rows, fields) => {

                         var length = Object.keys(rows).length;
                         while (flg!=1) {
                           if (err) throw err;
                           if(rows[i].name==userInfo.reuserNamek){
                             flg=1;
                           }
                           i++;if(i>=length){break;}
                         }
                         if(flg==0){
                           var sql4 = "UPDATE cfp.account SET name = '"+rena+"' WHERE name ='"+bana+"' ";
                           con.query(sql4,function (error, results) {
                             if (error) console.log(error);
                             io.emit('pkekka', {
                               flg:flg
                             });
                           });
                           bana = rena
                         }
                         if(flg==1){
                           io.emit('pkekka', {
                             flg:flg
                           });
                         }
                       });
                                 //ユーザーネーム

                     }else if(userInfo.repassWordk){
                       var sql4 = "UPDATE cfp.account SET pass = "+repa+" WHERE name ='"+bana+"' and pass = "+bapa+" ";
                       con.query(sql4,function (error, results) {
                         if (error) console.log(error);
                         io.emit('pkekka', {
                           flg:flg
                         });
                       });
                       bapa = repa;
                     }
                                 //パスワード
                               //ステータス
                   /*res.render('index.ejs', {
                     flg:flg//ここを途中で1にかえる
                   });*/
               });

            socket.on('awabi', function(userInfo){
                socket.leave('sakana');
            });

            socket.on('login', function(userInfo){
              loginUsers[userInfo.userID] = userInfo.userName;
              //id[userInfo.userID] = userInfo.id;
            });
            socket.on('hokuro',function(into){
              console.log(flg100 + "ほくろ送られてきました");
              if(flg100 == 1){
                console.log("flg100入りました" + flg100);
                flg100 = 0;
                io.to(open).emit('oono',{
                  username : bana
                });
              }
            })

            socket.on('S', function(sred){
                console.log(sred.sred+" s");
                io.to(socket.id).emit('S2', {
                    sred:sred.sred
                });
            });
            var sre ;var sred;
            var sre2 ;
              var flg3;
            //スレッド作成
            socket.on('S3', function(sred){

                sred=sred.sred;
                  sre = '\' '+sred + '\'';
                  sre2 = sred;
                    console.log(sre2+"スレッド２です");
                  flg3=0;
                  var sql200="select * from cfp.sred;";
                con.query(sql200,function (err, rows) {
                  if (err){
                   return false;
                  }
                  else {


                              i =0;
                              var length = Object.keys(rows).length;
                              //console.log(S   length   );
                              if(length == 0){
                                var sql1 ="INSERT INTO cfp.sred (sredname) VALUES ("+sre+")" ;
                                fuck2="select * from cfp.sred;";


                                con.query(sql1,function (error, results) {
                                if (error) console.log(error);
                                console.log("ok cowboy!");
                                });

                                //        var sql3 = "CREATE TABLE cfp."+sre2+"(sredname varchar(50) NOT NUll Primary Key, name varchar(50) NOT NULL ,chat varchar(50) NOT NULL );";
                                var sql3 = "CREATE TABLE cfp."+sre2.replace(/\s/g, "")+"( sredname varchar(50) NOT NUll,name varchar(50) NOT NULL ,chat varchar(50) NOT NULL, time text NOT NULL);";
                                con.query(sql3,function(error,results) {
                                if(error) console.log(error);
                                console.log(results);
                                });
                                var sql21 = "select sredname from cfp."+ sre2.replace(/\s/g, "")+";";
                                con.query(sql21, (err,result) => {
                                if(err) throw err;
                                console.log(result);
                                });
                                io.emit('N', {
                                  sred : sred
                                });
                              }
                              else{
                                while (flg3!=1) {
                                /*
                                          if(rows[i].sredname.replace(/\s/g, "") == null){
                                            return false;
                                          }
                                          */
                                    //console.log(rows[i].name+" : "+rows[i].pass);
                                    if(sre2.replace(/\s/g, "") == rows[i].sredname.replace(/\s/g, "")){
                                      console.log(flg3+"にした");
                                      flg3=1;
                                        console.log(flg3+"にした");
                                    }
                                    else{
                                      flg3=0;
                                    }
                                    i++;if(i>=length){  break;}
                              }
                              if(flg3==0){
                                        var sql1 ="INSERT INTO cfp.sred (sredname) VALUES ("+sre+")" ;
                                        fuck2="select * from cfp.sred;";


                                        con.query(sql1,function (error, results) {
                                        if (error) console.log(error);
                                        console.log("ok cowboy!");
                                        });
                                        //        var sql3 = "CREATE TABLE cfp."+sre2+"(sredname varchar(50) NOT NUll Primary Key, name varchar(50) NOT NULL ,chat varchar(50) NOT NULL );";
                                        var sql3 = "CREATE TABLE cfp."+sre2.replace(/\s/g, "")+"( sredname varchar(50) NOT NUll,name varchar(50) NOT NULL ,chat varchar(50) NOT NULL, time text NOT NULL);";
                                        con.query(sql3,function(error,results) {
                                        if(error) console.log(error);
                                        console.log(results);
                                        });
                                        var sql21 = "select sredname from cfp."+ sre2.replace(/\s/g, "")+";";
                                        con.query(sql21, (err,result) => {
                                        if(err) throw err;
                                        console.log(result);
                                        });
                                          io.emit('N', {
                                            sred : sred
                                          });
                                }
                                if(flg3!=0){
                                    console.log("同じスレッド");
                                }
                                  io.emit('DM',{
                                    flg3:flg3
                                  });
                              }
                    }

                });
                });

            var open = -1;
            var x3 = 0 ;
            var x4 = 0 ;
            var gm = 0;
            var lo3=[];
            var lo4=[];
            var sql5="";

                        socket.on('SO',function(i){

                          open = i.Sp;
                          /*socket.join(open);
                          io.to(open).emit('nyutai');
*/
                                var fuck2="select * from cfp.sred;";
                                con.query(fuck2, function(err, result)  {
                                  x3=0;
                                  x4=0;
                                  if (err) throw err;
                                  var lengthq = Object.keys(result).length;
                                    lengthq=(lengthq*2);
                                    while (true) {

                                      if (x4>=lengthq) {
                                        break;
                                      }

                                      lo3[x3] = result[x4].sredname;

                                      if(open==x3){
                                      lo4[x3]=lo3[x3];
                                        io.to(socket.id).emit('SQ',{
                                            lo4:lo4[x3]
                                        });
                                        flg100=1;
                                        console.log(flg100 + "入隊まえのです");
                                        socket.join(open);
                                        io.to(open).emit('nyutai',{
                                          username : bana
                                        });


                                                   fuck = "SELECT * FROM cfp."+lo4[x3]+";";

                                                    con.query(fuck, function(err, result)  {
                                                    x=0;
                                                    x2=0;
                                                    if (err) throw err;
                                                    var lengthq = Object.keys(result).length;

                                                      lengthq=(lengthq*2);
                                                      while (true) {

                                                      if (x>=lengthq) {
                                                          break;
                                                        }
                                                        lo[x]=result[x2].name;

                                                      x++;
                                                        lo[x]=result[x2].chat;

                                                           io.to(socket.id).emit('chat',{
                                                             name: result[x2].name,

                                                             chat: result[x2].chat

                                                           });
                                                          x++;
                                                          x2++;

                                                        }
                                                    });

                                        break;
                                     }
                                      x3++;
                                      x4++;


                                   }
                               });

                        });



                        socket.on('leave',function(i){
                            console.log("left");
                            socket.leave(open);
                        });
                        socket.on("disconnect", () => {
                            socket.leave(open);
                        });
            // メッセージ送信処理
            var num=0;
            var ff=0;
            var lengthp=0;
            socket.on('chat message', function(msg){
            //  userName = loginUsers[socket.id];

                        io.to(socket.id).emit('yesok', {
                            userName: bana,
                            id:num,
                            message: msg.msg
                        });
                      io.to(open).emit('chat message2', {
                        userName: bana,
                        id:num,
                        message: msg.msg
                      });
              });



            id2='';
            chat2='';
            var id;
            var chat;
            var time;
            var aa;
            socket.on('log', function(msg){
                console.log(socket.id);

               id='\''+msg.id+'\'';
               chat ='\' '+msg.chat + '\'';
               time ='\' '+msg.time + '\'';

               io.to(socket.id).emit('QL', {
                   pp:msg.pp,
                   id:id,
                   chat:chat,
                   time:time
               });
             });


             socket.on('QL2',function(aa){
                 console.log("QL2");
                 var ss = aa.pp;
                var sss = '\' '+aa.pp + '\'';

              var sql3 ="INSERT INTO cfp."+ss+"(sredname,name,chat,time) VALUES ("+sss+","+aa.id+","+aa.chat+","+aa.time+")"+";";

                con.query(sql3, function(err, result)  {
                  if (err) throw err;

                });


             });
      });



      var lo=[];
      var x=0;
      var x2=0;
      var lo2=[];
      var fuck2="select * from cfp.sred;";
      var fuck;

      con.query(fuck2, function(err, result)  {
        if(result==false){
          var sqlw = "INSERT INTO cfp.log (id,name,chat,time) VALUES (\"0\",\"inital\",\"inital\",\"inital\")";
          con.query(sqlw,function (error, results) {});

        }

        x=0;
        x2=0;
        if (err){
         return false;
        }
        var lengthq = Object.keys(result).length;

          lengthq=(lengthq*2);
          while (true) {

            if (x>=lengthq) {
              break;
            }
            lo2[x]=result[x2].sredname;
            console.log(lo2[x]);
            x++;

            x++;
            x2++;


          }
      });




http.listen(process.env.PORT || 3000, function(){
  console.log('listening');
});
