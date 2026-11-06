$(function () {



    
/*-------------------
        創作者報名_彈窗
  -------------------*/
  $(".creator_submit_pop .agree_btn").click(function () {
    $(".creator_submit_pop .submit_opening").addClass('display_none');
    $(".creator_submit_pop .submit_part1").removeClass('display_none');
  });


  $(".creator_submit_pop .submit_part1 .next_btn").click(function () {
    $(".creator_submit_pop .submit_part1").addClass('display_none');
    $(".creator_submit_pop .submit_part2").removeClass('display_none');
  });
  $(".creator_submit_pop .submit_part1 .back_btn").click(function () {
    $(".creator_submit_pop .submit_opening").removeClass('display_none');
    $(".creator_submit_pop .submit_part1").addClass('display_none');
  });


  $(".creator_submit_pop .submit_part2 .next_btn").click(function () {
    $(".creator_submit_pop .submit_part2").addClass('display_none');
    $(".creator_submit_pop .submit_end").removeClass('display_none');
  });
  $(".creator_submit_pop .submit_part2 .back_btn").click(function () {
    $(".creator_submit_pop .submit_part1").removeClass('display_none');
    $(".creator_submit_pop .submit_part2").addClass('display_none');
  });


  /*--關閉後重置--*/
  $(".rmb_3-2 .btn_img").click(function () {
    $(".creator_submit_pop .submit_opening").removeClass('display_none');
    $(".creator_submit_pop .submit_part1").addClass('display_none');
    $(".creator_submit_pop .submit_part2").addClass('display_none');
    $(".creator_submit_pop .submit_part2 .up_load_face_1").removeClass('display_none');
    $(".creator_submit_pop .submit_part2 .up_load_face_2").addClass('display_none');
    $(".creator_submit_pop .submit_end").addClass('display_none');
  });





 /*--上傳圖片機制--*/
// 點 up_load_face_1 的 upload_btn，打開選擇檔案
$(".creator_submit_pop .up_load_face_1 .upload_btn").click(function() {
  $("#uploadInput").click();
});

// 點 up_load_face_2 的 upload_btn（重新上傳），也是打開選擇檔案
$(".creator_submit_pop .up_load_face_2 .upload_btn").click(function() {
  $("#uploadInput").click();
});

// 當使用者選擇完圖片後
$("#uploadInput").on("change", function() {
  var file = this.files[0];
  if (file) {
    // 成功選擇檔案，切換畫面
    $(".creator_submit_pop .up_load_face_1").addClass("display_none");
    $(".creator_submit_pop .up_load_face_2").removeClass("display_none");

    //（可選）如果要即時預覽上傳的圖片，可以在這裡補
    // 例如: 顯示成up_load_face_2裡的img src
    var reader = new FileReader();
    reader.onload = function(e) {
      $(".creator_submit_pop .up_load_face_2 .upload_btn2 img").attr("src", e.target.result);
    };
    reader.readAsDataURL(file);
  }
});






})