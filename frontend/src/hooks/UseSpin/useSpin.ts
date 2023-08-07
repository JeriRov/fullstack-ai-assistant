import {
  useState,
  useEffect,
  useRef,
  RefObject,
  SetStateAction,
  Dispatch,
} from 'react';

import { ROTATION_INTERVAL_MS } from './useSpin.settings';

export const useSpin = <T extends HTMLElement>(): [
  RefObject<T>,
  Dispatch<SetStateAction<boolean>>,
] => {
  const [rotate, setRotate] = useState(false);
  const [degrees, setDegrees] = useState(0);
  const spinRef = useRef<T | null>(null);
  const runnerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const spinElement = spinRef.current;
    if (rotate) {
      runnerRef.current = setInterval(() => {
        setDegrees(prevDegrees => prevDegrees + 1);
        if (spinElement) {
          spinElement.style.transform = `rotate(${degrees}deg)`;
        }
      }, ROTATION_INTERVAL_MS);
    } else {
      if (runnerRef.current) {
        clearInterval(runnerRef.current);
      }
    }
    return () => {
      if (runnerRef.current) {
        clearInterval(runnerRef.current);
      }
    };
  }, [rotate, degrees]);

  return [spinRef, setRotate];
};
