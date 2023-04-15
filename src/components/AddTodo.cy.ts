import AddTodo from './AddTodo.vue'

describe('<AddTodo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AddTodo)
  })
})