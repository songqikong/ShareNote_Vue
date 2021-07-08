<template>
  <div class="bg">
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item>
          <el-row>
            <el-col :span="18">
              <h1 style="margin-bottom: 0">登录</h1>
            </el-col>
            <el-col :span="6">
              <el-button icon="el-icon-house" circle class="home_button" @click="routerToHome"></el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号" class="userInput"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="ruleForm.password" placeholder="请输入密码" class="pwdInput" type="password"></el-input>
        </el-form-item>

        <el-form-item style="margin-bottom: 0">
          <el-button type="primary" @click="submitForm('ruleForm')" class="loginButton">登录</el-button>
          <el-button @click="routerToReg()" style="margin-left: 0;width: 100%;margin-top: 10px">现在注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
import Header from "@/components/Header";
export default {
  components : {Header},
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],

      }
    };
  },
  created() {
    if(this.$store.getters.getUser.id !== undefined){
      // this.$message.error("您已经登录！")
      this.$router.push("/")
    }
    },
  methods: {
    routerToReg(){
      this.$router.push("/register")
    },
    routerToHome(){
      this.$router.push("/")
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          //alert('submit!');
          const _this = this
          this.$axios.post('/login', this.ruleForm).then(res=>{
            console.log(res.data)
            const jwt = res.headers['authorization']
            const userInfo = res.data.data

            //把数据共享出去
            _this.$store.commit("SET_TOKEN",jwt)
            _this.$store.commit("SET_USERINFO",userInfo)

            console.log(_this.$store.getters.getUser)

            _this.$router.push("/")


          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.box-card{
  margin-left:  auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
  width: 400px;
  /*margin-top: px;*/
}
.loginButton{
  width: 100%;
}
.userInput{
  margin-bottom: 10px;
}
.pwdInput{
  margin-bottom: 10px;
}
.home_button{
  float: right;
  margin-top: 16px;
  /*padding: 5px;*/
}
.bg{
  background-image: url('/static/img/bg3.png');
  padding-top: 200px;
  padding-bottom: 430px;
}
</style>