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

        const playImg = document.createElement('img');
        playImg.classList.add('image');
        playImg.src = './images/play.png';
        newListItem.appendChild(playImg);

//        shuffleImg.addEventListener('click', function() {
//        });
//        playImg.addEventListener('click', function() {
//        });

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
