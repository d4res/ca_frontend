<template>

<div>
<h1>test</h1>    

<h1>{{test}}</h1>

<el-button @click="btn"> </el-button>

</div>
</template>

<script>
//import aes from '../js/crypt.js';
import axios from 'axios';
import g from '../components/Global.vue';
import jsencrypt from 'jsencrypt';
//const url = location.origin + "/auth/";
export default {
    name: "test",
    data() {
        return {
            test: "123"
        }
    },
    setup() {
        axios.post("http://81.68.245.247:9000/bank.php").then((response)=>{
            console.log(response.data);
        })

        var rsa_encryptor = new jsencrypt();
        rsa_encryptor.setPublicKey(g.rsa_pub);
        var ct  = rsa_encryptor.encrypt("test");
        console.log(ct);

        var rsa_decryptor = new jsencrypt();
        rsa_decryptor.setPrivateKey(g.rsa_priv);
        console.log(rsa_decryptor.decrypt(ct));
    },
    methods: {
        btn() {
            this.test += 1;
            console.log(this.test);
        }
    }
}
</script>