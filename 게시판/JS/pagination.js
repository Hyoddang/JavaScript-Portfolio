function pagination() {
  const paginationNum = document.querySelector(".pagination-wrap");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const paginationBtnWrap = document.querySelector(".pagination-num-wrap")
  
  const COUNT_DISPLAY_PAGE = 9; // 한 페이지당 최대 9개의 게시물을 보여줌
  const TOTAL_COUNT = notifys.length; // 게시물 총합
  
  let totalPage = Math.ceil(TOTAL_COUNT / COUNT_DISPLAY_PAGE); // 페이지네이션 길이
  
  
}