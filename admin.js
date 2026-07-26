
// ===============================
// MS Library 管理后台
// ===============================


// 页面打开加载
loadAdminWorks();



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


const file =
document.getElementById("cover").files[0];


if(!title){

alert("请输入作品名称");

return;

}



let coverUrl="";


if(file){

coverUrl =
await uploadImage(file);

}



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

cover:coverUrl

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

.order("id",{ascending:false});



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


<img src="${item.cover || ''}"

style="
width:100%;
height:180px;
object-fit:cover;
border-radius:15px;
">


<h3>${item.title}</h3>


<p>${item.cp}</p>


<p>${item.type}</p>


<p>${item.description || ""}</p>


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


if(!confirm("确定删除？")){

return;

}



const {

error

}=await client

.from("works")

.delete()

.eq("id",id);



if(error){

alert(error.message);

return;

}



alert("删除成功");


loadAdminWorks();


}
