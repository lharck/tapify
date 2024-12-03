const mostRecentPage = (function(){
    function addListItem(song){
        const buttonList = document.querySelector('.buttonList');
        const newListItem = document.createElement('li');
        newListItem.classList.add('listItem');

        const newImage = document.createElement('img');
        newImage.classList.add('image');
        newImage.src = getAlbumCover(song.Album);
        newListItem.appendChild(newImage);

        const newTitle = document.createElement('p');
        newTitle.classList.add('title', 'fullTitle');
        newTitle.textContent = song.Title;
        newListItem.appendChild(newTitle);

        const playImg = document.createElement('img');
        playImg.classList.add('image');
        playImg.src = './images/play.png';
        newListItem.appendChild(playImg);

        newListItem.addEventListener('click', function() {
            playSong(song);
        });

        buttonList.appendChild(newListItem);
    }

    function addList(){
        const songsString = androidInterface.getMostRecentlyPlayedSongs();
        let songs = parseSongsString(songsString);

        for (let i = songs.length - 1; i >= 0; i--) {
            addListItem(songs[i]);
        }
    }

    function show(){
        document.getElementById('pageTitle').textContent = 'Recently Played';
        initList();
        addList();
    }

    return{show}
})()