import React from 'react'
import PropTypes from 'prop-types'

function ButtonCatatan({type = 'button', title, onClick, children}) {
    return (
      <button className="action" type={type} title={title} onClick={onClick}>{children}</button>
    )
}
  
ButtonCatatan.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

ButtonCatatan.defaultProps = {
  onClick: () => { },
}

export default ButtonCatatan