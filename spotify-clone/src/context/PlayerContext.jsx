import { createContext, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvoider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seelBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });


  const play =()=>{
    audioRef.current.play()
    setPlayerStatus(true)
  }

  const pause =()=>{
    audioRef.current.pause()
    setPlayerStatus(false)
  }

  const contextValue = {
    audioRef,
    seekBg,
    seelBar,
    track, setTrack,
    playerStatus, setPlayerStatus,
    time, setTime,
    play , pause
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvoider;