document.addEventListener('DOMContentLoaded', () => {
    const albumName = sessionStorage.getItem("pageTitle");
    const pageTitle = document.querySelector('.pageTitle');
    pageTitle.textContent = albumName;

   const songs = getSongsOnAlbum(albumName);
   songs.forEach(song => {addListItem(song);})
});

function getSongsOnAlbum(albumName){
    const songsString = androidInterface.getSongsOnAlbum(albumName);
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
    newImage.src = 'images/inRainbows.jpg';
    newListItem.appendChild(newImage);

    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = song.Title;
    newListItem.appendChild(newTitle);

    const playImg = document.createElement('img');
    playImg.classList.add('image');
    playImg.src = 'images/play.png';
    newListItem.appendChild(playImg);

    newListItem.addEventListener('click', function() {
        const songTitle = newListItem.querySelector('.title').textContent;
        androidInterface.playSongTitled(songTitle);
    });

    buttonList.appendChild(newListItem);
}

