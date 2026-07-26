// 页面打开加载作品

loadAdminWorks();



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


box.innerHTML+=`

<div class="card">


<img src="${item.cover}"
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
${item.cp}
</p>


<p>
${item.type}
</p>



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





// 删除作品

async function deleteWork(id){


let ok =
confirm("确定删除这个作品吗？");


if(!ok){

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


}


function editWork(id){

location.href=
"edit.html?id="+id;

}

// 添加作品

async function saveWork(){


const title =
document.getElementById("title").value;


const cp =
document.getElementById("cp").value;


const type =
document.getElementById("type").value;


const desc =
document.getElementById("desc").value;


const file =
document.getElementById("cover").files[0];



if(!title){

alert("请输入作品名称");

return;

}



let coverUrl="";


// 有图片才上传

if(file){

coverUrl =
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

desc:desc,

cover:coverUrl

}

]);



if(error){

alert(
"保存失败："+error.message
);

return;

}



alert("作品添加成功");



// 清空

document.getElementById("title").value="";

document.getElementById("desc").value="";


// 刷新列表

loadAdminWorks();


}
