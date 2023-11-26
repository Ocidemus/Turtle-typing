"use strict";
const notification_tab = document.querySelector(".notification_tab");
const notification_icon = document.querySelector(".menu_notification");
const main = document.querySelector(".main");
const paragraph = document.querySelector(".p");
const reset = document.querySelector(".text-reset i");
const cursor = document.querySelector(".cursor");
const timeVal = document.querySelectorAll('input[name="val"]');
const timeOut = document.querySelector(".timeOut");
const result_tab = document.querySelector(".result_tab");
const typing_area = document.querySelector(".typing_area");
const textArea = document.querySelector(".text_area");
const focusMessage = document.querySelector(".focus");
const custTime = document.querySelector("#custom-time-radio");
const timeSubmit = document.querySelector("#submit");

// function to send data to php file
function sendData(data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/data.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // console.log(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));
}

function getime() {
  return localStorage.getItem("time") || 15;
}
function settime(time) {
  localStorage.setItem("time", time);
}
//flag for notification tab
var n_open = false;
var time = getime();
var maxtime = time;
timeOut.innerText = time;
// export variables for results tab
var cmp = [];
var wpm = [];
var xAxis = [];
var count = 0;

custTime.addEventListener("click", function () {
  const box = document.querySelector(".custom_time");
  box.classList.toggle("hidden");
  document.querySelector(".main_menu").classList.toggle("effect");
});
timeSubmit.addEventListener("click", function () {
  time = document.querySelector("#tvalue").value;
  settime(time);
  maxtime = getime();
  timeOut.innerText = getime();
  const box = document.querySelector(".custom_time");
  box.classList.toggle("hidden");
  document.querySelector(".main_menu").classList.toggle("effect");
});
timeVal.forEach(function (radio) {
  radio.addEventListener("click", function () {
    time = radio.value;
    settime(time);
    maxtime = getime();
    timeOut.innerText = getime();
  });
});

focusMessage.addEventListener("click", function () {
  textArea.focus();
  focusMessage.style.display = "none";
  startTyping();
});

//random number
var number = Math.floor(Math.random() * 10);

// changePara function choose a random string from the object
function changePara(number) {
  return text[number].toLowerCase();
}

//split string into span elements and concat them in html file
function createLetter(str) {
  var string = str.split("");
  var output = "";
  for (var i = 0; i < string.length; i++) {
    output += `<span>${string[i]}</span>`;
  }
  output += `<span> </span>`;
  paragraph.innerHTML = output;
}
createLetter(changePara(number));

// reset button to change paragraph
reset.addEventListener("click", function (event) {
  event.stopPropagation();
  number = Math.floor(Math.random() * 10);
  createLetter(changePara(number));
});
// function to blink cursor
function blickCursor() {
  cursor.classList.toggle("blink");
}
var blink = setInterval(blickCursor, 1000);

// notification tab function
notification_icon.addEventListener("click", function (event) {
  event.stopPropagation();
  notification_tab.classList.toggle("hidden");
  main.classList.toggle("n_hide");
  n_open = true;
});
const check = function (n_open) {
  if (n_open) {
    notification_tab.classList.toggle("hidden");
    main.classList.toggle("n_hide");
    n_open = false;
  }
};
main.addEventListener("click", function () {
  check(n_open);
  n_open = false;
});
main.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    check(n_open);
  }
});

const exit = document.querySelector(".exit i");
exit.addEventListener("click", function () {
  main.classList.toggle("n_hide");
  const leaderScreen = document.querySelector(".leader_board");
  leaderScreen.classList.toggle("hidden");
});
const leader = document.querySelector(".leader");
leader.addEventListener("click", function () {
  main.classList.toggle("n_hide");
  const leaderScreen = document.querySelector(".leader_board");
  leaderScreen.classList.toggle("hidden");
});

function startTyping() {
  // main function for implementing typing structure
  var isTyping = false;
  var correct = 0,
    incorrect = 0;
  var obj = { l: 0, t: 0 };
  const defaultLocation = document
    .querySelector("span")
    .getBoundingClientRect().top; //stores location of first element of string
  var moveLine = defaultLocation;

  // to find postion of element typed
  function position(string, obj) {
    const rect = string.getBoundingClientRect();
    obj.l = rect.left;
    obj.t = rect.top;
  }
  var start = 1;
  // listener function
  xAxis[0] = 0;

  function calculateWPM(correct, time) {
    // Assuming an average word length of 5 characters
    const words = correct / 5; // Calculate the number of words typed
    const minutes = time / 60; // Convert time to minutes
    const wpm = words / minutes; // Calculate WPM

    return Math.round(wpm); // Round off to the nearest integer
  }

  document.addEventListener("keydown", function (event) {
    if (!isTyping) {
      timming();
      isTyping = true;
    }
    const string = document.querySelectorAll("span");
    var left = string[0].getBoundingClientRect().left;
    var top = string[0].getBoundingClientRect().top;
    if (string[count].innerText == event.key) {
      string[count].classList.add("correct");
      position(string[count + 1], obj, cursor);
      cursor.style.left = `${obj.l - left}px`;
      correct++;
      count++;
    } else if (count > 0 && event.key === "Backspace") {
      count--;
      if (string[count].classList.contains("correct")) {
        string[count].classList.remove("correct");
        correct--;
      }
      if (string[count].classList.contains("incorrect")) {
        string[count].classList.remove("incorrect");
        incorrect--;
      } else if (moveLine > obj.t) {
        moveLine = obj.t;
        paragraph.style.transform = `translateY(${-1 * (obj.t - top)}px)`;
      }
      position(string[count], obj, cursor);
      cursor.style.left = `${obj.l - left}px`;
    } else {
      string[count].classList.add("incorrect");
      position(string[count + 1], obj, cursor);
      cursor.style.left = `${obj.l - left}px`;
      count++;
      incorrect++;
    }
    if (obj.t != moveLine) {
      moveLine = obj.t;
      paragraph.style.transform = `translateY(${-1 * (obj.t - top)}px)`;
    }
    cmp[start] = count - incorrect;
    wpm[start] = calculateWPM(count - incorrect, maxtime);
  });

  function pushtime(maxtime) {
    for (var i = 0; i <= maxtime; i++) {
      xAxis.push(i);
    }
  }

  // timeout function
  function timming() {
    var countdownInterval = setInterval(function () {
      time--;

      if (time > 0) {
        timeOut.innerText = time;
        start++;
      }

      if (time == 0) {
        clearInterval(countdownInterval);
        result_tab.classList.remove("hidden");
        typing_area.classList.add("hidden");

        const totalWPM = wpm.reduce((acc, val) => acc + val, 0); // Sum of all WPM values
        const wpmavg = Math.round(totalWPM / wpm.length); // Calculate average WPM
        const rawSpeed = calculateRawSpeed(count, maxtime).toFixed(2);
        const consistency = calculateConsistency(cmp);
        const accuracy = calculateAccuracy(correct, count);

        pushtime(maxtime);
        displayResult(xAxis, cmp, wpm);
        const dataToSend = {
          wpm: wpmavg,
          time: maxtime,
          rawSpeed: rawSpeed,
          consistency: consistency,
          accuracy: accuracy,
        };
        sendData(dataToSend);
      }
    }, 1000);
  }

  // graph code
  var root = document.documentElement;
  var computedStyle = window.getComputedStyle(root);
  var mainColor = computedStyle.getPropertyValue("--main-color");
  var mainColor2 = computedStyle.getPropertyValue("--sub-color");
  const graph = function (xAxis, cmp, wpm) {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      data: {
        datasets: [
          {
            type: "line",
            label: "Count",
            data: cmp,
            backgroundColor: mainColor2,
            borderColor: mainColor2,
            borderWidth: 2,
          },
          {
            type: "line",
            label: "WPM",
            borderColor: mainColor,
            backgroundColor: mainColor,
            data: wpm,
            borderWidth: 2,
          },
        ],
        labels: xAxis,
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  // Function to calculate typing accuracy
  function calculateAccuracy(correct, total) {
    return ((correct / total) * 100).toFixed(1);
  }

  // Function to calculate typing consistency

  function calculateConsistency(cmp) {
    var total = cmp.reduce((acc, val) => acc + val, 0);
    return total > 0 ? ((total / (cmp.length * 5) / 6) * 100).toFixed(1) : 0;
  }

  // Function to calculate raw speed
  function calculateRawSpeed(total, time) {
    return (total / 5 / time) * 60;
  }

  // Display accuracy, consistency, and raw speed
  function displayResult(xAxis, cmp, wpm) {
    graph(xAxis, cmp, wpm);
    const time = document.querySelector("#time");
    const character = document.querySelector("#char");
    const wpmVal = document.querySelector("#wpm");
    const accuracy = document.querySelector("#accuracy");
    const consistency = document.querySelector("#consistency");
    const rawSpeed = document.querySelector("#rawSpeed");

    time.innerText = maxtime;
    character.innerText = `${count}/${correct}/${incorrect}`;
    accuracy.innerText = `${calculateAccuracy(correct, count)}%`;
    consistency.innerText = `${calculateConsistency(cmp)}%`;
    rawSpeed.innerText = calculateRawSpeed(count, maxtime).toFixed(2);

    const totalWPM = wpm.reduce((acc, val) => acc + val, 0); // Sum of all WPM values
    const wpmavg = Math.round(totalWPM / wpm.length); // Calculate average WPM

    wpmVal.innerText = wpmavg;
  }
}
