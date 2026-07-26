async function saveWork(){


    const titleValue =
        document.getElementById("title").value;


    const cpValue =
        document.getElementById("cp").value;


    const typeValue =
        document.getElementById("type").value;


    const urlValue =
        document.getElementById("url").value;


    const tagsValue =
        document.getElementById("tags").value;


    const descriptionValue =
        document.getElementById("description").value;


    const file =
        document.getElementById("cover").files[0];



    if(!titleValue || !urlValue){

        alert("请填写作品名称和链接");

        return;

    }



    let coverUrl="";



    // 如果选择了图片，上传封面

    if(file){

        coverUrl =
        await uploadImage(file);

        if(!coverUrl){

            return;

        }

    }



    const {

        data,

        error

    } = await client

    .from("works")

    .insert([{

        title:titleValue,

        cp:cpValue,

        type:typeValue,

        cover:coverUrl,

        url:urlValue,

        tags:tagsValue,

        description:descriptionValue,

        update:new Date()

    }]);



    if(error){

        alert(
            "保存失败："+error.message
        );

        return;

    }



    alert("作品添加成功！");



    // 清空表单

    document.querySelectorAll(
        "input,textarea"
    )
    .forEach(
        e=>e.value=""
    );


}
