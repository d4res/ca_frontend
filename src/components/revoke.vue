<template>
  <el-row>
      <el-col :span="2" :offset="8" class="left">
          指定序列号
      </el-col>
      <el-col :span="4">
        <el-input v-model="serial"> </el-input>
      </el-col>
      <el-col :span="2" >
      <el-button @click="submit">撤销</el-button>
      </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import msg from '../js/msg';
import check from '../js/check';
const url = location.origin + "/ca/revoke";

export default { 
  name: "revoke",
  data() {
    return {
      serial: ''
    }
  },
  beforeCreate() {
    check.check();
  },
  methods: {
    submit() {

      if (this.serial == '') {
        msg.msFail("您输入的内容为空");
        return;
      }
      axios.post(url, {"serial": this.serial}, {
        headers: {
          "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
        },
        withCredentials: true
      }).then((response) => {
        const error_code = response.data.error;
        if (error_code == 0) {
          msg.msSuccess("撤销成功");
        }
        if (error_code == 1) {
          msg.msFail("只有管理员才能撤销他人的证书");
        }
        if (error_code == 2) {
          msg.msFail("没有查询到目的证书")
        }
      }).catch(()=>{
        msg.msFail("网络错误");
      })
    }
  }
}
</script>

<style scoped>

</style>