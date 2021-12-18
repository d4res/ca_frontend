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

 <el-table :data="users" stripe v-show="show">
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="serial" label="证书序列号" />
      </el-table>
</el-row>

<el-button type="danger" round @click="quit">退出登录</el-button>

</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie";
import msg from '../js/msg';
import check from '../js/check';
const url = location.origin + "/ca/usrinfo";
export default {
    name: "userinfo",
    data() {
      return  {
        username: '',
        serial: '',
        role: '',
        show: false,
        users: []
      }
    },
    beforeCreate() {
      check.check();
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
        if (this.role == "管理员") {
          
          axios.post(location.origin + "/ca/listuser", {}, {
            headers: {
                    "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
                },
                withCredentials: true
          }).then((data) => {
            this.users = data.data;
            this.show = true;
          })
        }
      }).catch(()=>{
        msg.msFail("网络错误");
      })
    },
    methods: {
      quit() {
        Cookies.remove("access_token_cookie");
        Cookies.remove("X-CSRF-TOKEN");
         this.$router.replace("/");
      }
    }
}
</script>

<style scoped>

</style>