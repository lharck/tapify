

document.addEventListener('DOMContentLoaded', () => {
//    const musicData = getMusicData();
//
//    musicData.forEach((song, index) => {
//       addListItem(song.Artist);
//    });
    const artistsString = androidInterface.getArtists();

    if(artistsString.length == 0){return;}

    const artists = artistsString.split(",");

    console.log("************artists: ", artists);
    artists.forEach(artist => {
        addListItem(artist);
    })
});

function addListItem(artist){
    const buttonList = document.querySelector('.buttonList');
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

    const newImage = document.createElement('img');
    newImage.classList.add('image');
    newImage.src = '../images/inRainbows.jpg';
    newListItem.appendChild(newImage);

    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = artist;
    newListItem.appendChild(newTitle);

    const shuffleImg = document.createElement('img');
    shuffleImg.classList.add('image');
    shuffleImg.src = '../images/shuffle.png';
    newListItem.appendChild(shuffleImg);

    shuffleImg.addEventListener('click', function() {
        console.log('Shuffle button clicked!');
    });

    const playImg = document.createElement('img');
    playImg.classList.add('image');
    playImg.src = '../images/play.png';
    newListItem.appendChild(playImg);

    playImg.addEventListener('click', function() {
        console.log('play button clicked!');
    });

    newTitle.addEventListener('click', function(){
        console.log("Clicked title");
        window.location.href='../html/ArtistPage.html';
        sessionStorage.setItem("currentArtist", newTitle.textContent);
    })

    buttonList.appendChild(newListItem);
}

