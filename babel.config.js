// https://styled-components.com/docs/advanced#nextjs
// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/.babelrc
module.exports = {
  presets: ["next/babel"],
  plugins: [["styled-components", { "ssr": true }]]
}
