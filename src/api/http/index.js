import request from "@/axios";

export const baseUrl = process.env.VUE_APP_API;
// export const imgurl = process.env.VUE_APP_API + "/common";
// export function httpFormat(baseURL, url, data) {
//   return request({
//     baseURL,
//     url,
//     method: "post",
//     data,
//     transformRequest: [
//       function(data) {
//         let ret = "";
//         for (let it in data) {
//           ret +=
//             encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
//         }
//         return ret;
//       }
//     ],
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     }
//   });
//
const location = async params => {
  let { data, method = "POST" } = params;
  return request({ url: `${baseUrl}${LOCATION}`, data, method }); // 获取当前地理位置信息
};

export { location };
const LOCATION = "mclient/gym/find_province_city/location";
