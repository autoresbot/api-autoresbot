const fs = require('fs');
const ApiAutoresbot = require('./src/index');
const api = new ApiAutoresbot('YOUR_APIKEY');

// Metode Get
/*
(async () => {
  try {
    const response = await api.get(`/api/game/family100`);
    console.log(response);
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
})();
*/

// Metode Get With Param
/*
(async () => {
  try {
    const response = await api.get(`/api/stalker/whatsapp-group`, { url : "https://chat.whatsapp.com/KJD2nB7j7lfHux9AVQCra4"});
    console.log(response);
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
})();
*/

// Get Buffer
/*
(async () => {
  try {
    const response = await api.getBuffer(`/api/maker/welcome1`, { 
        pp : "http://localhost:3000/api/maker/pp-default",
        name : "Azhari%20Creative",
        gcname : "autoresbot",
        member : "20",
        ppgc : "http://localhost:3000/api/maker/ppgc-default"
    });

    // response.data sekarang adalah Buffer
    fs.writeFileSync('welcome.jpg', response);
    console.log('Gambar berhasil disimpan ke welcome.jpg');
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
})();
*/

// Upload File 
// Notes: File uploader di autoresbot bisa di upload dari situs resmi autoresbot.com, hasil file ini akan expired selama 1 minggu setelah upload, namun setiap kali di akses masa expired akan selalu di perbarui untuk 1 minggu kedepan
/*
(async () => {
  try {
    const response = await api.tmpUpload('./welcome.jpg');

    console.log("Gambar berhasil diupload ke server :",response);
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
})();

*/