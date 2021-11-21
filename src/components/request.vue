<template>

<div>
      <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="手机号码">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>
    
    <el-form-item label="公钥">
      <el-input v-model="form.pk" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">申请</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
    name: "request",
    data() {
        return {
           form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
        }
    }
}
</script>