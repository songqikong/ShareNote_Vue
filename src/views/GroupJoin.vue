<template>
  <div>
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item>
          <el-row>
            <el-col :span="18">
              <h1 style="margin-bottom: 0px">加入群组</h1>
            </el-col>
            <el-col :span="6">
              <el-button icon="el-icon-back" circle class="home_button" @click="routerToHome"></el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="groupName">
          <el-input v-model="ruleForm.groupName" placeholder="请输入群组名称" class="userInput"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="ruleForm.groupPassword" placeholder="请输入群组密码" class="pwdInput" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="loginButton">加入</el-button>
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
        groupName: '',
        groupPassword: '',
      },
      rules: {
        groupName: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        groupPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],

      }
    };
  },
  methods: {
    routerToHome(){
      this.$router.push("/profile")
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          //alert('submit!');
          const _this = this
          this.$axios.post('/group/useredit', this.ruleForm,{
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res=>{
            // console.log(res.data)
            // const jwt = res.headers['authorization']
            // const userInfo = res.data.data
            //
            // //把数据共享出去
            // _this.$store.commit("SET_TOKEN",jwt)
            // _this.$store.commit("SET_USERINFO",userInfo)
            //
            // console.log(_this.$store.getters.getUser)

            _this.$router.push("/profile")


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
.home_button{
  float: right;
  margin-top: 16px;
  /*padding: 5px;*/
}
</style>