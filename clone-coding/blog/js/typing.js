let text = document.querySelector(".typing-text");

// 깜박임 효과
function blink() {
  text.classList.toggle("active")
}
setInterval(blink, 500)

// 타이핑 효과
function stringArr() {
  let strArr = ["Welcome to my page :)"];
  let selectStr = strArr[0]
  let typingShift = selectStr.split("");

  return typingShift;
}

function resetTyping() {
  text.textContent = "";
  typing(stringArr());
}

function typing(strArr) {
  if(strArr.length > 0) {
    text.textContent += strArr.shift();
    setTimeout(function() {
      typing(strArr);
    }, 80);
  } else {
    setTimeout(resetTyping, 3000);
  }
}

typing(stringArr());