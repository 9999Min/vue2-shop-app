<template>
  <div class="login">
    <!-- 头部 NavBar -->
    <van-nav-bar title="会员登陆" left-arrow @click-left="$router.go(-1)"/>
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登陆</h3>
        <p>未注册的手机号登陆后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input v-model="userPhone" class="inp" type="text" maxlength="11" placeholder="请输入手机号">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" type="text" maxlength="5" placeholder="请输入图形验证码">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="smsCode" type="text" class="inp" placeholder="请输入短信验证码">
          <button @click="getCode">
            {{second === totalSecond ? '获取验证码' : second + '秒后可重新发送' }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getMsCodeApi, getPicCodeApi, loginApi } from '@/api/loginApi'
export default {
  name: 'LoginIndex',
  async created () {
    this.getPicCode()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    // 封装成方法便于点击更换图片调用
    async getPicCode () {
      const { data: { base64, key } } = await getPicCodeApi()
      this.picUrl = base64
      this.picKey = key
      // 获取图像验证码成功
      // Toast('图形验证码加载成功')
      // 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法
      this.$toast.success('验证码加载成功')
    },
    // 获取短信验证码
    async getCode () {
      // 校验手机号和图形验证码
      if (!this.validFn()) {
        return
      }
      // 当前没有定时器开着，且total 和second 一致才能开始计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        await getMsCodeApi(this.picCode, this.picKey, this.userPhone)
        this.$toast('短信发送成功')
        // 开始倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 校验手机号和图形验证码是否正确
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.userPhone)) {
        this.$toast.fail('请输入正确的手机号！')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast.fail('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 登录校验
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await loginApi(this.userPhone, this.smsCode)
      console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast.success('登录成功')

      // 进行判断，看地址栏有无回跳地址
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  data () {
    return {
      picCode: '', // 用户输入的图像验证码
      picKey: '', // 将来请求传递的图像验证码唯一标识
      picUrl: '',
      smsCode: '', // 短信验证码
      userPhone: '',
      totalSecond: 60,
      second: 60,
      timer: null
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;
  .title {
    margin-bottom: 26px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }
  .form-item{
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items:center;
    .inp{
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img{
      width: 94px;
      height: 31px;
    }
    button{
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color:#fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
