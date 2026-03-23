import { useState, useEffect } from 'react';

export type ConnectionEffectiveType = 'slow-2g' | '2g' | '3g' | '4g';

export interface NetworkInformation extends EventTarget {
  readonly effectiveType: ConnectionEffectiveType;
  readonly saveData: boolean;
  readonly downlink: number;
  readonly rtt: number;
  onchange: EventListenerOrEventListenerObject;
}

export function useConnection() {
  const [connection, setConnection] = useState({
    effectiveType: '4g' as ConnectionEffectiveType,
    saveData: false,
    isSlow: false,
    isLowEnd: false,
    isLite: false, // Combined flag for slow net or low end device
  });

  useEffect(() => {
    // @ts-ignore
    const navConn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    // @ts-ignore
    const deviceMemory = navigator.deviceMemory || 4; // Assume 4GB if undetected
    // @ts-ignore
    const hardwareConcurrency = navigator.hardwareConcurrency || 4; // Assume 4 cores

    const checkCapabilities = () => {
      const effectiveType = navConn ? navConn.effectiveType : '4g';
      const saveData = navConn ? navConn.saveData : false;
      const isSlow = effectiveType.includes('2g') || effectiveType === '3g' || saveData;
      
      // Low end: < 4GB RAM or < 4 CPU cores
      const isLowEnd = deviceMemory < 4 || hardwareConcurrency < 4;
      
      setConnection({
        effectiveType,
        saveData,
        isSlow,
        isLowEnd,
        isLite: isSlow || isLowEnd,
      });
    };

    if (navConn) {
      navConn.addEventListener('change', checkCapabilities);
    }
    
    checkCapabilities();

    return () => {
      if (navConn) navConn.removeEventListener('change', checkCapabilities);
    };
  }, []);

  return connection;
}
