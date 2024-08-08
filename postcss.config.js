module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏的宽度
      // 设计图750，调成1倍=>适配375标准屏幕 640=>320
      viewportWidth: 375
    }
  }
}
