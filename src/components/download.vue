<template>
<div>
  <el-alert
    title="提示"
    type="info"
    description="输入序列号以获取对应的证书，当序列号为空时，获得您账户对应的证书"
    show-icon
  >
  </el-alert>

  <el-row>
      <el-col :span="2" :offset="8" class="left">
          指定序列号
      </el-col>
      <el-col :span="4">
        <el-input v-model="serial"> </el-input>
      </el-col>
      <el-col :span="2" >
      <el-button @click="submit">下载</el-button>
      </el-col>
  </el-row>

   <el-row justify="center">
       <el-col :span="8">
            <el-card v-show="show" style="float: center;">
                <pre v-show="show" class="left" id="cert">
                     {{cert}}
                </pre>
            </el-card>
       </el-col>
   </el-row>
   
   <el-button id="copy" @click="copy" data-clipboard-target="#cert" v-show="show"> 
       一键复制
   </el-button>

</div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import msg from '../js/msg'
import Clipboard from 'clipboard'
const url = location.origin + "/ca/download";
export default {
    name: "download",
    data() {
        return {
            serial: '',
            show: false,
            cert: ''
        }
    },
    methods: {
        submit() {
            axios.post(url, {"serial": this.serial},
            {
            headers: {
              "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
            },
            withCredentials: true
            }
          ).then((response)=>{
              if (response.data.error == 1) {
                  msg.msFail("fail");
              } else {
                  this.cert = response.data.cert;
                  this.show = true;
              }
          })
        },
        copy() {
            let clipboard = new Clipboard('#copy');
            clipboard.on('success', (e) => {
                console.log("copy!");
                e.clearSelection();
            })
        }
    }
}
</script>

<style scoped>
.left {
    text-align: left;
}
</style>