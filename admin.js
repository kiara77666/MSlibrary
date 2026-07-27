// ===============================
// MS Library 管理后台
// ===============================


// ===============================
// 读取主题
// ===============================

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


if(!title){

return "#";

}



let first =
title.charAt(0);




// 英文标题

if(/[a-zA-Z]/.test(first)){


return first.toUpperCase();


}





// 常用中文映射

let map = {


"敏":"M",

"眉":"M",

"朝":"C",


"陈":"C",

"程":"C",

"张":"Z",

"赵":"Z",

"李":"L",

"林":"L",

"王":"W",

"吴":"W",

"周":"Z",

"郑":"Z"



};





if(map[first]){


return map[first];


}






// 其他中文返回#

return "#";


}








// ===============================
// 添加作品
// ===============================


async function saveWork(){



const title =
document.getElementById("title").value.trim();



const cp =
document.getElementById("cp").value.trim();



const type =
document.getElementById("type").value.trim();



const url =
document.getElementById("url").value.trim();



const tags =
document.getElementById("tags").value.trim();



const description =
document.getElementById("description").value.trim();





if(!title){


alert("请输入作品名称");


return;


}






// 自动生成首字母

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


letter:letter



}]);





if(error){


alert(
"保存失败："+error.message
);


return;


}





alert(
"保存成功，首字母："+letter
);






// 清空


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



if(!box){

return;

}





box.innerHTML="";





data.forEach(item=>{



box.innerHTML += `



<div class="card">


<h3>

${item.title || ""}

</h3>



<p>

CP：

${item.cp || ""}

</p>




<p>

首字母：

${item.letter || ""}

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




<a href="${item.url || '#'}" target="_blank">

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
