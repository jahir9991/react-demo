import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddList from './components/AddList'
import ListList from './components/ListList'

const Todos = ({ lists, addList }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddList onSubmit={({list}, _, {reset}) => {
        addList(list)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Lists</h1>
      <ListList lists={lists} />
    </section>
  )
}

Todos.propTypes = {
  lists: PropTypes.array
}

export default connect(
  state => ({
    lists: getEntities('lists')(state)
  }),
  dispatch => ({
    addList: (name) => dispatch(actions.submitEntity({ name }, {type: 'lists'})),
  })
)(Todos)
