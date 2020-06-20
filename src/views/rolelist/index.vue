<template>
  <div>
    <Break level1="角色管理" level2="角色列表"></Break>
    <el-card class="card">
      <el-table :data="tableData" border style="width: 100%" class="table">
        <el-table-column type="expand" width="140">
          <template slot-scope="scope">
            <el-row v-for="(item,key) in scope.row.children" :key="key">
              <el-col :span="4">
                <el-tag closable class="m20">{{item.authName}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(v,i) in item.children" :key="i" class="m20">
                  <el-col :span="4">
                    <el-tag type="success" closable>{{v.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      closable
                      v-for="(a,b) in v.children"
                      :key="b"
                      class="m20"
                      type="warning"
                      @click="delRight"
                    >{{a.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-tag v-if="scope.row.children.length===0">目前该角色暂无权限</el-tag>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <!-- 设置slot-scope="scope"  再点击事件里面写scope.row就能够写出数据初始化 -->
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
              <el-button
                type="warning"
                icon="el-icon-star-off"
                @click="roleRightOpen(scope.row)"
                circle
                size="mini"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分配权限的弹框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="dialogVisibleRight"
        width="60%"
        :before-close="handleClose"
      >
        <!-- 树形控件 -->
        <!-- 
            :data="data" 指定数据源
            show-checkbox 指定复选框模式
            node-key="id"  指定树形结构的id标识
            :default-expanded-keys="[1, 3]" 指定默认展开的id
            :default-checked-keys="[5]"  指定默认选中的id
            :props="defaultProps" 指定label和children的key
        -->
        <el-tree
          ref="roletree"
          :data="rightTree"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkArr"
          :props="defaultProps"
          default-expand-all
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setRightToRole">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { treeToList } from "@/untils/index";
import {
  getRoleList,
  getRightTree,
  setRightToRole,
  getUserRoleInfo
} from "@/http/api";
export default {
  name: "rolelist",
  data() {
    return {
      tableData: [],
      dialogVisibleRight: false,
      defaultProps: {
        children: "children",
        label: "authName"
      },
      rightTree: [],
      currentRoleId: -1, // 分配权限传递的id值
      checkArr: []
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //  将树形结构选中的权限赋值个某个角色
    async setRightToRole() {
      //setRightsToRole(roleId,data)
      //roleid怎么获取 roleId 角色id
      //data怎么获取：data 是全部或部分选中的id  '1,2,2,3,5,6,7,7,8'

      //则返回目前半选中的节点所组成的数组
      const arr1 = this.$refs.roletree.getHalfCheckedKeys();
      // 全部选中
      const arr2 = this.$refs.roletree.getCheckedKeys();

      //合并全部选中和部分选中的id节点
      const resultArr = [...arr1, ...arr2].join(",");

      //调分配权限给角色的方法
      const res = await setRightToRole(this.currentRoleId, {
        rids: resultArr
      });
      console.log("调分配权限给角色的返回：", res);

      this.dialogVisibleRight = false;
      this.getRoleList();
    },
    // 打开分配权限的弹框
    async roleRightOpen(role) {
      // 封装一个获取Id的函数
      const checkArr = treeToList(role);
      this.checkArr = checkArr;
      //   console.log('sss',checkArr)

      //   console.log("树形", role);
      this.currentRoleId = role.id;
      //调用指定角色信息

      const res = await getRightTree();
      this.rightTree = res.result;
      this.dialogVisibleRight = true;
    },
    async getRoleList() {
      //调用角色列表
      const res = await getRoleList();
      // console.log("角色列表：：", res);
      this.tableData = res.result;
    },

    delRight() {
      //删除权限调用接口
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  margin-top: 20px;
}
.m20 {
  margin: 0 5px;
}
</style>