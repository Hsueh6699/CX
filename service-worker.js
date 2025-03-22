const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './images/main-image.png',
  './images/icon-192x192.png',
  './images/icon-512x512.png'
];

// 安装事件 - 缓存资源
self.addEventListener('install', function (event) {
  console.log('Service Worker 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('初始缓存完成');
        return self.skipWaiting();
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', function (event) {
  console.log('Service Worker 激活中...');

  // 在激活成功后尝试提供安装提示
  self.registration.showNotification('安装提示', {
    body: '将彩旭娱乐添加到主屏幕，获得更好的体验！',
    icon: './images/icon-192x192.png',
    badge: './images/favicon.ico',
    actions: [
      {
        action: 'install',
        title: '立即安装'
      },
      {
        action: 'cancel',
        title: '取消'
      }
    ]
  }).catch(err => console.log('通知权限未获取或不支持:', err));

  // 获取所有缓存键名
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 清理旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function () {
      console.log('Service Worker: 声明控制权');
      return self.clients.claim();
    })
  );
});

// 处理通知点击事件
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  if (event.action === 'install') {
    // 通知用户如何安装
    clients.openWindow('./');
  }
});

// 请求拦截
self.addEventListener('fetch', function (event) {
  console.log('Service Worker 拦截请求:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // 缓存命中
        if (response) {
          console.log('缓存命中:', event.request.url);
          return response;
        }
        console.log('缓存未命中，网络请求:', event.request.url);

        // 克隆请求，因为请求只能使用一次
        return fetch(event.request.clone()).then(
          function (response) {
            // 检查是否是有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应，因为响应体只能使用一次
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                console.log('缓存新请求:', event.request.url);
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
      .catch(function (error) {
        console.log('请求失败:', error);
        // 可以返回一个离线页面或默认内容
        return caches.match('./offline.html');
      })
  );
}); 