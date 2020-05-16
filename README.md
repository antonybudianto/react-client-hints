# react-client-hints

[![npm version](https://badge.fury.io/js/react-client-hints.svg)](https://badge.fury.io/js/react-client-hints)
[![Build Status](https://travis-ci.org/antonybudianto/react-client-hints.svg?branch=master)](https://travis-ci.org/antonybudianto/react-client-hints)

<p align="center">
<img src="https://user-images.githubusercontent.com/7658554/82079373-f68c1a00-970c-11ea-83a4-e3644f2343ad.png">
</p>

React Client Hints Hooks, Component, and Provider. SSR-ready and fully unit-tested.

## Requirement

- React 16.8.0

## Features

- Provide simple API for latest [Client Hints feature](https://developer.mozilla.org/en-US/docs/Glossary/Client_hints)
- Using new React [Context API](https://reactjs.org/docs/context.html)
- SSR-ready
- Fully unit-tested

> Try it [live at StackBlitz](https://stackblitz.com/edit/demo-react-client-hints)

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { ClientHintsProvider, useClientHints } from 'react-client-hints';

const Hello = () => {
  const ch = useClientHints();
  return <div>Platform: {ch && ch.platform}</div>;
};

const App = () => {
  return (
    <ClientHintsProvider>
      <Hello />
    </ClientHintsProvider>
  );
};

render(<App />, document.getElementById('root'));

// SSR with compatible header object
const el = (
  <ClientHintsProvider header={request.headers}>
    <ClientHints>{ch => ch.platform}</ClientHints>
  </ClientHintsProvider>
);

ReactDOMServer.renderToString(el);
```

## License

MIT
