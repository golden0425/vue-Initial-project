/* eslint-disable */
/**
 *
 * 根据传入的数字千万分为插入逗号“,”
 * @export
 * @param {传入的数值} s
 * @param {保留几位小数} n
 * @returns 返回数据
 */
export function toThousands(s, n) {
  let t = "";
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s
      .split(".")[0]
      .split("")
      .reverse(),
    r = s.split(".")[1];
  t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
  }
  return (
    t
      .split("")
      .reverse()
      .join("") +
    "." +
    r
  );
}

/**
 *
 * 弹窗高度超过页面可视区域可调此方法重置设置弹窗高度
 * @export
 * @returns
 */
export function resetDialogHeight() {
  return (
    (document.documentElement.clientHeight || document.body.clientHeight) -
    130 +
    "px"
  );
}

/**
 *
 * 存储选中的菜单名
 * @export
 */
export function setMenu(name) {
  window.localStorage.menuName = name;
}

/**
 *
 * 返回菜单名
 * @export
 * @returns
 */
export function getMenu() {
  return window.localStorage.menuName ? window.localStorage.menuName : "";
}

/**
 *
 * 移除菜单名
 * @export
 * @returns
 */
export function removeMenu() {
  return window.localStorage.removeItem("menuName");
}

/**
 *
 * 得到登录用户信息
 * @export
 * @returns
 */
export function getUserInfo() {
  let data = JSON.parse(localStorage.getItem("user"));
  //
  //
  return data;
}

/**
 * 数字滚动
 */
export function digitalMotion(num, endFn) {
  //
  let s = 0;
  setInterval(function() {
    var speed = (Number(num).toFixed(0) - s) / 3;

    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

    endFn && endFn(s + speed);

    s = s + speed;
  }, 40);
}

/**
 * 锚点链接
 */
export function jump(index, className) {
  // 用 class="d_jump" 添加锚点
  var scrollDiv = document.getElementById("scrollDiv");
  let jump = document.querySelectorAll(className);
  let total = jump[index].offsetTop;
  let distance = scrollDiv.scrollTop - 92;
  // 平滑滚动，时长500ms，每10ms一跳，共50跳
  let step = total / 50;
  //
  if (total > distance) {
    smoothDown();
  } else {
    let newTotal = distance - total;
    step = newTotal / 50;
    smoothUp();
  }
  function smoothDown() {
    if (distance < total) {
      distance += step;

      scrollDiv.scrollTop = distance - 92;
      // document.documentElement.scrollTop = distance;
      setTimeout(smoothDown, 10);
    } else {
      scrollDiv.scrollTop = total - 92;
      // document.documentElement.scrollTop = total;
    }
  }
  function smoothUp() {
    if (distance > total) {
      distance -= step;
      scrollDiv.scrollTop = distance - 92;
      // document.documentElement.scrollTop = distance;
      setTimeout(smoothUp, 10);
    } else {
      scrollDiv.scrollTop = total - 92;
      // document.documentElement.scrollTop = total;
    }
  }
}

export function returnPage(vm) {
  const { path } = vm.$route;
  vm.$router.push({
    path
  });
}

/**
 * 数字滚动
 * @export
 * @param {传入数字}} maxNum
 * @param {显示dom} dom
 */
export function numRunFun(maxNum, dom) {
  var numText = 0;
  var speed = 0;
  var golb; // 为了清除requestAnimationFrame
  function numSlideFun() {
    numText += 1; // 速度的计算可以为小数

    if (numText >= maxNum) {
      numText = maxNum;
      window.cancelAnimationFrame(golb);
    } else {
      golb = window.requestAnimationFrame(numSlideFun);
    }
    dom.innerHTML = numText;
  }
  numSlideFun();
}

/**
 *  数字滚动
 * @export
 * @param {*} targetEle
 * @param {*} [options={
 *   time: 1500,
 *   num: 12000,
 *   regulator: 50
 * }]
 */
export function NumAutoPlusAnimation(
  num,
  dom,
  options = {
    time: 1500,
    regulator: 30
  }
) {
  /*可以自己改造下传入的参数，按照自己的需求和喜好封装该函数*/
  //不传配置就把它绑定在相应html元素的data-xxxx属性上吧
  options = options || {};
  let time = options.time; //总时间--毫秒为单位
  let finalNum = num; //要显示的真实数值
  let regulator = options.regulator; //调速器，改变regulator的数值可以调节数字改变的速度
  let step = finalNum / (time / regulator); /*每30ms增加的数值--*/
  let count = 0; //计数器
  let initial = 0;
  var timer = setInterval(function() {
    count = count + step;
    if (count >= finalNum) {
      clearInterval(timer);
      count = finalNum;
    }
    //t未发生改变的话就直接返回
    //避免调用text函数，提高DOM性能
    var t = Math.floor(count);
    if (count == finalNum) {
      return (dom.innerHTML = num);
    } else {
      initial = t;
    }
    dom.innerHTML = initial;
  }, 30);
}
