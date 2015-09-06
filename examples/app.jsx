import React, { Component } from "react";
import { Form, Fieldset, TextField } from "morph-forms";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Morph Forms Examples</h1>

        <Form>
          <TextField name="firstName" />
          <TextField name="lastName" />

          <Fieldset name="address">
            <TextField name="street" />
            <TextField name="city" />
          </Fieldset>

          <button type="submit">Submit</button>
        </Form>
      </div>
    );
  }
};

React.render(<App/>, document.getElementById('app'));