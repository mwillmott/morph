import React, { Component } from "react";
import FieldContainer from "./fieldContainer";

@FieldContainer
class TextField extends Component {
  static defaultProps = {
    label: null
  }

  focus() {
    React.findDOMNode(this.refs.input).focus();
  }

  setValue(value) {
    React.findDOMNode(this.refs.input).value = value;
  }

  onChange(e) {
    if (this.props.onChange)
      this.props.onChange(e.target.value);
  }

  render() {
    const { id, label, isValid, errors, ...props } = this.props;

    return (
      <div>
        {label &&
          <label className={styles.label} for={id}>
            {label}
          </label>}
        <input
          {...props}
          ref="input"
          id={id}
          type="text"
          onChange={this.onChange.bind(this)}
          onBlur={this.onChange.bind(this)} />
        {!isValid && errors &&
          <span>{errors}</span>}
      </div>
    );
  }
}

export default TextField;