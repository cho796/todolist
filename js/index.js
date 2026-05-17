//タブ
$(function () {
  $('.sec1 div').click(function () {
    var num = $('.sec1 div').index(this);
    $('.sec1 div').removeClass('active');
    $(this).addClass('active');
    $('.sec2').removeClass('active').eq(num).addClass('active');
  });
});



//タスク

const toDoList = document.getElementById('form');
const typing = document.getElementById('typing');
const submitTask = document.getElementById('submitList');

const completeTask = document.getElementById('complete');

// const myTodos = JSON.parse(localStorage.getItem("myTodos"));

// if (myTodos){
//   myTodos.forEach(todo => {
//     add(todo);
//   });
// }
const myTodos = JSON.parse(localStorage.getItem("myTodos"));

if (myTodos) {
  if (Array.isArray(myTodos.todos)) {
    myTodos.todos.forEach(todo => {
      add(todo, false); // 未完成タスク
    });
  }

  if (Array.isArray(myTodos.completed)) {
    myTodos.completed.forEach(todo => {
      add(todo, true); // 完成済みタスク
    });
  }
}

toDoList.addEventListener('submit', function(event){
  console.log(typing.value);
  event.preventDefault();
  add();
});

function add(taskText, isComplete = false){
  const text = taskText || typing.value;
  if (text.length > 0) {
    const li = document.createElement('li');
    li.innerText = text;
    li.style.width = "calc(770px - 40px)";
    li.style.borderRadius = "14px";
    li.style.border = "none";
    li.style.padding = "13px 40px";
    li.style.fontSize = "22px";
    li.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    li.style.marginBottom = "30px";
    li.style.whiteSpace = "normal";
    li.style.overflow = "visible";
    li.style.textOverflow = "unset";
    li.style.height = "auto";
    li.style.wordBreak = "break-word";
    li.style.backgroundColor = "white";
    li.style.listStyle = "none";

    if (isComplete) {
      completeTask.appendChild(li);
    } else {
      submitTask.appendChild(li);
    }

    clearBtn.addEventListener('click', function(event){
      event.preventDefault();
      completeTask.remove();
      saveData();
    });

    li.addEventListener("click", () => {
      completeTask.appendChild(li);
      saveData();
    });

    if (!taskText) {
      typing.value = '';
    }

    saveData();
  }
}

// function saveData(){
//   const lists = document.querySelectorAll("li");
//   const myTodos = [];
//   lists.forEach(list => {
//     myTodos.push(list.innerText);
//   });
//   localStorage.setItem("myTodos", JSON.stringify(myTodos));
// }
function saveData(){
  const todoItems = [];
  const completeItems = [];

  document.querySelectorAll('#submitList li').forEach(li => {
    todoItems.push(li.innerText);
  });

  document.querySelectorAll('#complete li').forEach(li => {
    completeItems.push(li.innerText);
  });

  const myTodos = {
    todos: todoItems,
    completed: completeItems
  };

  localStorage.setItem("myTodos", JSON.stringify(myTodos));
}



//ダークモード

const toggleBtn = document.getElementById("toggle-mode");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

const switchOuter = document.querySelector("#toggle-mode");
const toggleSwitch = document.querySelector("#toggle-switch");

switchOuter.addEventListener("click", () => {
    switchOuter.classList.toggle("active");
    toggleSwitch.classList.toggle("active");
});



//天気

const API_KEY = "";

  navigator.geolocation.getCurrentPosition(
    function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // OpenWeatherMap API にリクエスト
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`)
      .then(response => response.json())
      .then(data => {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        document.getElementById('weather').innerHTML = `天気： ${weather}<br>気温： ${Math.round(temp)}°C`;
      })
      .catch(error => {
        document.getElementById('weather').innerHTML = '天気情報の取得が<br>　失敗しました';
        console.error(error);
      });
    },
    function(error) {
      document.getElementById('weather').innerHTML = '天気情報の取得が<br>　失敗しました';
      console.error(error);
    }
  );