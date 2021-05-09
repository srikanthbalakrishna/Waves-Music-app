import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //component
import {
  faPlayCircle,
  faForward,
  faBackward,
  faPause,
} from "@fortawesome/free-solid-svg-icons"; //the actual icon

const Player = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  timeUpdateHandler,
  songInfo,
  setSongInfo,
}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "next-button") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else {
      if (currentIndex !== 0)
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      else await setCurrentSong(songs[songs.length - 1]);
    }

    if (isPlaying) audioRef.current.play();
  };
  //styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipHandler("previous-button")}
          className="previous-button"
          icon={faBackward}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play-button"
          icon={isPlaying ? faPause : faPlayCircle}
          size="4x"
        />
        <FontAwesomeIcon
          onClick={() => skipHandler("next-button")}
          className="next-button"
          icon={faForward}
          size="3x"
        />
      </div>

      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>

        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
    </div>
  );
};

export default Player;
