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
        showInstallBanner();
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

    // 处理安装按钮点击
    installBtn.addEventListener('click', async () => {
        if (isIOS) {
            showIOSInstallInstructions();
        } else if (deferredPrompt) {
            // 显示安装提示
            deferredPrompt.prompt();
            // 等待用户响应
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`用户安装结果: ${outcome}`);
            // 我们只能使用一次
            deferredPrompt = null;
            // 隐藏Banner
            installBanner.classList.remove('visible');
        } else {
            // 如果没有安装提示但用户点击了安装按钮
            alert('请使用支持安装功能的浏览器（Chrome、Safari）');
        }
    });

    // 关闭Banner
    closeBannerBtn.addEventListener('click', () => {
        installBanner.classList.remove('visible');
        // 保存用户偏好，不再显示Banner
        localStorage.setItem('installBannerClosed', 'true');
    });

    // 检查是否应该显示Banner
    function checkShowBanner() {
        // 如果用户之前关闭了Banner，就不再显示
        if (localStorage.getItem('installBannerClosed') === 'true') {
            return;
        }

        // 检测是否已安装
        if (window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true) {
            // 应用已安装，不显示Banner
            return;
        }

        // 检测是否是iOS并且是Safari浏览器，因为只有Safari支持添加到主屏幕
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isIOSSafari = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream &&
            /^((?!chrome|android).)*safari/i.test(userAgent);

        // 延迟显示Banner，给用户一些时间先看内容
        setTimeout(() => {
            detectPlatform();

            // 即使在iOS上也显示Banner，但会提供特殊的安装指南
            if (isIOS || isAndroid || isChrome) {
                showInstallBanner();

                // 如果是iOS设备且使用Safari，可以选择自动显示安装指南
                if (isIOSSafari && !localStorage.getItem('iosInstructionsShown')) {
                    // 延迟一点再显示安装指南，让用户先注意到Banner
                    setTimeout(() => {
                        showIOSInstallInstructions();
                        localStorage.setItem('iosInstructionsShown', 'true');
                    }, 2000);
                }
            }
        }, 3000);
    }

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

    // 启动检查
    checkShowBanner();

    // 检测如果是iOS设备，添加特殊元素
    detectPlatform();
    if (isIOS) {
        addIOSSpecificElements();
    }
}); 