$(document).ready(function () {
  let sec01LoginState = 0; // 0: finish, 1: finish2, 2: finish3

  $(".sec01 .prelogin .btn").on("click", function (e) {
    e.preventDefault();

    $(".sec01 .content .prelogin").addClass("d-none");
    $(".sec01 .content .finish").removeClass("d-none");

    // 根據狀態設定對應的文字與禮盒圖
    if (sec01LoginState === 0) {
      $(".sec01 .content .finish p").html(ViewObj.finish);
      $("#gift_box_img").attr("src", "./image/sec01/sec01_giftbox2.webp");
      $("#gift_box_source").attr(
        "srcset",
        "./image/sec01/sec01_giftbox2_m.webp",
      );
    } else if (sec01LoginState === 1) {
      $(".sec01 .content .finish p").html(ViewObj.finish2);
      $("#gift_box_img").attr("src", "./image/sec01/sec01_giftbox3.webp");
      $("#gift_box_source").attr(
        "srcset",
        "./image/sec01/sec01_giftbox3_m.webp",
      );
    } else {
      $(".sec01 .content .finish p").html(ViewObj.finish3);
      $("#gift_box_img").attr("src", "./image/sec01/sec01_giftbox3.webp");
      $("#gift_box_source").attr(
        "srcset",
        "./image/sec01/sec01_giftbox3_m.webp",
      );
    }

    // 每次點擊後切換到下一個狀態，以便測試
    sec01LoginState = (sec01LoginState + 1) % 3;
  });

  $(".sec01 .finish .btn").on("click", function (e) {
    e.preventDefault();

    $(".sec01 .content .finish").addClass("d-none");
    $(".sec01 .content .prelogin").removeClass("d-none");

    // 更換禮盒圖片回初始狀態
    // $("#gift_box_img").attr("src", "./image/sec01_giftbox1.webp");
    // $("#gift_box_source").attr("srcset", "./image/sec01_giftbox1.webp");
    $("#gift_box_img").attr("src", "./image/sec01/sec01_giftbox1.webp");
    $("#gift_box_source").attr("srcset", "./image/sec01/sec01_giftbox1_m.webp");
  });

  // $(".sec02 .prelogin .btn").on("click", function (e) {
  //   e.preventDefault();

  //   $(".sec02 .content .prelogin").addClass("d-none");
  //   $(".sec02 .content .finish").removeClass("d-none");

  //   // 更換禮盒圖片為已領取/開啟狀態
  //   // $("#gift_box_img").attr("src", "./image/sec02_giftbox2.webp");
  //   // $("#gift_box_source").attr("srcset", "./image/sec02_giftbox2.webp");
  //   $("#gift_box_img").attr(
  //     "src",
  //     "https://images1.iwplay.com.tw/image/xxa/events/20260306/image/sec01_giftbox2.webp",
  //   );
  //   $("#gift_box_source").attr(
  //     "srcset",
  //     "https://images1.iwplay.com.tw/image/xxa/events/20260306/image/sec01_giftbox2.webp",
  //   );
  // });

  // $(".sec02 .finish .btn").on("click", function (e) {
  //   e.preventDefault();

  //   $(".sec02 .content .finish").addClass("d-none");
  //   $(".sec02 .content .prelogin").removeClass("d-none");

  //   // 更換禮盒圖片回初始狀態
  //   // $("#gift_box_img").attr("src", "./image/sec02_giftbox1.webp");
  //   // $("#gift_box_source").attr("srcset", "./image/sec02_giftbox1.webp");
  //   $("#gift_box_img").attr(
  //     "src",
  //     "https://images1.iwplay.com.tw/image/xxa/events/20260306/image/sec01_giftbox1.webp",
  //   );
  //   $("#gift_box_source").attr(
  //     "srcset",
  //     "https://images1.iwplay.com.tw/image/xxa/events/20260306/image/sec01_giftbox1.webp",
  //   );
  // });

  // --- sec04-1 門派押注 Demo 邏輯 ---
  let selectedColumnIndex = null;

  // 點選押注按鈕，記錄是 NO.1 ~ NO.5 的哪一個，並開啟彈窗
  $(".sec04-1 .bet_btn").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("disabled")) return;

    selectedColumnIndex = $(this).closest(".team_bet_box").data("index");

    // 重設下拉選單選取狀態為預設的「請選擇門派」
    $("#sectSelect").val("");

    // 顯示 Bootstrap 彈窗
    $("#betModal").modal("show");
  });

  // 點選「確定壓注」按鈕
  $("#confirmBetBtn").on("click", function (e) {
    e.preventDefault();
    if (!selectedColumnIndex) return;

    const selectedSectValue = $("#sectSelect").val();
    const selectedSectText = $("#sectSelect option:selected").text();

    if (!selectedSectValue) {
      // alert("請選擇您要押注的門派！");
      $("#eventAlertModal .modal-body p").text("請選擇您要押注的門派！");
      $("#eventAlertModal").modal("show");
      return;
    }

    const $targetBox = $(
      `.sec04-1 .team_bet_box[data-index="${selectedColumnIndex}"]`,
    );
    const $img = $targetBox.find(".sect_img");
    const $fallbackCard = $targetBox.find(".sect_fallback_card");
    const $emptyText = $targetBox.find(".empty_text");
    const $betBtn = $targetBox.find(".bet_btn");

    // 設定圖片路徑
    const imgUrl = `image/sec04/sect_${selectedSectValue}.webp`;

    // 註冊圖片加載事件，成功則顯示圖片
    $img.off("load").on("load", function () {
      $img.removeClass("d-none");
      $fallbackCard.addClass("d-none");
      $emptyText.addClass("d-none");
    });
    // ，失敗則展示古典直排字卡Fallback
    $img.off("error").on("error", function () {
      $img.addClass("d-none");
      $fallbackCard.find(".sect_name_text").text(selectedSectText);
      $fallbackCard.removeClass("d-none");
      $emptyText.addClass("d-none");
    });

    // 觸發加載
    $img.attr("src", imgUrl);

    // 更新按鈕文字為所選門派，並設為置灰不可按狀態 (.disabled)
    $betBtn.text(selectedSectText).addClass("disabled");

    // 關閉彈窗
    $("#betModal").modal("hide");
  });
});
