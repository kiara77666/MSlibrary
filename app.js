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






// ===============================
// 获取首字母
// ===============================


function getFirstLetter(str){


if(!str){

return "";

}


// 英文

let first =
str.charAt(0).toUpperCase();


if(/[A-Z]/.test(first)){


return first;


}



// 中文范围粗略判断

let code =
str.charCodeAt(0);



if(code>=19968 && code<=40869){


if(code < 20320) return "A";

if(code < 20700) return "B";

if(code < 21000) return "C";

if(code < 21300) return "D";

if(code < 21600) return "E";

if(code < 22000) return "F";

if(code < 22500) return "G";

if(code < 23000) return "H";

if(code < 23500) return "J";

if(code < 24000) return "K";

if(code < 25000) return "L";

if(code < 30000) return "M";

if(code < 33000) return "N";

if(code < 35000) return "P";

if(code < 37000) return "Q";

if(code < 39000) return "S";

if(code < 40000) return "T";

if(code < 40500) return "X";


return "Y";


}



return "";

}








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






// 首字母筛选

let letter =
getFirstLetter(item.title);



if(
currentLetter &&
letter !== currentLetter
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
// CP分类按钮
// ===============================


document
.querySelectorAll("#cpList button")
.forEach(btn=>{


btn.onclick=function(){



currentCP =
this.innerText;



if(
currentCP==="全部"
){

currentCP="";

}



loadWorks();



}



});









// ===============================
// 首字母分类按钮
// ===============================


document
.querySelectorAll("#letterList button")
.forEach(btn=>{


btn.onclick=function(){



currentLetter =
this.innerText;



if(
currentLetter==="全部"
){

currentLetter="";

}



loadWorks();



}



});









// ===============================
// 搜索功能
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
