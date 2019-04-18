'use strict';

const Multer = require('multer');

const storage = Multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'server/uploads');
  },
  filename: (req, file, callback) => {
    // validando el tipo de imagen que suben
    const filetypes = new RegExp(/(\.jpg|\.png)$/);
    // const mintype = filetypes.test(file.mimetype); //comprobando el archivo del mimetype
    const extname = filetypes.test(file.originalname);
  
    if(extname){
      return callback(null, file.originalname.toLocaleLowerCase()) //error y nombre del archivo que se guardara
    }

    callback('Error: Only images in jpg or png are allowed');
  }
});

module.exports = Multer({storage});
