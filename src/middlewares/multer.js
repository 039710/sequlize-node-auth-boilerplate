const multer = require('multer');
const path = require('path');
const fs = require('fs');


// storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    // remove space
    req.fileName = `${name.replace(/\s/g, '')}-${Date.now()}${ext}`;
    cb(null, req.fileName);
  },
  destination: (req, file, cb) => {
    // check if ../../public/uploads exist if not create it
    const dir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);

  }
});

// filter file
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new Error('Only images are allowed'));
  }
  cb(null, true);
};


const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024
  },

});


module.exports = upload;
  