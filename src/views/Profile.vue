<template>
 <div class="group_main">
    <NoneMenuHeader></NoneMenuHeader>
<!--   <el-row>-->
<!--     <el-col :span="16" :offset="4">-->
       <div class="profile">


         <el-card class="box-card" body-style="padding:0" style="height: 400px">
           <div class="top_img" style="position:relative;">
             <el-image src="/static/img/bg2.jpg" class="image" style="height: 270px" fit="cover"></el-image>
           </div>

           <div class="ava_username" style="padding: 15px;position:absolute;top: 250px;margin-left: 10px">
             <el-row >
               <el-col :span="4">
                 <el-image :src="this.$store.getters.getUser.avatar" style="height: 180px;width: 180px;border-radius:6px;"></el-image>

               </el-col>
               <el-col :span="18">
                 <p style="margin-top: 90px;margin-left: 110px;color: #2c3e50;font-size: 30px;margin-bottom: 20px">{{this.$store.getters.getUser.username}}
                   <span style="font-size: 20px">希尔笔记好✌，真滴好</span></p>
                 <h3 style="margin-left: 110px;color: rgba(44,62,80,0.62)">{{this.$store.getters.getUser.email}}</h3>
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
               <div v-show="notes.length === 0">
                 <p style="text-align: center;font-size: 20px;color:rgba(0,0,0,0.57);">您还没有发布笔记哦~</p>
               </div>
               <div
                   class="note"
                   v-for="(item,index) in notes"
                   :key="index"
               >

                 <el-card class="box-card"  shadow="hover" style="margin-bottom: 10px">
                   <el-row>
                     <el-col :span="16">
                       <el-button type="text" style="font-size: 16px;color: #606266;padding-bottom: 0px;padding-top: 2px" @click="router_to_Detail(item.noteId)">{{item.title}}</el-button>

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
               <div v-show="groups.length === 0">
                 <p style="text-align: center;font-size: 20px;color:rgba(0,0,0,0.57);">您还没有加入群组哦~</p>
               </div>
               <div
                   class="note"
                   v-show="groups.height!==0"
                   v-for="(item,index) in groups"
                   :key="index"
               >
                 <div class="eachgroup" style="width: 50%;float: left">
                   <el-card body-style="padding:10px" shadow="hover" style="margin-left: 5px;margin-right: 5px;margin-bottom: 5px">
                     <el-row>
                       <el-col :span="4">
                         <el-image src="/static/img/group.png" style="height: 40px;width: 40px;margin-left: 5px;margin-top: 5px;"></el-image>

                       </el-col>
                       <el-col :span="16">
                         <span style="padding-bottom: 20px;color: #606266;font-size: 16px" @click="router_to_GroupNotes(item.id)">{{item.groupName}}</span>
                         <p style="color: rgba(96,98,102,0.56);font-size: 15px;margin: 0;margin-top: 5px">{{item.description}}  </p>
                       </el-col>

                       <el-col :span="4">

                         <el-button type="text" style="font-size: 16px;color: rgba(255,0,0,0.58);padding-top: 15px;float: right" @click="deleteGroup(item.groupName)">
                           <i class="el-icon-remove"></i>
                           退出
                         </el-button>

                       </el-col>


                     </el-row>

                     <el-row>

                     </el-row>

                   </el-card>
                 </div>



               </div>


               <!--                加入群组-->
               <div class="eachgroup" style="width: 50%;float: left">
                 <el-card body-style="padding:10px" shadow="hover" style="margin-left: 5px;margin-right: 5px">
                   <el-row>
                     <el-col :span="4">
                       <el-image src="/static/img/join.png" style="height: 40px;width: 40px;margin-left: 5px;margin-top: 5px"></el-image>

                     </el-col>
                     <el-col :span="18">
                       <el-button type="text" style="font-size: 16px;color: #606266;padding-bottom: 0px;padding-top: 15px" @click="router_to_Join()">加入群组</el-button>

                     </el-col>
                   </el-row>

                 </el-card>
               </div>
               <div class="eachgroup" style="width: 50%;float: left">
                 <el-card body-style="padding:10px" shadow="hover" style="margin-left: 5px;margin-right: 5px">
                   <el-row>
                     <el-col :span="4">
                       <el-image src="/static/img/join.png" style="height: 40px;width: 40px;margin-left: 5px;margin-top: 5px"></el-image>

                     </el-col>
                     <el-col :span="18">
                       <el-button type="text" style="font-size: 16px;color: #606266;padding-bottom: 0px;padding-top: 15px" @click="router_to_Creat()">创建群组</el-button>

                     </el-col>
                   </el-row>

                 </el-card>
               </div>

               <div v-if="groups.height === 0">
                 <h1>当前没有加入任何群组！</h1>
               </div>
             </el-tab-pane>
           </el-tabs>
         </el-card>

       </div>
<!--     </el-col>-->
<!--   </el-row>-->


   <div class="groupDetails" :hidden="groupdetails">

   </div>

 </div>
</template>

<script>
import NoneMenuHeader from "@/components/NoneMenuHeader";


export default {
  name: "profile",
  components: {NoneMenuHeader},
  data(){
    return{
      groupdetails:false,
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
    router_to_GroupNotes(groupId){
      this.$router.push("/groupdetail/"+groupId)
    },
    router_to_Detail(noteId){
      this.$router.push("/note/"+noteId)
    },
    router_to_Join(){
      this.$router.push("/group/join")
    },
    router_to_Creat(){
      this.$router.push("/group/create")
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

    async deleteGroup(groupId) {

      await this.$axios.post('/group/useredit', {groupName: groupId, groupPassword: 0}, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then((res) => {
        this.$message('成功删除!');
        this.getGroups();

        // this.$router.push("/profile");

      });
    }
    ,


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

<style>
.el-tabs__item{
  font-size: 16px !important;
}
.profile{
  margin: 10px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;

}

</style>