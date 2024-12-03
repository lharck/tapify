function parseSongsString(songsString) {
  const entries = songsString.split('---').map(entry => entry.trim()).filter(entry => entry.length > 0);

  const musicData = entries.map(entry => {
    const lines = entry.split('\n').map(line => line.trim());

    const song = {};

    lines.forEach(line => {
      const [key, value] = line.split(':', 2)
      if (key && value) {
        song[key] = value;
      }
    });

    return song;
  });

  return musicData;
}

// TODO: temporary hardcoding for album covers
function getAlbumCover(albumName, root=".") {
    const albumCovers = {
        "Operation": root + "/images/Doomsday.png",
        "Operation: Doomsday": root + "/images/Doomsday.png",
        "OK Computer": root + "/images/OkComputer.png",
        "MM..FOOD": root + "/images/MMFood.png"
    };

    return albumCovers[albumName.trim()];
}

function initList(){
    const container = document.getElementById('container');
    container.innerHTML = `
        <ul class="buttonList"></ul>
    `;
}

function playSong(song){
    androidInterface.playSongTitled(song.Title);

    const cover =  getAlbumCover(song.Album);
    const songPreview = document.getElementsByClassName("songPreview")[0];
    songPreview.src = cover;

    document.getElementsByClassName("songTitle")[0].textContent = song.Title
    document.getElementsByClassName("songArtist")[0].textContent = song.Artist

    const progressBar = document.getElementsByClassName("progressBar")[0];
    console.log(progressBar)
    progressBar.style.transition = 'none';
    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.transition = 'width 10s ease-in-out';
      progressBar.style.width = "100%";
    }, 50);
}