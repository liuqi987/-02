<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top:15px;">
      <div class="search">
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          @input="searchUser"
          v-model.trim="pageInfo.query"
          class="input-with-select"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
        <el-button class="aa" type="primary" @click="addGoods">添加商品</el-button>
      </div>
      <!-- 添加用户 -->
      <!-- Form -->
      <el-dialog title="添加商品" :visible.sync="dialogFormVisibleUser">
        <el-form
          :model="userForm"
          ref="adduser"
          :rules="userRules"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="mobile">
            <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addUserData">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 结束 -->
      <el-table :data="tableData" border style="width: 100%" class="table">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="150"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）"></el-table-column>
        <el-table-column prop="goods_number" label="商品数量"></el-table-column>
        <el-table-column label="注册时间">
          <!-- {{ create_time | date }} -->
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time | date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="setUserStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 设置slot-scope="scope"  再点击事件里面写scope.row就能够写出数据初始化 -->
          <template slot-scope="scope">
            <el-row>
              <el-button
                type="primary"
                @click="editUser(scope.row)"
                size="mini"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-star-off"
                @click="setRoleShowDia(scope.row)"
                circle
                size="mini"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteUserShowDia(scope.row)"
                circle
                size="mini"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑的模态框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form
          :model="userForm"
          ref="adduser"
          :rules="userRules"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="editUserData">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑的模态框结束 -->
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[2,3,4,5]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 分配用户角色弹框 -->

      <el-dialog title="分配角色" :visible.sync="dialogFormVisiblerole">
        <el-form :model="form">
          <el-form-item label="当前用户" label-width="100px">{{ currentUserName }}</el-form-item>
          <el-form-item label="当前用户角色" label-width="100px">{{ 'xxxx' }}</el-form-item>
          <el-form-item label="分配角色" label-width="150px">
            {{ currentRoleId }}
            <!-- 如果v-model中currentRoleId值和value值一样，则会显示label名 -->
            <el-select v-model="currentRoleId" placeholder="请选择角色">
              <el-option label="请选择用户角色" :value="-1"></el-option>
              <el-option
                v-for="(item,index) in roles"
                :key="index"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblerole = false">取 消</el-button>
          <el-button type="primary" @click="setUserRoleConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import _ from "lodash";
import {
  getUser,
  modifyUserStaus,
  editUserInfo,
  adduserData,
  deleteUser,
  getUserRoleInfo,
  setUserRole,
  getRoleList,
   getUserInfo,
   goodsList
} from "@/http/api";
export default {
  name: "Info",
  data() {
    return {
      value: true,
      input3: "",
      tableData: [],
      pageInfo: {
        query: "",
        pagenum: 1, // 当前页码
        pagesize: 2 // 每页的条数
      },
      total: 0,
      userForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      userRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      },
      dialogFormVisibleUser: false, //控制弹框的
      dialogFormVisibleEdit: false,
      //显示分配角色弹框
      dialogFormVisiblerole: false,
      currentRoleId: -1,
      currentUserName: "",
      roles: [],
      currentUserId: "",
      form: {}
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    /**
     * 分配用户角色，调接口
     */
    async setUserRoleConfirm() {
      const res=await setUserRole(this.currentUserId,{rid:this.currentRoleId})
       console.log('分配用户角色:::::::',res)
      this.dialogFormVisiblerole=false;
     this.getUserList()
    },
    /**
     * 设置用户角色，显示弹框
     */
    async setRoleShowDia(user) {
      //赋值用户名
      this.currentUserName=user.username
      //赋值用户id
      this.currentUserId=user.id
      //获取用户角色列表
      const res=await getRoleList();
      //获取用户角色id
      const res2=await getUserInfo(user.id);
    
     // this.currentRoleId=res2.result.rid
      let roleid=res2.result.rid;
      //通过角色id获取用户角色
      const res3=await getUserRoleInfo(roleid);
     
      if(!res3) {
        this.$message({
          message:'该用户还没有分配角色',
          type:'warning'
        })
      }
      this.roles=res.result;   
      this.dialogFormVisiblerole=true;
    },
    // 删除
    deleteUserShowDia(user) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //调用删除用户的接口
          // console.log('当前要删除的用户信息：',user)
          const res = await deleteUser(user.id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getUserList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改用户信息
    async editUserData() {
      let { id, email, mobile } = this.userForm;
      editUserInfo(id, { email, mobile });
      this.dialogFormVisibleEdit = false;
    },
    // 编辑用户,打开
    editUser(user) {
      this.dialogFormVisibleEdit = true;
      // 显示要编辑的内容
      this.userForm = user;
    },
    // 通过switch改变用户的状态
    async setUserStatus(user) {
      // `users/${user.id}/state/${user.mg_state}`
      const result = modifyUserStaus(user);
      console.log("修改用户状态：", result);
    },
    // 添加用户
    addUserData() {
      this.$refs["adduser"].validate(async valid => {
        if (valid) {
          console.log(valid); // true或false
          await adduserData(this.userForm);
        
          // 刷新页面展示已添加的用户
          this.getUserList();
          this.userForm = {
            username: "",
            password: "",
            email: "",
            mobile: ""
          };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // adduserData(this.userForm).
      this.dialogFormVisibleUser = false;
    },
    cancel() {
      this.dialogFormVisibleUser = false;
    },
    // 点击添加模态框的控制
    addGoods() {
      this.$router.push("/goodsadd")
    },
    // 搜索
    searchUser: _.throttle(
      function() {
        //获取去除空格后的输入内容
        // this.pageinfo.query=this.pageinfo.query.trim()
        //query.length===0代表搜索全部用户列表，否则搜索包含有关键字的用户列表
        // let _this=this;
        this.getUserList();
      },
      3000,
      { leading: false }
    ),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pagesize = val;
      this.getUserList();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pagenum = val;
      this.getUserList();
    },
    // 获取用户列表的信息
    async getUserList() {
      const result = await goodsList(this.pageInfo);
      console.log(result)
      let { flag, result: res } = result;
      if (result.flag === 2) {
        this.tableData = res.goods;
        this.pageInfo.pagenum = res.pagenum*1;
        this.total = res.total;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.search {
  width: 300px;
  position: relative;
}
.el_card_box {
  margin-top: 20px;
}
.searchInput {
  width: 300px;
  margin-right: 20px;
}
.aa {
  position: absolute;
  top: 0;
  right: -120px;
  margin-left: 20px;
}
.adduser {
  margin-left: 20px;
}
.table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>