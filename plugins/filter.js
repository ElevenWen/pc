/**
 * 时间格式化
 * @param {Number,String} date 毫秒数时间戳，字符串
 * @param {String} fmt 任意时间格式的字符串，默认'yyyy-MM-dd'
 * 调用方法 formatDate(1497974400000, "yyyy-MM-dd hh:mm:ss")
 */
function formatDate(date, fmt) {
  var dataTemp = null;
  if (!date) {
    return '';
  }
  if (!arguments[1]) { // 默认格式
    fmt = 'yyyy-MM-dd';
  }

  date = date.toString().trim();
  if (date.length > 10) {
    date = Number(date.replace(/\D/g, ''));
  } else {
    date = date.replace(/\./ig, "-");
  }
  dataTemp = new Date(date);
  if (dataTemp == 'Invalid Date') {
    return '';
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (dataTemp.getFullYear() + '').substr(4 - RegExp.$1.length))
  };
  let o = {
    'M+': dataTemp.getMonth() + 1,
    'd+': dataTemp.getDate(),
    'h+': dataTemp.getHours(),
    'm+': dataTemp.getMinutes(),
    's+': dataTemp.getSeconds(),
  }

  for (let k in o) {
    //new RegExp( `(${k})`)  等价于  new RegExp( (M+) )
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    };
    // //console.log(RegExp.$1);
  }

  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
 * 毫秒数时间戳的时间格式化规则
 * 过滤非数字; 当天显示时分，当年显示月日，其他显示年月日
 * @param {Number,String} value 毫秒数时间戳
 */
function simpleDateFormat(value) {
  value = Number(value.toString().replace(/\D/g, ''));
  if (!value) return '';
  let date = new Date(),
    year = date.getFullYear(),
    today = date.toDateString(),
    inputTime = new Date(value);
  if (inputTime.toDateString() === today) {
    return formatDate(value, "hh:mm");
  } else if (inputTime.getFullYear() === year) {
    return formatDate(value, "MM-dd");
  } else {
    return formatDate(value, "yyyy-MM-dd");
  }
}

export default {
  install(Vue, options) {
    Vue.filter('formatDate', formatDate);
    Vue.filter('simpleDateFormat', simpleDateFormat);
  }
}
