function parseSongsString(songsString) {
  const entries = songsString.split('---').map(entry => entry.trim()).filter(entry => entry.length > 0);

  const musicData = entries.map(entry => {
    const lines = entry.split('\n').map(line => line.trim());

    const song = {};

    lines.forEach(line => {
      const [key, value] = line.split(':', 2)
      console.log(key + " " + value)
      if (key && value) {
        song[key] = value;
      }
    });

    return song;
  });

  return musicData;
}



// TODO: temporary hardcoding for album covers
function getAlbumCover(albumName, root) {
    const albumCovers = {
        "Operation": root + "/images/Doomsday.png",
        "Operation: Doomsday": root + "/images/Doomsday.png",
        "OK Computer": root + "/images/OkComputer.png",
        "MM..FOOD": root + "/images/MMFood.png"
    };

    return albumCovers[albumName.trim()];
}


