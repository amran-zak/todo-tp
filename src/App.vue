<template>
  <div>
    <div class="todolist"><h1>Todo List</h1></div>
    <div class="app-container">
      <div class="left-panel">
        <AddTodo @add-todo="addTodo"></AddTodo>
        
      </div>
      <div class="right-panel">
        <TodoFilters
          :filter="filter"
          @set-filter="setFilterBy"
          @filter-title="filterTitle"
          @filter-story-point="filterStoryPoint"
          @filter-responsable="filterResponsable"
        ></TodoFilters>
        <TodoList :todos="filteredTodos" @remove-todo="removeTodo" @remove-todos="removeTodos"></TodoList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import AddTodo from './components/AddTodo.vue'
import TodoList from './components/TodoList.vue'
import TodoFilters from './components/TodoFilters.vue'
import { computed } from 'vue'

interface Todo {
  title: string
  storyPoint: number
  responsable: string
  status: string
}
interface State {
  todos: Todo[]
  filter: 'all' | 'title' | 'storyPoint' | 'responsable'
  filterTitle: string
  filterStoryPoint: number
  filterResponsable: string
  responsibleTicketCounts: Record<string, number>
}

export default defineComponent({
  name: 'App',
  components: {
    AddTodo,
    TodoList,
    TodoFilters
  },
  setup() {
    const state = reactive<State>({
      todos: [] as Todo[],
      filter: 'all',
      filterTitle: '',
      filterStoryPoint: 1,
      filterResponsable: '',
      responsibleTicketCounts: {}
    })
    // @ permet aux parents d'écouter ces événements et d'agir en conséquence.
    const addTodo = (newTodo: Todo): void => {
      const { title, storyPoint, responsable, status } = newTodo

      // Vérifier si le nombre de tickets attribués en statut "in-progress" au responsable est inférieur à 3
      const inProgressTodosForResponsable = state.todos.filter(
        (todo) =>
          todo.responsable === responsable && (todo.status === 'in-progress' || todo.storyPoint)
      )
      // La somme des story points d'un responsable
      let sumStoryPoint = state.todos
        .filter((todo) => todo.responsable === responsable)
        .reduce((sum, todo) => sum + todo.storyPoint, 0)

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

    const removeTodo = (index: number): void => {
      state.todos.splice(index, 1)
    }

    const removeTodos = (): void => {
      state.todos.splice(0)
    }

    const setFilterBy = (filter: 'all' | 'title' | 'storyPoint' | 'responsable'): void => {
      state.filter = filter
    }

    const filterTitle = (title: string): void => {
      state.filterTitle = title
    }

    const filterStoryPoint = (storyPoint: number): void => {
      state.filterStoryPoint = storyPoint
    }

    const filterResponsable = (responsable: string): void => {
      state.filterResponsable = responsable
    }

    const filteredTodos = computed(() => {
      switch (state.filter) {
        case 'all':
          return state.todos
        case 'title':
          return state.todos.filter((todo) =>
            todo.title.toLowerCase().includes(state.filterTitle.toLowerCase())
          )
        case 'storyPoint':
          return state.filterStoryPoint == 0
            ? state.todos
            : state.todos.filter((todo) => todo.storyPoint == state.filterStoryPoint)
        case 'responsable':
          return state.filterResponsable === ''
            ? state.todos
            : state.todos.filter((todo) => todo.responsable == state.filterResponsable)
        default:
          return state.todos
      }
    })

    return {
      // add todo
      addTodo,

      // list of todo states
      todos: state.todos,
      removeTodo,
      removeTodos,

      // filter
      filter: state.filter,

      setFilterBy,
      filteredTodos,

      filterTitle,
      filterStoryPoint,
      filterResponsable
    }
  }
})
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: space-between;
}

.left-panel {
  flex-basis: 30%;
}

.right-panel {
  flex-basis: 65%;
}
.todo.list {
  text-align: center;
}
.add-todo {
  border: 1px solid rgb(233, 12, 230);
  padding: 4%;
}
.todolist {
  text-align: center;
}
</style>
