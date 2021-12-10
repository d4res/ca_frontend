<template>

<div>
  <el-row justify="center">
    <el-button @click="download">下载CSR制作工具</el-button>
  </el-row>
      <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="CSR">
      <el-input v-model="form.csr" type="textarea" placeholder="请将csr文件内容粘贴于此"></el-input>
    </el-form-item>
    <el-form-item>  
      <el-button type="primary" @click="onSubmit">申请</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  <div class="radius" v-show="show">
    {{cert}}
  </div>

</div>
</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie";
import msg from '../js/msg'
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
    methods: {
      onSubmit() {
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
            msg.msFail("您已经拥有公钥文件");
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