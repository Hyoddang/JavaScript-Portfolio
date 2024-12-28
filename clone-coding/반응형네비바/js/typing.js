let text = document.querySelector("#typing");

// 깜박임 효과
function blink() {
  text.classList.toggle("active")
}

setInterval(blink, 500)

function stringArr() {
  let strArr = ["Welcome to my page :)"];
  let effectArr = []
  let typingShift = strArr.shift("");

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