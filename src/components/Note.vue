<template>
  <el-card class="box-card" body-style="padding:20px">
    <div slot="header" class="clearfix">
      <span style="padding: 0 0">卡片名称</span>
      <el-button style="float: right;" icon="el-icon-star-off" size="mini"  circle></el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>

</template>

<script>
export default {
  name: "Note"
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  /*width: 480px;*/
  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
}
</style>