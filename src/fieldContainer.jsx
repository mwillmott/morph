import _ from "lodash";
import React, { Component } from "react";
import Validators from "./validators";

export default (ComposedComponent) => {
  return class FieldContainer extends Component {
    static defaultProps = {
      defaultValue: null,
      isFormInput: true,
      validators: []
    }

    constructor(props) {
      super(props);
      this.state = {
        isValid: true,
        errors: []
      }
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
      let newState = this.state;
      newState["data"] = data;
      newState["values"] = this.getValues(data);
      newState["errors"] = this.validate(newState["values"]);
      newState["isValid"] = this.isValid(newState);

      this.setState(newState, () => {
        if (this.props.onChange)
          this.props.onChange(this.props.name, this.state);
      });
    }

    validate(value) {
      let validators = this.props.validators;
      // If required, add the nonEmpty validator
      validators = this.props.required
        ? validators.concat([Validators.nonEmpty()])
        : validators;

      return _.compact(
        _.map(validators, function(validate) {
          return validate(value);
        })
      );
    }

    isValid(fields) {
      if (!_.isArray(fields))
        fields = [fields];

      return _.reduce(fields, (isValid, field) => {
        return field.errors.length === 0 && _.reduce(field.data, (valid, data) => {
          return valid && (typeof data !== "object" || (data !== null && this.isValid(data)));
        }, true);
      }, true);
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
        <ComposedComponent
          {...props}
          ref="field"
          isValid={this.state.isValid}
          errors={this.state.errors}
          onChange={this.onChange.bind(this)} />
      );
    }
  }
};