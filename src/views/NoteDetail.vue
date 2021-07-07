<template>
  <div class="notedetail">
    <MenuHeader></MenuHeader>
    <div class="Main">
      <el-row>
        <el-col :span="16">
          <el-card class="navi" body-style="padding:15px">
            <el-row>
              <el-col :span="20">
                <el-page-header @back="goBack"
                                content="详情页面">
                </el-page-header>
              </el-col>
              <el-col :span="4">
                <el-button style="float: right;" icon="el-icon-star-off" size="mini"  circle @click="star(noteInf.id)"></el-button>
              </el-col>
            </el-row>

          </el-card>

          <el-card class="notecard" body-style="padding:0px">
            <div slot="header" class="headertitle">
              <el-row>
                <el-col :span="14">
                  <i class="el-icon-s-order" style="margin-right: 10px"></i>
                  <span style="color: #606266">{{ curTitle }}</span>
                </el-col>

                <el-col :span="10">
                  <el-button type="text" class="el-icon-edit editbutton" v-if="ownNote" @click="updateNote">编辑
                  </el-button>
                  <el-button type="text" class="el-icon-delete deletebutton" v-if="ownNote" @click="deleteNote">删除
                  </el-button>
                  <span style="color: rgba(96,98,102,0.6);float: right;font-size: 15px;margin-top: 1px ">发布者：{{
                      noteInf.userName
                    }}</span>

                </el-col>
              </el-row>
            </div>

            <!--            <el-divider style="margin-top: 0"></el-divider>-->

            <div class="details" v-html="curContent">
            </div>

            <el-card>
              <span style="float: bottom;color: #bdbdbd">{{noteVersion[0].sname}}</span>
              <span style="float:right;color: #bdbdbd">{{noteVersion[0].editTime}}</span>
            </el-card>


          </el-card>

        </el-col>
        <el-col :span="8">
          <el-card class="commentcard" body-style="padding:0px">
            <div slot="header" class="clearfix">
              历史记录
            </div>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo">

              <div v-for="(item,index) in noteVersion" :key="index">
                <el-menu-item v-bind:index="item.id.toString()" @click="changeVersion(item.version)">
                  <i class="el-icon-d-arrow-left"></i>
                  <span style="font-size: 15px">{{ item.editTime }}</span>
                </el-menu-item>
              </div>

            </el-menu>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-card class="box-card" style="margin-top: 15px;margin-right: 5px">
            <div slot="header" class="clearfix">
              <span class="headertitle">评论</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
    <router-view></router-view>
  </div>

</template>

<script>
import MenuHeader from "@/components/MenuHeader";

export default {
  name: "NoteDetail",
  components: {MenuHeader},
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      noteInf: {
        id: '1',
        userId: 1,
        created: '1',
        publicStatus: '1',
        clicksNum: '1',
        starsNum: '1',
        deleted: '1',
        username: ''
      },
      noteVersion: [],
      ownNote: false,
      curVersion: 1,
      curTitle: '',
      curContent: ''
    }
  },
  methods: {
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
    changeVersion(newVersion) {
      const noteId = this.$route.params.noteId
      this.$axios.get("/note/" + noteId, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.noteInf = res.data.data.note
        this.noteVersion = res.data.data.note_version_subject

        this.curVersion = newVersion;
        console.log("版本更改为" + newVersion)

        console.log(this.noteVersion)
        for (var i = 0; i < this.noteVersion.length; i++) {
          if (this.noteVersion[i].version === newVersion) {
            var curVersion = this.noteVersion[i]
            console.log("curVersion is"+curVersion)
          }
        }
        var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
        this.curTitle = curVersion.title
        this.curContent = md.render(curVersion.content);
      })
    },
    goBack() {
      this.$router.push("/")
    },
    getNote() {
      const _this = this
      const noteId = this.$route.params.noteId

      // console.log("noteid = " + noteId)
      this.$axios.get("/note/" + noteId, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.noteInf = res.data.data.note
        _this.noteVersion = res.data.data.note_version_subject
        // console.log(_this.noteVersion)

        var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
        for (var i = 0; i < this.noteVersion.length; i++) {
          this.noteVersion[i].content = md.render(this.noteVersion[i].content);
          // console.log(this.noteVersion[i].content)
        }
        // console.log(_this.noteVersion)
        _this.curTitle = _this.noteVersion[0].title
        _this.curContent = _this.noteVersion[0].content
        this.ownNote = (_this.noteInf.userId === _this.$store.getters.getUser.id)
      })

      // console.log("发帖人" + _this.noteInf.userId + "当前用户" + _this.$store.getters.getUser.id + "ownNote状态" + this.ownNote)
      // console.log(_this.noteInf)
      // console.log(_this.noteVersion)

      // console.log(this.curTitle)
    },

    updateNote() {
      this.$router.push("/note/" + this.$route.params.noteId + "/" + this.curVersion + "/edit")
    },
    deleteNote(){
      // console.log(this.noteInf)
      // this.noteInf.deleted = 1
      this.$confirm('此操作将删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {

        await this.$axios.post("/note/edit", {
          noteVersionId: 2,
          userId: 1,
          noteId: this.noteInf.id,
          publicStatus: 0,
          starsNum: 0,
          deleted: 1,
          title: "test2",
          description: "test222",
          content: "test22222",
          subjectId: 1,
        }, {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then((res) => {
          console.log("删除" + this.noteInf.id)
        })
        // this.$parent.forceUpdate()
        this.$router.push("/loading")

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

      // console.log(this.noteInf)


    }
  },
  mounted() {
    this.getNote()
    if(this.$store.getters.getUser === null || this.$store.getters.getUser.id === undefined){
      this.$alert('您还没有登录', '请登录！', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push("/login")
        }
      })
    }
  }
}
</script>

<style scoped>
.Main {
  margin: 15px;
}

.navi {
  margin-bottom: 10px;
  margin-right: 5px;
}

.notecard {
  margin-right: 5px;
}

.commentcard {
  margin-left: 5px;
}

.clearfix {
  color: #606266;
  font-size: 18px;
}

.headertitle {
  font-size: 20px;
}

.details {
  padding-top: 8px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: rgba(255, 251, 251, 1);
}

.editbutton {
  float: right;
  color: rgb(64, 158, 255);
  font-size: 17px;
  margin-left: 15px;
  margin-top: 2px;
  margin-bottom: 0px;
  padding: 0px;
}
.deletebutton{
  float: right;
  color: #F56C6C;
  font-size: 17px;
  margin-left: 15px;
  margin-top: 2px;
  margin-bottom: 0px;
  padding: 0px;
}
</style>