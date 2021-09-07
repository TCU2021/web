//将最外层id是app的div的高度和浏览器高度保持相同
const app = document.getElementById("app")
function getHeight() {
  if (app) {
    app.style.height = "" + Number(window.innerHeight) + "px"
  }
}
getHeight()
window.onresize = getHeight
