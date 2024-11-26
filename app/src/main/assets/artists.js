//function getSongData(){
//    let songsString = androidInterface.getSongData();
//
//    const entries = songsString.split('---').map(entry => entry.trim()).filter(entry => entry.length > 0);
//
//    const musicData = entries.map(entry => {
//      const lines = entry.split('\n').map(line => line.trim());
//
//      const song = {};
//
//      lines.forEach(line => {
//        const [key, value] = line.split(':').map(part => part.trim());
//        if (key && value) {
//          song[key] = value;
//        }
//      });
//
//      return song;
//    });
//
//   return musicData
//}

document.addEventListener('DOMContentLoaded', () => {
//    const musicData = getMusicData();
//
//    musicData.forEach((song, index) => {
//       addListItem(song.Artist);
//    });
    const artistsString = androidInterface.getArtists();
    const artists = artistsString.split(",");

    console.log("************artists: ", artists);
    artists.forEach(artist => {
        addListItem(artist);
    })
});

function addListItem(artist){//
    const buttonList = document.querySelector('.buttonList');
    console.log(buttonList);
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

    const newImage = document.createElement('img');
    newImage.classList.add('image');
    newImage.src = 'images/inRainbows.jpg';
    newListItem.appendChild(newImage);

    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = artist;
    newListItem.appendChild(newTitle);

    const newButton = document.createElement('button');
    newButton.classList.add('invisibleButton');

    const newButtonImage = document.createElement('img');
    newButtonImage.classList.add('image');
    newButtonImage.src = 'images/inRainbows.jpg';
    newButton.appendChild(newButtonImage);

    newButton.addEventListener('click', function() {
        // Your desired action when the button is clicked
        console.log('Shuffle button clicked!');
        // For example, if you want to shuffle songs or trigger any action, you can add that here
        // e.g., shuffleSongs(); or any other functionality you want
    });

    newListItem.appendChild(newButton);
    buttonList.appendChild(newListItem);
}

