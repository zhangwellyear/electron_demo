 const spawn = require('child_process').spawn;
 const path = require('path');

function obliquePro(dataDir, saveDir, statusDom) {
    statusDom.innerHTML = "状态：正在处理...";
    console.log(dataDir, saveDir);
    const exePath = path.join(__dirname, './obliquePro/3dtile.exe');
    const obliqueProgress = spawn(`${exePath}`, ['-f', 'osgb', '-i', dataDir, '-o', `${saveDir}`], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    obliqueProgress.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
    });

    obliqueProgress.stderr.on('data', (info) => {
        // console.log(`${info}`);
        if (info.includes('task over')) {
            statusDom.innerHTML = "状态：处理完毕";
        }
    });
}

function terrainPro(dataDir, saveDir, statusDom) {
    statusDom.innerHTML = "状态：正在处理...";
    const exePath = path.join(__dirname, './terrainPro/gdal2cesium.py')
    const terrainProgress = spawn('python', [`${exePath}`, '-o', `${dataDir}`, `${saveDir}`], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    terrainProgress.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    terrainProgress.stderr.on('data', (err) => {
        console.log(`err: ${err}`);
    });
}

exports.obliquePro = obliquePro;
exports.terrainPro = terrainPro;