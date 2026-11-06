// common
$(function () {
  // 20250110
  eventjson().run(ViewObj);

  // 取得 DOM 元素
  const gameContainer = document.getElementById("skill_effects");
  const btnB = document.getElementById("skillB");
  const skillTextElement = document.getElementById("skill_text");

  // 技能範圍定義
  const skillRanges = {
    B: { name: "背水", min: 5000, max: 6999 },
  };

  // 獨孤九劍技能定義 (btnB 隨機觸發)
  const skillsB = [
    {
      name: "破氣式",
      damage: 99999,
      color: "#ff3333",
      gift: "背飾-清霄玉羽(永久)*1、綁元*888、千千結紅武魂自選*1",
    }, // 亮紅
    {
      name: "破箭式",
      damage: 700,
      color: "#ff9933",
      gift: "背飾-清霄玉羽(30日)*1、綁元*666",
    }, // 橙色
    {
      name: "破掌式",
      damage: 900,
      color: "#ffff33",
      gift: "背飾-清霄玉羽(7日)*1、綁元*500",
    }, // 黃色
    {
      name: "破索式",
      damage: 600,
      color: "#33ff33",
      gift: "1級隨機名師禮包*1",
    }, // 綠色
    { name: "破鞭式", damage: 700, color: "#33ffff", gift: "附緣錄*10" }, // 青色
    { name: "破槍式", damage: 800, color: "#3399ff", gift: "綁元*50" }, // 亮藍
    { name: "破刀式", damage: 800, color: "#cc66ff", gift: "隨機星魄禮包*1" }, // 紫色
    { name: "破劍式", damage: 700, color: "#ff66ff", gift: "千千結*2" }, // 粉紅
    { name: "總訣式", damage: 600, color: "#ffffff", gift: "綁元*30" }, // 純白
  ];

  // 重置 GIF 方法
  function resetGif($gif) {
    const src = $gif.attr("src");
    $gif.attr("src", "");
    $gif.attr("src", src);
  }

  // 顯示傷害數字 (支援自定義顏色)
  function showDamage(skillName, x, y, damage, customColor = null) {
    const damageText = `${skillName} ${damage}`; // 完整字串
    const damageNumber = document.createElement("div");
    damageNumber.className = "damage";
    damageNumber.innerText = damageText;

    // 偵測是否為行動裝置
    function isMobileDevice() {
      return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    // 動態設定字體大小
    function getFontSize() {
      if (isMobileDevice()) {
        return `${(Math.random() * 3.0 + 3.5).toFixed(2)}vw`;
      } else {
        return `${(Math.random() * 1.0 + 1.2).toFixed(2)}vw`;
      }
    }

    // 設置顏色與大小
    damageNumber.style.color =
      customColor || ["white", "yellow"][Math.floor(Math.random() * 2)];
    damageNumber.style.fontSize = getFontSize();

    // 設置位置為百分比
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    const leftPercent = (x / containerWidth) * 100;
    const topPercent = (y / containerHeight) * 100;
    damageNumber.style.left = `${leftPercent}%`;
    damageNumber.style.top = `${topPercent}%`;

    // 暫時將元素加入 DOM，測量寬度
    damageNumber.style.visibility = "hidden"; // 隱藏，避免影響用戶體驗
    gameContainer.appendChild(damageNumber);

    // 檢測文字是否能完整顯示
    const isOverflow = damageNumber.offsetWidth > containerWidth - x - 50; // 剩餘寬度不足
    if (isOverflow) {
      console.warn(`跳過顯示，文字超出容器寬度：${damageText}`);
      damageNumber.remove();
      return; // 容器寬度不足，直接跳過顯示
    }

    // 隨機動畫持續時間
    const animationDuration = (Math.random() * 1 + 1.1).toFixed(2);
    damageNumber.style.animationDuration = `${animationDuration}s`;

    // 顯示元素
    damageNumber.style.visibility = "visible";

    $(".skill").addClass("active");
    resetGif($("#gifImage1"));
    resetGif($("#gifImage2"));

    // 動畫結束後移除
    setTimeout(() => {
      damageNumber.remove();
      $(".skill").removeClass("active");
    }, animationDuration * 700); // 根據動畫時長移除元素
  }

  // 隨機生成傷害數字 (支援固定傷害與顏色)
  function generateDamageNumbers(
    skillName,
    rangeMin,
    rangeMax,
    fixedDamage = null,
    color = null,
  ) {
    const numberOfDamage = Math.floor(Math.random() * 3) + 3;
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;

    for (let i = 0; i < numberOfDamage; i++) {
      const damage =
        fixedDamage !== null
          ? fixedDamage
          : Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;

      // 隨機生成位置（限制在容器範圍內）
      const x = Math.random() * (containerWidth - 50); // 防止出界
      const y = Math.random() * (containerHeight - 50);

      showDamage(skillName, x, y, damage, color);
    }
  }

  // 更新技能文字的方法
  function updateSkillText(skillName, totalDamage, gift) {
    skillTextElement.innerHTML = `<span>${skillName}</span><span>攻擊值${totalDamage}</span><span class='tt'>${gift}</span>`;
  }

  /// 綁定按鈕事件
  function handleSkillButton(
    skillName,
    rangeMin,
    rangeMax,
    fixedDamage = null,
    color = null,
    gift = null,
  ) {
    $("html,body").animate(
      {
        scrollTop: $(".sec06 p").offset().top,
      },
      500,
      () => {
        // 顯示傷害數字與 GIF (傳遞顏色)
        generateDamageNumbers(
          skillName,
          rangeMin,
          rangeMax,
          fixedDamage,
          color,
        );

        // 計算要顯示在文字中的總傷害 (如果是固定傷害就直接用，不然就隨機一個)
        const displayDamage =
          fixedDamage !== null
            ? fixedDamage
            : Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;

        updateSkillText(skillName, displayDamage, gift);

        // 延遲彈出 Modal (增加延遲以確保動畫播放完畢)
        setTimeout(() => {
          $("#hurt_num").modal("show");
        }, 1500);
      },
    );
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
      alert(
        `邀請成功！當前可用次數：${skillCount} (剩餘邀請名額：${maxInvite - inviteCount})`,
      );
    } else {
      alert("已達到最大邀請好友上限（3位）。");
    }
  });

  if (btnB) {
    btnB.addEventListener("click", () => {
      if (skillCount > 0) {
        skillCount--;
        updateSkillCountUI();

        // 從 9 種技能中隨機選一個 (包含顏色)
        const randomSkill = skillsB[Math.floor(Math.random() * skillsB.length)];
        handleSkillButton(
          randomSkill.name,
          0,
          0,
          randomSkill.damage,
          randomSkill.color,
          randomSkill.gift,
        );
      } else {
        alert("技能次數不足，請先邀請好友！");
        // 自動開啟邀請彈窗
        $("#invite").modal("show");
      }
    });
  }
});
