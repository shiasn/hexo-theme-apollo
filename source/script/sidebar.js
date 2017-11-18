(function () {
  function addToggleButton (container) {
    var button = document.createElement('div')
    for (var i = 0; i < 3; i++) {
      var stripe = document.createElement('span')
      stripe.className = 'stripe-' + i
      button.appendChild(stripe)
    }
    button.addEventListener('click', function () {
      var oldClassName = container.className

      if (~oldClassName.indexOf('closed')) {
        container.className = oldClassName.replace('closed', 'opened')
      } else {
        container.className = oldClassName.replace('opened', 'closed')
      }
    }, false)
    container.append(button)
  }
  function addSidebar () {
    var postBlock = document.querySelector('.post-block')
    if (!postBlock) return
    var container = document.createElement('aside')
    var eles = []
    
    addToggleButton(container)
    container.className = 'sidebar closed'
  
    function eleHandler (tag) {
      var curEles = document.querySelectorAll(tag)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
      for (let i = 0, l = curEles.length; i < l; i++) {
        eles.push({
          tag: tag,
          title: curEles[i].textContent,
          className: tag.replace('h', 'header-'),
          top: curEles[i].getBoundingClientRect().top + scrollTop
        })
      }
  
      
      eles.sort(function (prev, next) {
        return prev.top - next.top
      })
    }
  
    function append (ele) {
      var el = document.createElement('p')
      el.addEventListener('click', function () {
        window.scrollTo(0, ele.top - 10)
      }, false)
  
      el.className = ele.className
      el.textContent = ele.title
      container.appendChild(el)
    }
  
    for (var i = 1; i < 7; i++) {
      eleHandler('h' + i)
    }
    for (let i = 0, l = eles.length; i < l; i++) {
      append(eles[i])
    }
  
    document.body.appendChild(container)
    resizeHandler()
  }
  function resizeHandler (container) {
    var w = document.body.clientWidth
    var sidebar = document.querySelector('.sidebar')
    var className = sidebar.className
    console.log(className)
    if (w < 420 && !~className.indexOf('mobile')) {
      sidebar.className += ' mobile'
    } else {
      sidebar.className = className.replace('mobile', '')
    }
  }
  window.addEventListener('load', addSidebar, false)
  window.addEventListener('resize', resizeHandler, false)
})()