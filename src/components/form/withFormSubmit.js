import React from 'react';

const withFormSubmit = WrapperComponent => props => (
  <Consumer>
    {({ isValid }) => (
      <WrapperComponent type="submit" {...props} disabled={!isValid} />
    )}
  </Consumer>
);

export default withFormSubmit;
