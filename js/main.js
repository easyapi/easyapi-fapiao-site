/*初始化swipper动画*/

function Main(win) {
  this.win = win

  this.navTabs = [
    {
      'id': 1,
      'tab': 'solution',
      'url': './solution.html',
      'title': '订单对接开票'
    },
    {
      'id': 2,
      'tab': 'qrcode',
      'url': './qrcode.html',
      'title': '扫码开票'
    },
    {
      'id': 3,
      'tab': 'custom',
      'url': './custom.html',
      'title': '自定义开票'
    }
  ]

  this.menu = [
    {
      'id': 1,
      'tab': 'index',
      'url': './index.html',
      'title': '首页',
      'children': []
    },
    {
      'id': 2,
      'tab': 'guide',
      'url': './guide.html',
      'title': '接入流程',
      'children': []
    },
    {
      'id': 3,
      'tab': 'solution',
      'url': './solution.html',
      'title': '解决方案',
      'children': ['qrcode', 'custom']
    },
    {
      'id': 4,
      'tab': 'together',
      'url': './together.html',
      'title': '渠道合作',
      'children': []
    },
    {
      'id': 5,
      'tab': 'contact',
      'url': './contact.html',
      'title': '联系我们',
      'children': []
    }
  ]
}

Main.prototype = {
  /*初始化*/
  init: function () {
    this.swiper()
    this.popup()
    this.renderMenu()
    this.renderTabs()
    this.checkClientDevice()
    this.tabHighLight(document.getElementsByClassName('menu_list')[0], 'li', this.win)
    this.tabHighLight(document.getElementsByClassName('main_tab_header')[0], 'a', this.win)
  },

  /**
   *渲染tabs
   *@param {tabs}导航项
   */
  renderTabs: function () {
    try {
      var that = this
      var links = ''
      var wrap = document.getElementsByClassName('main_tab_header')[0]

      this.navTabs.forEach(function (item, index) {
        links += '<a href="' + item.url + '" data-tab="' + item.tab + '">' + item.title + '</a>'
      })

      wrap.innerHTML = links
    } catch (e) {
      console.log(e)
    }


  },

  /*swiper动画*/
  swiper: function () {
    try {
      var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
      });
    } catch (e) {
      console.log(e, 'error')
    }

  },

  /*添加导航内容*/
  addNav(_parent, tag) {
    var that = this
    var on = 0
    var node = document.createElement(tag)

    for (var i = 0; i < that.navTabs.length; i++) {
      _parent.append(node)
    }

    return _parent.getElementsByTagName(tag)
  },


  /**
   *tab高亮
   *@param {win}window对象
   *@param {_parent}列表父级对象
   */
  tabHighLight: function (_parent, tag, win) {
    try {
      var tabsArr = []
      var tabs = _parent.getElementsByTagName(tag)

      for (var i = 0; i < tabs.length; i++) {
        tabsArr.push(tabs[i])
      }

      this.setHighLight(tabsArr, win)
    } catch (e) {
      console.log(e)
    }

  },

  /**
   *高亮
   *@param {tabsArr}导航数组
   *@param {win}window对象
   */
  setHighLight(tabsArr, win) {
    var winHref = win.location.href

    if (tabsArr) {
      tabsArr.forEach(item => {
        var cn = item.className
        var tab = item.dataset.tab
        var child = item.dataset.child

        if (child) {
          var childList = child.split(',')

          if (childList.length > 1) {
            childList.forEach(function (child, index) {
              if (winHref.indexOf(child) != -1) {
                if (cn) {
                  return item.className = cn + 'actived'
                }

                return item.className = 'actived'

              }
            })
          }
        }


        if (winHref.indexOf(tab) != -1) {
          if (cn) {
            return item.className = cn + ' actived'
          }

          return item.className = 'actived'

        }
      })
    }
  },

  /**
   *弹窗
   */
  popup: function () {
    var that = this
    var menus = document.getElementsByClassName('main_ht_menu')[0]
    var list = document.getElementsByClassName('menu_list')[0]

    menus.addEventListener('click', function (e) {
      e.stopPropagation()
      that.changeClass(list)
    })

    window.addEventListener('click', function (e) {
      that.changeClass(list, window)
    })
  },

  /**
   *切换样式
   */
  changeClass: function (element, _parent) {
    var cls = element.className

    if (_parent) {
      if (_parent == window) {
        return element.className = 'menu_list'
      }
    }

    if (cls) {
      if (cls.indexOf('actived') != -1) {
        element.className = 'menu_list'
      } else {
        element.className = cls + ' actived'
      }
    }
  },

  /**
   *渲染菜单
   */
  renderMenu: function () {
    var menu = document.getElementsByClassName('menu_list')[0]
    var wrap = ''

    this.menu.forEach(function (item, index) {
      wrap += '<li class="" data-tab="' + item.tab + '" data-child="' + item.children + '"><a href="' + item.url + '">' + item.title + '</a></li>'
    })

    menu.innerHTML = wrap
  },

  /**
   *判断客户端
   @param {url}跳转链接
   */
  checkClientDevice: function (url) {
    var client = navigator.userAgent

    if (url) {
      if (client.indexOf('Windows') != -1) {
        window.location.href = url
      }
    }

  }
}


window.onload = function () {
  var main = new Main(window)
  main.init()
}


var lis = document.getElementsByClassName('tab');
var upOrder = document.getElementById('upOrder');
var upOwn = document.getElementById('upOwn');
var upScan = document.getElementById('upScan');
var contact_us_show = document.getElementById('contact_us_show');
var us = document.getElementById('us');
var closeImg = document.getElementById('closeImg');
var openImg = document.getElementById('openImg');
var telephone = document.getElementById('telephone');

var _index = 0;
for (var i = 0; i < lis.length; i++) {
  lis[i].onclick = function (val) {
    var that = this;
    _index = this.getAttribute('data-index');
    for (var i = 0; i < lis.length; i++) {

      lis[i].classList.remove('lines')
      that.classList.add('lines');

    }
    if (_index == 0) {
      // 上方三个
      upOrder.style.display = "block";
      upOwn.style.display = "none";
      upScan.style.display = "none";
      // 下方三个
      orderId.style.display = "block";
      ownId.style.display = "none";
      scanId.style.display = "none";
    } else if (_index == 1) {
      // 上方三个
      upOrder.style.display = "none";
      upOwn.style.display = "none";
      upScan.style.display = "block";

      // 下方三个

      orderId.style.display = "none";
      ownId.style.display = "none";
      scanId.style.display = "block";
    } else {
      // 上方三个
      upOrder.style.display = "none";
      upOwn.style.display = "block";
      upScan.style.display = "none";

      // 下方三个

      orderId.style.display = "none";
      ownId.style.display = "block";
      scanId.style.display = "none";
    }
  }
}

/**
 * 移入显示联系我们 移除消失
 @param  onclick
 */
us.onmouseenter = function () {
  contact_us_show.style.display = "block"
}
us.onmouseleave = function () {
  contact_us_show.style.display = "none"
}

/**
 * 点击显示右下角内容
 @param  onclick
 */
openImg.onclick = function () {
  openImg.style.display = "none"
  closeImg.style.display = "block"
  telephone.style.display = "block"
}
closeImg.onclick = function () {
  openImg.style.display = "block"
  closeImg.style.display = "none"
  telephone.style.display = "none"
}

function browserRedirect() {
  if (window.location.href.indexOf("mobile") > 0) {
    return false;
  }
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    window.location.href = "/mobile/";
  }
}

browserRedirect();

