const fs = require('fs');
const path = require('path');

// 设置起始数字（作为字符串）
const startNumber = '252'; // 可以修改这个值
const mp3Directory = path.join(__dirname, 'mp3');

// 读取目录下的文件
fs.readdir(mp3Directory, (err, files) => {
    if (err) {
        console.error('读取目录失败:', err);
        return;
    }

    // 过滤出符合条件的 .mp3 文件
    // const mp3Files = files.filter(file => {
    //     return file.endsWith('.mp3') && /^\d{3}\..+\.mp3$/.test(file);
    // });

    // 按照文件名的顺序进行重命名
    // mp3Files.sort(); // 这里按照文件名的字典序排序

    files.forEach((file, index) => {
        const newNumber = String(parseInt(startNumber) + index).padStart(3, '0'); // 确保是3位数
        const newFileName = `${newNumber}.${file.split('.')[1]}.mp3`; // 保留中文字符部分
        const oldFilePath = path.join(mp3Directory, file);
        const newFilePath = path.join(mp3Directory, newFileName);

        // 重命名文件
        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                console.error(`重命名失败: ${file} -> ${newFileName}`, err);
            } else {
                console.log(`重命名成功: ${file} -> ${newFileName}`);
            }
        });
    });
});
