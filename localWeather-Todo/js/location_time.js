const selectFirstLocate = document.querySelector(".select-first-locate");
const selectSecondLocate = document.querySelector(".select-second-locate");
const selectThirdLocate = document.querySelector(".select-third-locate");

const firstLocalTime = document.querySelector(".local-time");
const secondLocalTime = document.querySelector(".second-locate1");
const thirdLocalTime = document.querySelector(".third-locate2");

const monthDayFirst = document.querySelector("#first-locate");
const monthDaySecond = document.querySelector("#second-locate");
const monthDayThird = document.querySelector("#third-locate");

const firstLocalName = document.querySelector("#first-local");
const secondLocalName = document.querySelector("#second-local");
const thirdLocalName = document.querySelector("#third-local");

//! value에 의한 시간계산을 하기에는 너무 하드코딩
// function updateFirstLocateTime() {
//   const timeSet = new Date();

//   const offset = 9 * 60;

//   const utc = timeSet.getTime() + (timeSet.getTimezoneOffset() * 60000)

//   const koreaTime = new Date(utc + (offset * 60000));

//   const hour = koreaTime.getHours().toString().padStart(2, "0");
//   const minutes = koreaTime.getMinutes().toString().padStart(2, "0");
//   const seconds = koreaTime.getSeconds().toString().padStart(2, "0");

//   firstlocalTime.innerHTML = `${hour}:${minutes}:${seconds}`
// }

// function updateSecondLocateTime() {
//   const timeSet = new Date();

//   const offset = -4 * 60;

//   const utc = timeSet.getTime() + (timeSet.getTimezoneOffset() * 60000)

//   const NYTime = new Date(utc + (offset * 60000));

//   const hour = NYTime.getHours().toString().padStart(2, "0");
//   const minutes = NYTime.getMinutes().toString().padStart(2, "0");
//   const seconds = NYTime.getSeconds().toString().padStart(2, "0");

//   secondLocalTime.innerHTML = `${hour}:${minutes}:${seconds}`
// }

// function updateThirdLocateTime() {
//   const timeSet = new Date();

//   const offset = 2 * 60;

//   const utc = timeSet.getTime() + (timeSet.getTimezoneOffset() * 60000)

//   const paristime = new Date(utc + (offset * 60000));

//   const hour = paristime.getHours().toString().padStart(2, "0");
//   const minutes = paristime.getMinutes().toString().padStart(2, "0");
//   const seconds = paristime.getSeconds().toString().padStart(2, "0");

//   thirdLocalTime.innerHTML = `${hour}:${minutes}:${seconds}`
// }

// updateFirstLocateTime();
// setInterval(updateFirstLocateTime, 1000);

// updateSecondLocateTime()
// setInterval(updateSecondLocateTime, 1000);

// updateThirdLocateTime()
// setInterval(updateThirdLocateTime, 1000);

const cities = {
  seoul: { offset: 9 * 60, name: "서울" },
  NY: { offset: -4 * 60, name: "뉴욕" },
  tokyo: { offset: 9 * 60, name: "도쿄" },
  london: { offset: 1 * 60, name: "런던" },
  moskva: { offset: 3 * 60, name: "모스크바" },
  beijing: { offset: 8 * 60, name: "베이징" },
  berlin: { offset: 2 * 60, name: "베를린" },
  sydney: { offset: 10 * 60, name: "시드니" },
  taipei: { offset: 8 * 60, name: "타이베이" },
  paris: { offset: 2 * 60, name: "파리" },
};

function dayCalculator(dayNum) {
  let day = "";
  switch (dayNum) {
    case 0:
      day = "일";
      break;
    case 1:
      day = "월";
      break;
    case 2:
      day = "화";
      break;
    case 3:
      day = "수";
      break;
    case 4:
      day = "목";
      break;
    case 5:
      day = "금";
      break;
    case 6:
      day = "토";
      break;
  }
  return day;
}

function worldTime(city, localTimeElement, monthDayElement, localNameElement) {
  const { offset, name } = cities[city];

  const timeSet = new Date();
  const utc = timeSet.getTime() + timeSet.getTimezoneOffset() * 60000;
  const cityTime = new Date(utc + offset * 60000);

  const month = cityTime.getMonth() + 1; // month는 0부터 시작
  const date = cityTime.getDate();
  //! 여기서 오류 발생(cityTime.dayCalculator == X)
  // const day = cityTime.dayCalculator(cityTime.getDay());
  const day = dayCalculator(cityTime.getDay());

  const hour = cityTime.getHours().toString().padStart(2, "0");
  const minutes = cityTime.getMinutes().toString().padStart(2, "0");
  const seconds = cityTime.getSeconds().toString().padStart(2, "0");

  localNameElement.innerHTML = name;
  monthDayElement.innerHTML = `${month}월 ${date}일 ${day}요일`;
  localTimeElement.innerHTML = `${hour}:${minutes}:${seconds}`;
}

function updateWorldTime() {
  worldTime(
    selectFirstLocate.value,
    firstLocalTime,
    monthDayFirst,
    firstLocalName
  );
  worldTime(
    selectSecondLocate.value,
    secondLocalTime,
    monthDaySecond,
    secondLocalName
  );
  worldTime(
    selectThirdLocate.value,
    thirdLocalTime,
    monthDayThird,
    thirdLocalName
  );
}

updateWorldTime();
setInterval(updateWorldTime, 1000);

// select 태그에 change 이벤트 리스너 추가
selectFirstLocate.addEventListener("change", function () {
  updateWorldTime();
});
selectSecondLocate.addEventListener("change", function () {
  updateWorldTime();
});
selectThirdLocate.addEventListener("change", function () {
  updateWorldTime();
});
