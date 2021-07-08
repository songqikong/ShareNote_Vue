<template>
  <div>
    <el-row>
      <el-col :span="4" >
        <el-menu mode="horizontal" style="height: 60px">
          <router-link to="/">
            <img src="../assets/logo_full.png" class="logo">
          </router-link>
        </el-menu>

      </el-col>
      <el-col :span="16">
        <el-menu class="el-menu-demo" mode="horizontal" style="height: 60px">
            <el-menu-item index="1" v-on:click="selectSubject(0)">笔记广场</el-menu-item>
            <el-submenu index="2">
              <template slot="title">各科目笔记</template>
              <el-menu-item index="2-1" v-on:click="selectSubject(1)">数学</el-menu-item>
              <el-menu-item index="2-2" v-on:click="selectSubject(2)">英语</el-menu-item>
<!--              <el-menu-item index="2-3" v-on:click="selectSubject(2)">英语</el-menu-item>-->
            </el-submenu>
            <el-menu-item index="3">交流心得</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">

        <el-menu mode="horizontal" style="height: 60px">
          <el-menu-item style="float: right;">
            <el-dropdown class="avatar_dropdown"
                         @command="handleCommand"
                          style="">
            <span class="el-dropdown-link" >
<!--              头像-->
            <img class="avatar" v-bind:src="avatar_src" alt="ava" style="margin-bottom: 5px">
            </span>
              <el-dropdown-menu slot="dropdown"
                                style="position: absolute;left:100px;top:100px">
                <el-dropdown-item v-show="!isLogin"
                                  command="login">登录</el-dropdown-item>
                <el-dropdown-item v-show="!isLogin"
                                  command="register">注册</el-dropdown-item>

                <el-dropdown-item v-show="isLogin"
                                  command="username" disabled>{{ username }}</el-dropdown-item>
                <el-dropdown-item v-show="isLogin"
                                  command="profile">个人信息</el-dropdown-item>
                <el-dropdown-item v-show="isLogin"
                                  command="setting">设置</el-dropdown-item>
                <el-dropdown-item v-show="isLogin"
                                  command="logout"
                                  divided >退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>

          <el-menu-item style="float: right;height: 30px;margin-top: 6px">
            <div class="right-gird" style="height: 30px" @click="notice">
              <el-badge :value="12" class="notice" style="height: 30px">
                <i class="el-icon-message-solid" style="padding-bottom: 40px"></i>
              </el-badge>
            </div>
          </el-menu-item>

        </el-menu>
      </el-col>
    </el-row>
    <div class="line"></div>
  </div>


</template>

<script>

export default {
  name: "MenuHeader",

  data() {
    return {
        isLogin: false,
        avatar_src:"",
        username:""
    }
  },

  methods:{

    selectSubject(flag){
      this.$parent.refreshNotes(flag);
      console.log('刷新')
    },

    notice(){
      this.$notify({
        title: '消息通知',
        dangerouslyUseHTMLString: true,
        offset:50,
        message: "<h5><a href=\"http://www.baidu.com\" style='color: #409EFF'>高等数学定积分例题一</a>&nbsp; 有新的回复</h5>" +
            "<h5><a href=\"http://www.baidu.com\"  style='color: #409EFF'>高等数学无穷级数例题二</a>&nbsp; 有新的回复</h5>"

      });
    },
    loginout(){
      this.$store.commit("REMOVE_INFO",)
      this.$router.push("/")
      console.log("login out")
    },
    handleCommand(command){
      console.log(command)
      switch (command){
        case "login": this.$router.push("/login")
          break;
        case "register": this.$router.push("/register")
                        break;
        case "profile": this.$router.push("/profile")
                        break;
        case "setting": this.$router.push("/setting")
                        break;
        case "logout" : this.$store.commit("REMOVE_INFO",);
                        this.$router.go(0);
                        this.avatar_src = "../assets/custom.png"
                        break;
      }
    }
  },

  mounted: function () {
    // const _this = this
    if (this.$store.getters.getUser === null || this.$store.getters.getUser.id === undefined) {
      this.avatar_src = "/static/custom.png"
      this.username = "没有用户"
      // console.log("没有用户")
    } else {
      this.isLogin = true
      this.username = this.$store.getters.getUser.username
      this.avatar_src = this.$store.getters.getUser.avatar
      // console.log("有用户")
    }
  }
}

</script>

<style scoped>
.el-menu-demo {
  width: 100%;
  display: flex;
  justify-content: center;
}
.logo{
  height: 44px;
  margin-top: 8px;
  margin-bottom: 4px;
  margin-left: 30px;
  float: left
}
.font_style{
  color: #606266;
  text-decoration:none;
}
.avatar{
  height: 40px;
  /*margin-top: */
  /*margin-bottom: 40px;*/
  border-radius:6px
}
</style>