<template>
  <form class="login-form" @submit.prevent="login">
      <!--  
          form에 이벤트 리스너 달아서,
          1) 사용자 입력값 출력
          2) /api-token-auth/로 요청 보내서 토큰값 출력
      -->
      <label for="user_id">USERNAME : </label>
      <input v-model="credentials.username" type="text" id="user_id"><br>
      <label for="password">PASSWORD : </label>
      <input v-model="credentials.password" type="password" name="" id="password"><br>
      <button type="submit">로그인</button>
  </form>
</template>

<script>
import axios from 'axios'
// 특정 폴더명으로 경로가 끝나게 되면, 폴더 내부의 indes.js를 뜻함
import router from '../router'
export default {
    name: 'LoginForm',
    data() {
        return {
            credentials: {}
        }
    },
    methods: {
        login() {
            axios.post('http://127.0.0.1:8000/api-token-auth/', this.credentials)
                .then(response => {
                    console.log(response.data.token)
                    const token = response.data.token
                    this.$session.start()
                    this.$session.set('jwt', token)
                    router.push('/')
                })
                .catch(error => {
                    console.log(error)
                })
            this.credentials = []
        }
    },
}
</script>

<style>

</style>