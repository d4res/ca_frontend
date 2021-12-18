<template>
<div>
    <el-input v-model="cert" type="textarea" autosize="10" placeholder="请将证书输入此"> </el-input>
    <el-button @click="submit">
        验证
    </el-button>
</div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import msg from '../js/msg'
import check from '../js/check';
const url = location.origin + "/ca/vrfy";
export default {
    name: 'verify',
    data() {
        return {
          cert: ''
        }
    },
    beforeCreate() {
        check.check();
    },
    methods: {
        submit() {
            if (this.cert == ''){
                msg.msFail("您输入内容为空");
                return;
            }
            axios.post(url, {"cert": this.cert}, {
            headers: {
              "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
            },
            withCredentials: true
            }).then((response) => {
                if (response.data.error == 1) {
                    msg.msFail("证书验证失败");
                } else if (response.data.error == 2) {
                    msg.msFail("证书格式错误");
                } else{
                    msg.msSuccess("证书有效");
                }
            }).catch(()=>{
                msg.msFail("网络错误");
            })
        }
    }
}
</script>