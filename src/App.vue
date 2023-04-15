<template>
  <div class="app">
    <h1>TP - Todo List</h1>
    <AddTodo @add-todo="addTodo"></AddTodo>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import AddTodo from './components/AddTodo.vue'

interface Todo {
  title: string
  storyPoint: number
  responsable: string
  status: string
}
interface State {
  newTodoText: string
  todos: Todo[]
  responsibleTicketCounts: Record<string, number>
}

export default defineComponent({
  name: 'App',
  components: {
    AddTodo
  },
  setup() {
    const state = reactive<State>({
      newTodoText: '',
      todos: [] as Todo[],
      responsibleTicketCounts: {}
    })
    // @ permet aux parents d'écouter ces événements et d'agir en conséquence.
    const addTodo = (newTodo: Todo): void => {
      const { title, storyPoint, responsable, status } = newTodo

      // Vérifier si le nombre de tickets attribués en statut "in-progress" au responsable est inférieur à 3
      const inProgressTodosForResponsable = state.todos.filter(
        (todo) => todo.responsable === responsable && (todo.status === 'in-progress' || todo.storyPoint )
      )
      // La somme des story points d'un responsable
      let sumStoryPoint = state.todos.filter(
        todo => todo.responsable === responsable
      ).reduce((sum, todo) => sum + todo.storyPoint, 0);

      if (inProgressTodosForResponsable.length < 3 || sumStoryPoint <= 10) {
        // Ajouter le nouveau todo
        state.todos.push({
          title,
          storyPoint,
          responsable,
          status
        })
        // Incrémenter le nombre de tickets attribués au responsable
        if (state.responsibleTicketCounts[responsable]) {
          // dans le cas responsable existe dèjà
          state.responsibleTicketCounts[responsable]++
        } else {
          // dans le cas où c'est nouveau
          state.responsibleTicketCounts[responsable] = 1
        }
      } else {
        console.error(
          `Le responsable "${responsable}" a déjà atteint son quota de tickets en statut "in-progress".`
        )
      }
    }
   
    return {
      newTodoText: state.newTodoText,
      todos: state.todos,
      addTodo,
    }
  }
})
</script>
