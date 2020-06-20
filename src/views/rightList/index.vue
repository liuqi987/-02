<template>
  <div>
    <Break level1="权限管理" level2="权限列表"></Break>
    <el-card class="card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" prop="#" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
         <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column label="等级">
            <template slot-scope="scope">
               
                    <el-tag :type="tabArr[scope.row.level]">
                        {{scope.row.level|levelFn}}
                    </el-tag>
              
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import Break from "@/components/break-com/index.vue";
import {getRightList} from "@/http/api"
export default {
  name: "rightList",
  components: {
    //Break
  },
  data(){
      return{
          tableData:[],
          tabArr:['success','warning','danger']
      }
  },
   created(){
       this.getRightList()
   },
   methods:{
      async getRightList(){
           // 调取权限接口
           const res = await getRightList()
           this.tableData = res.result
       }
   }
};
</script>
<style lang="scss" scoped>
.card {
  margin-top: 20px;
}
</style>