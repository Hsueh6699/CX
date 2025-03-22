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

    // iOS专用功能的变量
    const iosFloatingBtn = document.getElementById('iosFloatingBtn');
    const iosTutorial = document.getElementById('iosTutorial');
    const closeTutorialBtn = document.getElementById('closeTutorialBtn');

    const floatingLogoBtn = document.getElementById('floatingLogoBtn');
    const floatingMenu = document.getElementById('floatingMenu');

    let deferredPrompt;
    let isIOS = false;
    let isAndroid = false;
    let isChrome = false;

    // 检测用户平台
    function detectPlatform() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // 检测iOS
        isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

        // 检测Android
        isAndroid = /android/i.test(userAgent);

        // 检测Chrome
        isChrome = /chrome/i.test(userAgent) && !/edge/i.test(userAgent);

        // 根据平台更新文字
        if (platformText) {
            if (isIOS) {
                platformText.textContent = "添加到iPhone主屏幕";
            } else if (isAndroid) {
                platformText.textContent = "安装到Android设备";
            } else if (isChrome) {
                platformText.textContent = "安装到Chrome浏览器";
            } else {
                platformText.textContent = "添加到您的设备";
            }
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

    // 修复: LOGO按钮点击事件
    if (floatingLogoBtn && floatingMenu) {
        console.log("设置LOGO按钮点击事件");

        // 清除可能导致问题的pointer-events样式
        document.querySelector('.floating-menu-container').style.pointerEvents = 'auto';

        floatingLogoBtn.addEventListener('click', function (e) {
            console.log("LOGO按钮被点击");
            e.stopPropagation(); // 阻止事件冒泡

            floatingMenu.classList.toggle('active');

            // 添加活跃状态的动画
            if (floatingMenu.classList.contains('active')) {
                floatingLogoBtn.style.animation = 'none';
                setTimeout(() => {
                    floatingLogoBtn.style.animation = 'float-logo 3s ease-in-out infinite';
                }, 10);
            }
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function (event) {
            if (floatingMenu.classList.contains('active') &&
                !floatingMenu.contains(event.target) &&
                !floatingLogoBtn.contains(event.target)) {
                floatingMenu.classList.remove('active');
            }
        });
    } else {
        console.log("未找到LOGO按钮或菜单元素");
    }

    // 显示安装Banner
    function showInstallBanner() {
        if (installBanner) {
            installBanner.classList.add('visible');
        }
    }

    // 显示iOS教程
    function showIOSTutorial() {
        if (iosTutorial) {
            iosTutorial.style.display = 'block';

            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
        }
    }

    // 关闭iOS教程
    function closeIOSTutorial() {
        if (iosTutorial) {
            iosTutorial.style.display = 'none';

            // 恢复背景滚动
            document.body.style.overflow = '';
        }
    }

    // 处理安装按钮点击
    if (installBtn) {
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
    }

    // 处理iOS安装按钮点击
    if (iosFloatingBtn) {
        iosFloatingBtn.addEventListener('click', () => {
            showIOSTutorial();
        });
    }

    // 关闭Banner按钮
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            installBanner.classList.remove('visible');
            localStorage.setItem('installBannerClosed', 'true');
        });
    }

    // 关闭iOS教程按钮
    if (closeTutorialBtn) {
        closeTutorialBtn.addEventListener('click', () => {
            closeIOSTutorial();
        });
    }

    // 点击教程外部关闭
    if (iosTutorial) {
        iosTutorial.addEventListener('click', (e) => {
            if (e.target === iosTutorial) {
                closeIOSTutorial();
            }
        });
    }

    // 调整LOGO尺寸函数
    function adjustLogoSize() {
        if (!floatingLogoBtn || !floatingLogoBtn.querySelector('img')) return;

        const logoImg = floatingLogoBtn.querySelector('img');

        // 获取视口宽度
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        // 根据视口宽度调整LOGO尺寸
        if (vw <= 480) {
            floatingLogoBtn.style.width = '60px';
            floatingLogoBtn.style.height = '60px';
            logoImg.style.maxWidth = '60px';
            logoImg.style.maxHeight = '60px';
        } else if (vw <= 768) {
            floatingLogoBtn.style.width = '70px';
            floatingLogoBtn.style.height = '70px';
            logoImg.style.maxWidth = '70px';
            logoImg.style.maxHeight = '70px';
        } else {
            floatingLogoBtn.style.width = '100px';
            floatingLogoBtn.style.height = '100px';
            logoImg.style.maxWidth = '100px';
            logoImg.style.maxHeight = '100px';
        }
    }

    // 检查是否应该显示安装提示
    function checkShowInstallPrompts() {
        detectPlatform();

        // 检测是否已安装
        const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;

        if (isAppInstalled) {
            // 已安装，隐藏所有安装提示
            if (iosFloatingBtn) iosFloatingBtn.style.display = 'none';
            return;
        }

        setTimeout(() => {
            if (isIOS) {
                // iOS设备显示右上角安装按钮
                if (iosFloatingBtn && localStorage.getItem('iosButtonClicked') !== 'true') {
                    iosFloatingBtn.style.display = 'flex';
                }
            } else if ((isAndroid || isChrome) && deferredPrompt) {
                // Android或Chrome显示标准安装横幅
                if (localStorage.getItem('installBannerClosed') !== 'true') {
                    showInstallBanner();
                }
            }
        }, 2000);
    }

    // 初始调整
    adjustLogoSize();

    // 当视口尺寸改变时重新调整
    window.addEventListener('resize', adjustLogoSize);

    // 启动检查
    checkShowInstallPrompts();
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

// 添加悬浮LOGO按钮和菜单功能
document.addEventListener('DOMContentLoaded', function () {
    // 获取LOGO按钮元素
    const floatingLogoBtn = document.getElementById('floatingLogoBtn');
    const logoImg = floatingLogoBtn ? floatingLogoBtn.querySelector('img') : null;

    // 调整LOGO尺寸函数
    function adjustLogoSize() {
        if (!floatingLogoBtn || !logoImg) return;

        // 获取视口宽度
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        // 根据视口宽度调整LOGO尺寸
        if (vw <= 480) {
            // 小型手机
            floatingLogoBtn.style.width = '60px';
            floatingLogoBtn.style.height = '60px';
            logoImg.style.maxWidth = '60px';
            logoImg.style.maxHeight = '60px';
        } else if (vw <= 768) {
            // 平板和大型手机
            floatingLogoBtn.style.width = '70px';
            floatingLogoBtn.style.height = '70px';
            logoImg.style.maxWidth = '70px';
            logoImg.style.maxHeight = '70px';
        } else {
            // 桌面设备
            floatingLogoBtn.style.width = '100px';
            floatingLogoBtn.style.height = '100px';
            logoImg.style.maxWidth = '100px';
            logoImg.style.maxHeight = '100px';
        }
    }

    // 初始调整
    adjustLogoSize();

    // 当视口尺寸改变时重新调整
    window.addEventListener('resize', adjustLogoSize);

    // 在页面加载完成后再次调整，确保图片已加载
    window.addEventListener('load', adjustLogoSize);

    // 悬浮LOGO和菜单功能
    const floatingMenu = document.getElementById('floatingMenu');

    // LOGO按钮点击事件
    if (floatingLogoBtn && floatingMenu) {
        floatingLogoBtn.addEventListener('click', function () {
            floatingMenu.classList.toggle('active');

            // 添加活跃状态的动画
            if (floatingMenu.classList.contains('active')) {
                floatingLogoBtn.style.animation = 'none';
                setTimeout(() => {
                    floatingLogoBtn.style.animation = 'float-logo 3s ease-in-out infinite';
                }, 10);
            }
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function (event) {
            if (!floatingMenu.contains(event.target) && !floatingLogoBtn.contains(event.target)) {
                floatingMenu.classList.remove('active');
            }
        });
    }

    // 启动现有功能检查
    // checkShowInstallPrompts();
    // 其他现有代码...
});

document.addEventListener('DOMContentLoaded', function () {
    // 为新的LOGO按钮添加点击事件
    const newLogoBtn = document.getElementById('newLogoBtn');
    const newLogoMenu = document.getElementById('newLogoMenu');

    if (newLogoBtn && newLogoMenu) {
        // 直接使用onclick属性绑定事件 - 最直接的方式
        newLogoBtn.onclick = function () {
            newLogoMenu.classList.toggle('active');
        };

        // 点击其他区域关闭菜单
        document.addEventListener('click', function (event) {
            if (event.target !== newLogoBtn && !newLogoMenu.contains(event.target)) {
                newLogoMenu.classList.remove('active');
            }
        });
    } else {
        console.error('未找到LOGO按钮或菜单元素');
    }

    // iOS安装按钮功能
    const iosFloatingBtn = document.getElementById('iosFloatingBtn');
    const iosTutorial = document.getElementById('iosTutorial');
    const closeTutorialBtn = document.getElementById('closeTutorialBtn');

    // 检测是否是iOS设备
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // 根据设备显示相应按钮
    if (isIOS && iosFloatingBtn) {
        iosFloatingBtn.style.display = 'flex';
    }

    // iOS安装按钮点击事件
    if (iosFloatingBtn && iosTutorial) {
        iosFloatingBtn.onclick = function () {
            iosTutorial.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
    }

    // 关闭教程
    if (closeTutorialBtn && iosTutorial) {
        closeTutorialBtn.onclick = function () {
            iosTutorial.style.display = 'none';
            document.body.style.overflow = '';
        };

        // 点击外部关闭
        iosTutorial.addEventListener('click', function (event) {
            if (event.target === iosTutorial) {
                iosTutorial.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Android安装横幅功能
    const installBanner = document.getElementById('installBanner');
    const installBtn = document.getElementById('installBtn');
    const closeBannerBtn = document.getElementById('closeBannerBtn');
    let deferredPrompt;

    // 监听安装事件
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPrompt = e;

        // 只有非iOS设备才显示此横幅
        if (!isIOS && installBanner) {
            installBanner.classList.add('visible');
        }
    });

    // 安装按钮点击
    if (installBtn) {
        installBtn.onclick = async function () {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`用户安装结果: ${outcome}`);
                deferredPrompt = null;

                if (installBanner) {
                    installBanner.classList.remove('visible');
                }
            }
        };
    }

    // 关闭横幅
    if (closeBannerBtn && installBanner) {
        closeBannerBtn.onclick = function () {
            installBanner.classList.remove('visible');
            localStorage.setItem('installBannerClosed', 'true');
        };
    }
}); 