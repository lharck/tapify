const searchPage = (function(){
    function initPage(){
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
    }

    function show(){
        document.getElementById('pageTitle').textContent = 'Search';
        initPage();
    }
    return {show}
})();
