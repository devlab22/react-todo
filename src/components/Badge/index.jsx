import React from 'react';

import './Badge.scss';

export default function Badge({ color, hex, width=16, onClick, className }) {

  return (
    <i
      style={{ backgroundColor: hex, width: width, height: width }}
      className={`badge ${color ? `badge__${color}` : ""} ${className ? className : ""}`}
      onClick={onClick}>
    </i>
  )
}
