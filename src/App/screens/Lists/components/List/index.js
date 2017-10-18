import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import classNames from 'classnames'

const List = ({ id, name, isLast }) => {
  const todoClass = classNames(
    'ph3 pv3 pointer bg-animate hover-bg-light-gray',
    {
      'bb b--light-silver': !isLast
    }
  )

  return (
    <li className={todoClass}>
      <Link to={`/list/${id}`}>
        {name}
      </Link>
    </li>
  )
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool
}

export default List
