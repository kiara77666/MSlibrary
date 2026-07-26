// ========= 修改这里 =========

// 登录 Supabase 后复制

const SUPABASE_URL =
"https://xxxx.supabase.co";

const SUPABASE_ANON_KEY =
"fzq080101.";
// ===========================

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// 上传图片
async function uploadImage(file){

    const fileName =
        Date.now()+"_"+file.name;

    const { error } = await client.storage
    .from("covers")
    .upload(fileName,file);

    if(error){

        alert(error.message);

        return null;

    }

    const { data } = client.storage
    .from("covers")
    .getPublicUrl(fileName);

    return data.publicUrl;

}
