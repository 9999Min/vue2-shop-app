// 此处存放用于登录的接口请求
import request from '@/utils/request'

// 获取验证码图片
export const getPicCodeApi = () => {
  return request.get('/captcha/image')
}

// 发送验证码请求
export const getMsCodeApi = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录请求获取短信验证码
export const loginApi = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
