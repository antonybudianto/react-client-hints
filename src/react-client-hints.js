import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const ClientHintsContext = React.createContext();

export const ClientHints = ClientHintsContext.Consumer;

export const ClientHintsProvider = ({ header = {}, children }) => {
  const [ch, setCh] = useState({
    ua: header['Sec-CH-UA'],
    platform: header['Sec-CH-UA-Platform'],
    architecture: header['Sec-CH-UA-Arch'],
    model: header['Sec-CH-UA-Model'],
    mobile: header['Sec-CH-UA-Mobile'],
    viewportWidth: header['Viewport-Width'],
    dpr: header['DPR'],
    rtt: header['RTT'],
    downlink: header['Downlink'],
    ect: header['ECT'],
    deviceMemory: header['Device-Memory'],
    saveData: header['Save-Data'],
  });

  useEffect(() => {
    async function getUserAgent() {
      try {
        const chValue = await navigator.getUserAgent();
        const { downlink, rtt, saveData, effectiveType: ect } =
          'connection' in navigator ? navigator.connection : {};

        setCh({
          ...chValue,
          dpr: window.devicePixelRatio,
          rtt,
          downlink,
          ect,
          saveData,
          deviceMemory: navigator.deviceMemory,
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (typeof navigator.getUserAgent === 'function' && !ch.ua) {
      getUserAgent();
    }
  }, []);

  return (
    <ClientHintsContext.Provider value={ch}>
      {children}
    </ClientHintsContext.Provider>
  );
};

ClientHintsProvider.propTypes = {
  header: PropTypes.object,
  children: PropTypes.node,
};

export const useClientHints = () => useContext(ClientHintsContext);
