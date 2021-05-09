const LibrarySong = ({
  song,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  //

  //Promise!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const selectSongHandler = async () => {
    await setCurrentSong(song);
    if (isPlaying) audioRef.current.play();
  };
  // //Set Active in library
  // const newSongs = songs.map((song) => {
  //   if (song.id === id) {
  //     return {
  //       ...song,
  //       active: true,
  //     };
  //   } else {
  //     return {
  //       ...song,
  //       active: false,
  //     };

  return (
    <div
      className={` library-song ${
        song.id === currentSong.id ? "selected-song" : ""
      } `}
      onClick={selectSongHandler}
    >
      <img src={song.cover} alt="Not found"></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
