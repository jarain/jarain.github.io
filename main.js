// scripts.js
 // 检测是否为移动设备的函数
 function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

// 如果不是移动设备，阻止页面显示
if (!isMobileDevice()) {
    document.body.classList.add('blocked');
}
document.addEventListener("DOMContentLoaded", function() {
    const splashNotification = document.getElementById("splash-notification");
    const closeButton = document.getElementById("close-btn");

    // 点击关闭按钮时隐藏通知
    closeButton.addEventListener("click", function() {
        splashNotification.style.display = "none";
    });

    // 10秒后自动关闭通知
    setTimeout(function() {
        splashNotification.style.display = "none";
    }, 15000); // 10秒 = 10000毫秒
});

const images = [
    { name: "康熙二十六年(安平县志)", src: "https://jarain.github.io/kx.jpg", id: "kx" },
    { name: "光绪二十八年(重绘版)", src: "https://jarain.github.io/gx.jpg", id: "gx" },
    { name: "民国二十年", src: "https://jarain.github.io/mg.jpg", id: "mg" },
    { name: "光绪二十八年(原版)", src: "https://jarain.github.io/gx_ori.jpg", id: "gx_ori" }
];

const tabsContainer = document.getElementById('tabs');
const contentsContainer = document.getElementById('contents');
let currentImageId = images[0].id; // 默认选中的图片 ID
var imageLoading = document.getElementById('imageLoading'); // 获取加载动画容器

// 动态生成tabs和内容
images.forEach((image, index) => {
    // 创建tab按钮
    const tabButton = document.createElement('button');
    tabButton.className = 'tablinks';
    tabButton.textContent = image.name;
    tabButton.onclick = (event) => openTab(event, image.id);
    if (index === 0) {
        tabButton.classList.add('active');
    }
    tabsContainer.appendChild(tabButton);

    // 创建图片容器
    const contentDiv = document.createElement('div');
    contentDiv.id = image.id;
    contentDiv.className = 'content' + (index === 0 ? ' active' : '');

    const pinchZoomDiv = document.createElement('div');
    pinchZoomDiv.className = 'pinch-zoom';

    const img = document.createElement('img');
    img.id = `image${index + 1}`;
    img.src = image.src;
    img.alt = `Image ${index + 1}`;
    img.crossOrigin = 'anonymous';
    img.draggable = 'false';
    img.oncontextmenu = () => false;

    pinchZoomDiv.appendChild(img);
    contentDiv.appendChild(pinchZoomDiv);
    contentsContainer.appendChild(contentDiv);
});

// Tab 切换功能
function openTab(evt, tabName) {
    const contents = document.getElementsByClassName('content');
    const tabs = document.getElementsByClassName('tablinks');

    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');

    // 更新当前选中的图片ID
    currentImageId = tabName;

    // 显示图片加载动画
    showImageLoading();

    // 检查图片是否已经加载完成
    var img = document.getElementById(`image${Array.from(contents).findIndex(c => c.id === tabName) + 1}`);
    if (img.complete) {
        hideImageLoading(); // 如果图片已被缓存，立即隐藏加载动画
    } else {
        img.onload = function() {
            hideImageLoading(); // 当图片加载完成时隐藏加载动画
        };
        img.onerror = function() {
            hideImageLoading(); // 如果图片加载失败，也隐藏加载动画
            alert('图片加载失败，请重试');
        };
    }

    // Reinitialize PinchZoom for the active content
    initPinchZoom(`#${tabName} .pinch-zoom`);
}

// Initialize PinchZoom.js
function initPinchZoom(selector) {
    const element = document.querySelector(selector);
    if (!element.pinchZoomInstance) {
        element.pinchZoomInstance = new PinchZoom.default(element, {
            tapZoomFactor: 4,
            animationDuration: 300,
            maxZoom: 10,
            minZoom: 1,
            draggableUnzoomed: false,
            lockDragAxis: false,
        });
    }
}

// 显示图片加载动画
function showImageLoading() {
    imageLoading.classList.add('active');
}

// 隐藏图片加载动画
function hideImageLoading() {
    imageLoading.classList.remove('active');
}

// 下载当前选中图片
const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', () => {
    const activeImage = document.querySelector(`#${currentImageId} img`);
    const imageUrl = activeImage.src;

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image_${currentImageId}.jpg`;
    link.click();
});

// 初始化 PinchZoom.js
initPinchZoom(`#${currentImageId} .pinch-zoom`);

// 获取查看文本按钮和添加弹窗容器
const viewTextBtn = document.getElementById('view-text-btn');

// 创建弹窗函数
function showTextPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.innerHTML = `
        <p>按安平县治，</p>
        <p>东界饶阳县境，十五里至治三十里；</p>
        <p>南界深州县境，十二里至治五十里；</p>
        <p>西界深泽县境三十里至治六十里；</p>
        <p>北界博野县境，二十八里至治五十里；</p>
        <p>东北界饶阳县境，二十五里至治六十五里；</p>
        <p>东南界饶阳县境，十五里至治四十五里；</p>
        <p>西南界束鹿县境，四十几里至治九十里；</p>
        <p>西北界祁州境，三十五里至治六十里。</p>

        <p>全境共二百四十六村庄。</p>

        <p>城之北二十五里有潴龙河一道，西北隶祁州境者，系属三支，一曰滋河一曰沙河一曰唐河，自祁州军诜村起，至县属北郭村入境，合而为一名曰潴龙河，经由什伍、柏令、赵院、徘徊、院西、王六市、邓家庄、秦王庄、白沙庄等村，东北下接博野县淮南村出境止，计长三十一里。向有官工与民工严修之堤埝，可以束水，近年三汛保护平稳俱获安澜。</p>

        <p>又城之南三里许有滹沱河一道，自深泽县铁杆村起至县属马江村入境经由郭家店、谢疃村、南庙头、刘光营、韩村铺等村，正东下接饶阳县马长屯村出境止，计长四十五里。</p>
        河面较宽，其底甚浅，且水势來去无定向，无堤身束水，来则任其泛滥横流，势虽沟涌，然近数年中，两岸民田受淤红胶土者，能得一水一麦之利，较他处之地收获禾麦多至数倍，惟地势低洼处，所淤白土浮沙之处不能栽种，不过十分中之一二耳。</p>

        <p>此图每方四里，核计地二十一顷六十亩，全图计三百零一方六分，共核地六千五百十四顷五十六亩，除去大小庄基、河身、存占地一百六十一顷八十五亩，外实在民粮地六千三百五十二顷七十一亩，悉皆考証，与赋役全书相符。</p>

        <p>时在光绪壬寅秋，仿照外洋画式尽两阅月之功测绘成幅，以备便览此识</p>

        <p>知安平县事高维敬谨呈</p>
        <button id="close-popup-btn">关闭</button>
    `;

    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    // 添加关闭按钮功能
    const closeButton = document.getElementById('close-popup-btn');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// 点击查看文本按钮时显示弹窗
viewTextBtn.addEventListener('click', showTextPopup);