"use strict";

const body = document.querySelector("body");
const overlay = document.querySelector(".works__ele_overlay");

class h_menu {
  constructor() {
    this.h_line = document.querySelector(".header__h-menu");
    this.h_list = document.querySelector(".header__list");
    this.h_ele = document.querySelectorAll(".header__ele a");
    this.h_top = document.querySelector(".header");
    this.delay_timeoutId;
    this.click();
    this.delay();
  }
  click() {
    this.h_line.addEventListener("click", () => {
      this.h_line.classList.toggle("active");
      this.h_list.classList.toggle("active");
    }, false);

    for(let n = 0; n < this.h_ele.length; n++) {
      this.h_ele[n].addEventListener("click", () => {
        this.h_line.classList.remove("active");
        this.h_list.classList.remove("active");
      }, false);
    }
  }  
  delay() {
    window.addEventListener("scroll", () => {
      if ( this.delay_timeoutId ) return ;
      setTimeout(() => {
        this.delay_timeoutId = 0;
        if(window.pageYOffset > 50) {
          this.h_top.classList.add("active")
        } else {
          this.h_top.classList.remove("active") 
        }
      }, 300);
    },false)
  }
}

class voice_more {
  constructor() {
    this.more_btn = document.querySelectorAll(".voice__ele_link");
    this.comment_detail = document.querySelectorAll(".comment_detail");
    this.click()
  }
  click() {
    for(let n = 0; n < this.more_btn.length; n++) {
      this.more_btn[n].addEventListener("click", () => {
        this.more_btn[n].classList.toggle("active");
        this.comment_detail[n].classList.toggle("active");
      })
    }
  }
}

class countUp {
  constructor() {
    this.num = document.querySelector(".works__num span");
    this.count = 0;
    this.observer_flag = false;
    this.observer = new IntersectionObserver(() => {
      if(this.observer_flag == false) {
        this.observer_flag = true;
      } else {
        console.log("a");
        this.up();
      }
    }, this.options);
    this.options = {
      root: null,
      rootMargin: 0,
      threshold: [0.25, 0.5]
    };
    this.observer.observe(this.num);
  }
  up() {
    var set = setInterval(() => {
      this.count++;
      this.num.innerHTML = this.count;
      if(this.count > Number(this.num.getAttribute("countUp"))) {
        clearInterval(set)
        this.num.innerHTML = this.num.getAttribute("countUp");
      }
    }, 25);
  }
}

class mov_popup {
  constructor() {
    this.trigger = document.querySelectorAll(".works__ele");
    this.click();
  }
  click() {
    for(let n = 0; n < this.trigger.length; n++) {
      this.trigger[n].addEventListener("click", function() {
        this.src = this.getAttribute("data-src");
        body.insertAdjacentHTML("beforeend", `<div class="works__ele_mov-wrap"><iframe class="works__ele_mov" src="${this.src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><span class="works__ele_mov-wrap--close"></span></div>`);
        overlay.classList.add("active");
      }, false)
    }
    overlay.addEventListener("click", function() {
      overlay.classList.remove("active");
      document.querySelector(".works__ele_mov-wrap").remove()
    },false)
  }
}

new h_menu();
new voice_more();
new countUp();
new mov_popup();
new WOW().init();
objectFitImages();

let h_height;
let delay_timeoutId;

window.addEventListener("resize", () => {
  setTimeout(() => {
    if ( delay_timeoutId ) return ;
    delay_timeoutId = 0;
    h_height = document.querySelector(".header").offsetHeight;
  }, 200);
}, false)

window.addEventListener("load", () => {
  h_height = document.querySelector(".header").offsetHeight;
}, false)

var Ease = {
  easeInOut: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1
}
var duration = 1000;
window.addEventListener('DOMContentLoaded', () => {
  var smoothScrollTriggers = document.querySelectorAll('a[href^="#"]');
  smoothScrollTriggers.forEach(function (smoothScrollTrigger) {
    smoothScrollTrigger.addEventListener('click', function (e) {
      var href = smoothScrollTrigger.getAttribute('href');
      var currentPostion = document.documentElement.scrollTop || document.body.scrollTop;
      var targetElement = document.getElementById(href.replace('#', ''));
      if (targetElement) {
        e.preventDefault();
        e.stopPropagation();
        var targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - h_height;
        var startTime = performance.now();
        var loop = function (nowTime) {
          var time = nowTime - startTime;
          var normalizedTime = time / duration;
          if (normalizedTime < 1) {
            window.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * Ease.easeInOut(normalizedTime)));
            requestAnimationFrame(loop);
          } else {
            window.scrollTo(0, targetPosition);
          }
        }
        requestAnimationFrame(loop);
      }
    });
  });
});