<template>

<div>
      <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="CSR">
      <el-input v-model="form.csr" type="textarea" placeholder="请将csr文件内容粘贴于此"></el-input>
    </el-form-item>
    <el-form-item>  
      <el-button type="primary" @click="onSubmit">申请</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  <div class="radius">
    {{cert}}
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie";
const url = location.origin + "/ca/getcert";

export default {
    name: "request",
    data() {
        return {
          form: {
            csr: '',
            
          },
          cert: '',
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

          this.cert = response.data.cert;

        })

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