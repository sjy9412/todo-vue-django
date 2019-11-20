<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- PascalCase, uppercamelcase -->
    <!-- 이벤트 리스터 등록 -->
    <TodoForm @todoCreate-event="TodoCreate"/> 
    <!-- Kebab-case도 가능 -->
    <TodoList :todos="todos"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'

import axios from 'axios'
// import jwtDecode from 'jwt-decode'
import router from '../router'
import { mapGetters } from 'vuex' // from bs4 import BeautifulSoup와 같은 문법

export default {
  name: 'home',
  components: {
    TodoList,
    TodoForm
  },
  data() {
    // 컴포넌트에서는 반드시 data를 함수로 작성하고, object를 리턴한다.
    return {
      todos: [],
    }
  },
  computed: {
    // spread 문법 (...)
    ...mapGetters([
      'options',
      'user'
    ])
    // 함수처럼 쓰지만 변수임
    // options() {
    //   return this.$store.getters.options
    // },
    // user() {
    //   return this.$store.getter.user
    // }
  },
  methods: {
    TodoCreate(title) {
      console.log('==부모 컴포넌트==')
      console.log(title)
    //   this.$session.start()
    //   const token = this.$session.get('jwt')
    //   const options = {
    //   headers: {
    //     Authorization: `JWT ${token}` // JWT 다음에 공백있음!
    //   }
    // }
      // console.log(jwtDecode(token))
      const data = {
        title: title,
        // user: jwtDecode(token).user_id
        user: this.user
      }
      // request.POST인 경우는 반드시 FormData!
      // const formData = new FormData()
      // formData.append('title', title)
      // formData.append('user', 1)
      axios.post('http://127.0.0.1:8000/api/v1/todos/', data, this.options)
        .then(response => {
          console.log(response)
          this.todos.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTodos() {
    //axios 요청시마다 헤더를 추가해서 보내야함
    // this.$session.start()
    // const token = this.$session.get('jwt')
    // const options = {
    //   headers: {
    //     Authorization: `JWT ${token}` // JWT 다음에 공백있음!
    //   }
    // }
    axios.get(`http://127.0.0.1:8000/api/v1/users/${this.user}/`, this.options)
      .then(response => {
        console.log(response) // 만약, 오류가 발생하게 되면 ESLint 설정을 package.json에 추가
        this.todos = response.data.todo_set
      })
      .catch(error => {
        console.log(error)
      })
    },
    islogin() {
      this.$session.start()
      // session에 jwt가 없다면(토큰이 없다면, 비로그인 이라면)
      if (!this.$session.has('jwt')) {
        router.push('/login')
      } else {
        // 로그인 되어 있다면, vues token 업데이트
        this.$store.dispatch('login', this.$session.get('jwt'))
      }
    }
  },
  mounted() {
    this.islogin() // 로그인 되어 있으면
    this.getTodos() // 가져온다
  },
}
</script>
