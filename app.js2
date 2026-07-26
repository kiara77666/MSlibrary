let currentData = works;


/* 渲染作品 */

function render(list){

const grid=document.getElementById("grid");

grid.innerHTML="";


list.forEach(item=>{


grid.innerHTML+=`

<div class="card"
onclick="openWork(${item.id})">


<img class="cover"
src="${item.cover}">


<div class="info">

<h3>${item.title}</h3>

<p>
CP：${item.cp}
</p>

<span>
${item.type}
</span>


<button onclick="
event.stopPropagation();
favorite(${item.id})
">

${item.favorite?"❤️":"♡"}

</button>


</div>

</div>

`;


});


}


/* 打开作品 */

function openWork(id){

let item=
works.find(x=>x.id===id);

localStorage.setItem(
"last",
JSON.stringify(item)
);


window.open(
item.url,
"_blank"
);

}


/* 收藏 */

function favorite(id){

let item=
works.find(x=>x.id===id);


item.favorite=
!item.favorite;


saveFavorite();


render(currentData);

}



/* 保存收藏 */

function saveFavorite(){

localStorage.setItem(
"favorite",
JSON.stringify(
works.filter(
x=>x.favorite
)
)
);

}


/* CP分类 */


function filterCP(cp){

currentData=
works.filter(
x=>x.cp===cp
);


render(currentData);

}



/* 全部 */

function showAll(){

currentData=works;

render(works);

}



/* 首字母 */


function filterLetter(letter){

currentData=
works.filter(
x=>x.letter===letter
);


render(currentData);

}


/* 搜索 */


search.oninput=function(){

let key=this.value;


render(

works.filter(x=>

x.title.includes(key)

||
x.cp.includes(key)

)

);


}



/* 自动统计CP数量 */


function cpCount(cp){

return works.filter(
x=>x.cp===cp
).length;

}



render(works);
