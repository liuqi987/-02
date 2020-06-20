<template>
  <div class="login">
    <el-form
      label-width="80px"
      :model="ruleForm"
      :rules="rules"
      ref="login_form"
      @submit.native.prevent
    >
      <div class="userLogin">
        <h2>用户登录</h2>
      </div>
      <!-- prop就是校验 -->
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click.prevent="goLogin">登录</el-button>
      <el-button type="info">重置</el-button>
    </div>
  </div>
</template>
<script>
import { login } from "@/http/api";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 25, message: "长度在 5 到 25 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      goLogin() {
      this.$refs["login_form"].validate(valid => {
        //表单通过validate方法实现整体表单，其中valid为true代表所有验证规则通过,否则报错
        if (valid) {       
            login(this.ruleForm).then((res)=>{
              console.log('56',res)
              localStorage.setItem("token", res.result.token)
              this.$router.push("/home")
              this.$message({
                type:"success",
                msg:"登录成功"
              })
            })        
        } else {
          //登录失败，给出失败的提示
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  height: 40px;
  width: 30%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
body,
html,
.login {
  width: 100%;
  height: 100%;
  background-color: #031134;
}
.login {
  width: 30%;
  height: 30%;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 32%;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
@media screen and (max-width: 850px) {
  .login {
    width: 250px;
  }
}
.userLogin {
  text-align: center;
  line-height: 50px;
}
</style>