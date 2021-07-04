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
            <el-select v-model="editForm.subjectId" placeholder="请选择科目" prop="subjectSelect">
              <el-option
                  v-for="item in subject"
                  :key="item.id"
                  :label="item.sname"
                  :value="item.id">
              </el-option>
            </el-select>
            <el-radio-group v-model="editForm.publicStatus"  style="margin-left: 20px">
              <el-radio-button label="0">所有人可见</el-radio-button>
              <el-radio-button label="-1">私有</el-radio-button>
              <el-radio-button label="1">群组可见</el-radio-button>
            </el-radio-group>

            <el-select v-model="groupvalue" clearable placeholder="选择群组"  v-show="editForm.publicStatus==='1'" style="margin-left: 20px">
              <el-option
                  v-for="item in group"
                  :key="item.gid"
                  :label="item.gname"
                  :value="item.gid">
              </el-option>
            </el-select>

            <el-button type="primary" @click="submitForm()" style="float: right" v-bind:disabled="editForm.subjectId==='' || editForm.publicStatus===''">立即创建</el-button>
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
      groupvalue:'',
      group:[
        {
          gid:1,
          gname:"实习摸鱼小组"
        },
        {
          id:2,
          gname:"高数学习小组"
        },
        {
          id:3,
          gname:"英语学习小组"
        },
      ],
      authority: '',
      visibility:'',

      editForm: {
        noteVersionId:'0',
        userId:this.$store.getters.getUser.id,
        noteId:'-1',
        publicStatus:'',
        starsNum:'0',
        deleted:'0',
        title: '',
        description: '占位',
        content: '',
        subjectId:''
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

      subject:[]
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
    querySubject(){
      const _this = this
      this.$axios.get('/subject').then(res=>{
        _this.subject = res.data.data
        console.log(_this.subject)
      })
    },

    submitForm() {
      const _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/note/edit', this.editForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then((res) => {
            // _this.$alert('您已发表了一份笔记！', {
            //   confirmButtonText: '确定',
            //   callback: action => {
            //     _this.$router.push("/")
            //   }
            // });
            _this.$message('成功发表笔记!');
            _this.$router.push("/")

          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  mounted() {
    this.querySubject()
  }
}
</script>

<style scoped>

</style>