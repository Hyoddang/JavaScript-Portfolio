/*
Todo
1. 페이지네이션 기능 추가
2. 컨텐츠 클릭 시 모달창 띄우며 내용 보여주기

*/
//? 모달 관련 요소
const modalDisplay = document.querySelector(".modal-wrap");
const modalOffAndSubmit = document.querySelector(".submit-btn");
const modalOffCancel = document.querySelector(".cancel-btn");
const modalOnAdd = document.querySelector(".add-btn");
const removeModalDisplay = document.querySelector(".modal-alert-display");
const windowWrap = document.querySelector(".wrap");
const contentAddError = document.querySelector(".content-add-error")
const contentAddConfirm = document.querySelector(".content-add-confirm");
const contentClick = document.querySelector(".notify-list-link");
const contentShowModal = document.querySelector(".content-modal-background");

//? 입력 관련 요소
const inputTitle = document.querySelector(".title");
const inputContent = document.querySelector(".content");
const title = document.querySelector(".content-title")
const contents = document.querySelector(".content-contents")

//? 알림 목록 및 버튼
const modalRemoveBtn = document.querySelector(".fa-trash-can");
const modalRemoveBtnOK = document.querySelector(".fa-check");
const notifyWrap = document.querySelector(".notify-wrap");
const plusBtn = document.querySelector(".fa-plus");
const checkBtn = document.querySelector(".fa-check");
const removeOk = document.querySelector(".remove-agree");
const removeCancel = document.querySelector(".remove-cancel");
const modalCancel = document.querySelector(".modal-cancel");
const contentAddErrorOk = document.querySelector(".content-add-error-ok");
const contentAddErrorCancel = document.querySelector(".modal-cancel");
const contentModalOkayBtn = document.querySelector(".content-modal-ok-btn");


let notifys = [];

//* 로컬스토리지 생성
function saveNotifys() {
  localStorage.setItem("notifys", JSON.stringify(notifys));
}

// HTML 추가
function modalNotifyAdd(newNotify) {
  notifyWrap.innerHTML += `<div href="" class="notify-list-link" id="${newNotify.id}"><li class="notify-list">
  <input type="checkbox" class="remove-checkbox hidden-check">
  <p class="display-title">${newNotify.title}</p>
  <p class="display-content">${newNotify.content}</p>
  </li></div>`

  addCheckboxEventListeners()
}

//! 수정 필요
function contentClickEvent(notifyContent) {
  contentShowModal.classList.remove("hidden");
}

function contentModalHiddenEvent() {
  contentShowModal.classList.add("hidden");
}

//* 체크박스 숨김/표시 및 아이콘 변경 로직
function toggleCheckBoxes() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  let isChecked = false;

  removeCheckBoxes.forEach((checkbox) => {
    // 쓰레기통 버튼 클릭 시 hidden-check 클래스 삭제
    checkbox.classList.toggle("hidden-check");

    // 체크된 체크박스가 있는지 확인
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  // 체크박스가 체크된 경우 아이콘 변경
  if (isChecked) {
    plusBtn.classList.remove("fa-plus")
    plusBtn.classList.add("remove-no");
    modalRemoveBtn.classList.remove("fa-trash-can");
    modalRemoveBtn.classList.add("fa-check");
  } else {
    plusBtn.classList.add("fa-plus")
    plusBtn.classList.remove("remove-no");
    modalRemoveBtn.classList.add("fa-trash-can");
    modalRemoveBtn.classList.remove("fa-check");
  }
  addCheckboxEventListeners();
}

//* 게시물 삭제 함수
function notifyRemove() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  removeCheckBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const notifyItem = checkbox.closest(".notify-list-link");
      notifys = notifys.filter((notify) => notify.id !== parseInt(notifyItem.id));
      notifyItem.remove();
      checkbox.classList.add("hidden-check");
    }
  });
  location.reload();
  removeModalDisplay.classList.add("hidden");
  addCheckboxEventListeners();
  toggleCheckBoxes();
  saveNotifys();
}

//* 체크아이콘 클릭 시 삭제모달 활성화
function notifyRemoveModalDisplay() {
  // hidden 클래스가 있을 경우에만 제거
  if (removeModalDisplay && removeModalDisplay.classList.contains("hidden")) {
    removeModalDisplay.classList.remove("hidden");
  }
}

//* 체크박스에 하나라도 입력될 시 체크아이콘, X아이콘 활성화
function notifyReomveBtnChange() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");
  let isChecked = false;
  
  removeCheckBoxes.forEach(checkbox => {
    if(checkbox.checked) {
      isChecked = true;
    }
  })
  
  if(isChecked) {
    plusBtn.classList.add("fa-xmark");
    plusBtn.classList.remove("fa-plus")
    modalRemoveBtn.classList.remove("fa-trash-can")
    modalRemoveBtn.classList.add("fa-check")
  } else {
    plusBtn.classList.remove("fa-xmark");
    plusBtn.classList.add("fa-plus")
    modalRemoveBtn.classList.add("fa-trash-can")
    modalRemoveBtn.classList.remove("fa-check");
  }
}

function removeCancelBtn() {
  removeModalDisplay.classList.add("hidden");
}

function modalCancelBtn() {
  removeModalDisplay.classList.add("hidden");
}

//* 체크박스를 취소하는 버튼 핸들러
function xBtnClickHandler() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  if(plusBtn.classList.contains("fa-xmark")) {
    removeCheckBoxes.forEach(checkBox => {
      checkBox.checked = false
      checkBox.classList.add("hidden-check")
      modalRemoveBtn.classList.add("fa-trash-can")
      modalRemoveBtn.classList.remove("fa-check");
    })
    setTimeout(() => {
      plusBtn.classList.add("fa-plus");
      plusBtn.classList.remove("fa-xmark");
    }, 0);
  }
}

//! 버튼 함수 구간
//* 체크박스에 이벤트 리스너 추가
function addCheckboxEventListeners() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");
  removeCheckBoxes.forEach((checkbox) => {
    checkbox.removeEventListener("change", notifyReomveBtnChange);
    checkbox.addEventListener("change", notifyReomveBtnChange);
  });
}

plusBtn.addEventListener("click", xBtnClickHandler);
modalRemoveBtn.addEventListener("click", toggleCheckBoxes);
removeOk.addEventListener("click", notifyRemove);
removeCancel.addEventListener("click", removeCancelBtn);
modalCancel.addEventListener("click", modalCancelBtn);
contentModalOkayBtn.addEventListener("click", contentModalHiddenEvent)
//! 모달 버튼에 오류가 생김 수정필요
document.addEventListener("DOMContentLoaded", () => {
  contentClick.addEventListener("click", contentClickEvent)
})

//* 이벤트 위임 방식으로 이벤트 리스너 설정
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-check")) {
    // 체크 아이콘 클릭 시 삭제 모달 활성화
    notifyRemoveModalDisplay();
    toggleCheckBoxes();
  }
});

/* <------------------------------------------------------------------> */

//* localStorage에 저장된 배열을 화면에 렌더링
const savedNotifys = localStorage.getItem("notifys");

if (savedNotifys !== null) {
  const parsedNotifys = JSON.parse(savedNotifys);
  notifys = parsedNotifys;
  parsedNotifys.forEach(modalNotifyAdd);
  notifyReomveBtnChange()
  saveNotifys()
}