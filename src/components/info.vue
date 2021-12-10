<template>
<div>
   <el-row>
      <el-col :span="2" :offset="8" class="left">
          指定序列号
      </el-col>
      <el-col :span="4">
        <el-input v-model="serial"> </el-input>
      </el-col>
      <el-col :span="2" >
      <el-button @click="submit">查询</el-button>
      </el-col>
  </el-row>
    <el-descriptions
    direction="vertical"
    border
    :column="1"
    v-show="show"
   >
    <el-descriptions-item label="证书公钥"><pre>{{cert.pub_key}}</pre></el-descriptions-item>
    <el-descriptions-item label="证书序列号">{{cert.serial}}</el-descriptions-item>
    <el-descriptions-item label="国家" > {{cert.subjectName.C}}</el-descriptions-item>
    <el-descriptions-item label="省份"> {{cert.subjectName.ST}} </el-descriptions-item>
    <el-descriptions-item label="城市"> {{cert.subjectName.L}}</el-descriptions-item>
    <el-descriptions-item label="组织"> {{cert.subjectName.O}}</el-descriptions-item>
  </el-descriptions>
</div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import msg from '../js/msg';
const url = location.origin + "/ca/info";
export default {
    name: 'info',
    data() {
        return {
            cert: {
                pub_key: '',
                serial: '',
                subjectName: {
                    C: '',
                    CN: '',
                    L: '',
                    O:'',
                    ST: ''
                }
            },
            show: false,
            serial: ''
        }
    },
    methods: {
        submit() {
            axios.post(url, {"serial": this.serial}, {
                headers: {
                    "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
                },
                withCredentials: true
            }).then((response) => {
                const error_code = response.data.error;
                if (error_code == 1) {
                    msg.msFail("没有与输入序列号所对应的证书");
                
                }
                else if (error_code == 2) 
                 {
                    msg.msFail("用户暂未注册证书");
                }
                else {
                    this.cert = response.data;
                    this.show = true;
                }
            })
        }
    }
}
</script>

<style scoped>

</style>