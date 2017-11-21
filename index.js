const exp =require('express')
const socketIO =require('socket.io')
const http=require('http')

const app=exp()

// 从app应用中获取当前http服务器
const server =http.Server(app)
// 根据获取到的服务器创建socket接口 然后就可以使用socket.io的API了
const io = socketIO(server)

// socket.io是事件驱动式的编程模式
// 通过监听事件完成功能 有新的用户连接到服务器会触发connection事件 socket参数是与该用户的链接 通过socket可以与用户进行通信 
// 每一个连接到服务器的用户 都有一个socket对象与之关联 通过socket能够找到对应的用户
io.on('connection',function(socket){
    // 只在第一次连接的时候触发
    console.log('有新用户连接')
    // 用户发送消息时  会触发chat-message---自定义事件
    // socket只表示一个用户
    socket.on('chat-message',function(data){
        console.log('消息:'+data)
          // emit会把数据发送给所有用户
    // io.emit('message',data)
    socket.emit('message',data)
    })
  
})
io.on('disconnect',function(){
    console.log('用户断开连接')
})

app.use(exp.static('www'))

// 这里是用server监听端口
server.listen(3000,()=>{
    console.log('server on 3000...')
})