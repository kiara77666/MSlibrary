// ===============================
// MS Library 首页
// ===============================


// ===============================
// 读取主题
// ===============================

(function(){

const theme =
localStorage.getItem("theme");


if(theme){

document.body.className = theme;

}

})();





// ===============================
// 当前筛选
// ===============================


let currentCP = "";

let currentLetter = "";

let currentType = "";

let currentTag = "";


// ===============================
// 页面加载
// ===============================


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



let count = 0;





data.forEach(item=>{





// CP筛选

if(
currentCP &&
item.cp !== currentCP
){

return;

}

  // 作品分类筛选

if(
currentType &&
item.type !== currentType
){

return;

}


// Tag筛选

if(
currentTag &&
!(item.tags || "").includes(currentTag)

){

return;

}



// 首字母筛选

if(
currentLetter &&
item.letter !== currentLetter
){

return;

}







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

首字母：

${item.letter || ""}

</p>




<p>

标签：

${item.tags || ""}

</p>




<p>

${item.description || ""}

</p>





<a href="${item.url || '#'}"

target="_blank">


进入作品


</a>



</div>



`;



count++;



});






if(count===0){


box.innerHTML =
"暂无符合条件的作品";


}



}








// ===============================
// CP分类
// ===============================


document
.querySelectorAll("#cpList button")
.forEach(btn=>{


btn.onclick=function(){


currentCP =
this.innerText;



if(currentCP==="全部"){

currentCP="";

}



loadWorks();


}


});










// ===============================
// 首字母分类
// ===============================


document
.querySelectorAll("#letterList button")
.forEach(btn=>{


btn.onclick=function(){


currentLetter =
this.innerText;



if(currentLetter==="全部"){

currentLetter="";

}



loadWorks();


}


});










// ===============================
// 搜索
// ===============================


const search =
document.getElementById("search");



if(search){


search.oninput=function(){



let keyword =
this.value.toLowerCase();




document
.querySelectorAll(".card")
.forEach(card=>{


if(
card.innerText
.toLowerCase()
.includes(keyword)

){


card.style.display="block";


}else{


card.style.display="none";


}


});



};



}


// ===============================
// 作品分类
// ===============================


document
.querySelectorAll("#workTypeList button")
.forEach(btn=>{


btn.onclick=function(){


currentType=this.innerText;



if(currentType==="全部"){

currentType="";

}


loadWorks();


}

});






// ===============================
// Tag分类
// ===============================


document
.querySelectorAll("#tagList button")
.forEach(btn=>{


btn.onclick=function(){


currentTag=this.innerText;



if(currentTag==="全部"){

currentTag="";

}


loadWorks();


}

});
