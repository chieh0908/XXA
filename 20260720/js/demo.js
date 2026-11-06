$(document).ready(function () {
  // --- sec04-1 門派押注 Demo 邏輯 ---
  let selectedColumnIndex = null;

  // 點選押注按鈕，記錄是 NO.1 ~ NO.10 的哪一個，並開啟彈窗
  $(".sec04-1 .bet_btn").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("disabled")) return;

    selectedColumnIndex = $(this).closest(".team_bet_box").data("index");

    // 重設下拉選單選取狀態為預設的「請選擇門派」
    $("#sectSelect").val("");

    // 顯示 Bootstrap 彈窗
    $("#betModal").modal("show");
  });

  // 點擊領獎按鈕 (sec04-2 排行榜下方按鈕)
  $(".sec04-2 .bet_btn").on("click", function (e) {
    e.preventDefault();

    // 判斷 1：如果按鈕有 disabled (尚未公布名次/無資格)，就直接中斷，什麼都不做
    if ($(this).hasClass("disabled")) return;

    // 判斷 2：領取成功後，幫按鈕加上 .claimed，觸發 CSS 切換雪碧圖與鎖死
    $(this).addClass("claimed");
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

    // 取得當下被點擊押注按鈕的區域
    const $targetBox = $(
      `.sec04-1 .team_bet_box[data-index="${selectedColumnIndex}"]`,
    );
    const $img = $targetBox.find(".sect_img");
    const $fallbackCard = $targetBox.find(".sect_fallback_card");
    const $emptyText = $targetBox.find(".empty_text");
    const $betBtn = $targetBox.find(".bet_btn");

    // 設定圖片路徑
    const isMobile = window.innerWidth <= 768;
    const imgSuffix = isMobile ? "_m" : "";
    const bgImage = isMobile
      ? 'url("../image/sec04/scroll_bg_m.webp")'
      : 'url("../image/sec04/scroll_bg.webp")';
    const imgUrl = `image/sec04/sect_${selectedSectValue}${imgSuffix}.webp`;

    // 註冊圖片加載事件，成功則顯示圖片
    $img.off("load").on("load", function () {
      $img.removeClass("d-none");
      $fallbackCard.addClass("d-none");
      $emptyText.addClass("d-none");
      $betBtn.addClass("d-none");
      $targetBox.css({
        background: `${bgImage} no-repeat center top`,
        "background-size": "100% 100%",
      });
      $targetBox.find(".team_img_placeholder").addClass("has-bet");
    });
    // ，失敗則展示古典直排字卡Fallback
    $img.off("error").on("error", function () {
      $img.addClass("d-none");
      $fallbackCard.find(".sect_name_text").text(selectedSectText);
      $fallbackCard.removeClass("d-none");
      $emptyText.addClass("d-none");
      $betBtn.addClass("d-none");
      $targetBox.css({
        background: `${bgImage} no-repeat center top`,
        "background-size": "100% 100%",
      });
      $targetBox.find(".team_img_placeholder").addClass("has-bet");
    });

    // 觸發加載
    $img.attr("src", imgUrl);

    // 選擇完押注對象後
    // 狀態1.更新押注按鈕文字為所選門派，並設為置灰不可按狀態 (.disabled)
    // $betBtn.text(selectedSectText).addClass("disabled");

    // 狀態2.更新押注按鈕文字為所選門派，可以繼續點擊重新押注
    // $betBtn.text(selectedSectText);

    // 關閉彈窗
    $("#betModal").modal("hide");
  });

  // 處理自訂下拉箭頭的翻轉狀態
  let isChanging = false; // 用來記錄是否正在切換選項

  $("#sectSelect").on("change", function () {
    isChanging = true; // 標記正在切換
    $(this).parent(".select_wrapper").removeClass("is-open");
    $(this).blur(); // 強制失去焦點，避免殘影

    // 短暫延遲後恢復標記，避開緊接而來的 click 事件
    setTimeout(() => {
      isChanging = false;
    }, 100);
  });

  $("#sectSelect").on("click", function () {
    // 只有在「不是因為切換選項」的情況下，才允許翻轉
    if (!isChanging) {
      $(this).parent(".select_wrapper").toggleClass("is-open");
    }
  });

  $("#sectSelect").on("blur", function () {
    $(this).parent(".select_wrapper").removeClass("is-open");
  });

  // 網頁載入時，自動檢查排行榜 (.sec04-2) 內有沒有圖片，有的話就加上掃光特效
  $(".sec04-2 .team_box").each(function () {
    const $img = $(this).find(".sect_img");
    const $placeholder = $(this).find(".team_img_placeholder");

    // 檢查圖片是否有路徑，且未被隱藏
    if ($img.attr("src") && !$img.hasClass("d-none")) {
      $placeholder.addClass("has-bet");
    } else {
      $placeholder.removeClass("has-bet");
    }
  });
});
