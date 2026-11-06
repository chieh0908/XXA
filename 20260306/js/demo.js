$(document).ready(function() {

    $('.sec01 .prelogin .btn').on('click', function (e) {
        e.preventDefault();

        $(".sec01 .content .prelogin").addClass("d-none");
        $(".sec01 .content .finish").removeClass("d-none");

        // 更換禮盒圖片為已領取/開啟狀態
        // $("#gift_box_img").attr("src", "./image/sec01_giftbox2.webp");
        // $("#gift_box_source").attr("srcset", "./image/sec01_giftbox2.webp");
        $("#gift_box_img").attr("src", "https://images1.iwplay.com.tw/image/xxa/events/20260306/image/sec01_giftbox2.webp");
        $("#gift_box_source").attr("srcset", "https://images1.iwplay.com.tw/image/xxa/events/20260306/image/sec01_giftbox2.webp");
    });

    $('.sec01 .finish .btn').on('click', function (e) {
        e.preventDefault();

        $(".sec01 .content .finish").addClass("d-none");
        $(".sec01 .content .prelogin").removeClass("d-none");

        // 更換禮盒圖片回初始狀態
        // $("#gift_box_img").attr("src", "./image/sec01_giftbox1.webp");
        // $("#gift_box_source").attr("srcset", "./image/sec01_giftbox1.webp");
        $("#gift_box_img").attr("src", "https://images1.iwplay.com.tw/image/xxa/events/20260306/image/sec01_giftbox1.webp");
        $("#gift_box_source").attr("srcset", "https://images1.iwplay.com.tw/image/xxa/events/20260306/image/sec01_giftbox1.webp");
    });
});