<template>
    <el-form :model="form">
        <el-form-item label="证书文件">
            <el-input v-model="form.pk" type="textarea"> </el-input>
        </el-form-item>
        <el-form-item>
            <el-button>
                验证
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'verify',
    data() {
        return {
            form: {
                pk:""
            }
        }
    }
}
</script>