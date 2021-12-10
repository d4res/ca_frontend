<template>
<el-row>
    <el-descriptions
    direction="vertical"
    border
    :column="1"
    style="width: 100%;"
   >
    <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
    <el-descriptions-item label="证书编号">{{serial}}</el-descriptions-item>
    <el-descriptions-item label="用户身份">{{role}}</el-descriptions-item>
  </el-descriptions>

</el-row>
</template>

<script>
import axios from 'axios';
import msg from '../js/msg';
import Cookies from 'js-cookie'
const url = location.origin + "/ca/usrinfo";
export default {
    name: "userinfo",
    data() {
      return  {
        username: '',
        serial: '',
        role: ''
      }
    },
    created() {
      axios.post(url, {}, {
        headers: {
                    "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
                },
                withCredentials: true
      }).then((response) => {
        const resp = response.data;
        this.username = resp.username;
        this.serial = resp.serial;
        this.role = resp.role;
        console.log(response.data);
      }).catch(()=>{
        msg.msFail("网络错误");
      })
    }
}
</script>

<style scoped>

</style>