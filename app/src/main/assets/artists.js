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

    const shuffleImg = document.createElement('img');
    shuffleImg.classList.add('image');
    shuffleImg.src = 'images/shuffle.png';
    newListItem.appendChild(shuffleImg);

    shuffleImg.addEventListener('click', function() {
        console.log('Shuffle button clicked!');
    });


    const playImg = document.createElement('img');
    playImg.classList.add('image');
    playImg.src = 'images/play.png';
    newListItem.appendChild(playImg);

    playImg.addEventListener('click', function() {
        console.log('play button clicked!');
    });

    buttonList.appendChild(newListItem);
}

