<template>
    <el-descriptions
    direction="vertical"
    border
    :column="1"
  >
    <el-descriptions-item label="证书版本">{{cert.version}}</el-descriptions-item>
    <el-descriptions-item label="序列号">{{cert.sn}}</el-descriptions-item>
    <el-descriptions-item label="签名算法" >{{cert.signalg}}</el-descriptions-item>
    <el-descriptions-item label="签发者"> {{cert.signer}} </el-descriptions-item>
    <el-descriptions-item label="有效期"> </el-descriptions-item>

    <el-descriptions-item label="公钥算法"></el-descriptions-item>


  </el-descriptions>
</template>

<script>
export default {
    name: 'info',
    data() {
        return {
            cert: {
                version: '',
                sn: '',
                signalg: '',
                signer: ''
            }
        }
    }
}
</script>

<style scoped>

</style>