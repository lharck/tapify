document.addEventListener('DOMContentLoaded', () => {
    const albumName = sessionStorage.getItem("pageTitle");
    const pageTitle = document.querySelector('.pageTitle');
    pageTitle.textContent = albumName;

    const songsString = androidInterface.getSongsOnAlbum(albumName);
    let songs = parseSongsString(songsString);

   songs.forEach(song => {addListItem(song);})
});

function addListItem(song){
    const buttonList = document.querySelector('.buttonList');
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

    const newImage = document.createElement('img');
    newImage.classList.add('image');
    newImage.src = getAlbumCover(song.Album, "..");;
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
        const songTitle = newListItem.querySelector('.title').textContent;
        androidInterface.playSongTitled(songTitle);
    });

    buttonList.appendChild(newListItem);
}
