(function(e){function t(t){for(var r,o,u=t[0],c=t[1],l=t[2],d=0,s=[];d<u.length;d++)o=u[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&s.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(s.length)s.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function u(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d0e5354":"e50d29a9","chunk-4a0bb36f":"7015149a"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-4a0bb36f":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0e5354":"31d6cfe0","chunk-4a0bb36f":"e62c1240"}[e]+".css",a=c.p+r,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var l=i[u],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===r||d===a))return t()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){l=s[u],d=l.getAttribute("data-href");if(d===r||d===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],f.parentNode.removeChild(f),n(i)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=u(e);var s=new Error;l=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",s.name="ChunkLoadError",s.type=r,s.request=o,n[1](s)}a[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:d})}),12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var f=d;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("el-row",[n("el-col",{attrs:{span:9}},[n("codemirror",{ref:"editor",staticClass:"code",attrs:{value:e.code,options:e.options}})],1),n("el-col",{attrs:{span:15,id:"main"}},[n("div",{staticClass:"build-box"},[n("router-view",{key:(new Date).getTime()})],1),n("div",{staticClass:"foot-bar"},[n("div",{staticClass:"tools"},[n("el-button",{attrs:{type:"info"},on:{click:e.build}},[e._v("Build Video")]),n("el-button",{attrs:{type:"info"}},[e._v("导出脚本")]),n("el-button",{attrs:{type:"info"},on:{click:e.download}},[e._v("导出视频")])],1)])])],1)],1)},a=[],i=(n("b0c0"),n("8f94")),u=n.n(i),c=(n("f9d4"),n("8c2e"),{name:"app",components:{codemirror:i["codemirror"]},data:function(){return{code:"buildV.addGlitch({ duration: 0.2, time: 1 });\nbuildV.addGlitch({ duration: 0.2, time: 2.5 });",options:{mode:"text/javascript",theme:"base16-dark",lineWrapping:!0,lineNumbers:!0},config:{open:!1,framerate:60,format:"webm",name:(new Date).getTime()}}},methods:{init:function(){},build:function(){this.$router.push({name:"middle",params:{code:this.$refs.editor.codemirror.getValue(),download:this.config}})},download:function(){var e=this;this.$confirm("确认开始构建成品视频并导出?<br>tips: 耗时约为视频长度的1.1至1.8倍,具体取决于显卡.","提示",{dangerouslyUseHTMLString:!0,confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$router.push({name:"middle",params:{code:e.$refs.editor.codemirror.getValue(),download:{open:!0,framerate:e.config.framerate,format:e.config.format,name:e.config.name}}})}))}},mounted:function(){this.init()}}),l=c,d=(n("034f"),n("2877")),s=Object(d["a"])(l,o,a,!1,null,null,null),f=s.exports,p=n("5c96"),m=n.n(p);n("c69f");r["default"].use(m.a);n("a7be"),n("d3b7");var h=n("8c4f");r["default"].use(h["a"]);var b=[{path:"",redirect:"build",meta:{title:"正在加载"}},{path:"/build",name:"build",component:function(){return n.e("chunk-4a0bb36f").then(n.bind(null,"97d8"))}},{path:"/middle",name:"middle",component:function(){return n.e("chunk-2d0e5354").then(n.bind(null,"9403"))}}],v=new h["a"]({routes:b}),g=v;r["default"].config.productionTip=!1,r["default"].use(u.a),new r["default"]({router:g,render:function(e){return e(f)}}).$mount("#app")},"85ec":function(e,t,n){},c69f:function(e,t,n){}});
//# sourceMappingURL=app.58c6804d.js.map