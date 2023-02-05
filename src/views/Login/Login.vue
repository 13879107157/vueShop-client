<template>
    <div class="login">
        <el-form class="form-wrap" label-position="top" label-width="100px" :model="formData">
            <h2>登录/login</h2>
            <el-form-item label="用户名">
                <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password" />
            </el-form-item>

            <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import axios from '@/api/request'

function submitForm() {
    const { username, password } = formData.value
    axios.post('login', { username, password }).then(res => {
        console.log(res);
    })
}
const formData = ref({
    username: 'admin',
    password: '123456',
})
</script>

<style>
@import './login.css'
</style>
