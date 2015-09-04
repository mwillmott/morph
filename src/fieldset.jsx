import _ from "lodash";
import React, { Component } from "react";
import FieldContainer from "./fieldContainer";

@FieldContainer
class Fieldset extends Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    label: React.PropTypes.string
  }

  static defaultProps = {
    label: null
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }

  onChange(field, state) {
    let { fields } = this.state;
    fields[field] = state;

    this.setState({fields: fields}, () => {
      if (this.props.onChange)
        this.props.onChange(this.state.fields);
    });
  }

  traverseChildren(children) {
    if (typeof children !== 'object' || children === null)
      return children;

    return React.Children.map(children, (child, i) => {
      if (typeof child !== 'object' || child === null)
        return child;

      if (child.props && child.props.isFormInput)
        return React.cloneElement(child, {
            onChange: this.onChange.bind(this)
          }, child.props && child.props.children);

      return React.cloneElement(child, {}, this.traverseChildren(child.props && child.props.children));
    });
  }

  render() {
    const { label, children } = this.props;

    return (
      <fieldset>
        {label &&
          <label>{label}</label>}

        {this.traverseChildren(children)}
      </fieldset>
    );
  }
}

export default Fieldset;