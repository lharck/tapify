const albumsPage = (function(){
    function addListItem(album){
        const buttonList = document.querySelector('.buttonList');
        const newListItem = document.createElement('li');
        newListItem.classList.add('listItem');

        const newImage = document.createElement('img');
        newImage.classList.add('image');
        newImage.src = getAlbumCover(album);
        newListItem.appendChild(newImage);

        const newTitle = document.createElement('p');
        newTitle.classList.add('title', 'fullTitle');
        newTitle.textContent = album;
        newListItem.appendChild(newTitle);

        const shuffleImg = document.createElement('img');
        shuffleImg.classList.add('image');
        shuffleImg.src = './images/shuffle.png';
        newListItem.appendChild(shuffleImg);

        shuffleImg.addEventListener('click', function() {
            console.log('Shuffle button clicked!');
        });

        const playImg = document.createElement('img');
        playImg.classList.add('image');
        playImg.src = './images/play.png';
        newListItem.appendChild(playImg);

        playImg.addEventListener('click', function() {
            const songName = newTitle.textContent;
            androidInterface.playSongTitled(songTitle);
        });

        newTitle.addEventListener('click', function(){
            const albumName = newTitle.textContent;
            singleAlbumPage.show(albumName);
        })

        buttonList.appendChild(newListItem);
    }

    function addList(){
        const albumsString = androidInterface.getAlbums();
        const albums = albumsString.split(",");

        albums.forEach(album => {
            console.log(album)
            addListItem(album.trim());
        })
    }

    function show(){
        document.getElementById('pageTitle').textContent = 'Albums';
        initList();
        addList();
    }
    return {show}
})();
