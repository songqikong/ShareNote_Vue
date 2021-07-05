<template>
  <div>
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item>
          <h1 style="margin-bottom: 0px">注册</h1>
        </el-form-item>

        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号" class="userInput" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" class="pwdInput" type="password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="checkpassword">
          <el-input v-model="checkpassword" placeholder="请再次输入密码" class="pwdInput" type="password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="padding-top: 20px">
          <el-button type="primary" @click="submitForm('ruleForm')" class="loginButton">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        email: '',
      },
      checkpassword: '',
      rules: {
        // checkpassword: [
        //   {required: true, message: '请再次输入密码', trigger: 'blur'},
        // ],
        username: [
          {required: true, message: '请输入账户', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ]
      }
    };
  },
      methods: {
        submitForm(ruleForm) {
          if(this.ruleForm.password !== this.checkpassword){
            this.$message({
              message: '两个密码输入不相同',
              type: 'warning'
            });
            return;
          }
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              //alert('submit!');
              const _this = this
              this.$axios.post('/register', this.ruleForm).then(res => {
                console.log(res.data)
                const jwt = res.headers['authorization']
                const userInfo = res.data.data

                //把数据共享出去
                _this.$store.commit("SET_TOKEN", jwt)
                _this.$store.commit("SET_USERINFO", userInfo)

                console.log(_this.$store.getters.getUser)
                _this.$message('注册成功！');
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