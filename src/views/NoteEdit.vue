<template>
  <div class="noteedit">
    <NoneMenuHeader></NoneMenuHeader>
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
            <el-row>
              <el-col :span="3">

                <el-select v-model="editForm.subjectId" placeholder="请选择科目" prop="subjectSelect">
                  <el-option
                      v-for="item in subject"
                      :key="item.id"
                      :label="item.sname"
                      :value="item.id">
                  </el-option>
                </el-select>

              </el-col>

              <el-col :span="4">

                <el-radio-group v-model="editForm.publicStatus"  style="margin-left: 20px;float: left">
                  <el-radio-button label="0">所有人可见</el-radio-button>
                  <el-radio-button label="-1">私有</el-radio-button>
                  <el-radio-button label="1">群组可见</el-radio-button>
                </el-radio-group>


              </el-col>

              <el-col :span="4">
                <el-checkbox-group v-model="editForm.groupIds" v-show="editForm.publicStatus==='1'" style="margin-left: 15px">
                  <el-checkbox
                      style="background-color: #ffffffff;margin-right: 0"
                      border
                      v-for="item in group"
                      :label="item.id"
                      :key="item.id">{{item.groupName}}</el-checkbox>
                </el-checkbox-group>
              </el-col>

              <el-col :span="12" style="float: right">
                <el-button type="primary" @click="submitForm()" style="float: right" v-bind:disabled="editForm.subjectId==='' || editForm.publicStatus===''">立即创建</el-button>

              </el-col>
            </el-row>






<!--            <el-select v-model="groupvalue" clearable placeholder="选择群组"  v-show="editForm.publicStatus==='1'" style="margin-left: 20px">-->
<!--              <el-option-->
<!--                  v-for="item in group"-->
<!--                  :key="item.id"-->
<!--                  :label="item.groupName"-->
<!--                  :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->

<!--            <el-button>取消</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import NoneMenuHeader from "@/components/NoneMenuHeader";

export default {
  name: "NoteEdit",
  components : {NoneMenuHeader},
  data() {
    return {
      // groupvalue:[],
      group:[],
      authority: '',
      visibility:'',

      editForm: {
        noteVersionId:'1',
        userId:this.$store.getters.getUser.id,
        noteId:'-1',
        publicStatus:'',
        groupIds:[],
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
    this.getGroups()
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
    getGroups() {
      this.$axios.get("/group/getall",{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res=>{
        this.group = res.data.data
      })
      },

    querySubject(){
      const _this = this
      this.$axios.get('/subject').then(res=>{
        _this.subject = res.data.data
        // console.log(_this.subject)
      })
    },

    submitForm() {
      console.log("选择的群组"+this.editForm.groupIds)
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
            // this.$axios.post("/group/noteadd",)
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