import React, {PropTypes} from 'react'

import Todo from '../Todo'

const sortByDate = (arr) => arr.sort((a, b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.createdAt) - new Date(a.createdAt)
})

const filterTodos = (todos, filter) => {
  if (filter === 'completed') {
    return todos.filter(todo => todo.completed)
  }

  if (filter === 'active') {
    return todos.filter(todo => !todo.completed)
  }

  return [...todos]
}

const TodoList = ({todos, toggleTodo, filter}) => {
  const sortedTodos = todos && todos[0] ? sortByDate(todos) : null
  const filteredTodos = sortedTodos ? filterTodos(sortedTodos, filter) : []

  return (
    <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
      {filteredTodos.length > 0
        ? filteredTodos.map((todo, i) =>
          <Todo
            key={i}
            {...todo}
            toggle={() => toggleTodo(todo, !todo.completed)}
            isLast={(todos.length - 1) === i}
          />
        )
        : <p className='ph3 pv3 tc'>No todos found</p>
      }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
}

export default TodoList
