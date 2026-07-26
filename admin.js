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
