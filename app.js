let works = [];
let current = [];

// 读取数据库
async function loadWorks() {

    const { data, error } = await client
        .from("works")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.log(error);
        alert("读取数据库失败");
        return;
    }

    works = data;
    current = data;

    createCP();
    createLetter();
    render(data);
}

// 渲染作品
function render(list) {

    const grid = document.getElementById("grid");

    grid.innerHTML = "";

    list.forEach(item => {

        grid.innerHTML += `

<div class="card" onclick="openWork('${item.url}')">

<img src="${item.cover}" onerror="this.src='images/default.jpg'">

<div class="info">

<h3>${item.title}</h3>

<p>${item.cp}</p>

<p>${item.type}</p>

<span class="tag">${item.tags || ""}</span>

</div>

</div>

`;

    });

}

// 打开链接
function openWork(url){

    window.open(url,"_blank");

}

// 搜索
document.getElementById("search").oninput=function(){

    let key=this.value.trim();

    if(key===""){

        render(works);

        return;

    }

    let result=works.filter(item=>

        item.title.includes(key) ||

        item.cp.includes(key) ||

        (item.tags||"").includes(key)

    );

    render(result);

};

// 自动生成CP分类
function createCP(){

    const cpList=document.getElementById("cpList");

    cpList.innerHTML="";

    let cps=[...new Set(works.map(i=>i.cp))];

    let all=document.createElement("button");

    all.innerText="全部";

    all.onclick=function(){

        render(works);

    }

    cpList.appendChild(all);

    cps.forEach(cp=>{

        let count=works.filter(i=>i.cp===cp).length;

        let btn=document.createElement("button");

        btn.innerText=`${cp} (${count})`;

        btn.onclick=function(){

            render(

                works.filter(i=>i.cp===cp)

            );

        }

        cpList.appendChild(btn);

    });

}

// 自动生成首字母
function createLetter(){

    const box=document.getElementById("letterList");

    box.innerHTML="";

    let letters=[...new Set(

        works.map(i=>

            i.title.substring(0,1).toUpperCase()

        )

    )].sort();

    let all=document.createElement("button");

    all.innerText="全部";

    all.onclick=function(){

        render(works);

    }

    box.appendChild(all);

    letters.forEach(letter=>{

        let btn=document.createElement("button");

        btn.innerText=letter;

        btn.onclick=function(){

            render(

                works.filter(i=>

                    i.title.substring(0,1).toUpperCase()==letter

                )

            );

        }

        box.appendChild(btn);

    });

}

// 页面启动
loadWorks();
