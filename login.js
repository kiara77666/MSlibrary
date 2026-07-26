async function login(){


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



const {

data,

error

}=await client.auth.signInWithPassword({

email,

password

});



if(error){

alert(
"登录失败："+error.message
);

return;

}



alert("登录成功");


window.location.href=
"admin.html";


}
