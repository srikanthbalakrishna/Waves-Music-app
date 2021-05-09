import React from "react";
import LibrarySong from "./LibrarySong";
const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs-list">
        {songs.map((s) => (
          <LibrarySong
            key={s.id}
            song={s}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
