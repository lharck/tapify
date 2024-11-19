

function getMusicData(){
    let songsString = androidInterface.getSongData();

    const entries = songsString.split('---').map(entry => entry.trim()).filter(entry => entry.length > 0);

    const songsArrayJS = entries.map(entry => {
      const lines = entry.split('\n').map(line => line.trim());

      const obj = {};

      lines.forEach(line => {
        const [key, value] = line.split(':').map(part => part.trim());
        if (key && value) {
          obj[key] = value;
        }
      });

      return obj;
    });

    songsArrayJS.forEach((obj, index) => {
      console.log(`Song ${index + 1}:`);
      for (const [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
      }
      console.log('---');
    });
}