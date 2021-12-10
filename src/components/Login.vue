<template>
<div>
  <el-row align="center">
    <el-col :span="10" :offset="7">
      <el-tabs type="border-card">
        <el-tab-pane label="登录">
          <el-form :model="lgForm">
            <el-input type="text" v-model="lgForm.username">
              <template #prepend > <span> 用户名  </span></template>
            </el-input>

            <el-input type="password" v-model="lgForm.password">
              <template #prepend> <span > 密码 </span> </template>
            </el-input>

            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <el-form :model="regForm">
            <el-input type="text" v-model="regForm.username">
              <template #prepend> <span> 用户名 </span> </template>
            </el-input>

            <el-input type="password" v-model="regForm.password">
              <template #prepend> <span> 密码  </span></template>
            </el-input>

            <el-input type="password" v-model="regForm.confirm">
              <template #prepend> <span> 重复密码 </span></template>
            </el-input>
            <el-form-item>
              <el-button type="info" @click="register"> 注册 </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
  <el-dialog
    v-model="dialogVisible"
    title="请输入邮箱验证码"
    width="30%"
  >
  
  </el-dialog>
</div>
</template>

<script>
const url = location.origin + "/auth/";
import aes from '../js/aes.js';
import axios from 'axios';
import rsa from '../js/rsa.js';
import { ElMessageBox } from "element-plus";
axios.defaults.withCredentials = true;
const aes_key = aes.init_key();
const aes_iv = aes.init_iv();

console.log(aes.b64stringify(aes_key));
console.log(aes.b64stringify(aes_iv));
console.log(aes.encrypt(aes_key, aes_iv, "test"));
export default {
  name: "Login",
  setup() {
    sessionStorage.setItem('aes_key', aes.b64stringify(aes_key));
    sessionStorage.setItem('aes_iv', aes.b64stringify(aes_iv));
    const msSuccess = (msg) => {
      ElMessageBox.alert(msg, "提示", {
        confirmButtonText: "OK",
      }).then((value) => {
        axios.post(url + "check", value);
      });
    };

    const msFail = (msg) => {
      ElMessageBox.alert(msg, "错误", {
        confirmButtonText: "OK",
      });
    };

    return {
      msSuccess,
      msFail,
    };
  },
  data() {
    return {
      lgForm: {
        username: "",
        password: "",
      },
      regForm: {
        username: "",
        password: "",
        confirm: "",
      },
    };
  },
  methods: {
    login() {
      
      if (this.lgForm.username === "" || this.lgForm.password === "") {
        this.msFail("请完整填写表单");
        return;
      }
      console.log(url + "login");
      axios
        .post(url + "login", {
          username: aes.encrypt(aes_key, aes_iv, this.lgForm.username),
          password: aes.encrypt(aes_key, aes_iv, this.lgForm.password),
          aes_key : rsa.encrypt(aes.b64stringify(aes_key)),
          aes_iv : rsa.encrypt(aes.b64stringify(aes_iv))
        })
        .then((responese) => {
          const res = responese.data;
          if (res.error === "0") {
            this.$router.replace("/Main");
            ///this.msSuccess(res.msg);
          } else {
            this.msFail(res.msg);
          }
        })
        .catch((responese) => {
          console.log(responese);
          this.msFail("网络请求错误");
        });
    },

    register() {
      if (
        this.regForm.username === "" ||
        this.regForm.password === "" ||
        this.regForm.confirm === ""
      ) {
        this.msFail("请完整填写表单");
        return;
      }
      if (this.regForm.password !== this.regForm.confirm) {
        this.msFail("密码重复错误");
        return;
      }

      axios
        .post(url + "register", {
          username: aes.encrypt(aes_key, aes_iv, this.regForm.username),
          password: aes.encrypt(aes_key, aes_iv, this.regForm.password),
          aes_key : rsa.encrypt(aes.b64stringify(aes_key)),
          aes_iv : rsa.encrypt(aes.b64stringify(aes_iv))
        })
        .then((responese) => {
          const res = responese.data;
          if (res.error === "0") {
            this.msSuccess(res.msg);
          } else {
            this.msFail(res.msg);
          }
        })
        .catch(() => {
          this.msFail("网络请求错误");
        });
    },
  },
};
</script>

<style scoped>
span {

  float:left;
  width: 50px;
}
</style>