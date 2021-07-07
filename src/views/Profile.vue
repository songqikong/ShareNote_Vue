<template>
 <div class="group_main">
    <MenuHeader></MenuHeader>
   <div class="profile">


     <el-card class="box-card" body-style="padding:0" style="height: 400px">
       <div class="top_img" style="position:relative;">
         <el-image src="/static/img/backgroud.jpg" class="image" style="height: 270px" fit="none"></el-image>
       </div>

       <div class="ava_username" style="padding: 15px;position:absolute;top: 250px;margin-left: 10px">
         <el-row >
           <el-col :span="4">
             <el-image :src="this.$store.getters.getUser.avatar" style="height: 100%;width: 100%;border-radius:6px;"></el-image>

           </el-col>
           <el-col :span="18">
             <p style="margin-top: 85px;margin-left: 15px;color: #2c3e50;font-size: 30px;margin-bottom: 20px">{{this.$store.getters.getUser.username}}
               <span style="font-size: 20px">希尔笔记好✌，真滴好</span></p>
             <h3 style="margin-left: 15px;color: rgba(44,62,80,0.62)">{{this.$store.getters.getUser.email}}</h3>
           </el-col>
           <el-col :span="2">
<!--             <el-button type="primary" icon="el-icon-edit" circle style="mar"></el-button>-->
           </el-col>
         </el-row>
       </div>

     </el-card>

          <el-card body-style="padding:0px;" style="margin-top: 10px;padding-left: 5px;padding-right: 5px">
            <el-tabs tab-position='top' style="margin: 15px" type="" >

              <el-tab-pane label="我的笔记">
                <div
                    class="note"
                    v-for="(item,index) in notes"
                    :key="index"
                >

                  <el-card class="box-card"  shadow="hover" style="margin-bottom: 10px">
                      <el-row>
                        <el-col :span="16">
                          <el-button type="text" style="font-size: 20px;color: #606266;padding-bottom: 0px;padding-top: 2px" @click="router_to_Detail(item.noteId)">{{item.title}}</el-button>

                        </el-col>
                        <el-col :span="8">
                          <span style="float: left;color: #bdbdbd">{{item.sname}}</span>
                          <span style="float:right;color: #bdbdbd;margin-top: 3px">{{item.created}}</span>
                        </el-col>
                      </el-row>

                  </el-card>
                </div>
              </el-tab-pane>

              <el-tab-pane label="我的群组">
                <div
                    class="note"
                    v-show="groups.height!==0"
                    v-for="(item,index) in groups"
                    :key="index"
                >
                  <div class="eachgroup" style="width: 50%;float: left">
                  <el-card body-style="padding:10px" shadow="hover" style="margin-left: 5px;margin-right: 5px">
                    <el-row>
                      <el-col :span="4">
                        <el-image src="/static/img/group.png" style="height: 50px;width: 50px"></el-image>

                      </el-col>
                      <el-col :span="18">
                        <span style="padding-bottom: 20px;color: #606266;font-size: 18px">{{item.groupName}}</span>
                        <p style="color: rgba(96,98,102,0.56);font-size: 15px;margin: 0;margin-top: 5px">{{item.description}}</p>
                      </el-col>
                    </el-row>

                  </el-card>


                  </div>
                </div>
                <div v-if="groups.height === 0">
                  <h1>当前没有加入任何群组！</h1>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>

   </div>
 </div>
</template>

<script>
import MenuHeader from "@/components/MenuHeader";


export default {
  name: "profile",
  components: {MenuHeader},
  data(){
    return{
      notes:[],
      groups:[],
      subject_req:{
        subjectId:'0',
        currentPage:'1',
        pageSize:'20'
      },
    }
  },

  methods:{
    router_to_Detail(noteId){
      this.$router.push("/note/"+noteId)
    },
    getGroups() {
      this.$axios.get("/group/getall",{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res=>{
         this.groups = res.data.data
        // console.log(res.data.data)
        // console.log(this.groups)
      })
    },
    getUserInf(){

    },
    getMyAll(currentpage){
      this.subject_req.currentPage = currentpage;
      const _this = this
      this.$axios.post("/note/myall",_this.subject_req,{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res=>{
        console.log("当前的数据")
        console.log(res.data.data)
        this.notes = res.data.data
        var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();

        this.$waterfall.forceUpdate()
      })

    }
  },

  created(){
    this.getGroups()
    this.getMyAll(1)
  }
}
</script>

<style scoped>
.profile{
  margin: 10px 400px;

}
</style>