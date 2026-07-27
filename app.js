// ===============================
// MS Library 首页
// ===============================


// 读取主题

(function(){

const theme = localStorage.getItem("theme");


if(theme){

document.body.className = theme;

}

})();





let currentCP = "";
let currentLetter = "";




// 页面加载

loadWorks();





// ===============================
// 加载作品
// ===============================


async function loadWorks(){


let query =
client
.from("works")
.select("*")
.order("id",{ascending:false});



if(currentCP){

query =
query.eq("cp",currentCP);

}

  if(currentLetter){

query =
query.eq(
"letter",
currentLetter
);

  }


const {

data,

error

}=await query;



const box =
document.getElementById("grid");



if(!box){

return;

}




if(error){


box.innerHTML =
"读取失败";


return;


}




box.innerHTML="";




if(!data || data.length===0){


box.innerHTML=
"暂无作品";


return;


}





data.forEach(item=>{


box.innerHTML += `


<div class="card">


<h3>
${item.title}
</h3>


<p>
CP：
${item.cp || ""}
</p>


<p>
类型：
${item.type || ""}
</p>


<p>
标签：
${item.tags || ""}
</p>


<p>
${item.description || ""}
</p>


<a href="${item.url}" target="_blank">

进入作品

</a>


</div>


`;


});


}







// ===============================
// CP分类
// ===============================


document.querySelectorAll("#cpList button")
.forEach(btn=>{


btn.onclick=function(){


currentCP=this.innerText;


if(currentCP==="全部"){

currentCP="";

}


loadWorks();


}


});








// ===============================
// 首字母分类
// ===============================


document.querySelectorAll("#letterList button")
.forEach(btn=>{


btn.onclick=function(){


currentLetter=this.innerText;


if(currentLetter==="全部"){

currentLetter="";

}


loadWorks();


}


});
