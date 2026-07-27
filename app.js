// ===============================
// MS Library 首页
// ===============================


// 页面加载作品

// 读取主题

const savedTheme =
localStorage.getItem("theme");


if(savedTheme){

document.body.className =
savedTheme;

}

loadWorks();




// ===============================
// 加载作品
// ===============================


async function loadWorks(){


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
"读取失败："+error.message
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

标签：

${item.tags || ""}

</p>





<p>

${item.description || ""}

</p>






<a 

href="${item.url}"

target="_blank">


进入作品


</a>





</div>



`;



});



}
