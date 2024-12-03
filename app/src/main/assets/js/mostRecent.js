const mostRecentPage = (function(){


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