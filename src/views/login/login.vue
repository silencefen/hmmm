<template>
  <div class="login-container">
    <!-- 左 -->
    <div class="left">
      <div class="title-box">
        <img src="@/assets/images/login/login1-1.png">
        <span class="title">项目名称</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
     <!-- 表单 -->
      <el-form :model="logForm" :rules="rules" ref="logForm" class="login-form">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入手机号"
            v-model="logForm.phone"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="logForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input
                placeholder="请输入验证码"
                v-model="logForm.code"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img
                class="captcha"
                @click="randomCode"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="rule-box" prop="checked">
          <el-checkbox v-model="logForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('logForm')">登录</el-button
          >
          <el-button @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右 -->
    <div class="right">
        <img src="@/assets/images/login/login_banner_ele.png" alt="" />
    </div>
    <!-- 注册 -->
    <el-dialog title="用户注册" class="register-dialog" :visible.sync="dialogFormVisible">
    <el-form :model="regForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
      <el-upload
  class="avatar-uploader"
  :action="avatarAction"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload" name="image">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

    </el-form-item>
    <el-form-item label="昵称" :label-width="formLabelWidth" prop="userName">
      <el-input v-model="regForm.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
      <el-input v-model="regForm.email" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
      <el-input v-model="regForm.phone" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
      <el-input v-model="regForm.password" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { login } from '@/api/login.js'
import { setToken } from '@/utils/token.js'
import { uploadURL } from '@/utils/config.js'
export default {
  name: 'MyLogin',
  data () {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
      } else {
        const regex = /^1[3456789]\d{9}$/
        if (!regex.test(value)) callback(new Error('请输入正确的手机号'))
        else callback()
      }
    }
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (this.logForm.password !== '') {
          this.$refs.logForm.validateField('password')
        }
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱号不能为空'))
      } else {
        const reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (!reg.test(value)) callback(new Error('请输入正确的邮箱号'))
      }
    }
    return {
      logForm: {
        phone: '',
        password: '',
        code: '',
        checked: false
      },
      action: process.env.VUE_APP_BASEURL + '/captcha?type=sendsms',
      rules: {
        phone: [{
          required: true, validator: checkPhone, trigger: 'blur'
        }],
        password: [
          { required: true, validator: checkPass, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { min: 4, max: 4, message: '验证码长度为4' }
        ],
        userName: [
          { required: true, message: '请输入昵称', trigger: 'change' }
        ],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        avatar: [{ required: true, message: '请上传头像！', trigger: 'change' }]
      },
      regForm: {
        userName: '',
        email: '',
        phone: '',
        password: ''
      },
      imageUrl: '',
      avatarAction: uploadURL,
      formLabelWidth: '80px',
      dialogFormVisible: true
    }
  },
  methods: {
    // 刷新验证码
    randomCode () {
      this.actions = `${process.env.VUE_APP_BASEURL}/captcha?type=login&t=${Date.now()}`
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.logForm).then(res => {
            if (res.code === 200) {
              this.$message.success('登录成功')
              setToken(res.data.token)
              this.$router.push('/index')
            } else {
              this.$message.warning(res.message)
              this.randomCode()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // 为提交数据赋值
      this.regForm.avatar = res.file_path
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;

      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        display: block;
        width: 110px;
        height: 42px;
      }
    }

    .rule-box {
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
    }
    .btn-box {
      .el-button {
        width: 100%;
        margin-left: 0;
        margin-bottom: 28px;
      }
    }
  }
  .register-dialog {
    .el-dialog {
      width: 600px;
    }
    .el-dialog__header {
      background: linear-gradient(
        right,
        rgba(1, 198, 250, 1),
        rgba(20, 147, 250, 1)
      );
      text-align: center;
      .el-dialog__title {
        color: white;
      }
    }
    .captcha {
      width: 100%;
    }
    .avatar-uploader {
      display: flex;
      justify-content: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}

</style>
