  
<template>
  <div class="home">
    <el-container>
      <el-header>
        <!-- 
            1.公司logo
            2.后台系统名称
            3.登出
        -->
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">公司名称-Logo</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">后台管理系统</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <button @click="goLogout">退出</button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" class="el_aside">
          <!-- 左侧导航start -->
          <el-menu
            :default-active="$route.path"
            :unique-opened="true"
            text-color="#fff"
            class="el_menu"
            background-color="#0a0e30"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/home">
                <i class="el-icon-s-grid"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/rolelist">
                <i class="el-icon-s-grid"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="/rightlist">
                <i class="el-icon-s-grid"></i>
                权限列表
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="/goodslist">
                <i class="el-icon-s-grid"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-s-grid"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-s-grid"></i>商品分类
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">订单列表</el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="report">数据报表</el-menu-item>
            </el-submenu>
          </el-menu>

          <!-- 左侧导航end -->
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    goLogout() {
      // 清除token
      localStorage.removeItem("token");
      // 返回登录页
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
html,
body,
.home {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.el-header {
  background-color: #0a0e30;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #0a0e30;
  color: #fff;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}
.el-container {
  height: 100%;
}
</style>
