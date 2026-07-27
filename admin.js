
// ===============================

// MS Library 管理后台

// ===============================

// 读取主题

const savedTheme =

localStorage.getItem("theme");

if(savedTheme){

document.body.className =

savedTheme;

}

loadAdminWorks();

// ===============================

// 获取标题首字母

// ===============================

function getLetter(title){


let map={

"敏":"M",
"眉":"M",
"朝":"C"

};


let first =
title.charAt(0);



if(/[a-zA-Z]/.test(first)){


return first.toUpperCase();


}



return map[first] || "#";


}
}

// ===============================

// 添加作品

// ===============================

async function saveWork(){

const title =

document.getElementById("title").value;

const cp =

document.getElementById("cp").value;

const type =

document.getElementById("type").value;

const url =

document.getElementById("url").value;

const tags =

document.getElementById("tags").value;

const description =

document.getElementById("description").value;

if(!title){

alert("请输入作品名称");

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

letter:
getLetter(title)

letter:letter

}]);

if(error){

alert(

"保存失败："+error.message

);

return;

}

alert("保存成功");

document.getElementById("title").value="";

document.getElementById("url").value="";

document.getElementById("tags").value="";

document.getElementById("description").value="";

loadAdminWorks();

}

// ===============================

// 加载作品

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

alert(error.message);

return;

}

const box =

document.getElementById("workList");

box.innerHTML="";

data.forEach(item=>{

box.innerHTML += `

<div class="card">

<h3>

${item.title}

</h3>

<p>

CP：

${item.cp}

</p>

<p>

首字母：

${item.letter || ""}

</p>

<p>

类型：

${item.type}

</p>

<p>

标签：

${item.tags || ""}

</p>

<p>

${item.description || ""}

</p>

<a href="${item.url}" target="_blank">

打开作品

</a>

<br><br>

<button onclick="deleteWork(${item.id})">

删除

</button>

</div>

`;

});

}

// ===============================

// 删除作品

// ===============================

async function deleteWork(id){

if(!confirm("确定删除这个作品吗？")){

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

alert(error.message);

return;

}

alert("删除成功");

loadAdminWorks();

}
