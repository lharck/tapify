document.addEventListener('DOMContentLoaded', () => {
    const artistName = sessionStorage.getItem("currentArtist");
    const pageTitle = document.querySelector('.pageTitle');
    pageTitle.textContent = artistName;

   const songs = getSongsBy(artistName);
   songs.forEach(song => {
        addListItem(song);
    })
});

function getSongsBy(artistName){
    const songsString = androidInterface.getSongsBy(artistName);
    const entries = songsString.split('---').map(entry => entry.trim()).filter(entry => entry.length > 0);

    const musicData = entries.map(entry => {
      const lines = entry.split('\n').map(line => line.trim());

      const song = {};

      lines.forEach(line => {
        const [key, value] = line.split(':').map(part => part.trim());
        if (key && value) {
          song[key] = value;
        }
      });

      return song;
    });

   return musicData
}

function addListItem(song){
    const buttonList = document.querySelector('.buttonList');
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

    const newImage = document.createElement('img');
    newImage.classList.add('image');
    newImage.src = '../images/inRainbows.jpg';
    newListItem.appendChild(newImage);

    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = song.Title;
    newListItem.appendChild(newTitle);

    const playImg = document.createElement('img');
    playImg.classList.add('image');
    playImg.src = '../images/play.png';
    newListItem.appendChild(playImg);

    newListItem.addEventListener('click', function() {
        console.log('start playing song');
    });

    buttonList.appendChild(newListItem);
}

