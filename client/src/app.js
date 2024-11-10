import axios from "axios"

const oProgress = document.querySelector('#upload-progress')
const oIpt = document.querySelector("#upload-input")
const oBtn = document.querySelector('#upload-button')
const oInfo = document.querySelector("#upload-info")
const oReview = document.querySelector("#upload-review")

oBtn.addEventListener("click", uploadVideo, false)

async function uploadVideo() {
    const file = oIpt.files[0]

    if (!file) {
        oInfo.innerText = "请先选择文件"
        return
    }

    const { name, size, type } = file
    const fileName = Date.now() + '_' + name
    oProgress.max = size


    if (type !== "video/mp4") {
        oInfo.innerText = "文件必须是mp4类型"
    }


    let uploadSize = 0
    const chunkSize = 20 * 1024 * 1024




    let uploadResult = null
    const uploadArr = []
    while (uploadSize < size) {
        const chunkFile = file.slice(uploadSize, uploadSize + chunkSize)
        console.log("chunkFile",chunkFile)
        const uploadData = {
            name,
            size,
            type,
            fileName,
            uploadSize,
            chunkFile
        }
        const uploadPromise = await axios.post("http://localhost:8000/upload_video", uploadData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        uploadArr.push(uploadPromise)
        
        uploadSize += chunkSize
        oProgress.value = uploadSize
    }
    Promise.all(uploadArr).then(res => {
        oReview.src = res[res.length -1].data.url
    })
    oInfo.innerText = ""
    oIpt.value = null
}








