(function () {
  var PASSWORD = "spice2026"; // 変更する場合はこの1行を書き換える
  var KEY = "janpia-vision-docs-auth";

  if (sessionStorage.getItem(KEY) === "1") return;

  var style = document.createElement("style");
  style.textContent =
    'html.jvd-locked body > *:not(#jvd-gate-overlay){display:none !important;}' +
    '#jvd-gate-overlay{position:fixed;inset:0;background:#000;color:#fff;z-index:99999;' +
    'display:flex;align-items:center;justify-content:center;' +
    'font-family:"Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic",sans-serif;}' +
    '#jvd-gate-box{background:#111;border:1px solid #333;border-top:4px solid rgb(255,218,0);' +
    'border-radius:12px;padding:32px 36px;max-width:320px;width:90%;text-align:center;}' +
    '#jvd-gate-box h2{font-size:15px;margin-bottom:16px;color:rgb(255,218,0);letter-spacing:.05em;}' +
    '#jvd-gate-box input{width:100%;padding:10px 12px;border:1px solid #444;border-radius:6px;' +
    'background:#000;color:#fff;font-size:14px;margin-bottom:12px;box-sizing:border-box;}' +
    '#jvd-gate-box button{width:100%;padding:10px 12px;border:none;border-radius:6px;' +
    'background:rgb(255,218,0);color:#000;font-weight:700;font-size:14px;cursor:pointer;}' +
    '#jvd-gate-box p{font-size:12px;color:#999;margin-top:12px;}' +
    '#jvd-gate-error{color:#ff6b6b;font-size:12.5px;margin-bottom:10px;display:none;}';
  document.head.appendChild(style);
  document.documentElement.classList.add("jvd-locked");

  document.addEventListener("DOMContentLoaded", function () {
    var overlay = document.createElement("div");
    overlay.id = "jvd-gate-overlay";
    overlay.innerHTML =
      '<div id="jvd-gate-box">' +
      "<h2>🔒 PASSWORD REQUIRED</h2>" +
      '<div id="jvd-gate-error">パスワードが違います</div>' +
      '<input type="password" id="jvd-gate-input" placeholder="パスワード" autocomplete="off">' +
      '<button id="jvd-gate-submit">開く</button>' +
      "<p>社内検討用資料・関係者限定</p>" +
      "</div>";
    document.body.appendChild(overlay);

    var input = document.getElementById("jvd-gate-input");
    var err = document.getElementById("jvd-gate-error");

    function tryUnlock() {
      if (input.value === PASSWORD) {
        sessionStorage.setItem(KEY, "1");
        document.documentElement.classList.remove("jvd-locked");
        overlay.remove();
      } else {
        err.style.display = "block";
        input.value = "";
        input.focus();
      }
    }

    document.getElementById("jvd-gate-submit").addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") tryUnlock();
    });
    input.focus();
  });
})();
