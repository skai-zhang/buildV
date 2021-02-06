<template>
  <div id="app">
    <el-row>
      <el-col :span="9">
        <codemirror ref="editor" :value="code" :options="options" class="code">
        </codemirror>
      </el-col>
      <el-col :span="15" id="main">
        <div class="build-box">
          <router-view :key="new Date().getTime()" />
        </div>
        <div class="foot-bar">
          <div class="tools">
            <el-button type="info" @click="build">Build Video</el-button>
            <el-button type="info">导出脚本</el-button>
            <el-button type="info" @click="download">导出视频</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/base16-dark.css";
export default {
  name: "app",
  components: {
    codemirror,
  },
  data() {
    return {
      code:
        "buildV.addGlitch({ duration: 0.2, time: 1 });\nbuildV.addGlitch({ duration: 0.2, time: 2.5 });",
      options: {
        mode: "text/javascript",
        theme: "base16-dark",
        lineWrapping: true,
        lineNumbers: true,
      },
      config: {
        open: false,
        framerate: 60, // 视频帧数
        format: "webm", // 输出格式
        name: new Date().getTime(),
      },
    };
  },
  methods: {
    init: function () {
      // buildV.addGlitch({ duration: 0.2, time: 1 });
      // buildV.addGlitch({ duration: 0.2, time: 2.5 });
      // 渲染到指定容器内
      // buildV.render("buildv");
    },
    build: function () {
      this.$router.push({
        name: "middle",
        params: {
          code: this.$refs.editor.codemirror.getValue(),
          download: this.config,
        },
      });
    },
    download: function () {
      this.$confirm("确认开始构建成品视频并导出?<br>tips: 耗时约为视频长度的1.1至1.8倍,具体取决于显卡.", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$router.push({
          name: "middle",
          params: {
            code: this.$refs.editor.codemirror.getValue(),
            download: {
              open: true,
              framerate: this.config.framerate,
              format: this.config.format,
              name: this.config.name,
            },
          },
        });
      });
    },
  },
  mounted: function () {
    this.init();
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #e3e3e3;
  background-color: #000;
}

.build-box {
  width: 62.5vw;
  height: calc(37.5vw + 10px);
}

.code {
  background: #393e46;
  height: 100vh;
}

.code .CodeMirror {
  height: 100vh !important;
  font-size: 18px;
}

.code .CodeMirror-vscrollbar {
  opacity: 0;
}

.foot-bar {
  background: #222831;
  height: calc(calc(100vh - 37.5vw) - 40px);
  padding: 15px;
}

.tools {
  position: absolute;
  right: 15px;
  bottom: 15px;
}
</style>

