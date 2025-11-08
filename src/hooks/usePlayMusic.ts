import { useEffect } from "react";
import LobbyMusic from "~/assets/audio/lobby.mp3";
import { Howl } from "howler";

export const usePlayMusic = () => {
  useEffect(() => {
    const sound = new Howl({
      src: [LobbyMusic],
      autoplay: true,
      loop: true,
      volume: 0.5,
      onend: function () {
        console.log("Finished!");
      },
    });

    sound.play();

    return () => {
      sound.stop();
    };
  }, []);
};
