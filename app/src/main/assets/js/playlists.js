const playlistPage = (function(){
    function addListItem(artist){
        const buttonList = document.querySelector('.buttonList');
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
        });

        const playImg = document.createElement('img');
        playImg.classList.add('image');
        playImg.src = 'images/play.png';
        newListItem.appendChild(playImg);

        playImg.addEventListener('click', function() {
           const songName = newTitle.textContent;
        });

        newTitle.addEventListener('click', function(){})

        buttonList.appendChild(newListItem);
    }

    function addList(){
        const artistsString = androidInterface.getArtists();
        if(artistsString.length == 0){return;}

        const artists = artistsString.split(",");
        artists.forEach(artist => {
            addListItem(artist);
        })
    }

    function show(){
        document.getElementById('pageTitle').textContent = 'Playlists';
        initList();
        addList();
    }

    return{show}
})()


