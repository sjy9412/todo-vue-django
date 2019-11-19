<template>
  <div class="login">
      <h2>로그인</h2>
      <LoginForm/>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
    name: 'Login',
    components: {
        LoginForm
    },
}
</script>

<style>

</style>