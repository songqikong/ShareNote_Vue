<template xmlns>
  <el-card class="box-card" body-style="padding:5px">
    <el-row class="box-card-row">
      <el-col :span="8">
        <div class="grid-content">
          <img src="../assets/logo.png" style="height: 60px;margin: 0px;float: left">
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content">
         刘永坤
        </div>
      </el-col>

      <el-col :span="8">
        <div class="right-gird">
          <el-badge :value="12" class="notice">
            <i class="el-icon-message-solid"></i>
          </el-badge>

          <el-dropdown class="avatar">
          <img src="public/static/custom.png" style="height: 40px">
            <el-dropdown-menu slot="dropdown" style="margin-bottom: 20px">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>

    </el-row>
  </el-card>

</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.box-card {
  padding-left: 10px;
  padding-right: 15px;
  margin: 0px;
}

.box-card-row {
}

.right-gird {
  float: right;
  vertical-align: middle;
  margin-top: 10px;
}

.avatar {
  vertical-align: middle;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  /*margin-bottom: 20px;*/
}
.el-icon-arrow-down {
  font-size: 12px;
}

.notice{
  margin-right: 30px;
}
</style>