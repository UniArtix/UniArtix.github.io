var container;
var canvas;
var loadingBar;
var progressBarFull;
var fullscreenButton;
var warningBanner;
var instance;

function unityShowBanner(msg, type) {
function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
}
var div = document.createElement('div');
div.innerHTML = msg;
warningBanner.appendChild(div);
if (type == 'error') div.style = 'background: red; padding: 10px;';
else {
    if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
    setTimeout(function() {
    warningBanner.removeChild(div);
    updateBannerVisibility();
    }, 5000);
}
updateBannerVisibility();
}

var buildUrl = "./src/Build";
var loaderUrl = buildUrl + "/build2.loader.js";
var config = {
dataUrl: buildUrl + "/build2.data",
frameworkUrl: buildUrl + "/build2.framework.js",
codeUrl: buildUrl + "/build2.wasm",
streamingAssetsUrl: "StreamingAssets",
companyName: "DefaultCompany",
productName: "blendshape",
productVersion: "0.1",
showBanner: unityShowBanner,
};

$(document).ready(function () {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);

        var canvas = document.querySelector("#unity-canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.position = "fixed";

        document.body.style.textAlign = "left";
        }

        createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "src/Build/build_min2.data",
        frameworkUrl: "src/Build/build_min2.framework.js",
        codeUrl: "src/Build/build_min2.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "blendshape",
        productVersion: "0.1",
        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
        }, (progress) => {
            }).then((unityInstance) => {
            instance = unityInstance;
            updateClock();
            }).catch((message) => {
            alert(message);
            }
        );
})