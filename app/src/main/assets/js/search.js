const searchPage = (function(){
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

        buttonList.appendChild(newListItem);

        return newListItem;
    }

    function initPage(existingText){
        const container = document.getElementById('container')
        container.innerHTML = `
           <div class="search-div">
                  <input
                          type="text"
                          class="search-box"
                          id="search"
                          placeholder="Search for music, albums, or artists..."
                          name="search">
                  <img src="./images/icon.png" alt="Search Icon" class="search-icon">
              </div>

              <ul class="buttonList"></ul>
        `;

        if(existingText.length > 0){
            const searchBox = document.getElementById('search');
            searchBox.value = existingText;
        }
    }

    function showSearchResults(searchString){
        const buttonList = document.getElementsByClassName('buttonList')[0];
        buttonList.innerHTML = '';
        if (searchString.length <= 0) { return; }
        const songsString = androidInterface.getSongsStartingWith(searchString);
        const songs = parseSongsString(songsString);
        songs.forEach(song => {
            const listItem = addListItem(song);
            listItem.addEventListener('click', function() {
                playSong(song);
            });
        })
    }

    function initEvents(){
        const searchBox = document.getElementById('search');
        if (searchBox.hasInputEventListener) { return; }

        searchBox.addEventListener('input', function() {
           showSearchResults(this.value);
        });

        searchBox.hasInputEventListener = true;
        searchBox.focus();
    }

    function show(existingText){
        document.getElementById('pageTitle').textContent = 'Search';
        initPage(existingText);
        initEvents();
    }

    return {show}
})();


const searchButton = document.getElementById('navSearchButton');
navSearchButton.onclick = function(existingText) {
    searchPage.show(existingText);
};
