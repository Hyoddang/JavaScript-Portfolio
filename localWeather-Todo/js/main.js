document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector(".todo-input-form");
  const todoValue = document.querySelector(".todo-value");
  const todoWrap = document.querySelector(".todoList-wrap");

  let todos = [];

  //! Todo를 localStorage에 저장
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //! Todo 추가 함수
  function addTodo(newTodo) {
    // const todoWrap = document.querySelector(".todoList-wrap") 함수 내부에서만 사용 가능 했음
    todoWrap.innerHTML += `<li class="todo" id="${newTodo.id}">
      <input type="checkbox" class="todo-check" ${newTodo.checked ? "checked" : ""}>
      <span class="todo-content ${newTodo.checked ? "todo-hidden" : ""}">${newTodo.text}</span>
      <button class="todo-modify"><i class="fa-solid fa-pen"></i></button>
      <button class="todo-remove"><i class="fa-regular fa-circle-xmark"></i></button>
    </li>`;
  }

  // Check시 텍스트에 이벤트 추가
  function todoCheckEffect(e) {
    if (e.target.classList.contains("todo-check")) {
      const todoItem = e.target.closest("li");
      if (todoItem) {
        const todoContent = todoItem.querySelector(".todo-content");
        const todoId = parseInt(todoItem.id);
        // 클릭된 체크박스와 관련된 Todo 객체 찾기
        const todo = todos.find(todo => todo.id === todoId);

        if (todo) {
          //? Todo객체의 체크 상태를 업데이트하고, 텍스트의 클래스 토글
          todo.checked = e.target.checked;
          todoContent.classList.toggle("todo-hidden", todo.checked);
          saveTodos();
        }
      }
    }
  }

  //! 동적으로 생성된 요소에 직접 이벤트 리스너를 추가하려 했기 때문에 오류가 발생
  //   deleteTodo.addEventListener("click", function removeTodoBtnHandler(e) {
  //   const removeTodo = e.target.parentElement;
  //   removeTodo.remove()
  // })

  //! Todo 삭제 버튼 함수
  function removeTodoBtnHandler(e) {
    //? 이벤트 위임을 사용하여 동적으로 생성된 삭제 버튼에 클릭 이벤트를 처리
    if (e.target.classList.contains("fa-circle-xmark")) {
      //? 클릭된 요소가 삭제 버튼인지 확인
      const removeTodo = e.target.closest("li"); // 가장 가까운 li 요소를 찾음
      if (removeTodo) {
        todos = todos.filter(todo => todo.id !== parseInt(removeTodo.id))
        // console.log(todos[removeTodo])
        removeTodo.remove();
      }
      saveTodos()
    }
  }

  //! Todo 수정 버튼 함수
  function modifyTodoBtnHandler(e) {
    // 수정 버튼이 클릭되었는지 확인
    if (e.target.classList.contains("fa-pen")) {
      // 클릭된 버튼의 가장 가까운 li 요소를 찾음
      const modifyTodo = e.target.closest("li");
      const todoId = parseInt(modifyTodo.id); // li 요소의 id를 정수로 변환
      const todo = todos.find(todo => todo.id === todoId); // 해당 id를 가진 할 일 객체를 찾음
      const todoCheck = document.querySelector(".todo-check");
  
      if (todo) {
        const todoContent = modifyTodo.querySelector(".todo-content"); // li 요소 내의 span 요소를 찾음
        const input = document.createElement("input"); // 새로운 input 요소를 생성
        input.type = "text"; // input 타입을 텍스트로 설정
        input.value = todo.text; // input 요소의 값을 현재 할 일 텍스트로 설정
        input.classList.add("modify-input"); // input 요소에 클래스 추가
  
        // span 요소를 input 요소로 교체
        todoContent.replaceWith(input);
        todoCheck.classList.add("display-none");
  
        // input 요소에서 포커스를 잃었을 때 이벤트 처리
        input.addEventListener("blur", function () {
          const newText = input.value.trim(); // input 요소의 값을 가져와서 공백 제거
          if (newText !== "") { // 새로운 텍스트가 비어 있지 않으면
            todo.text = newText; // 할 일 객체의 텍스트를 새로운 텍스트로 변경
            todoContent.textContent = newText; // span 요소의 텍스트를 새로운 텍스트로 변경
            saveTodos(); // 변경된 할 일 목록을 저장
          }
          input.replaceWith(todoContent); // input 요소를 다시 span 요소로 교체
          todoCheck.classList.remove("display-none");
        });
  
        // input 요소에서 키다운 이벤트 처리
        input.addEventListener("keydown", function (event) {
          if (event.key === "Enter") { // Enter 키를 누르면
            input.blur(); // input 요소에서 포커스를 제거
          }
        });
  
        input.focus(); // input 요소에 포커스를 설정하여 즉시 편집할 수 있게 함
      }
    }
  }

  function todoBtnHandler(e) {
    e.preventDefault();
    const newTodo = todoValue.value;
    todoValue.value = "";
    const newTodosObj = {
      text: newTodo,
      id: Date.now(),
      checked: false,
    };
    todos.push(newTodosObj); // 배열에 새로운 Todo 추가
    addTodo(newTodosObj); // 화면에 표시
    saveTodos();
  }

  todoForm.addEventListener("submit", todoBtnHandler);
  todoWrap.addEventListener("click", removeTodoBtnHandler);
  todoWrap.addEventListener("click", todoCheckEffect);
  todoWrap.addEventListener("click", modifyTodoBtnHandler);


  //! localStorage에 저장된 Todo를 불러오는 코드
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos)
    todos = parsedTodos;
    parsedTodos.forEach(addTodo)
  }
});
