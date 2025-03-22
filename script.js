// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 响应式导航菜单
// 您可以根据需要添加汉堡菜单的JavaScript代码 

document.addEventListener('DOMContentLoaded', function () {
    const heroImage = document.querySelector('.effect-image');
    const particlesContainer = document.querySelector('.floating-particles');

    // 创建悬浮粒子
    function createParticles() {
        // 清空现有粒子
        particlesContainer.innerHTML = '';

        // 创建新粒子
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // 随机粒子大小
            const size = Math.random() * 10 + 2;

            // 随机位置
            const xPos = Math.random() * 100;
            const yPos = Math.random() * 100 + 50; // 从底部开始

            // 随机移动方向
            const xMove = (Math.random() - 0.5) * 100;
            const rotation = Math.random() * 360;

            // 随机持续时间
            const duration = Math.random() * 5 + 3;

            // 随机延迟
            const delay = Math.random() * 5;

            // 随机颜色
            const colors = ['#ffcc00', '#ff9900', '#ff6600', '#ffffff', '#66ccff'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // 设置粒子样式
            particle.style.cssText = `
                position: absolute;
                left: ${xPos}%;
                bottom: ${yPos}px;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: 50%;
                opacity: ${Math.random() * 0.7 + 0.3};
                box-shadow: 0 0 ${size * 2}px ${color};
                --x-move: ${xMove}px;
                --rotation: ${rotation}deg;
                animation: particle-float ${duration}s ease-out ${delay}s infinite;
                pointer-events: none;
            `;

            particlesContainer.appendChild(particle);
        }
    }

    // 图片悬浮效果增强
    function enhanceFloatEffect() {
        const randomX = (Math.random() - 0.5) * 5;
        const randomY = (Math.random() - 0.5) * 5;
        const randomRotate = (Math.random() - 0.5) * 0.5;

        heroImage.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;

        setTimeout(enhanceFloatEffect, 2000);
    }

    // 启动粒子效果
    createParticles();
    setInterval(createParticles, 8000);

    // 启动增强型悬浮效果
    enhanceFloatEffect();
});

// 添加安装功能代码
document.addEventListener('DOMContentLoaded', function () {
    const installBanner = document.getElementById('installBanner');
    const installBtn = document.getElementById('installBtn');
    const closeBannerBtn = document.getElementById('closeBannerBtn');
    const platformText = document.getElementById('platformText');
    const iosInstallModal = document.getElementById('iosInstallModal');

    // iOS专用功能的变量
    const iosBanner = document.getElementById('iosBanner');
    const iosInstallBtn = document.getElementById('iosInstallBtn');
    const closeIosBannerBtn = document.getElementById('closeIosBannerBtn');
    const iosTutorial = document.getElementById('iosTutorial');
    const closeTutorialBtn = document.getElementById('closeTutorialBtn');

    let deferredPrompt;
    let isIOS = false;
    let isAndroid = false;
    let isChrome = false;

    // 检测用户平台
    function detectPlatform() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // 检测iOS
        isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

        // 检测Safari浏览器
        const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

        // 检测Android
        isAndroid = /android/i.test(userAgent);

        // 检测Chrome
        isChrome = /chrome/i.test(userAgent) && !/edge/i.test(userAgent);

        // 根据平台更新文字
        if (isIOS) {
            platformText.textContent = "添加到iPhone主屏幕";
            if (!isSafari) {
                platformText.textContent += " (请使用Safari浏览器)";
            }
        } else if (isAndroid) {
            platformText.textContent = "安装到Android设备";
        } else if (isChrome) {
            platformText.textContent = "安装到Chrome浏览器";
        } else {
            platformText.textContent = "添加到您的设备";
        }
    }

    // 监听beforeinstallprompt事件
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // 只有非iOS设备才显示普通安装横幅
        if (!isIOS) {
            showInstallBanner();
        }
    });

    // 处理iOS的安装指南
    function showIOSInstallInstructions() {
        // 显示iOS安装指南弹窗
        iosInstallModal.style.display = "block";

        // 添加关闭弹窗功能
        const closeModal = document.querySelector('.close-modal');
        closeModal.onclick = function () {
            iosInstallModal.style.display = "none";
        }

        // 点击弹窗外部关闭
        window.onclick = function (event) {
            if (event.target == iosInstallModal) {
                iosInstallModal.style.display = "none";
            }
        }
    }

    // 显示安装Banner
    function showInstallBanner() {
        detectPlatform();
        installBanner.classList.add('visible');
    }

    // 显示iOS专用Banner
    function showIOSBanner() {
        iosBanner.classList.add('visible');
    }

    // 显示iOS教程
    function showIOSTutorial() {
        iosTutorial.style.display = 'block';

        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
    }

    // 关闭iOS教程
    function closeIOSTutorial() {
        iosTutorial.style.display = 'none';

        // 恢复背景滚动
        document.body.style.overflow = '';
    }

    // 处理安装按钮点击
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`用户安装结果: ${outcome}`);
            deferredPrompt = null;
            installBanner.classList.remove('visible');
        } else {
            alert('请使用支持安装功能的浏览器');
        }
    });

    // 处理iOS安装按钮点击
    iosInstallBtn.addEventListener('click', () => {
        showIOSTutorial();
    });

    // 关闭Banner按钮
    closeBannerBtn.addEventListener('click', () => {
        installBanner.classList.remove('visible');
        localStorage.setItem('installBannerClosed', 'true');
    });

    // 关闭iOS Banner按钮
    closeIosBannerBtn.addEventListener('click', () => {
        iosBanner.classList.remove('visible');
        localStorage.setItem('iosBannerClosed', 'true');
    });

    // 关闭iOS教程按钮
    closeTutorialBtn.addEventListener('click', () => {
        closeIOSTutorial();
    });

    // 点击教程外部关闭
    iosTutorial.addEventListener('click', (e) => {
        if (e.target === iosTutorial) {
            closeIOSTutorial();
        }
    });

    // 检查是否应该显示Banner
    function checkShowBanner() {
        detectPlatform();

        // 检测是否已安装
        const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;

        if (isAppInstalled) {
            // 已安装，不显示任何Banner
            return;
        }

        setTimeout(() => {
            if (isIOS) {
                // iOS设备只显示iOS专用横幅
                if (localStorage.getItem('iosBannerClosed') !== 'true') {
                    showIOSBanner();
                }
            } else if ((isAndroid || isChrome) && deferredPrompt) {
                // Android或Chrome显示标准安装横幅
                if (localStorage.getItem('installBannerClosed') !== 'true') {
                    showInstallBanner();
                }
            }
        }, 2000);
    }

    // 启动检查
    checkShowBanner();

    // 检测如果是iOS设备，添加特殊元素
    detectPlatform();
    if (isIOS) {
        addIOSSpecificElements();
    }
});

// 特殊处理iOS用户访问
function addIOSSpecificElements() {
    if (!isIOS) return;

    // 添加在iOS Safari上的特殊提示
    if (navigator.standalone !== true) {
        // 添加顶部指示箭头指向分享按钮（在某些iOS版本中）
        const arrowIndicator = document.createElement('div');
        arrowIndicator.className = 'ios-arrow-indicator';
        arrowIndicator.innerHTML = '👇 点击这里添加到主屏幕';
        document.body.appendChild(arrowIndicator);

        // 周期性闪烁提示，提醒用户操作
        setInterval(() => {
            arrowIndicator.classList.toggle('blink');
        }, 2000);
    }
} 