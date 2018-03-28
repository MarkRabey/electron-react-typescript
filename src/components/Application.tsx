import * as React from 'react';
import { hot } from 'react-hot-loader';

import CounterContainer from '../containers/CounterContainer';

const Application = () => (
  <div>
    Hello World from Electron!
    <CounterContainer />
  </div>
);

export default hot(module)(Application);
