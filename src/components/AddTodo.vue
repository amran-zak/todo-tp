<template>
  <div class="add-todo">
    <div>
      <span><strong>Title </strong></span>
      <input type="text" v-model="newTodoTitle" placeholder="Title" required/>
    </div>
    <div class="add-todo-range-container">
      <span>Story point </span>
      <input
        type="range"
        v-model="newTodoStoryPoint"
        min="1"
        max="10"
        step="1"
        class="add-todo-range"
      />
      <span class="add-todo-range-value">{{ newTodoStoryPoint }}</span>
    </div>
    <div>
      <span><strong>Responsable </strong></span>
      <select v-model="newTodoResponsable">
        <option v-for="responsable in responsables" :key="responsable">{{ responsable }}</option>
      </select>
    </div>
    <div>
      <span><strong>Status </strong></span
      ><select v-model="newTodoStatus">
        <option v-for="status in statuses" :key="status">{{ status }}</option>
      </select>
    </div>

    <button @click="addTodo">Add TODO</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AddTodo',
  setup(props, { emit }) {
    // les champs
    const newTodoTitle = ref('')
    const newTodoStoryPoint = ref(0)
    const newTodoResponsable = ref('')
    const newTodoStatus = ref('')

    // les listes
    const responsables = ['Amran', 'Zeo', 'Kaki', 'Chou', 'Akira']
    const statuses = ['todo📑', 'in-progress...⌛', 'blockaed🛑', 'done✅']

    // function to add to the list
    const addTodo = (): void => {
      if (
        newTodoTitle.value.trim() &&
        newTodoResponsable.value.trim() &&
        newTodoStatus.value.trim() &&
        newTodoStoryPoint.value > 0
      ) {
        const newTodo = {
          title: newTodoTitle.value.trim(),
          storyPoint: parseInt(newTodoStoryPoint.value.toString()),
          responsable: newTodoResponsable.value.trim(),
          status: newTodoStatus.value.trim()
        }
        // emit permet aux composants enfants d'envoyer des informations à leurs parents en déclenchant des événements personnalisés
        // Cet événement envoie le nouveau todo en tant que paramètre.
        emit('add-todo', newTodo)
        newTodoTitle.value = ''
        newTodoStoryPoint.value = 1
        newTodoResponsable.value = ''
        newTodoStatus.value = ''
      }else {
    alert('Veuillez remplir tous les champs avant d\'ajouter une nouvelle tâche.')
  }
    }

    return {
      newTodoTitle,
      newTodoStoryPoint,
      newTodoResponsable,
      newTodoStatus,
      responsables,
      statuses,
      addTodo
    }
  }
})
</script>

<style scoped>
.add-todo {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
}

.add-todo-label {
  grid-column: 1 / span 2;
}

.add-todo input[type='text'],
.add-todo select {
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #000;
  color: #fff;
}

.add-todo button {
  margin: 0.5rem;
  font-size: 2rem;
  border: none;
  border-radius: 4px;
  background-color: #f218d5;
  color: #fff;
  cursor: pointer;
  width: 70%;
}
.add-todo-range-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.add-todo-range {
  width: 60%;
}

.add-todo-range-value {
  margin-left: 0.5rem;
}
</style>
