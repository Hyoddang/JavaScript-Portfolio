function pagination() {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const paginationBtnWrap = document.querySelector(".pagination-num-wrap");
  const firstBtn = document.querySelector(".first-btn");
  const lastBtn = document.querySelector(".last-btn");

  const COUNT_DISPLAY_PAGE = 9; // 한 페이지당 최대 9개의 게시물을 보여줌
  const TOTAL_COUNT = notifys.length; // 게시물 총합
  const totalPage = Math.ceil(TOTAL_COUNT / COUNT_DISPLAY_PAGE); // 페이지네이션 길이
  let currentPage = 1;

  // 현재 페이지의 아이템을 렌더링하는 함수
  function renderPage(page) {
    const start = (page - 1) * COUNT_DISPLAY_PAGE;
    const end = start + COUNT_DISPLAY_PAGE;
    const itemsToDisplay = notifys.slice(start, end);

    displayItems(itemsToDisplay);
    updatePaginationButtons();
  }

  // 페이지네이션 버튼을 업데이트하는 함수
  function updatePaginationButtons() {
    // 기존 버튼 초기화
    paginationBtnWrap.innerHTML = "";
  
    for (let i = 1; i <= totalPage; i++) {
      const span = document.createElement("span");
      span.textContent = i;
      span.classList.add("pagination-num");
  
      if (i === currentPage) {
        span.classList.add("active");
      }
  
      // 클릭 이벤트 리스너 추가
      span.addEventListener("click", () => {
        currentPage = i;
  
        // 모든 페이지 번호에서 'active' 클래스 제거
        document.querySelectorAll(".pagination-num").forEach(btn => {
          btn.classList.remove("active");
        });
  
        // 클릭된 페이지 번호에 'active' 클래스 추가
        span.classList.add("active");
  
        renderPage(currentPage); // 선택한 페이지 렌더링
      });
  
      paginationBtnWrap.appendChild(span);
    }
  
    // 이전/다음 버튼 활성화 또는 비활성화
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPage;
  }

  // 처음으로 가는 버튼 이벤트 리스너
  firstBtn.addEventListener("click", () => {
    currentPage = 1;
    renderPage(currentPage);
  });

  // 마지막으로 가는 버튼 이벤트 리스너
  lastBtn.addEventListener("click", () => {
    currentPage = totalPage;
    renderPage(currentPage);
  });

  // 이전 버튼 이벤트 리스너
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  // 다음 버튼 이벤트 리스너
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPage) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  // 초기 렌더링
  renderPage(currentPage);
}

// 아이템을 렌더링하는 함수
function displayItems(notifys) {
  const container = document.querySelector(".notify-wrap");

  container.innerHTML = "";
  notifys.forEach(notify => {
    container.innerHTML += `<div href="" class="notify-list-link" id="${notify.id}">
      <li class="notify-list">
        <input type="checkbox" class="remove-checkbox hidden-check">
        <p class="display-title">${notify.title}</p>
        <p class="display-content">${notify.content}</p>
      </li>
    </div>`;
  });
  addCheckboxEventListeners();
  notifyReomveBtnChange();
}

// 페이지네이션 초기화
pagination();