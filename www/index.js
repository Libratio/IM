var input =document.querySelector('input')
var name =prompt('请输入你的名字:')
// 获取socket对象
var socket =io()

input.onkeyup=function(ev){
    {
        if (ev.keyCode==13) {
            var text=input.value.trim()
            if (text.length>0) {
                // 发送消息
                socket.emit('chat-message',JSON.stringify({
                    name:name,
                    text:text
                }))
                input.value=''
                
            }
            
        }
    }
}
socket.on('message',function(data){
    data=JSON.parse(data)
    var section =document.createElement('section')
    section.innerText=data.name+':'+data.text
    document.body.appendChild(section)
    document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight
    

})