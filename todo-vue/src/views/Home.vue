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
  methods: {
    TodoCreate(title) {
      console.log('==부모 컴포넌트==')
      console.log(title)
      const data = {
        title: title,
        user: 1
      }
      // request.POST인 경우는 반드시 FormData!
      // const formData = new FormData()
      // formData.append('title', title)
      // formData.append('user', 1)
      axios.post('http://127.0.0.1:8000/api/v1/todos/', data)
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
    this.$session.start()
    const token = this.$session.get('jwt')
    const options = {
      headers: {
        Authorization: `JWT ${token}` // JWT 다음에 공백있음!
      }
    }
    axios.get('http://127.0.0.1:8000/api/v1/todos/', options)
      .then(response => {
        console.log(response.data[0].title) // 만약, 오류가 발생하게 되면 ESLint 설정을 package.json에 추가
        this.todos = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getTodos()
  }
}
</script>
