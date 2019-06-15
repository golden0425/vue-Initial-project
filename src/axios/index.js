import store from "@/store";
import axios from "axios";
import { Message, Loading } from "element-ui";
import util from "@/libs/util";

let loading;
function startLoading() {
  //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.7)"
  });
}
function endLoading() {
  //使用Element loading-close 方法
  loading.close();
}

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// 创建一个错误
function errorCreat(msg) {
  const err = new Error(msg);
  errorLog(err);
  throw err;
}

// 记录和显示错误
function errorLog(err) {
  // 添加到日志
  // store.dispatch("d2admin/log/add", {
  //   type: "error",
  //   err,
  //   info: "数据请求异常"
  // });
  // 打印到控制台
  if (process.env.NODE_ENV === "development") {
    util.log.danger(">>>>>> Error >>>>>>");
  }
  // 显示提示
  Message({
    message: err.message,
    type: "error",
    duration: 5 * 1000
  });
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 10000, // 请求超时时间
  withCredentials: true
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    if (!/^https:\/\/|http:\/\//.test(config.url)) {
      const token = util.cookies.get("token");
      if (token && token !== "undefined") {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers["token"] = token;
      }
    }
    showFullScreenLoading();
    return config;
  },
  error => {
    // 发送失败
    Promise.reject(error);
  }
);
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { status } = dataAxios;
    // 根据 code 进行判断
    if (status === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios;
    } else {
      tryHideFullScreenLoading();
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (status) {
        case 0: // [ 示例 ] code === 0 代表没有错误
          return dataAxios;
        case "50":
          // [ 示例 ] 其它和后台约定的 code
          errorCreat(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`);
          break;
        default:
          // 不是正确的 code
          errorCreat(`${dataAxios.msg}`);
          break;
      }
    }
  },
  error => {
    tryHideFullScreenLoading();
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 405:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器开小差了~~~ 😜";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
    errorLog(error);
    return Promise.reject(error);
  }
);

export default service;
