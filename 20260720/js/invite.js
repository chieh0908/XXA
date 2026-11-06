// common
$(function () {
  // 20250110
  eventjson().run(ViewObj);

  // 取得 DOM 元素
  const btnB = document.getElementById("skillB");
  const skillTextElement = document.getElementById("skill_text");

  // 巔峰獎勵設定 (包含主標、獎品、對應的藝術字圖片路徑)
  const rewards = [
    {
      title: "絕戰巔峰",
      gift: "時裝-金繡迎祥·永久*1、綁元*666、千千結紅武魂自選*1",
      imgUrl: "../image/sec06/gift_tt1.webp",
    },
    {
      title: "名宿巔峰",
      gift: "時裝-金繡迎祥·30天*1、綁元*222",
      imgUrl: "../image/sec06/gift_tt2.webp",
    },
    {
      title: "豪傑巔峰",
      gift: "時裝-金繡迎祥·7天*1、綁元*111",
      imgUrl: "../image/sec06/gift_tt3.webp",
    },
    {
      title: "精英巔峰",
      gift: "綁元*30",
      imgUrl: "../image/sec06/gift_tt4.webp",
    },
    {
      title: "新鋒巔峰",
      gift: "隨機星魄禮包*1",
      imgUrl: "../image/sec06/gift_tt5.webp",
    },
  ];

  // 更新技能文字的方法
  function updateSkillText(title, gift) {
    skillTextElement.innerHTML = `<span>${title}</span><span class='tt'>${gift}</span>`;
  }

  /// 綁定按鈕事件
  function handleSkillButton(reward) {
    // 更新卷軸裡的藝術字圖片
    $(".sec06 .scroll .paper .art_text").attr("src", reward.imgUrl);

    // 更新彈窗文字 (只有主標和獎勵)
    updateSkillText(reward.title, reward.gift);

    setTimeout(() => {
      $("#hurt_num").modal("show");

      // 彈窗跳出的同時，移除 open 讓卷軸開始收合
      const $scroll = $("#scroll");
      $scroll.removeClass("open");

      // 等待卷軸收合動畫 (1.0s) 完成後，再徹底隱藏卷軸並顯示抽獎按鈕
      setTimeout(() => {
        $scroll.removeClass("show");
        $("#skillB").css("visibility", "visible");
      }, 1000);
    }, 1200);
  }

  // 技能次數管理
  //初始次數
  let skillCount = 10;
  let inviteCount = 0;
  const maxInvite = 3;

  function updateSkillCountUI() {
    const $count = $("#skill_count");
    if ($count.length) {
      $count.text(skillCount);
    }
    //邀請人數管理
    const $invite = $("#invite_count");
    if ($invite.length) {
      $invite.text(inviteCount);
    }
  }

  // 邀請好友點擊事件 (增加次數)
  $("#invite .copy_link .btn").click(function () {
    if (inviteCount < maxInvite) {
      inviteCount++;
      skillCount++;
      updateSkillCountUI();
      // alert(
      //   `邀請成功！當前可用次數：${skillCount} (剩餘邀請名額：${maxInvite - inviteCount})`,
      // );
    } else {
      // alert("已達到最大邀請好友上限（3位）。");
    }
  });

  if (btnB) {
    btnB.addEventListener("click", () => {
      if (skillCount > 0) {
        skillCount--;
        updateSkillCountUI();

        // 隱藏按鈕 (用 visibility 以保留佔位空間，避免推擠)，顯示卷軸 (初始為閉合狀態)
        $("#skillB").css("visibility", "hidden");
        const $scroll = $("#scroll");
        $scroll.addClass("show");
        $("#scroll-backdrop").fadeIn(200);

        // 給予 200 毫秒的延遲，讓玩家能清楚看到「卷軸出現」然後再「展開」的過程
        setTimeout(() => {
          $scroll.addClass("open");
        }, 200);

        // 從獎勵中隨機選一個
        const randomReward =
          rewards[Math.floor(Math.random() * rewards.length)];
        handleSkillButton(randomReward);
      } else {
        alert("技能次數不足，請先邀請好友！");
        // 自動開啟邀請彈窗
        $("#invite").modal("show");
      }
    });
  }
  // 當 #hurt_num 彈窗被完全關閉時，把我們自己的遮罩隱藏
  $("#hurt_num").on("hidden.bs.modal", function () {
    $("#scroll-backdrop").fadeOut(200);
  });
  // 讓玩家點擊我們自訂的遮罩時，也能關閉彈窗
  $("#scroll-backdrop").click(function () {
    // 檢查彈窗是否是開啟狀態，如果是就關閉它
    if ($("#hurt_num").hasClass("show")) {
      $("#hurt_num").modal("hide");
    }
  });
});
