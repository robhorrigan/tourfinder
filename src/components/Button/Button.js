import React from 'react'
import styles from './Button.scss'
import classNames from 'classnames'

type Props = {
  children: Object,
  type: String,
  className: String,
  style: Object
}

export class Button extends React.Component {
  props: Props;

  defaultProps = {
    type: 'button',
    style: {}
  }

  render () {
    const classes = classNames(styles.Button, this.props.className)
    return (
      <button {...this.props} className={classes}>
        {this.props.children}
      </button>
    )
  }
}

export default Button
