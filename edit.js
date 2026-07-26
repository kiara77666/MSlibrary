let editId =
new URLSearchParams(location.search)
.get("id");



// 加载旧数据

loadOld();



async function loadOld(){


const {

data,

error

}=await client

.from("works")

.select("*")

.eq("id",editId)

.single();



if(error){

alert(error.message);

return;

}



title.value=data.title;

cp.value=data.cp;

type.value=data.type;

url.value=data.url;

tags.value=data.tags||"";

description.value=data.description||"";


}




async function updateWork(){


let coverUrl=null;


const file =
document.getElementById("cover").files[0];



if(file){

coverUrl =
await uploadImage(file);

}




let updateData={


title:title.value,


cp:cp.value,


type:type.value,


url:url.value,


tags:tags.value,


description:description.value,


update:new Date()

};



if(coverUrl){

updateData.cover=coverUrl;

}



const {

error

}=await client

.from("works")

.update(updateData)

.eq("id",editId);



if(error){

alert(error.message);

return;

}



alert("修改成功");


location.href="admin.html";


}
