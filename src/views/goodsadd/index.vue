<template>
  <div>
    <Break level1="商品管理" level2="商品添加"></Break>
    <el-card class="mg">
      <el-alert title="消息提示的文案" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps align-center class="mg" :active="active*1" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <!-- 标签页 -->
      <el-form label-width="80px" :label-position="po" :model="goodsForm" style="height:400px;">
        <el-tabs
          class="mg"
          v-model="active"
          :tab-position="tabPosition"
          style="height: 200px;overflow:auto;"
          @tab-click="tabChange"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称">
              <el-input v-model="goodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="goodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="goodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="goodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                :props="defaultProps"
                :options="options"
                @change="handleChange"
                v-model="selectOption"
                closeable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="(item,key) in dyparams" :key="key">
              <el-checkbox-group v-model="checkList">
                <el-checkbox :label="item2" v-for="(item2,index) in item.attr_vals" :key="index"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_vals" v-for="(item,key) in staticParams" :key="key">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 图片上传 -->
            <el-upload
              class="upload-demo"
              action="https://www.liulongbin.top:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :on-success="handleSuccess"
              multiple
            >
              <!-- multiple：表示一次可以多选图片 -->
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <el-form-item>
              <quill-editor class="ql-editor" v-model="goodsForm.goods_introduce"></quill-editor>
              <el-button type="primary" class="mg" @click="addGoods">添加商品</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getGoodCate, getCateAttribute,addGood } from "@/http/api";
import Break from "@/components/break-com/index.vue";

// 富文本的组件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  name: "goodsAdd",
  components: {
    Break,
    quillEditor
  },
  data() {
    return {
      checkList: [],
      active: 0,
      tabPosition: "left",
      po: "top",
      goodsForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduc: "",
        pics: [],
        attrs: [] // 动态+静态组合成一个新数组，一起提交给后台
      },
      // 商品分类得数据
      options: [],
      defaultProps: {
        expandTriger: "hover", // 配置三级联动key
        label: "cat_name", // 被指定得显示得
        value: "cat_id",
        children: "children" // 指定子集菜单得属性名
      },
      selectOption: [],
      dyparams: [], // 动态参数
      // 商品得静态参数
      staticParams: [],
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  methods: {
    //  点击添加商品
    async addGoods() {
      this.goodsForm.goods_cat = this.selectOption.join(",");
      let params1 = this.dyparams.map(item => ({
        attr_id: item.attr_id,
        attr_value: item.attr_vals
      }));
      let params2 = this.staticParams.map(item => ({
        attr_id: item.attr_id,
        attr_value: item.attr_vals
      }));
      this.goodsForm.attrs = [...params1, ...params2];
       this.goodsForm.attrs.forEach((item)=>{
         item.attr_value=item.attr_value+""
       })
      // console.log("this.goodsForm.goods_cat", this.goodsForm.goods_cat);
      // console.log("this.goodsForm.attrs", this.goodsForm.attrs);
      console.log(this.goodsForm)

      // 调用添加商品提交数据
      const res = await addGood(this.goodsForm)
      console.log(res)
       if(res.flag===2) {
           this.$router.push('/goodslist')
        }
    },
    // 文件上传相关方法
    // 图片上传
    handlePreview(file) {
      console.log(file);
    },
    //删除图片
    handleRemove(file) {
      console.log(file);
      // 删除图片得同时删除goodForm里面。pics数组中指定的图片地址

      // 删除思路：通过删除的file参数找到要删除的图片路径
      let delpicture = file.response.data.tmp_data;
      //2.通过找到的图片路径遍历数组goodForm.pics找到要删除的图片索引
      var delIndex = this.goodsForm.pics.findIndex(v => {
        return v.pic == delpicture;
      });
      //3.找以下标通过splice方法再删除数组中指定的元素
      this.goodsForm.pics.splice(delIndex, 1);
      console.log(this.goodsForm.pics);
    },
    // 图片预览
    handleSuccess(file) {
      console.log(file);
      let url = file.data.tmp_path;
      this.goodsForm.pics.push({ pic: url });
      console.log(this.goodsForm.pics);
    },
    handleChange() {},
    async getGoodCate() {
      const res = await getGoodCate();
      //console.log(res)
      this.options = res.result;
    },
    // 监听tab触发得回调
    async tabChange() {
      //console.log(this.active)   // 绑定得下标 与name一样
      if (this.active === "1") {
        if (this.selectOption.length !== 3) {
          this.$message({
            type: "warning",
            message: "请先选择三级分类后，再设置商品参数"
          });
          return false;
        }
        //调商品动态分类参数接口
        const cat_id = this.selectOption[2];
        const res = await getCateAttribute(cat_id);
        console.log("针对分类获取匹配的参数：", res);
        this.dyparams = res.result;
        let tempArr = [];
        this.dyparams.forEach((item, index) => {
          //将字符串按空白分隔的形式切割成数组
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(/\s+/g);
          tempArr.push(...item.attr_vals);
        });
        this.checkList = tempArr;
      } else if (this.active === "2") {
        if (this.selectOption.length !== 3) {
          this.$message({
            type: "warning",
            message: "请先选择三级分类后，再设置商品参数"
          });
          return false;
        }

        // 调用商品静态参数得接口
        const cat_id = this.selectOption[2];
        const res = await getCateAttribute(cat_id, "only");
        console.log("静态参数", res);
        this.staticParams = res.result;
      } else if (this.active === "3") {
        if (this.selectOption.length !== 3) {
          this.$message({
            type: "warning",
            message: "请先选择三级分类后，再设置商品参数"
          });
          return false;
        }
      } else if (this.active === "4") {
        if (this.selectOption.length !== 3) {
          this.$message({
            type: "warning",
            message: "请先选择三级分类后，再设置商品参数"
          });
          return false;
        }
      }
    }
  },
  created() {
    this.getGoodCate();
  }
};
</script>
<style lang="scss" scoped>
.mg {
  margin-top: 20px;
}
.ql-editor {
  height: 220px;
}
</style>