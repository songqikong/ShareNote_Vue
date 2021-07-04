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
      <waterfall :col="4" :data="notes" :loadDistance="50" style="margin-top: 11px" @loadmore="loadmore">
        <template>
          <div
              class="note"
              v-for="(item,index) in notes"
              :key="index"
          >

            <el-card class="box-card" body-style="padding-top=20px;padding-left=20px;padding-right=20px;padding-bottom=10px" >
              <div slot="header" class="clearfix">
                <el-row>
                  <el-col :span="20">
                    <span style="font-size: 20px;color: #606266">{{item.title}}</span>
                  </el-col>
                  <el-col :span="4">
                    <el-button style="float: right;" icon="el-icon-star-off" size="mini"  circle></el-button>

                  </el-col>
                </el-row>
              </div>
              <div class="text item">
                {{cutString(item.content,420)}}
              </div>
              <span style="float: bottom;color: #bdbdbd">{{item.sname}}</span>
              <span style="float: bottom;float:right;color: #bdbdbd">{{item.created}}</span>
            </el-card>
          </div>
        </template>
      </waterfall>

    </div>

<!--    <div style="width: 100%; min-height: 100%;color: #606266;position:fixed">这个一个全局遮罩</div>-->
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
      nextNotes:[],
      state: '',
      subject_req:{
        subjectId:'0',
        currentPage:'1',
        pageSize:'12'
      },
      loading:true,
      cutContent:''
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
    refreshNotes(subject){
      this.subject_req.subjectId = subject;
      this.getNotes();
    },

    //获取帖子
    getNotes(currentpage){
      this.subject_req.currentPage = currentpage;
      const _this = this
      this.$axios.post("http://127.0.0.1:8081/notes",_this.subject_req).then(res=>{
        // console.log(res.data)
        this.notes = res.data.data
        console.log(this.notes)
        this.$waterfall.forceUpdate()

        var that = this;
        setTimeout(function (){
          this.loading = false;
          console.log("结束加载")
        },100);
      })
    },

    //获取下一轮帖子
    getNextNotes(currentpage){
      this.subject_req.currentPage = currentpage;
      const _this = this
      this.$axios.post("http://127.0.0.1:8081/notes",_this.subject_req).then(res=>{
        // console.log(res.data)
        this.nextNotes = res.data.data
        console.log(this.nextNotes)
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

    loadmore(index){
      this.getNextNotes()
      this.notes = this.notes.concat(this.notes)
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
    },

    cutString(str, len) {
      //length属性读出来的汉字长度为1
      if (str.length * 2 <= len) {
        return str;
      }
      var strlen = 0;
      var s = "";
      for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
          strlen = strlen + 2;
          if (strlen >= len) {
            return s.substring(0, s.length - 1) + "...";
          }
        } else {
          strlen = strlen + 1;
          if (strlen >= len) {
            return s.substring(0, s.length - 2) + "...";
          }
        }
      }
      return s;
    }

},
  mounted() {
    this.restaurants = this.loadAll();
    this.getNotes('1');
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
  color: #606266;
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