import React from 'react';

import './modal.scss';

const Index = ({
  children,
  onClick,
  show,
  title,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className='modal-base'>
        <div className='modal-content'>
          <button className ="button-close" onClick={onClick}>X</button>
          <div className="title">{title}</div>
          {children}
        </div>
      </div>
    </div>
  )
}

Index.defaultProps = {
  show: false,
  title: '',
}

export default Index;