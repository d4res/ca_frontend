<template>
      <el-menu 
          default-active
          class="Box"
          background-color="#409EFF"
          text-color="#fff"
          router="true"
          active-text-color="#ffd04b">
        <el-row >

          <el-col :span="4">
          <el-menu-item index="/Main/request">
            证书申请
          </el-menu-item>
          </el-col>

          <el-col :span="4">
          <el-menu-item index="/Main/download">
              证书下载
          </el-menu-item>
          </el-col>

          <el-col :span="4">
          <el-menu-item index="/Main/verify">  
            证书验证
          </el-menu-item>
          </el-col>


         <el-col :span="4">
          <el-menu-item index="/Main/revoke">  
            证书撤销
          </el-menu-item>
          </el-col>

          <el-col :span="4">
          <el-menu-item index="/Main/info">
            证书信息
          </el-menu-item>
          </el-col>

          <el-col :span="4">
              <el-menu-item index="/Main/userinfo">
                用户信息
              </el-menu-item>
          </el-col>
    </el-row>
    </el-menu>
</template>

<script>
export default {
    name: "mynav"
}
</script>

<style scoped>
.Box {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
}
</style>