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
<!--搜索框-->
          <el-button icon="el-icon-search" style="float: right;margin-left: 6px;margin-right: 5px"></el-button>
          <el-autocomplete
              v-model="state"
              placeholder="请输入内容"
              @select=""
              :fetch-suggestions="querySearchAsync"
              style="float: right;margin-left: 20px"
          ></el-autocomplete>
<!--          -->

        </el-col>
      </el-row>
<!--瀑布流展示笔记区-->
      <waterfall :col="4" :data="notes" :loadDistance="30" style="margin-top: 11px" @loadmore="loadmore">
        <template>
          <div
              class="note"
              v-for="(item,index) in notes"
              :key="index"
          >

            <el-card class="box-card" body-style="padding-top:0px">
              <div slot="header" class="clearfix">
                <el-row>
                  <el-col :span="20">
                    <el-button type="text" style="font-size: 20px;color: #606266;padding-bottom: 0px;padding-top: 2px" @click="router_to_Detail(item.noteId)">{{item.title}}</el-button>
<!--                      <a style="font-size: 20px;color: #606266" @click.native="router_to_Detail()">{{item.title}}</a>-->

                  </el-col>
                  <el-col :span="4">
                    <el-button style="float: right;" icon="el-icon-star-off" size="mini"  circle @click="star(item.noteId)"></el-button>

                  </el-col>
                </el-row>
              </div>
              <div class="text item" v-html="item.content">
<!--                {{cutString(item.content,420)}}-->
              </div>
              <span style="float: bottom;color: #bdbdbd">{{item.sname}}</span>
              <span style="float:right;color: #bdbdbd">{{item.created}}</span>
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
import 'github-markdown-css/github-markdown.css'
export default {
  name: "Index",
  components : {MenuHeader,Note},
  data(){
    return{
      notes:[],
      nextNotes:[],
      restaurants: [],
      state: '',
      subject_req:{
        subjectId:'0',
        currentPage:'1',
        pageSize:'18'
      },
      // loading:true,
      cutContent:'',
      curPage:1,
      curId:'1'
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
    search(){
      this.$axios.post("/note/search",{searchString:this.state,subjectId:'0'}).then(res=>{
        var data = res.data.data()
        console.log(data)
      })
    },
    star(noteid){
      // console.log(this.$store.getters.getUser.id)
      if(this.$store.getters.getUser.id === undefined){
        this.$message.error('请先登录！');
      }else{
        this.$axios.post("/note/star",{starNoteId:noteid},{
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res=>{
          if(res.data.data === "star"){
            this.$message({
              message: '收藏成功',
              type: 'success'
            });
          }else if(res.data.data === "remove star"){
            this.$message({
              message: '取消收藏成功',
              type: 'success'
            });
          }
        })
      }
    },
    router_to_Detail(noteId){
      this.$router.push("/note/"+noteId)
    },

    refreshNotes(subject){
      this.subject_req.subjectId = subject;
      this.getNotes('1');
    },

    //获取帖子
    getNotes(currentpage){
      this.subject_req.currentPage = currentpage;
      const _this = this
      this.$axios.post("/notes",_this.subject_req).then(res=>{
        // console.log(res.data)
        this.notes = res.data.data
        var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
        for (var i = 0; i < _this.notes.length; i++) {
          _this.notes[i].content = this.cutString(_this.notes[i].content,420)
          _this.notes[i].title = this.cutString(_this.notes[i].title,35)
          _this.notes[i].content = md.render(_this.notes[i].content);
          // console.log(_this.notes[i].content)
        }
        // console.log(this.notes)
        this.$waterfall.forceUpdate()
        // console.log("强制刷新了")
      })

      // console.log("当前note")
      // console.log(this.notes)
    },

    //获取下一轮帖子
    getNextNotes(currentpage){
      this.subject_req.currentPage = currentpage;
      console.log("下一页页号")
      // console.log(currentpage)
      const _this = this
      this.$axios.post("/notes",_this.subject_req).then(res=>{
        _this.nextNotes = res.data.data
        var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
        for (var i = 0; i < _this.nextNotes.length; i++) {
          _this.nextNotes[i].content = this.cutString(_this.nextNotes[i].content,420)
          _this.nextNotes[i].title = this.cutString(_this.nextNotes[i].title,35)
          _this.nextNotes[i].content = md.render(_this.nextNotes[i].content);
        }
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
    //瀑布流加载更多
    loadmore(index){
      this.curPage+=1
      this.getNextNotes(this.curPage)
      this.notes = this.notes.concat(this.nextNotes)
      console.log(this.notes.length)
      // this.$waterfall.forceUpdate()
    },

    //搜索框
    loadAll() {
      return [
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
      ];
    },

    querySearchAsync(queryString, cb) {
      console.log(this.state)
      this.$axios.post("/note/search",{searchString:this.state,subjectId:1},{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res=>{
        var data = res.data.data()
        console.log(data)
      })

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