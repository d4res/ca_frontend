<template>

<div>
    <el-button @click="download">下载CSR制作工具</el-button>
      <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="CSR">
      <el-input v-model="form.csr" type="textarea" placeholder="请将csr文件内容粘贴于此" :rows="10" autosize=""></el-input>
    </el-form-item>
    <el-form-item>  

    </el-form-item>
  </el-form>
        <el-button type="primary" @click="onSubmit">申请</el-button>
      <el-button >取消</el-button>


</div>
</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie";
import msg from '../js/msg'
import check from '../js/check';
const url = location.origin + "/ca/getcert";

export default {
    name: "request",
    data() {
        return {
          form: {
            csr: '',
            
          },
          cert: '',
          show: false,
          serial: '',
        }
    },
    beforeCreate() {
      check.check();
    },
    methods: {
      onSubmit() {
        if (this.form.csr == '') {
          msg.msSuccess("您输入的内容为空");
          return;
        }
        axios.post(
          url, 
          {"csr": this.form.csr}, 
          {
            headers: {
              "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
            },
            withCredentials: true
          }
        ).then((response) => {
          if (response.data.error == 2) {
            msg.msFail("您已经拥有证书");
            // this.show = true;
          } else if (response.data.error == 1) {
            msg.msFail("证书格式不正确");
          }else {
            msg.msSuccess("申请成功 ");
          }
        })

      },
      download() {
        window.location = location.origin + ":8000/main.zip";
      }
    }
}
</script>

<style scoped>
.radius {
  text-align:left;
  border: 1px solid var(--el-border-color-base);
  border-radius: 4;
  margin-top: 20px;
}
</style>