const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', express.static("uploads"))

const uploader = require("express-fileupload")
app.use(uploader())

const { resolve } = require('path')

const { appendFileSync, writeFileSync } = require('fs')

app.all("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.post('/upload_video', (req, res) => {
    console.log(req.files.chunkFile.data)
    const {
        name,
        size,
        type,
        fileName,
        uploadSize,
        chunkFile
    } = req.body
    const { file } = req.files
    const filePath = resolve(__dirname, './uploads/' + fileName)
    if (uploadSize === 0) {
        writeFileSync(filePath, req.files.chunkFile.data)
    } else {
        appendFileSync(filePath, req.files.chunkFile.data)
    }
    res.send({
        code: 0,
        msg: 'ok',
        url: "http://localhost:8000/" + fileName
    })
})

app.listen(8000, () => {
    console.log("Server is running at 8000")
})