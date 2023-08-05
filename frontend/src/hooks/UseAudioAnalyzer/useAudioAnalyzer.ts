import { useRef, useState } from 'react';

import { toast } from 'react-toastify';

export const useAudioAnalyzer = () => {
  const [isListening, setIsListening] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const createAudioContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  };

  const updateLevel = (analyser: AnalyserNode) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    const maxLevel = Math.max(...dataArray);
    setLevel(maxLevel);
    requestAnimationFrame(() => updateLevel(analyser));
  };

  const startListening = async () => {
    try {
      const audioContext = createAudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const source = audioContext.createMediaStreamSource(stream);

      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.fftSize = 256;

      source.connect(analyser);

      setIsListening(true);
      updateLevel(analyser);
      return () => {
        stopListening();
      };
    } catch (err) {
      toast.error('Error while listening to audio');
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  return { isListening, level, startListening, stopListening };
};
