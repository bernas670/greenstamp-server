const express = require('express')
const multer = require('multer')
const mime = require('mime-types')


const app = express()
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        // save file with timestamp and original extension
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    }),
    // destination folder
    dest: 'uploads/'
})


app.post('/upload', upload.single('file'), (req, res) => {
    // Save the uploaded file to the server
    res.send('File saved!')
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})