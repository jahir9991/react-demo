import React, { PropTypes } from 'react'

import classNames from 'classnames'

const TodoFilter = ({ list, setFilter }) => {
  const todoFilters = ['all', 'active','completed']

  return (
    <div className="flex items-center justify-center pa2">
      {todoFilters.map(f => <button key={f}
          className={classNames(
            "f6 ttc br2 bg-animate hover-bg-mid-gray hover-white inline-flex items-center pa2 ba border-box mr2",
            {"bg-black-70 white": f === list.filter},
            {"bg-white-70 black pointer": f !== list.filter}
          )}
          children={f}
          onClick={() => setFilter(list, f)}
        />)}
    </div>
  )
}

TodoFilter.propTypes = {
  list: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default TodoFilter
