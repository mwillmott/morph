import _ from "lodash";
import React, { Component } from "react";

export default (ComposedComponent) => {
  return class FieldContainer extends Component {
    static defaultProps = {
      defaultValue: null,
      isFormInput: true
    }

    componentDidMount() {
      this.onChange(this.props.defaultValue);
    }

    getValues(data) {
      if (typeof data === "object" && data !== null) {
        return _.mapValues(data, (field) => {
          if (typeof field.data !== "undefined") {
            return this.getValues(field.data);
          } else {
            return field;
          }
        });
      } else {
        return data;
      }
    }

    onChange(data) {
      let values = this.getValues(data);

      this.setState({
        data: data,
        value: values
      }, () => {
        if (this.props.onChange)
          this.props.onChange(this.props.name, this.state);
      });
    }

    reset() {
      this.refs.field.setValue(this.props.defaultValue);
    }

    focus() {
      this.refs.field.focus();
    }

    render() {
      const { onChange, ...props } = this.props;

      return (
        <ComposedComponent ref="field" onChange={this.onChange.bind(this)} {...props} />
      );
    }
  }
};