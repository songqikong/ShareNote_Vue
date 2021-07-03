<template>
  <div class="Index">
    <MenuHeader></MenuHeader>
<!--    内容展示区-->
    <div class="Main">
<!--      发布帖子按钮 / 选择查看权限 / 搜索框-->
      <el-row>
        <el-col :span="24">
          <div class="post">
            <el-button type="primary" style="width: 200px;margin-left: 5px" v-on:click="postNote">发布新的笔记</el-button>
          </div>

          <div class="group_select" style="float: left;margin-left: 15px">
            <el-button type="text" style="font-size:medium">全部笔记</el-button>
            <el-button type="text" style="color:#bdbdbd">只看我的</el-button>
          </div>

          <el-button icon="el-icon-search" style="float: right;margin-left: 6px;margin-right: 5px"></el-button>
          <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select=""
              style="float: right;margin-left: 20px"
          ></el-autocomplete>

        </el-col>
      </el-row>
<!--瀑布流展示笔记区-->
      <waterfall :col="4" :data="notes" style="margin-top: 11px">
        <template>
          <div
              class="note"
              v-for="(item,index) in notes"
              :key="index"
          >
            <el-card class="box-card" >
              <div slot="header" class="clearfix">
                <span style="padding: 0px 0">{{item.title}}</span>
                <el-button style="float: right;" icon="el-icon-star-off" size="mini"  circle></el-button>
              </div>
              <div class="text item">
                {{item.content}}
              </div>
            </el-card>
          </div>
        </template>
      </waterfall>

    </div>

  </div>

</template>

<script>
import MenuHeader from "@/components/MenuHeader";
import Note from "@/components/Note";
export default {
  name: "Index",
  components : {MenuHeader,Note},
  data(){
    return{
      notes:[],
      state: '',
      subject_req:{
        subjectId:'2'
      }
    }
  },
  computed:{
    itemWidth(){
      return (138*0.5*(document.documentElement.clientWidth/375)) // #rem布局 计算宽度
    },
    gutterWidth(){
      return (9*0.5*(document.documentElement.clientWidth/375))	//#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    }
  },
  //下边的内容没有用到，需要的小伙伴可以看文档了解，如果需求后续回更新
  methods:{
    //获取帖子
    getNotes(){
      const _this = this
      this.$axios.post("http://10.140.2.93:8081/notes",_this.subject_req).then(res=>{
        // console.log(res.data)
        this.notes = res.data.data
        console.log(this.notes)
      })
    },
    //发帖按钮
    postNote(){
      if(this.$store.getters.getUser.id == null){
        this.$router.push("/login")
      }else{
        this.$router.push("/note/add")
      }
    },

    //瀑布流
    scroll(scrollData){
      console.log(scrollData)
    },
    switchCol(col){
      this.col = col
      console.log(this.col)
    },
    loadmore(index){
      this.data = this.data.concat(this.data)
    },

    //搜索框
    loadAll() {
      return [
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    //菜单栏
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.getNotes();
  }
}
</script>

<style scoped>
.Main{
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
}
.post{
  float: left;
}
.notes{
  margin-top: 15px;
}

/*卡片内容*/
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