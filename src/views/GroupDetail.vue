<template>
 <div class="groupdetail">
   <NoneMenuHeader></NoneMenuHeader>
   <el-card body-style="padding=0" style="width: 60%;margin-left: auto;margin-right: auto;margin-top: 12px">
     <el-page-header @back="router_to_Profile" content="群组笔记">
     </el-page-header>
   </el-card>

   <el-card style="width: 60%;margin-left: auto;margin-right: auto;margin-top: 12px">
<!--     <div slot="header">-->
<!--       <h1 style="margin: 0">-->

<!--       </h1>-->
<!--     </div>-->

     <div v-show="notes.length === 0">
       <p style="text-align: center;font-size: 20px;color:rgba(0,0,0,0.57);">当前群组没有笔记哦~</p>
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
   </el-card>
 </div>
</template>

<script>
import NoneMenuHeader from "@/components/NoneMenuHeader";

export default {
  name: "GroupDetail",
  components:{NoneMenuHeader},

  data(){
    return{
      request:{
        subjectId:"0",
        currentPage:"1",
        pageSize:"20",
        groupId:"0"
      },
      notes:[]
    }
  },

  methods:{
    router_to_Profile(noteId){
      this.$router.push("/profile")
    },
    router_to_Detail(noteId){
      this.$router.push("/note/"+noteId)
    },
    getGroupDetail(){
    }
  },
  created(){
    this.request.groupId = this.$route.params.groupId

    this.$axios.post("/note/group",this.request,{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then(res=>{
      this.notes = res.data.data
      console.log(res.data.data)
    })
  }
}
</script>

<style scoped>

</style>