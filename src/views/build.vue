<template>
  <div>
    <div id="buildv"></div>
    <div class="progress-bar">
      <el-progress
        :percentage="timeline"
        :stroke-width="10"
        :show-text="false"
      ></el-progress>
      <div class="time-bar">
        时长: <span v-show="time[0] > 0">{{ time[0] }}m </span>
        <span v-show="time[1] > 0">{{ time[1] }}s </span>
        <span v-show="time[2] > 0">{{ time[2] }}ms</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as buildV from "../plugins/buildv/buildv";
export default {
  name: "build",
  data() {
    return {
      timeline: 0,
      time: [0, 0, 0],
      loading: {
        obj: {},
        config: {
          target: "#main",
          lock: true,
          text: "正在渲染",
          background: "rgba(0, 0, 0, 0.9)",
        },
      },
    };
  },
  methods: {
    init: function () {
      if (
        this.$route.params.download !== undefined &&
        this.$route.params.download.open
      )
        this.loading.obj = this.$loading(this.loading.config);
      let bvCode = this.$route.params.code;
      if (bvCode == undefined || bvCode == null) {
        buildV.reset();
        buildV.addGlitch({ duration: 0.2, time: 1 });
        buildV.addGlitch({ duration: 0.2, time: 2.5 });
        buildV.render("buildv", this.updateTimeline, this.buildSuccess);
      } else {
        console.log(bvCode)
        eval("buildV.reset();\n"+
          bvCode +
            '\nbuildV.render("buildv",this.updateTimeline,this.buildSuccess,this.$route.params.download);'
        );
      }
    },
    updateTimeline: function (sec) {
      this.$notify({
        duration: 1500,
        type: "success",
        title: "代码验证通过",
        position: "bottom-left",
      });
      this.buildTime(sec);
      let max = 0;
      let msec = sec * 10;
      let inc = Number(parseFloat(100 / msec).toFixed(2));
      console.log(
        "[buildV] 渲染完成 -> " +
          sec +
          "秒 -> " +
          inc +
          "/0.1秒 -> 预计" +
          msec +
          "个0.1秒"
      );
      let interval = setInterval(() => {
        if (this.timeline + inc > 100) {
          this.timeline = 100;
          max = 999999999;
        } else {
          this.timeline = Number(parseFloat(this.timeline + inc).toFixed(4));
          max += 1 / 10;
        }
        if (max > msec) {
          clearInterval(interval);
        }
      }, 100);
    },
    buildTime: function (sec) {
      let time = [0, 0, 0];
      let msec = sec * 1000;
      let msect = "" + msec;
      if (msec > 1000) {
        time[2] = parseInt(msect.substring(msect.length - 3));
        msec -= time[2];
        msect = "" + msec;
        if (msec >= 10000 && msec <= 60000) {
          time[1] = parseInt(
            msect.substring(msect.length - 5, msect.length - 3)
          );
        } else {
          time[1] = Number(
            parseFloat(
              (6000 *
                Number(
                  ("" + parseFloat(msec / 60000).toFixed(4)).substring(2, 6)
                )) /
                1000000
            ).toFixed(0)
          );
        }
        msec -= time[1] * 1000;
      }
      if (msec >= 60000) time[0] = msec / 60000;
      this.time = time;
    },
    buildSuccess: function () {
      if (this.$route.params.download !== undefined)
        setTimeout(() => {
          this.$confirm("渲染完成,视频已成功构建并导出.", "提示", {
            confirmButtonText: "确定",
            closeOnClickModal: false,
            showCancelButton: false,
            type: "success",
          });
          if (this.loading.obj !== undefined) this.loading.obj.close();
        }, 1000);
    },
  },
  mounted: function () {
    this.$forceUpdate();
    this.init();
    window.buildV = buildV;
  },
};
</script>
<style>
#buildv {
  width: 62.5vw;
  height: 37.5vw;
}

.el-progress-bar > div,
.el-progress-bar > div > div {
  border-radius: 0 !important;
}

.time-bar {
  color: #fff;
  float: right;
  padding: 15px 15px 0 0;
}
</style>