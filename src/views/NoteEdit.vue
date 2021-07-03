<template>
  <div class="noteedit">
    <MenuHeader></MenuHeader>
    <div class="m-container" style="margin:20px">
      <Header></Header>
      <div class="m-content">
        <el-form ref="editForm" status-icon :model="editForm" :rules="rules">
          <el-form-item prop="title">
            <el-input v-model="editForm.title" placeholder="请输入标题，并在下方MarkDown编辑器中输入正文">
              <template slot="prepend">标题</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="content">
            <mavon-editor v-model="editForm.content"/>
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" placeholder="请选择分区" prop="subjectSelect">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" @click="submitForm()" style="float: right">立即创建</el-button>
<!--            <el-button>取消</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import MenuHeader from "@/components/MenuHeader";

export default {
  name: "NoteEdit",
  components : {MenuHeader},
  data() {
    return {
      editForm: {
        id: null,
        title: '',
        description: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入摘要', trigger: 'blur'}
        ],
        subjectSelect:[
          {required: true}
        ]

      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    const _this = this
    if(blogId) {
      this.$axios.get('/blog/' + blogId).then((res) => {
        const blog = res.data.data
        _this.editForm.id = blog.id
        _this.editForm.title = blog.title
        _this.editForm.description = blog.description
        _this.editForm.content = blog.content
      });
    }
  },
  methods: {
    submitForm() {
      const _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/blog/edit', this.editForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then((res) => {
            _this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/blogs")
              }
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>