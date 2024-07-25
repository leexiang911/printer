// 下载日志，创建一个函数，用于下载日志文件

export function downloadLog(data: string, filename: string) {
    // return;

    const blob = new Blob([data], { type: 'text/plain' });

    // 创建一个指向 Blob 对象的 URL
    const url = URL.createObjectURL(blob);

    // 创建一个隐藏的 <a> 元素
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    const now = new Date();
    const date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    a.download = date + '_' + filename + '.json'; // 设置下载文件的名称

    // 将 <a> 元素添加到 DOM 中
    document.body.appendChild(a);

    // 触发 <a> 元素的点击事件
    a.click();

    // 移除 <a> 元素并释放 URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}