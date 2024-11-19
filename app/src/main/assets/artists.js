
console.log("script")

function getMusicData(){
    let songsString = androidInterface.getSongData();

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

document.addEventListener('DOMContentLoaded', () => {
    console.log("LOADED")
    const musicData = getMusicData();
    musicData.forEach((song, index) => {
       addListItem(song.Title, song.Artist);
    });
});

function addListItem(title, artist){
    const buttonList = document.querySelector('.buttonList');
    console.log(buttonList);
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

    const newImage = document.createElement('img');
    newImage.classList.add('image');
    newImage.src = 'https://via.placeholder.com/50';
    newListItem.appendChild(newImage);

    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = title + " " + artist;
    newListItem.appendChild(newTitle);

    const newButton = document.createElement('button');
    newButton.classList.add('invisibleButton');

    const newButtonImage = document.createElement('img');
    newButtonImage.classList.add('image');
    newButtonImage.src = 'https://via.placeholder.com/50';
    newButton.appendChild(newButtonImage);

    newListItem.appendChild(newButton);
    buttonList.appendChild(newListItem);
}

