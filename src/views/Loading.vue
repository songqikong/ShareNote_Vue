<template>
<div>
<!--  <el-table v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中"></el-table>-->
</div>
</template>

<script>
import { Loading } from 'element-ui';

export default {
  name: "Loading",
  data() {
    return {
      fullscreenLoading: true
    }
  },

  methods:{
    routers(){
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    routers2(){
      this.$router.push("/")
    }
  },

  created(){
    this.routers()
    this.routers2()
  }
}
</script>
<style scoped>

</style>