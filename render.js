const {
    dialog
} = require('electron').remote;

const {
    obliquePro
} = require('./utils/dataPro');

function getProcessInfo() {
    console.log("getCPUUsage:", process.getCPUUsage());
    console.log("env", process.env);
    console.log("arch", process.arch);
}

getProcessInfo();

// 倾斜摄影测量数据处理操作
const obliqueDiv = document.getElementById('oblique');
const obliqueStatusDiv = document.getElementById('oblique-status');
obliqueDiv.addEventListener('click', () => {
    dialog.showOpenDialog({
        title: '请选择metadata.xml文件',
        properties: ['openDirectory']
    }).then(obliqueOriData => {
        const openPath = obliqueOriData.filePaths[0];
        dialog.showOpenDialog({
            title: '请选择数据存储文件夹',
            properties: ['openDirectory']
        }).then(saveDir => {
            obliquePro(openPath, saveDir.filePaths[0], obliqueStatusDiv);
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    });
});

// 地形数据处理操作
const terrainDiv = document.getElementById("terrain");
terrainDiv.addEventListener('click', () => {
    dialog.showOpenDialog({
        title: '请选择tif文件',
        properties: ['openFile'],
        filters: [
            { name: "Terrain Data", extensions: ['tif', 'tiff']}
        ]
    }).then(terrainOriFilePath => {
        const filePath = terrainOriFilePath.filePaths[0];
        dialog.showOpenDialog({
            title: '请选择处理后数据存储文件夹',
            properties: ['openDirectory']
        }).then(saveDir => {
            terrain
        })
    })
})