let playlists = {
    "My Tunes": [],
    "Chill Commute Mix": []
}

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

// TODO: temporary hardcoding
function getIcon(imageName="default", root=".") {
    const images = {
        "MF DOOM": root + "/images/Doomsday.png",
        "Radiohead": root + "/images/OkComputer.png",
        "default": root + "/images/defaultCover.png",
    };

    return images[imageName.trim()];
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
    progressBar.style.transition = 'none';
    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.transition = 'width 60s ease-in-out';
      progressBar.style.width = "100%";
    }, 50);

}

function showMetadataEditor(song){
    // TODO: removing the overlay makes it so you cant click underneath for some reason??
    const container = document.getElementById('container');
    container.innerHTML += `<div class="overlay"></div>`;

   const metadataOverlay = document.getElementsByClassName('overlay')[0];

   for (let key in song) {
        metadataOverlay.innerHTML += `
            <div style="display: flex; gap: 10px;">
                ${key}
                <input type="text" value="${song[key]}" style="">
            </div>
        `;
   }

    metadataOverlay.innerHTML += `
        <button id="okButton" class="okButton">Ok</button>
        <button id="cancelButton" class="cancelButton">Cancel</button>
    `;

    document.getElementById('okButton').onclick = function() {
        container.removeChild(metadataOverlay);
    };

    document.getElementById('cancelButton').onclick = function() {
        container.removeChild(metadataOverlay);
    };
}

function addListItem(song){
    const buttonList = document.querySelector('.buttonList');
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

    const newImage = document.createElement('img');
    newImage.classList.add('image');
    newImage.src = getAlbumCover(song.Album);
    newListItem.appendChild(newImage);

    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = song.Title;
    newListItem.appendChild(newTitle);

    const playImg = document.createElement('img');
    playImg.classList.add('image');
    playImg.src = './images/play.png';
    newListItem.appendChild(playImg);

    const editImage = document.createElement('img');
    editImage.classList.add('image');
    editImage.src = './images/pencil.png';
    newListItem.appendChild(editImage);

    const plusImg = document.createElement('img');
    plusImg.classList.add('plusImg','image');
    plusImg.src = './images/plus.png';
    newListItem.appendChild(plusImg);

    newListItem.addEventListener('click', function() {
        playSong(song);
    });

    editImage.addEventListener('click', function() {
        showMetadataEditor(song);
    });

    plusImg.addEventListener('click', function() {
        showPlaylistMenu(song);
    });

    buttonList.appendChild(newListItem);
}

function showPlaylistMenu(song){
    const container = document.getElementById('container');
    container.innerHTML += `<div class="overlay"></div>`;

    const playlistOverlay = document.getElementsByClassName('overlay')[0];

    for (let playlistName in playlists) {
        const playlist = playlists[playlistName];
        playlistOverlay.innerHTML += `
            <div style="display: flex; gap: 10px;">
                ${playlistName}
                <img class="plusImg image" src="./images/plus.png" id="plusImg-${playlistName}" />
            </div>
        `;
    }

    playlistOverlay.innerHTML += `
        <button id="cancelButton" class="cancelButton">Cancel</button>
    `;

    for (let playlistName in playlists) {
        const plusImg = document.getElementById(`plusImg-${playlistName}`);
        plusImg.addEventListener('click', function() {
            playlists[playlistName].push(song);
            container.removeChild(playlistOverlay);
        });
    }

    document.getElementById('cancelButton').onclick = function() {
        container.removeChild(playlistOverlay);
    };
}
