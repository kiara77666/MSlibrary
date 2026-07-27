// ===============================
// MS Library 设置
// ===============================


// 页面加载读取主题

loadTheme();




// ===============================
// 切换主题
// ===============================


function changeTheme(theme){


    document.body.className = theme;


    localStorage.setItem(
        "theme",
        theme
    );


}





// ===============================
// 读取保存主题
// ===============================


function loadTheme(){


    const theme =
    localStorage.getItem("theme");



    if(theme){

        document.body.className = theme;

    }

}
