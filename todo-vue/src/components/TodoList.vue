<template>
  <div class="todo-list">
      <h2>투두</h2>
      <ul>
      <p v-for="todo in todos" :key="todo.id">{{ todo.title }}</p>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'TodoList',
    props: {
        todos: {
            type: Array, 
            required: true
        }
    }
}
</script>

<style>

</style>