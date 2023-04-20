<template>
  <div class="todo-list">
    <h3>Total {{ todos.length }}</h3>
    <button @click="removeTodos()" class="delete-all">DELETE ALL ❌</button>
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
            <div class="todo-item" @click="editTodoTitle(index)">
              <span v-if="todo.title">{{ todo.title }}</span>
              <span v-if="todo.storyPoint">[{{ todo.storyPoint }}]</span>
              <span v-if="todo.responsable">{{ todo.responsable }}</span>
              <button @click.stop="removeTodo(index)">❌</button>
            </div>
          </td>
          <td v-else>...</td>
          <td v-if="todo.status === 'in-progress...⌛'">
            <div class="todo-item" @click="editTodoTitle(index)">
              <span v-if="todo.title">{{ todo.title }}</span>
              <span v-if="todo.storyPoint">[{{ todo.storyPoint }}]</span>
              <span v-if="todo.responsable">{{ todo.responsable }}</span>
              <button @click.stop="removeTodo(index)">❌</button>
            </div>
            <!-- <div class="todo-item-right">
              <button @click.stop="removeTodo(index)">❌</button>
            </div> -->
          </td>
          <td v-else>...</td>
          <td v-if="todo.status === 'blockaed🛑'">
            <div class="todo-item" @click="editTodoTitle(index)">
              <span v-if="todo.title">{{ todo.title }}</span>
              <span v-if="todo.storyPoint">[{{ todo.storyPoint }}]</span>
              <span v-if="todo.responsable">{{ todo.responsable }}</span>
              <button @click.stop="removeTodo(index)">❌</button>
            </div>
          </td>
          <td v-else>...</td>
          <td v-if="todo.status === 'done✅'">
            <div class="todo-item" @click="editTodoTitle(index)">
              <span v-if="todo.title">{{ todo.title }}</span>
              <span v-if="todo.storyPoint">[{{ todo.storyPoint }}]</span>
              <span v-if="todo.responsable">{{ todo.responsable }}</span>
              <button @click.stop="removeTodo(index)">❌</button>
            </div>
          </td>
          <td v-else>...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

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
  emits: ['remove-todo', 'edit-todo', 'remove-todos'],
  methods: {
    removeTodo: function (index: number): void {
      this.$emit('remove-todo', index)
    },
    editTodoTitle: function (index: number): void {
      const todo = this.todos[index]

      // Set new title
      const newTitle = prompt('Enter new title', todo.title)
      if (newTitle === null || newTitle.trim() === '') {
        return
      }
      todo.title = newTitle.trim()

      // Set new responsible
      const newResponsable = prompt('Enter new responsible', todo.responsable)
      if (newResponsable === null || newResponsable.trim() === '') {
        return
      }
      todo.responsable = newResponsable.trim()

      // Set new status
      const newStatus = prompt('Enter new status', todo.status)
      if (newStatus === null || newStatus.trim() === '') {
        return
      }
      todo.status = newStatus.trim()

      // Set new story point
      const newStoryPoint = prompt('Enter new story point', todo.storyPoint.toString())
      if (newStoryPoint === null || isNaN(parseInt(newStoryPoint))) {
        return
      }
      todo.storyPoint = parseInt(newStoryPoint)

      this.$emit('edit-todo', todo)
    },
    removeTodos : function (): void {
      this.$emit('remove-todo')
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

.delete-all {
  background-color: #7b2b33;
  color: aliceblue;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  border-bottom: 1px solid gray;
  cursor: pointer;
}
.todo-item:hover {
  background-color: #a51e7b;
  color: #f2f2f2;
}
</style>
