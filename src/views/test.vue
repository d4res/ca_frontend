<template>

<div>
    <input type="file" name="files" id="files" value="" />
</div>
</template>

<script>

export default {
    name: "test",
    data() {
       
    },
    mounted() {
        var files = document.getElementById("files");
            files.onchange = () =>{
                var file = files.files[0];
                var reader = new FileReader();
                reader.readAsText(file, 'gb2312');
                reader.onload = ()=>{
                    console.log(reader.result);
                }
            }
            console.log(files);
    }
}
</script>