import { getTodoIndexById } from '../selectors'
import * as actionType from '../../constants/ActionTypes'
const initialState = [
  {
    id: Date.now(),
    text: 'Consider using Redux',
    completed: true
  },
  {
    id: Date.now() + 1,
    text: 'Keep all state in a single tree',
    completed: false
  }
]
export function todosHandler(
  state = initialState,
  { type, id, text, completed }
) {
  const map = {
    [actionType.ADD_TODO]() {
      return state.concat({ id: Date.now(), text, completed: false })
    },
    [actionType.REMOVE_TODO]() {
      let targetTodoIndex = getTodoIndexById(state, id)
      let targetTodos = state.slice()
      targetTodos.splice(targetTodoIndex, 1)
      return targetTodos
    },
    [actionType.ALTER_TODO]() {
      let targetTodoIndex = getTodoIndexById(state, id)
      let targetTodos = state.slice()
      targetTodos[targetTodoIndex].text = text
      targetTodos[targetTodoIndex].completed = completed
      return targetTodos
    },
    [actionType.TOGGLE_TODO_COMPLETED]() {
      let targetTodoIndex = getTodoIndexById(state, id)
      let targetTodos = state.slice()
      targetTodos[targetTodoIndex].completed = completed
      return targetTodos
    }
  }
  return typeof map[type] === 'function' ? map[type]() : state
}
