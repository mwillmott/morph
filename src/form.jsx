import React, { Component } from "react";
import Fieldset from "./fieldset";

class Form extends Component {
  static propTypes = {
    onSubmit: React.PropTypes.func,
    label: React.PropTypes.string
  }

  static defaultProps = {
    label: null
  }

  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  onChange(field, state) {
    this.setState(state);
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.props.onSubmit)
      this.props.onSubmit(this.state.value);
  }

  reset() {
    this.refs.topLevelFieldset.reset();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <Fieldset ref='topLevelFieldset' onChange={this.onChange.bind(this)}>
          {this.props.children}
        </Fieldset>
      </form>
    );
  }
}

export default Form;