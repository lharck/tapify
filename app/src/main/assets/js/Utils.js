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

function playSong(song) {
    const playImg = document.querySelector(`.listItem img[src='./images/play.png']`);

    // Change play icon to pause
    if (playImg) {
        playImg.src = './images/pause.png';
        playImg.alt = 'Pause';
    }

    // Interact with Android interface to play the song
    androidInterface.playSongTitled(song.Title);

    // Update album cover and song details
    const cover = getAlbumCover(song.Album);
    const songPreview = document.getElementsByClassName("songPreview")[0];
    songPreview.src = cover;

    document.getElementsByClassName("songTitle")[0].textContent = song.Title;
    document.getElementsByClassName("songArtist")[0].textContent = song.Artist;

    // Progress bar animation
    const progressBar = document.getElementsByClassName("progressBar")[0];
    progressBar.style.transition = 'none';
    progressBar.style.width = "0%";
    setTimeout(() => {
        progressBar.style.transition = 'width 60s ease-in-out';
        progressBar.style.width = "100%";
    }, 50);

    // Pause song logic
    playImg.addEventListener('click', function togglePause() {
        if (playImg.src.includes('pause.png')) {
            playImg.src = './images/play.png';
            playImg.alt = 'Play';
            androidInterface.pauseSong(); // Ensure the interface pauses the song
        } else {
            playImg.src = './images/pause.png';
            playImg.alt = 'Pause';
            androidInterface.playSongTitled(song.Title); // Resume song playback
        }
    });
}

function showMetadataEditor(song) {
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const metadataContainer = document.createElement('div');
    metadataContainer.className = 'metadata-editor';

    // Populate metadata editor with fields
    for (let key in song) {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'field-wrapper';

        const label = document.createElement('label');
        label.textContent = key;
        label.for = key;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = song[key];
        input.id = key;

        fieldWrapper.appendChild(label);
        fieldWrapper.appendChild(input);
        metadataContainer.appendChild(fieldWrapper);
    }

    // Add action buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const okButton = document.createElement('button');
    okButton.className = 'okButton';
    okButton.textContent = 'Ok';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancelButton';
    cancelButton.textContent = 'Cancel';

    buttonContainer.appendChild(okButton);
    buttonContainer.appendChild(cancelButton);
    metadataContainer.appendChild(buttonContainer);

    overlay.appendChild(metadataContainer);
    document.body.appendChild(overlay);

    // Event listeners for buttons
    okButton.onclick = function () {
        // Save updated song metadata
        for (let key in song) {
            const updatedValue = document.getElementById(key).value;
            song[key] = updatedValue;
        }
        document.body.removeChild(overlay);
    };

    cancelButton.onclick = function () {
        document.body.removeChild(overlay);
    };
}

function addListItem(song) {
    const buttonList = document.querySelector('.buttonList');
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

//    // Album cover
//    const newImage = document.createElement('img');
//    newImage.classList.add('image');
//    newImage.src = getAlbumCover(song.Album);
//    newListItem.appendChild(newImage);

    // Song title
    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = song.Title;
    newListItem.appendChild(newTitle);

    // Play/Pause icon
    const playImg = document.createElement('img');
    playImg.classList.add('image');
    playImg.src = './images/play.png';
    playImg.alt = 'Play';
    newListItem.appendChild(playImg);

    // Metadata edit icon
    const editImage = document.createElement('img');
    editImage.classList.add('image');
    editImage.src = './images/pencil.png';
    newListItem.appendChild(editImage);

    // Add to playlist icon
    const plusImg = document.createElement('img');
    plusImg.classList.add('plusImg', 'image');
    plusImg.src = './images/plus.png';
    newListItem.appendChild(plusImg);

    // Play song on click
    playImg.addEventListener('click', function () {
        playSong(song);

        // Toggle play/pause within this specific list item
        playImg.src = playImg.src.includes('play.png') ? './images/pause.png' : './images/play.png';
        playImg.alt = playImg.src.includes('pause.png') ? 'Pause' : 'Play';
    });

    // Metadata editor
    editImage.addEventListener('click', function () {
        showMetadataEditor(song);
    });

    // Add to playlist menu
    plusImg.addEventListener('click', function () {
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
