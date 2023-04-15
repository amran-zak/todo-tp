<template>
  <div class="todo-filters">
    <div class="element-filter">
      <button :class="{ active: filter === 'all' }" @click="setFilter('all')">All</button>
      <input
        type="text"
        v-model="filterTodoTitle"
        placeholder="Title"
        :class="{ title: filter === 'title' }"
        @keydown.enter="filterTitle"
        @keydown.delete="setFilter('all')"
      />
      <input
        type="range"
        v-model="filterTodoStoryPoint"
        min="0"
        max="10"
        step="1"
        class="add-todo-range"
        @input="filterStoryPoint"
      />
      <span class="add-todo-range-value">{{ filterTodoStoryPoint }}</span>
      <select v-model="filterTodoResponsable" @change="filterResponsable">
        <option v-for="responsable in responsables" :key="responsable">{{ responsable }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import {  defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'TodoFilters',
  props: {
    filter: {
      type: String as () => 'all' | 'title' | 'storyPoint' | 'responsable',
      required: true
    }
  },
  setup(props, { emit }) {
    // les champs
    const filterTodoTitle = ref('')
    const filterTodoStoryPoint = ref(0)

    const filterTodoResponsable = ref('')

    const responsables = ['', 'Amran', 'Zeo', 'Kaki', 'Chou', 'Akira']
    
    const setFilter = (filter: 'all' | 'title' | 'storyPoint' | 'responsable'): void => {
      emit('set-filter', filter)
    }

    const filterTitle = (): void => {
      setFilter('title');
      emit('filter-title', filterTodoTitle.value)
    }
    const filterStoryPoint = (): void => {
      setFilter('storyPoint');
      emit('filter-story-point', filterTodoStoryPoint.value)
    }
    const filterResponsable = (): void => {
      setFilter('responsable');
      emit('filter-responsable', filterTodoResponsable.value)
    }


    return {
      setFilter,
      responsables,

      filterTodoTitle,
      filterTodoStoryPoint,
      filterTodoResponsable,

      filterTitle,
      filterStoryPoint,
      filterResponsable,
    }
  }
})
</script>

<style scoped>
.todo-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: large;
  
}

.todo-filters div {
  display: flex;
  align-items: center;
}
.element-filter input {
  margin-left: 3%;
  background-color: black;
  color: azure;
}
.element-filter select {
  margin-left: 3%;
  background-color: black;
  color: azure;
}
</style>
