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
        noteVersionId:'1',
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
    const noteId = this.$route.params.noteId
    const noteVersion = this.$route.params.noteVersion
    const _this = this
    if(noteId) {
      this.$axios.get('/note/' + noteId,{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then((res) => {
        const data = res.data.data

        for (var i = 0; i < data.note_version_subject.length; i++) {
          if(data.note_version_subject[i].version.toString() === noteVersion){
            var curVersion = data.note_version_subject[i]
          }
        }
        console.log(curVersion)
        this.editForm.noteId = data.note.id
        this.editForm.title = curVersion.title
        this.editForm.content = curVersion.content
        this.editForm.noteVersionId = Number.parseInt(noteVersion)
        console.log("已经将版本更新"+this.editForm.noteVersionId);
        // console.log("初始传入诗句")
        // console.log(this.editForm)
        // console.log(note)
      });
    }
  },
  methods: {
    querySubject(){
      const _this = this
      this.$axios.get('/subject').then(res=>{
        _this.subject = res.data.data
        // console.log(_this.subject)
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