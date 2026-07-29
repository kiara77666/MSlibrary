



// ===============================
// MS Library 管理后台
// ===============================



// ===============================
// 读取主题
// ===============================


const savedTheme =
localStorage.getItem("theme");


if(savedTheme){

document.body.className =
savedTheme;

}





// 页面加载

loadAdminWorks();

loadAdminMessages();






// ===============================
// 获取首字母
// ===============================


function getLetter(title){


if(!title){

return "#";

}



let first =
title.charAt(0);




// 英文

if(/[a-zA-Z]/.test(first)){


return first
.toUpperCase();


}




// 中文常用映射


let map={


"敏":"M",

"眉":"M",

"朝":"C",


"陈":"C",

"程":"C",


"张":"Z",

"赵":"Z",


"李":"L",

"林":"L",


"王":"W",

"吴":"W",


"周":"Z"



};



return map[first] || "#";



}









// ===============================
// 添加作品
// ===============================


async function saveWork(){



const title =
document.getElementById("title").value.trim();



const cp =
document.getElementById("cp").value.trim();



const type =
document.getElementById("type").value.trim();



const url =
document.getElementById("url").value.trim();



const tags =
document.getElementById("tags").value.trim();



const description =
document.getElementById("description").value.trim();





if(!title){


alert(
"请输入作品名称"
);


return;


}





const letter =
getLetter(title);






const {

error

}=await client


.from("works")


.insert([{


title:title,


cp:cp,


type:type,


url:url,


tags:tags,


description:description,


letter:letter



}]);






if(error){


alert(
"保存失败："+error.message
);


return;


}






alert(
"保存成功"
);





// 清空


document.getElementById("title").value="";

document.getElementById("url").value="";

document.getElementById("tags").value="";

document.getElementById("description").value="";





loadAdminWorks();



}









// ===============================
// 加载作品列表
// ===============================


async function loadAdminWorks(){



const {

data,

error

}=await client


.from("works")


.select("*")


.order(
"id",
{
ascending:false
}
);






if(error){


alert(
error.message
);


return;


}






const box =
document.getElementById("workList");



if(!box){

return;

}





box.innerHTML="";







data.forEach(item=>{



box.innerHTML += `


<div class="card">


<h3>

${item.title || ""}

</h3>



<p>

CP：

${item.cp || ""}

</p>



<p>

首字母：

${item.letter || ""}

</p>




<p>

作品分类：

${item.type || ""}

</p>



<p>

Tag：

${item.tags || ""}

</p>



<p>

简介：

${item.description || ""}

</p>




<a href="${item.url || '#'}"
target="_blank">

打开作品

</a>



<br><br>



<button
onclick="editWork(${item.id})">

编辑

</button>




<button
onclick="deleteWork(${item.id})">

删除

</button>




</div>



`;



});



}









// ===============================
// 编辑作品
// ===============================


async function editWork(id){



const title =
prompt(
"修改作品名称："
);



const cp =
prompt(
"修改CP："
);



const type =
prompt(
"修改作品分类：\n同人文 / 视频 / 图文 / 剪辑"
);



const tags =
prompt(
"修改Tag：\n例如：港风,现背,HE"
);



const letter =
prompt(
"修改首字母：\n例如：M"
);






let updateData={};





if(title){

updateData.title =
title.trim();

}



if(cp){

updateData.cp =
cp.trim();

}



if(type){

updateData.type =
type.trim();

}



if(tags){

updateData.tags =
tags.trim();

}



if(letter){

updateData.letter =
letter
.trim()
.charAt(0)
.toUpperCase();

}







const {

error

}=await client


.from("works")


.update(updateData)


.eq(
"id",
id
);







if(error){


alert(
"修改失败："+error.message
);


return;


}





alert(
"修改成功"
);



loadAdminWorks();



}









// ===============================
// 删除作品
// ===============================


async function deleteWork(id){



if(!confirm(
"确定删除这个作品吗？"
)){


return;


}






const {

error

}=await client


.from("works")


.delete()


.eq(
"id",
id
);






if(error){


alert(
error.message
);


return;


}






alert(
"删除成功"
);



loadAdminWorks();



}

// ===============================
// 留言管理
// ===============================


async function loadAdminMessages(){


const {

data,

error

}=await client


.from("messages")


.select("*")


.order(
"id",
{
ascending:false
}
);



const box =
document.getElementById("messageAdminList");



if(!box){

return;

}



if(error){

box.innerHTML="读取留言失败";

return;

}



box.innerHTML="";



data.forEach(item=>{


box.innerHTML += `


<div class="card">


<h3>

${item.name || "匿名"}

</h3>


<p>

${item.content}

</p>


<small>

${new Date(item.created_at)
.toLocaleString()}

</small>


<br><br>


<button
onclick="deleteMessage(${item.id})">

删除留言

</button>


</div>


`;



});



}







async function deleteMessage(id){


if(!confirm(
"确定删除这条留言吗？"
)){


return;

}



const {

error

}=await client


.from("messages")


.delete()


.eq(
"id",
id
);




if(error){

alert(
"删除失败："+error.message
);

return;

}



alert(
"删除成功"
);



loadAdminMessages();



}
