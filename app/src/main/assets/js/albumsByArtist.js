const albumsByArtistPage = (function(){
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

    function addList(artistName){
       const songsString = androidInterface.getSongsBy(artistName);
       const songs = parseSongsString(songsString);

       songs.forEach(song => {
            addListItem(song);
        })
    }

    function show(artistName){
        document.getElementById("pageTitle").textContent = artistName
        initList();
        addList(artistName);
    }

    return {show}
})();


