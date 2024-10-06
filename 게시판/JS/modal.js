
//* 모달 표시
function modalDisplayOn() {
  if (plusBtn.classList.contains("fa-plus")) {
    modalDisplay.classList.remove("hidden")
  }
}

//* 모달 숨김
function modalDisplayOff() {
  modalDisplay.classList.add("hidden")
  inputTitle.value = "";
  inputContent.value = "";
}

//* 컨텐츠 추가 모달 로직
function modalBtnHandler(e) {
  const newNotifytitle = inputTitle.value.trim();
  const newNotifyContent = inputContent.value.trim();
  
  if (!newNotifytitle && !newNotifyContent) {
    contentAddError.classList.remove('hidden');
    contentAddConfirm.innerHTML = '아무것도 적혀있지 않습니다.'
    return;
  } else if(newNotifytitle && !newNotifyContent) {
    contentAddError.classList.remove('hidden');
    contentAddConfirm.innerHTML = '내용이 적혀있지 않습니다.'
    return;
  } else if(!newNotifytitle && newNotifyContent) {
    contentAddError.classList.remove('hidden');
    contentAddConfirm.innerHTML = '제목이 적혀있지 않습니다.'
    return;
  }


  const notifyObj = {
    title: newNotifytitle,
    content: newNotifyContent,
    id: Date.now(),
  };
  notifys.push(notifyObj);
  modalNotifyAdd(notifyObj);
  modalDisplayOff(e);
  saveNotifys();
  location.reload();
}


function contentAddmodalOkBtn() {
  contentAddError.classList.add("hidden");
}

function contentAddmodalCancelBtn() {
  contentAddError.classList.add("hidden");
}

modalOffAndSubmit.addEventListener("click", modalBtnHandler);
modalOnAdd.addEventListener("click", modalDisplayOn);
modalOffCancel.addEventListener("click", modalDisplayOff);
contentAddErrorOk.addEventListener("click", contentAddmodalOkBtn);
contentAddErrorCancel.addEventListener("click", contentAddmodalCancelBtn)