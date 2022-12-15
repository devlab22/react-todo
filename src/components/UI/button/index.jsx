import React from 'react';
import './MyButton.scss'

export default function MyButton({children, ...props}) {

  props.className = props.className + " myBtn__base";

  return (
    <button {...props}>{children}</button>
  )
}