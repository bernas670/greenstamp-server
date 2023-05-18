const express = require('express')
const multer = require('multer')
const mime = require('mime-types')
const fs = require('fs')
const https = require('https')
const http = require('http')


const options = {
    cert: fs.readFileSync('/etc/letseencrypt/live/green.dei.uc.pt/fullchain.pem', 'utf8'),
    key: fs.readFileSync('/etc/letseencrypt/live/green.dei.uc.pt/privkey.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letseencrypt/live/green.dei.uc.pt/chain.pem', 'utf8')
}


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

const app = express()

app.use((req, res) => {
	res.send('Hello there!')
})


app.post('/upload', upload.single('file'), (req, res) => {
    // Save the uploaded file to the server
    res.send('File saved!')
})


const httpServer = http.createServer(app)
const httpsServer = https.createServer(options, app)

httpServer.listen(80)
httpsServer.listen(443)

console.log(`App listening on http://localhost:80`)
console.log(`App listening on https://localhost:443`)
