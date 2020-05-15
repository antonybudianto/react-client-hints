import React from 'react';
import { render } from '@testing-library/react';
import { ClientHintsProvider, useClientHints } from './react-client-hints';

describe('react-client-hints', () => {
  it('should render successfully - ssr', async () => {
    const Hello = () => {
      const ch = useClientHints();
      return <div>{ch && ch.platform}</div>;
    };
    const { findByText } = render(
      <ClientHintsProvider
        header={{
          'Sec-CH-UA-Platform': 'mac'
        }}
      >
        <Hello />
      </ClientHintsProvider>
    );
    await findByText('mac');
  });

  it('should render successfully - client', async () => {
    const Hello = () => {
      const ch = useClientHints();
      return <div>{ch && `${ch.platform}-${ch.downlink}-${ch.rtt}`}</div>;
    };
    window.navigator.connection = {
      downlink: 10,
      rtt: 0,
      ect: '4g'
    };
    window.navigator.getUserAgent = async () => ({
      platform: 'mac'
    });
    const { findByText } = render(
      <ClientHintsProvider>
        <Hello />
      </ClientHintsProvider>
    );
    await findByText('mac-10-0');
  });

  it('should render successfully - client - no connection somehow', async () => {
    const Hello = () => {
      const ch = useClientHints();
      return <div>{ch && `${ch.platform}-${ch.downlink}-${ch.rtt}`}</div>;
    };
    window.navigator.connection = undefined;
    window.navigator.getUserAgent = async () => ({
      platform: 'mac'
    });
    const { findByText } = render(
      <ClientHintsProvider>
        <Hello />
      </ClientHintsProvider>
    );
    await findByText('mac-undefined-undefined');
  });

  it('should render successfully - client - handle getUserAgent fail', async () => {
    const Hello = () => {
      const ch = useClientHints();
      const val = ch && `${ch.platform}-${ch.downlink}-${ch.rtt}`;
      return <div>{val}</div>;
    };
    window.navigator.connection = {};
    // eslint-disable-next-line no-undef
    window.navigator.getUserAgent = async () => Promise.reject();
    const { findByText } = render(
      <ClientHintsProvider>
        <Hello />
      </ClientHintsProvider>
    );
    await findByText('undefined-undefined-undefined');
  });
});
