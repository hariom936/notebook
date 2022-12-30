import React from 'react'

export const Alert = (props) => {
  return (
    <div className="alert alert-info" role="alert">
      {props.message};
    </div>
  )
}
