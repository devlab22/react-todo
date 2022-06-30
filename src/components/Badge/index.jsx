import React from 'react';
import classNames from 'classnames';

import './Badge.scss';

export default function Badge({color, hex, onClick, className}) {

  return (
    <i style={{ backgroundColor: hex }} className={classNames('badge', {[`badge-${color}`]: color}, className)} onClick={onClick}></i>
  )
}
