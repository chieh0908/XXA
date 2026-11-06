// common
$(function () {
  /*▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
             浮水印_tb_mob
  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀*/
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 350) {
      $(".noke_flex_sp").addClass("scroll");
    } else {
      $(".noke_flex_sp").removeClass("scroll");
    }
  });

  // btn_go
  $(".kv_zone .btn_reserve").click(function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: $(".sec06").offset().top,
      },
      600,
    );
  });

  // 一注江湖
  $(".kv_zone .btn_home").click(function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: $(".sec04-1").offset().top,
      },
      600,
    );
  });

  // 神功助力
  $(".kv_zone .btn_two").click(function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: $(".sec06").offset().top,
      },
      600,
    );
  });

  // 針對 獎勵顯示 彈窗，補上點擊空白處關閉的功能
  $("#hurt_num").on("click", function (e) {
    // 檢查點擊的目標是不是最外層的 modal 本身 (代表點在空白處，沒點在內容框上)
    if (e.target === this) {
      $(this).modal("hide");
    }
  });

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

  var scene6 = document.getElementById("scene6");
  if (scene6) {
    var parallax6 = new Parallax(scene6);
  }
  var scenekv = document.getElementById("scenekv");
  if (scenekv) {
    var parallaxkv = new Parallax(scenekv);
  }

  // // role_list
  // function bindClickEvent(selector, targetSelector, targetVideo) {
  //   $(selector).click(function () {
  //     var list = $(this).index();
  //     $(this).addClass("active").siblings().removeClass("active");
  //     $(targetSelector)
  //       .eq(list)
  //       .addClass("active")
  //       .siblings()
  //       .removeClass("active");
  //     $(targetVideo)
  //       .eq(list)
  //       .addClass("active")
  //       .siblings()
  //       .removeClass("active");
  //   });
  // }

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
      images
        .eq(newIndex)
        .addClass("active")
        .siblings(".feature_img")
        .removeClass("active");
    }
  });

  // wow.js / container
  new WOW().init();

  // footer
  $("footer").load("https://ids.iwplay.com.tw/includ/footer/15.html");
});
