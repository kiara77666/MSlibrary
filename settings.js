// 深色模式


function darkMode(){

document.body.classList.toggle(
"dark"
);


localStorage.setItem(
"dark",
document.body.classList.contains("dark")
);


}


// 打开页面自动读取主题

if(
localStorage.getItem("dark")
==="true"
){

document.body.classList.add(
"dark"
);

}



// API保存


function saveAPI(){


let url =
document.getElementById("apiUrl").value;


let key =
document.getElementById("apiKey").value;



localStorage.setItem(
"supabase_url",
url
);


localStorage.setItem(
"supabase_key",
key
);



document.getElementById(
"apiStatus"
).innerHTML="已保存";


}



// 网站名称

function saveSite(){


let name =
document.getElementById("siteName").value;



localStorage.setItem(
"siteName",
name
);


alert(
"保存成功"
);


}
