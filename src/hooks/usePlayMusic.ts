import { useEffect } from "react";
import LobbyMusic from "~/assets/audio/lobby.mp3";
import { Howl } from "howler";

interface Room {
  id: string;
  name: string;
  minBet: number;
  maxBet: number;
  players: number;
  maxPlayers: number;
  type: "standard" | "vip" | "turbo";
}

const rooms: Room[] = [
  {
    id: "room-1",
    name: "Beginner's Luck",
    minBet: 10,
    maxBet: 100,
    players: 124,
    maxPlayers: 500,
    type: "standard",
  },
  {
    id: "room-2",
    name: "High Roller Suite",
    minBet: 500,
    maxBet: 10000,
    players: 45,
    maxPlayers: 100,
    type: "vip",
  },
  {
    id: "room-3",
    name: "Lightning Rounds",
    minBet: 50,
    maxBet: 500,
    players: 289,
    maxPlayers: 1000,
    type: "turbo",
  },
  {
    id: "room-4",
    name: "Private Lounge",
    minBet: 1000,
    maxBet: 50000,
    players: 12,
    maxPlayers: 50,
    type: "vip",
  },
  {
    id: "room-5",
    name: "Fortune Hall",
    minBet: 25,
    maxBet: 250,
    players: 567,
    maxPlayers: 1000,
    type: "standard",
  },
  {
    id: "room-6",
    name: "Speed Dice Arena",
    minBet: 100,
    maxBet: 1000,
    players: 198,
    maxPlayers: 500,
    type: "turbo",
  },
];

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
