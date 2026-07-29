alert("message.js加载成功");

// ===============================
// 使用须知
// ===============================


function openNotice(){

    document
    .getElementById("noticeBox")
    .style.display="flex";

}



function closeNotice(){

    document
    .getElementById("noticeBox")
    .style.display="none";

}





// ===============================
// 留言板
// ===============================


function openMessage(){

    document
    .getElementById("messageBox")
    .style.display="flex";


    loadMessages();

}



function closeMessage(){

    document
    .getElementById("messageBox")
    .style.display="none";

}







async function sendMessage(){


    let name =
    document.getElementById("messageName")
    .value;


    let content =
    document.getElementById("messageContent")
    .value;



    if(!content){

        alert("请输入留言");

        return;

    }



    const {

        error

    } = await client

    .from("messages")

    .insert([{

        name:name || "匿名",

        content:content

    }]);



    if(error){

        alert(error.message);

        return;

    }



    alert("留言成功");


    document
    .getElementById("messageContent")
    .value="";


    loadMessages();


}







async function loadMessages(){



    const box =
    document.getElementById("messageList");



    if(!box){

        return;

    }



    const {

        data,

        error

    } = await client

    .from("messages")

    .select("*")

    .order(
        "id",
        {
            ascending:false
        }
    );



    if(error){

        box.innerHTML="留言读取失败";

        return;

    }



    box.innerHTML="";



    data.forEach(item=>{


        box.innerHTML += `

        <div class="message-card">

        <b>
        ${item.name}
        </b>

        <p>
        ${item.content}
        </p>

        </div>

        `;


    });



}
