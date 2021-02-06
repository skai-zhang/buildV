import * as THREE from 'three';


import CCapture from '@/../node_modules/ccapture.js/src/CCapture.js'
import download from '@/../node_modules/ccapture.js/src/download.js'
import '@/../node_modules/ccapture.js/src/gif.js'
import '@/../node_modules/ccapture.js/src/gif.worker.js'
import '@/../node_modules/ccapture.js/src/tar.js'
import '@/../node_modules/ccapture.js/src/Whammy.js'

import { GlitchPass } from "./GlitchPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

let gsap;
let composer;
let renderer;
let chain = [];
let videoCamera;
let mainTimeline;
let globalTimeline;
let buildSuccess;

// 执行渲染
export function render(id, callback, success, download) {
    if (download !== undefined) {
        config.video = download;
    }
    (async () => {
        buildSuccess = success;
        // 第一步: 初始化容器
        let container = initContainer(id);
        // 第二步: 初始化渲染器
        renderer = initRenderer(container);
        // 第三步: 初始化镜头
        let camera = initCamera(container);
        // 第四步: 初始化场景
        let scene = initScene();
        // 第五步: 初始化特效合成器
        composer = initComposer(renderer, scene, camera);
        // 加入炫光特效
        composer = initDazzle(composer);
        // 加入故障特效
        composer = initGlitch(composer);
        // 加入抗锯齿模组
        composer = initAntialias(renderer.getPixelRatio(), composer);
        // 初始化摄像机
        initVideoCamera();

        for (const code of chain) {
            if (typeof code === "function") {
                const ret = code();
                if (ret instanceof Promise) {
                    await ret;
                }
            } else {
                throw `invalid command`;
            }
        }

        animate();
        // 渲染输出
        composer.render();

        callback(mainTimeline.endTime());
    })();
}

// 配置
let config = {
    transparent: 1.0,   // 透明度
    antialias: "msaa",  // 抗锯齿模式
    gpu: false,         // 是否强制启用GPU渲染(默认自动选择) 
    debug: true,        // 是否启用调试模式
    dazzle: false,      // 是否启用炫光特效
    glitch: false,      // 是否启用故障特效
    video: {
        open: false,
        framerate: 60,  // 视频帧数
        format: "webm", // 输出格式
        name: new Date().getTime()
    }
};

// 初始化容器
function initContainer(id) {
    let obj = document.getElementById(id);
    return {
        obj: obj,
        width: obj.clientWidth,
        height: obj.clientHeight
    }
}

// 初始化渲染器
function initRenderer(container) {
    // 创建渲染器
    let renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: config.antialias === "msaa",
        powerPreference: config.gpu ? "high-performance" : "default"
    });
    // 启用对象级裁切
    renderer.localClippingEnabled = true;
    // 设定渲染画布尺寸
    renderer.setSize(container.width, container.height);
    // 设定渲染画布背景
    renderer.setClearColor(0x000000, config.transparent);
    // 装载渲染器
    container.obj.appendChild(renderer.domElement);
    // 返回渲染器对象
    return renderer;
}

// 初始化镜头
function initCamera(container) {
    // 创建镜头
    let camera = new THREE.PerspectiveCamera(75, container.width / container.height, 0.1, 1000);
    // 设定悬浮视野
    camera.position.z = 5;
    // 设定朝向指定三维向量
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    // 返回镜头对象
    return camera;
}

// 初始化场景
function initScene() {
    let scene = new THREE.Scene();
    // 设定场景背景
    scene.background = new THREE.Color(0);
    // 设定场景光源
    scene.add(new THREE.AmbientLight(0x000000));

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    return scene;
}

// 初始化特效合成器
function initComposer(renderer, scene, camera) {
    let composer = new EffectComposer(renderer);
    // 设置合成器尺寸
    composer.setSize(1920, 1080);
    // 加载渲染进程
    composer.addPass(new RenderPass(scene, camera));
    // 返回特效合成器
    return composer;
}

// 初始化视频摄像机
function initVideoCamera() {
    if (config.video.open) {
        videoCamera = new CCapture({
            framerate: config.video.framerate,
            format: config.video.format,
            name: config.video.name,
            verbose: false,
            display: false,
            motionBlurFrames: 1,
            quality: 100,
            workersPath: "dist/src/",
            timeLimit: 0,
            frameLimit: 0,
            autoSaveTime: 0,
        });
        videoCamera.start();
    }
}

// 加入炫光特效
function initDazzle(composer) {
    if (config.dazzle) {
        composer.addPass(new UnrealBloomPass(
            new THREE.Vector2(1920, 1080),
            0.5, // 强度
            0.4, // 半径
            0.85 // 起始
        ));
    }
    return composer;
}

// 加入故障特效
let glitchPass;
function initGlitch(composer) {
    if (config.glitch) {
        console.log(chain);
        glitchPass = new GlitchPass();
        composer.addPass(glitchPass);
    }
    return composer;
}

// 加入抗锯齿模组
function initAntialias(pixelRatio, composer) {
    if (config.antialias === "fxaa") {
        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.uniforms["resolution"].value.x = 1 / (1920 * pixelRatio);
        fxaaPass.uniforms["resolution"].value.y = 1 / (1080 * pixelRatio);
        composer.addPass(fxaaPass);
    }
    return composer;
}

let timeElapsed = 0;
let lastTimestamp = undefined;
let animateId;
function animate() {
    const nowInSecs = Date.now() / 1000;
    animateId = requestAnimationFrame(animate);
    let delta;
    {
        if (lastTimestamp === undefined) {
            delta = 0.000001;
            lastTimestamp = nowInSecs;
            globalTimeline.seek(0, false);
        } else {
            delta = nowInSecs - lastTimestamp;
            lastTimestamp = nowInSecs;
        }
        timeElapsed += delta;
    }
    gsap.updateRoot(timeElapsed);
    // cameraControls.update();
    composer.render();
    if (videoCamera !== undefined && config.video.open) {
        videoCamera.capture(renderer.domElement);
    }
}

async function saveVideo() {
    setTimeout(() => {
        if (videoCamera !== undefined && config.video.open) {
            videoCamera.stop();
            videoCamera.save();
            videoCamera = undefined;
            buildSuccess();
        }
    }, 1000);
}

// ----------------------------- 公开函数 ----------------------------- //

export function addGlitch({ duration, time }) {
    // 启用故障特效
    config.glitch = true;
    // 切换抗锯齿模式
    config.antialias = "fxaa";
    // 任务加入渲染链
    chain.push(() => {
        const tl = gsap.timeline();
        tl.set(glitchPass, { factor: 1 });
        tl.set(glitchPass, { factor: 0 }, `<${duration}`);
        mainTimeline.add(tl, time);
    });
}

export function reset() {

    cancelAnimationFrame(animateId);

    gsap = null;
    chain = null;
    timeElapsed = 0;
    renderer = null;
    composer = null;
    glitchPass = null;
    videoCamera = null;
    mainTimeline = null;
    buildSuccess = null;
    globalTimeline = null;
    lastTimestamp = undefined;

    delete require.cache[require.resolve("gsap/gsap-core")];
    gsap = new require("gsap/gsap-core").gsap;
    gsap.ticker.remove(gsap.updateRoot);
    gsap.timeline().clear();
    globalTimeline = new gsap.timeline();
    mainTimeline = new gsap.timeline({ onComplete: saveVideo });
    globalTimeline.add(mainTimeline, "0");

    chain = [];
}