<template>
<div>
    <el-input v-model="cert" type="textarea"> </el-input>
    <el-button @click="submit">
        验证
    </el-button>
</div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import msg from '../js/msg'
const url = location.origin + "/ca/vrfy";
export default {
    name: 'verify',
    data() {
        return {
          cert: ''
        }
    },
    methods: {
        submit() {
            axios.post(url, {"cert": this.cert}, {
            headers: {
              "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
            },
            withCredentials: true
            }).then((response) => {
                if (response.data.error == 1) {
                    msg.msFail("fail");
                } else {
                    msg.msSuccess("success");
                }
            })
        }
    }
}
</script>