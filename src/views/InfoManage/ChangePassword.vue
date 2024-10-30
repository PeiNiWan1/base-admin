<template>
  <ContentWrap>
    <ElForm :model="form" ref="formRef" label-width="100px" @submit.prevent="handleSubmit">
      <ElFormItem label="旧密码" prop="oldPassword" :rules="rules.oldPassword">
        <ElInput type="password" v-model="form.oldPassword" />
      </ElFormItem>
      <ElFormItem label="新密码" prop="newPassword" :rules="rules.newPassword">
        <ElInput type="password" v-model="form.newPassword" />
      </ElFormItem>
      <ElFormItem label="确认新密码" prop="confirmPassword" :rules="rules.confirmPassword">
        <ElInput type="password" v-model="form.confirmPassword" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ContentWrap>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElForm, ElInput, ElFormItem, ElButton, ElMessage } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { changePassworddApi } from '@/api/login'
const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const rules = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6到20个字符之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== form.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()

    const res = await changePassworddApi(form.value)
    if (res.code === 0) {
      ElMessage.success('修改密码成功')
    } else {
      ElMessage.error('修改密码失败')
    }
  } catch (error) {
    console.log('表单校验失败')
  }
}
</script>

<style scoped>
/* 添加自定义样式 */
</style>
