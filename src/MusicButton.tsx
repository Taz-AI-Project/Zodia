import React, { useRef, useState } from 'react';
import focusTrack from '../src/Public/ObservingTheStar.ogg';

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const a = audioRef.current!;
    if (!a) return;
    try {
      if (!playing) {
        await a.play();
        setPlaying(true);
      } else {
        a.pause();
        setPlaying(false);
      }
    } catch {
      // if blocked, user click will enable on next try
    }
  };

  return (
    <>
      <audio ref={audioRef} src={focusTrack} loop preload='auto' />
      <button
        onClick={toggle}
        className='fixed bottom-5 right-5 z-50 active:scale-95'
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={playing ? 'Pause' : 'Play'}
      >
        {playing ? 'Music: On' : 'Music: Off'}
      </button>
    </>
  );
}
