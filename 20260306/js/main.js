// common
$(function () {

  // // rain
  // window.onload = function () {
  //   var canvas = document.getElementById('rain');
  //   var ctx = canvas.getContext('2d');

  //   // Initialize canvas size and variables
  //   var W = window.innerWidth;
  //   var H = window.innerHeight;
  //   canvas.width = W;
  //   canvas.height = H;

  //   var num = 200; // Number of raindrops
  //   var arr = [];

  //   // Create raindrop array with random properties
  //   function initializeRaindrops() {
  //     arr = [];
  //     for (var i = 0; i < num; i++) {
  //       arr.push({
  //         x: Math.random() * W,
  //         y: Math.random() * H,
  //         w: 2, // Width of the raindrop
  //         h: Math.random() * 30, // Height of the raindrop
  //         s: Math.random() * 50 + 2 // Speed of the raindrop
  //       });
  //     }
  //   }

  //   initializeRaindrops();

  //   // Function to render raindrops
  //   function raindrops() {
  //     ctx.clearRect(0, 0, W, H);
  //     for (var i = 0; i < num; i++) {
  //       ctx.fillStyle = 'rgba(154, 134, 161, 0.2)';
  //       ctx.fillRect(arr[i].x, arr[i].y, arr[i].w, arr[i].h);
  //     }
  //     makeItRain();
  //   }

  //   // Function to update raindrop positions
  //   function makeItRain() {
  //     for (var i = 0; i < num; i++) {
  //       arr[i].y += arr[i].s;
  //       if (arr[i].y > H) {
  //         arr[i].y = -arr[i].h;
  //         arr[i].x = Math.random() * W; // Reset to a new random x-position
  //       }
  //     }
  //   }

  //   // Adjust canvas and raindrops on window resize
  //   window.onresize = function () {
  //     W = window.innerWidth;
  //     H = window.innerHeight;
  //     canvas.width = W;
  //     canvas.height = H;
  //     initializeRaindrops(); // Reinitialize raindrops to fit new canvas size
  //   };

  //   // Start the animation loop
  //   setInterval(raindrops, 16); // Approx 60fps
  // };





  

  // parallax.js
  // var scene = document.getElementById('scene');
  // var parallax = new Parallax(scene);

  var scene3 = document.getElementById('scene3');
  var parallax3 = new Parallax(scene3);

  // wow.js / container
  new WOW().init();

  // btn_go
  $('header .btn').click(function() {
    $('html,body').animate({
      scrollTop: $('.sec01').offset().top
    }, 500);
  });

  // role_list
  function bindClickEvent(selector, targetSelector, targetVideo) {
    $(selector).click(function () {
      var list = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $(targetSelector).eq(list).addClass("active").siblings().removeClass("active");
      $(targetVideo).eq(list).addClass("active").siblings().removeClass("active");
    });
  }

  // feature
  $(".feature .feature_bottom .btn").click(function () {
    // var list = $(this).index();
    // $(this).addClass("active").siblings().removeClass("active");
    // $(".feature_img").eq(list).addClass("active").siblings().removeClass("active");
    var images = $(".feature_img");
    var total = images.length;
    var currentIndex = images.index($(".feature_img.active"));
    var newIndex;

    if ($(this).hasClass("b1")) {
      // 左按鈕：切換至上一張
      newIndex = (currentIndex - 1 + total) % total;
    } else if ($(this).hasClass("b2")) {
      // 右按鈕：切換至下一張
      newIndex = (currentIndex + 1) % total;
    }

    if (newIndex !== undefined) {
      images.eq(newIndex).addClass("active").siblings(".feature_img").removeClass("active");
    }
  });

  bindClickEvent(".gender li", ".roles .role", ".role_video");



  // footer
  $('footer').load('https://ids.iwplay.com.tw/includ/footer/15.html');

});