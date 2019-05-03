import React from 'react';
import { Consumer } from './create';

const withSubmit = WrapperComponent => props => (
  <Consumer>
    {({ isValid }) => (
      <WrapperComponent type="submit" {...props} disabled={!isValid} />
    )}
  </Consumer>
);

export default withSubmit;
