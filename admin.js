// ==========================
// 加载作品列表
// ==========================

loadAdminWorks();



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


box.innerHTML+=`

<div class="card">


<img src="${item.cover || ''}"

style="
width:100%;
height:180px;
object-fit:cover;
border-radius:15px;
">


<h3>
${item.title}
</h3>


<p>
CP：
${item.cp}
</p>


<p>
类型：
${item.type}
</p>


<p>
${item.description || ""}
</p>



<button onclick="editWork(${item.id})">

编辑

</button>


<button onclick="deleteWork(${item.id})">

删除

</button>


</div>

`;

});


}





// ==========================
// 添加作品
// ==========================


async function saveWork(){


alert("保存功能运行");



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



let cover="";



if(file){

cover =
await uploadImage(file);

}



const {
error
}=await client

.from("works")

.insert([

{

title:title,

cp:cp,

type:type,

url:url,

tags:tags,

description:description,

cover:cover

}

]);



if(error){

alert(
"保存失败："
+
error.message
);

return;

}



alert("作品添加成功");



document.getElementById("title").value="";

document.getElementById("url").value="";

document.getElementById("tags").value="";

document.getElementById("description").value="";



loadAdminWorks();


}






// ==========================
// 删除作品
// ==========================


async function deleteWork(id){


let ok =
confirm(
"确定删除这个作品吗？"
);



if(!ok){

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






// ==========================
// 编辑作品
// ==========================


function editWork(id){


location.href =
"edit.html?id="+id;


}
