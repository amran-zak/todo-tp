<template>
  <div class="todo-list">
    <h3>Total {{ todos.length }}</h3>
    <table>
      <thead>
        <tr>
          <th>TODO 📑</th>
          <th>IN-PROGRESS ⌛</th>
          <th>BLOCKED 🛑</th>
          <th>DONE ✅</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos" :key="index" :class="todo.status">
          <td v-if="todo.status === 'todo📑'">
            {{ todo.title }} <button @click="removeTodo(index)">X</button>
          </td>
          <td v-else>...</td>
          <td v-if="todo.status === 'in-progress...⌛'">
            {{ todo.title }} <button @click="removeTodo(index)">X</button>
          </td>
          <td v-else>...</td>
          <td v-if="todo.status === 'blockaed🛑'">
            {{ todo.title }} <button @click="removeTodo(index)">X</button>
          </td>
          <td v-else>...</td>
          <td v-if="todo.status === 'done✅'">
            {{ todo.title }} <button @click="removeTodo(index)">X</button>
          </td>
          <td v-else>...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Todo {
  title: string
  storyPoint: number
  responsable: string
  status: string
}

export default defineComponent({
  name: 'TodoList',
  props: {
    todos: {
      type: Array as () => Todo[],
      required: true
    }
  },
  setup(props, { emit }) {
    const removeTodo = (index: number): void => {
      emit('remove-todo', index)
    }

    return {
      removeTodo
    }
  }
})
</script>

<style scoped>

.todo-list {
  margin-top: 1rem;
  width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
tbody {
  border: 1px solid #d7069c;
  padding: 8px;
  text-align: center;
}
td {
  border-right: 1px solid #d7069c;
}

th {
  background-color: #f2f2f2;
  color: #000;
  text-align: center;
  font-weight: bold;
}

tr.todo {
  background-color: #ffc107;
}

tr.in-progress {
  background-color: #17a2b8;
  color: white;
}

tr.blocked {
  background-color: #dc3545;
  color: white;
}

tr.done {
  background-color: #28a745;
  color: white;
}
</style>
