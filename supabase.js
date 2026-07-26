// ========= 修改这里 =========

// 登录 Supabase 后复制

const SUPABASE_URL =
"https://gezpsfshwiluwwntjbdk.supabase.co/rest/v1/";

const SUPABASE_ANON_KEY =
"fzq0sb_secret_sbmK1DEGuy2jN_NlmmOQQg_l-F1S71F";
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
