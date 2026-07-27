// ===============================
// MS Library 首页
// ===============================


// 获取拼音首字母

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


// 中文简单映射

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
if(code < 24500) return "L";
if(code < 25000) return "M";
if(code < 30000) return "N";
if(code < 33000) return "P";
if(code < 35000) return "Q";
if(code < 37000) return "S";
if(code < 39000) return "T";
if(code < 40000) return "W";
if(code < 40500) return "X";

return "Y";

}


return "";

}

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


document
.querySelectorAll("#letterList button")
.forEach(btn=>{


btn.onclick=function(){


currentLetter=this.innerText;


if(currentLetter==="全部"){

currentLetter="";

}


loadWorks();


}


});

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
