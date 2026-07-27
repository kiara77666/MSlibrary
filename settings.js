// ===============================
// MS Library 设置
// ===============================



// 页面打开读取主题

loadTheme();





// ===============================
// 切换主题
// ===============================


function changeTheme(theme){



function changeTheme(theme){

document.body.className="";

document.body.classList.add(theme);


localStorage.setItem(
"theme",
theme
);


}



localStorage.setItem(

"theme",

theme

);



alert("主题已切换");



}






// ===============================
// 读取主题
// ===============================


function loadTheme(){


const theme =

localStorage.getItem("theme");



if(theme){


document.body.className = theme;


}


}
