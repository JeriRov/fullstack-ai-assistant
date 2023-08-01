import { useMemo, useState } from 'react';

export const useAudioAnalyzer = () => {
  const [isListening, setIsListening] = useState(false);
  const [level, setLevel] = useState<number>(0);

  const createAudioContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  };

  const audioContext = useMemo(() => createAudioContext(), []);

  const distortion = audioContext.createWaveShaper();
  const gainNode = audioContext.createGain();
  const biquadFilter = audioContext.createBiquadFilter();
  const analyser = audioContext.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.fftSize = 256;
  let mediaStream: MediaStream | null = null; // Store the media stream

  const updateLevel = () => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    const maxLevel = Math.max(...dataArray);
    setLevel(maxLevel);
  };

  const startListening = async () => {
    try {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream = stream; // Store the media stream
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(audioContext.destination);

      setIsListening(true);
      // eslint-disable-next-line no-magic-numbers
      const updateInterval = setInterval(updateLevel, 50); // Update level every 100 milliseconds

      // Clear the update interval when stopListening is called
      const stopUpdate = () => clearInterval(updateInterval);

      // On component unmount, stopListening and clean up the resources
      return () => {
        stopListening();
        stopUpdate();
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('The following gUM error occurred:', err);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
  };

  return { isListening, level, startListening, stopListening };
};
