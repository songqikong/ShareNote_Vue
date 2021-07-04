<template>
  <div>
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item>
          <h1 style="margin-bottom: 0px">登录</h1>
        </el-form-item>

        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号" class="userInput"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="ruleForm.password" placeholder="请输入密码" class="pwdInput"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="loginButton">登录</el-button>
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
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          //alert('submit!');
          const _this = this
          this.$axios.post('http://127.0.0.1:8081/login', this.ruleForm).then(res=>{
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
  margin-top: 200px;
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
</style>