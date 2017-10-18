import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import {getEntities} from 'App/stores/resources'
import {getFilter} from 'App/stores/todos'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import {Link} from "react-router";

const currrentTodos = (todos, listID) => {
  if (Array.isArray(todos)) {
    return todos.filter(todo => todo.listID === listID)
  }

  return []
}

const currentList = (lists, listID) => {
  if (Array.isArray(lists)) {
    const list = lists.find(list => list.id === listID)

    if (list) return list
  }

  return {}
}

const Todos = ({listID, lists, todos, addTodo, toggleTodo, setFilter}) => {
  const list = currentList(lists, listID)
  const {filter, name} = list

  return (
    <section className='pa3 pa5-ns'>
      <h1 className='f4 bold center mw6'><Link to={`/`}>
        Back To Home
      </Link></h1>

      <h1 className='f4 bold center mw6 well'>List Name: {name}</h1>

      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo)
        reset()
      }}/>


      <h1 className='f4 bold center mw6 flex'>Filter By: <TodoFilter {...{setFilter, list}} />
      </h1>
      <TodoList
        todos={currrentTodos(todos, listID)}
        {...{toggleTodo, filter}}
      />

    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array,
  lists: PropTypes.array
}

export default connect(
  (state, {params: {listID}}) => ({
    listID,
    lists: getEntities('lists')(state),
    todos: getEntities('todos')(state)
  }),
  (dispatch, {params: {listID}}) => ({
    addTodo: (text) => dispatch(actions.submitEntity({text, listID}, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({...todo, completed}, {type: 'todos'})),
    setFilter: (list, filter) => dispatch(actions.updateEntity({...list, filter}, {type: 'lists'}))
  })
)(Todos)
