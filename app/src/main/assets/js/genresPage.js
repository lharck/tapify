document.addEventListener('DOMContentLoaded', () => {
    const genresString = androidInterface.getGenres();
    const genres = genresString.split(",");

    genres.forEach(genre => {
        addListItem(genre);
    })
});

function addListItem(genre){
    const buttonList = document.querySelector('.buttonList');
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

    const newImage = document.createElement('img');
    newImage.classList.add('image');
    newImage.src = '../images/inRainbows.jpg';
    newListItem.appendChild(newImage);

    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = genre;
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
        const songName = newTitle.textContent;
        androidInterface.playSongTitled(songTitle);
    });

    newTitle.addEventListener('click', function(){
        console.log("Clicked title");
        window.location.href='../html/ArtistPage.html';
        sessionStorage.setItem("currentArtist", newTitle.textContent);
    })

    buttonList.appendChild(newListItem);
}

