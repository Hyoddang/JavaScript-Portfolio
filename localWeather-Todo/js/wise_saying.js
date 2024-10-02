const wiseSaying = document.querySelector(".wise-saying")
const wisePeople = document.querySelector(".wise-people")

const wiseSayArr = [
  {
    say: "당신이 원하는 모든 것은 두려움 반대편에 있습니다.",
    people: "Jack Canfield"
  },
  {
    say: "더 이상 시도하지 않는 것 외에는 실패가 없다.",
    people: "Chris Bradford"
  },
  {
    say: "실패를 두려워하는 사람은 자신의 활동을 제한한다.",
    people: "Henry Ford"
  },
  {
    say: "힘이 드는가? 하지만 오늘 걷지 않으면 내일은 뛰어야 한다.",
    people: "Carles Puyol Saforcada"
  },
  {
    say: "나아지려면 실패를 받아들일 수 있어야 한다.",
    people: "LeBron Raymond James Sr."
  },
  {
    say: "실패는 진행중인 성공이다.",
    people: "Albert Einstein"
  },
  {
    say: "실패는 더 현명하게 다시 시작할 수 있는 기회일 뿐이다.",
    people: "Henry Ford"
  },
  {
    say: "자신이 생각하기에 따라 인생은 달라진다.",
    people: "Marcus Aurelius Antoninus"
  },
  {
    say: "승리하면 조금 배울 수 있고, 패배하면 모든 것을 배울 수 있다.",
    people: "Christopher Mathewson"
  },
  {
    say: "들은 것은 잊어버리고, 본 것은 기억하고, 직접 해 본 것은 이해한다.",
    people: "공자"
  }
]

function wiseSayDisplay() {
  const randomIndex = Math.floor(Math.random() * wiseSayArr.length)
  const selectWiseSay = wiseSayArr[randomIndex]
  wiseSaying.innerHTML = `${selectWiseSay.say}`
  wisePeople.innerHTML = `- ${selectWiseSay.people} -`
}

wiseSayDisplay()
setInterval(wiseSayDisplay, 30000)