const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');

app.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.webm');
  }
});

const upload = multer({ storage: storage });

app.get("/", (req,res)=>{
    res.sendFile("./index.html", {root: __dirname});
})

app.post('/save-audio', upload.single('audio'), (req, res) => {
    console.log('File received');
    res.send('Audio file is saved.');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
