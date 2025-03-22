<?php
header('Content-Type: application/json');

// 获取URL参数
$url = isset($_GET['url']) ? $_GET['url'] : './index.html?source=pwa';

// 基本manifest数据
$manifest = [
  "name" => "彩旭娱乐",
  "short_name" => "彩旭娱乐",
  "description" => "彩旭娱乐 - 提供优质在线服务",
  "start_url" => $url, // 使用传入的URL
  "display" => "standalone",
  "background_color" => "#0a1529",
  "theme_color" => "#0a1529",
  "orientation" => "portrait",
  "prefer_related_applications" => false,
  "related_applications" => [],
  "scope" => "./",
  // 其他现有属性...
];

// 输出JSON
echo json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

// 转换为Blob并创建URL
$manifestBlob = new Blob([json_encode($manifest, JSON_UNESCAPED_UNICODE)], {type: 'application/json'});
$manifestURL = URL.createObjectURL($manifestBlob);

// 只在用户第一次访问时自动提示
if (deferredPrompt && !installAttempted) {
    installAttempted = true;
    localStorage.setItem('installPromptShown', 'true');
    console.log('自动触发安装提示');
    
    // 弹出浏览器的安装确认框
    deferredPrompt.prompt();
    // ...处理用户选择
}

// 添加动画使按钮更明显
const installBtn = document.getElementById('installBannerBtn');
installBtn.style.animation = 'pulse-button 1s infinite';
?> 