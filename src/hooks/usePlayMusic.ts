import { useCallback, useEffect } from "react";
import { Howl } from "howler";
import LobbyMusic from "~/assets/audio/lobby.mp3?url";

let singleton: Howl | null = null;
let subscribers = 0;

const ensureHowl = () => {
  if (!singleton) {
    singleton = new Howl({
      src: [LobbyMusic],
      loop: true,
      volume: 0.45,
      html5: true,
    });
  }

  return singleton;
};

const stopAndReset = () => {
  if (singleton) {
    singleton.stop();
    singleton.unload();
    singleton = null;
  }
  subscribers = 0;
};

export const usePlayMusic = (autoPlay = false) => {
  const play = useCallback(() => {
    const sound = ensureHowl();
    if (!sound.playing()) {
      sound.play();
    }
  }, []);

  const pause = useCallback(() => {
    singleton?.pause();
  }, []);

  const stop = useCallback(() => {
    stopAndReset();
  }, []);

  const isPlaying = useCallback(() => Boolean(singleton?.playing()), []);

  useEffect(() => {
    const sound = ensureHowl();
    subscribers += 1;

    if (autoPlay && !sound.playing()) {
      try {
        sound.play();
      } catch {
        /* autoplay might be blocked; ignore */
      }
    }

    return () => {
      subscribers = Math.max(0, subscribers - 1);
      if (subscribers === 0) {
        stopAndReset();
      }
    };
  }, [autoPlay]);

  return { play, pause, stop, isPlaying };
};
