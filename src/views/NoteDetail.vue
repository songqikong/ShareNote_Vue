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
          <el-card class="box-card" style="margin-top: 15px;margin-right: 5px;">
            <div slot="header" style="padding-bottom: 0px;padding-top: 10px">

              <el-form  :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" hide-required-asterisk>
                <el-form-item prop="context" style="margin-bottom: 10px">
                  <el-input v-model="ruleForm.context" type="textarea" placeholder="请输入你的评论" rows="3" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item style="margin: 0px">
                  <el-button type="primary" style="float: right" @click="submitForm('ruleForm',noteInf.id)">发表评论</el-button>
                </el-form-item>
              </el-form>
            </div>

            <div v-for="(item,index) in comments" :key="index">
              <table style="width: 100%">
                <tr>
                  <td width="50px">
                    <div class="commentavatar">
                      <img class="avatar" :src=item.avatar alt="图片加载失败">
                   </div>
                  </td>
                  <td>
                <div class="commentname">{{ item.username}}</div>
                <div class="commentcontext">{{item.context}}</div>
                <div class="commenttime" >{{item.editTime}}</div>
                  </td>
                  <td>
                  <el-button type="text" style="float: right" class="el-icon-delete deletebutton" v-show="item.userId === userId" @click="comdelete(index)" >删除
                  </el-button>
                  </td>
                </tr>
              </table>
              <el-divider></el-divider>
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
      userId:'',
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
      ruleForm: {
          context: '',
      },
      noteVersion: [],
      ownNote: false,
      ownComment:false,
      curVersion: 1,
      curTitle: '',
      curContent: '',
      curPage:1,
      comments:[],
      rules:{
        context: [
          { required: true, message: '评论不能为空哦', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName,noteid) {
      //console.log('submit!')
      const _this = this
      if(this.$store.getters.getUser.id === undefined){
        this.$message.error('请先登录！');
      }else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('success')
            this.$axios.post("/comment", {context:this.ruleForm.context,noteId:noteid}, {
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            }).then(res => {
              this.$message({
                message:'评论成功',
                type:'success',
                duration:3000
              });
              this.commentshow()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
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
    commentshow(noteid){
      const _this=this
      // console.log(this.$store.getters.getUser.id)
      if(this.$store.getters.getUser.id === undefined){
        this.$message.error('请先登录！');
      }else{
        this.$axios.post("/commentshow",{noteId:this.$route.params.noteId},{
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res=>{
          _this.comments=res.data.data
          console.log(this.comments);
        })
      }
    },
    async comdelete(index) {
      console.log(index);
      if (this.$store.getters.getUser.id === undefined) {
        this.$message.error('请先登录！');
      } else {
        await this.$axios.post("/delcomment", {id: this.comments[index].id}, {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        this.commentshow();
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


    },

    getUserId(){
      this.userId = this.$store.getters.getUser.id
    }
  },
  mounted() {
    this.getUserId()
    this.getNote()
    this.commentshow()
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
.commentname{
  font-family: "Microsoft YaHei",serif;
  font-size: 14px;
  margin-bottom: 5px;
}
.commenttime{
  font-family: "Microsoft YaHei",serif;
  color:#99A2AA;
  font-size: 14px;
}
.commentcontext{
  font-family: "Microsoft YaHei",serif;
  font-size: 18px;
  margin-bottom: 5px;
}
.avatar{
  height: 40px;
  /*margin-top: */
  /*margin-bottom: 40px;*/
  border-radius:100%;

}
</style>