<template>

<h1>test</h1>    


</template>

<script>
//import aes from '../js/crypt.js';
//import axios from 'axios';
import g from '../components/Global.vue';
import jsencrypt from 'jsencrypt';
//const url = location.origin + "/auth/";
export default {
    name: "test",
    setup() {
        // const key = aes.b64parse(g.aes_key);
        // const iv = aes.b64parse(g.aes_iv);
        
        //const ct = aes.encrypt(key, iv, "msg")
       
        // axios.post(url + "echo", {"ct": ct}).then((response)=>{
        //     console.log(aes.decrypt(key, iv, response.data.ct)); 
        // });

        var rsa_encryptor = new jsencrypt();
        rsa_encryptor.setPublicKey(g.rsa_pub);
        var ct  = rsa_encryptor.encrypt("test");
        console.log(ct);

        var rsa_decryptor = new jsencrypt();
        rsa_decryptor.setPrivateKey(g.rsa_priv);
        console.log(rsa_decryptor.decrypt(ct));
    }
}
</script>