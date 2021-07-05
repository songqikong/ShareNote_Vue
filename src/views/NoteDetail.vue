<template>
  <div class="notedetail">
    <MenuHeader></MenuHeader>
    <div class="Main">
      <el-row>
        <el-col :span="16">
          <el-card class="navi">
            <el-page-header @back="goBack"
                            content="详情页面">
            </el-page-header>
          </el-card>

          <el-card class="notecard" body-style="padding:0px">
            <div slot="header" class="headertitle">
              <el-row>
                <el-col :span="20">
                  <span class="title" style="color: #606266">{{ noteVersion[0].title }}</span>
                </el-col>

                <el-col :span="4">
                  <span style="color: #606266">{{ noteInf.username }}</span>
                </el-col>
              </el-row>
            </div>

            <!--            <el-divider style="margin-top: 0"></el-divider>-->

            <div class="details" v-html="noteVersion[0].content"></div>
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
                <el-submenu index="item.id">
                  <template slot="title">
                    <i class="el-icon-circle-plus-outline"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group title="分组一">
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </div>

            </el-menu>
          </el-card>
        </el-col>
      </el-row>

    </div>

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
        userId: '1',
        created: '1',
        publicStatus: '1',
        clicksNum: '1',
        starsNum: '1',
        deleted: '1',
        username:''
      },
      noteVersion: []
    }
  },
  methods: {
    goBack() {
      this.$router.push("/")
    },
    getNote() {
      const _this = this
      const noteId = this.$route.params.noteId

      console.log("noteid = " + noteId)
      this.$axios.get("/note/" + noteId, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res.data)
        this.noteInf = res.data.data.note
        this.noteVersion = res.data.data.note_version_subject
        var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
        for (var i = 0; i < _this.noteVersion.length; i++) {
          _this.noteVersion[i].content = md.render(_this.noteVersion[i].content);
          console.log(_this.notes[i].content)
        }
        // console.log(this.noteVersion)

      })
    },
  },
  mounted() {
    this.getNote()
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
</style>