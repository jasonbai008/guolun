const fs = require('fs');
const path = require('path');

// 定义 mp3 文件夹的路径
const mp3FolderPath = path.join(__dirname, 'mp3');

// 读取 mp3 文件夹中的所有文件名
fs.readdir(mp3FolderPath, (err, files) => {
    if (err) {
        console.error('读取文件夹失败:', err);
        return;
    }

    // 过滤出 mp3 文件，并去掉文件后缀
    const mp3Files = files
        .filter(file => path.extname(file) === '.mp3')
        .map(file => path.basename(file, '.mp3')); // 去掉后缀

    // 将文件名写入 JSON 文件
    const jsonFilePath = path.join(__dirname, 'guolunList.json');
    fs.writeFile(jsonFilePath, JSON.stringify(mp3Files, null, 2), (err) => {
        if (err) {
            console.error('写入 JSON 文件失败:', err);
        } else {
            console.log('文件名已成功写入 guolunList.json');
        }
    });
});
