function sendData(data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/feedback.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));
}

const rating = document.querySelectorAll("input[type='radio']");
rating.forEach(function (event) {
  event.addEventListener("click", function () {
    value = event.value;
  });
});

const labels = document.querySelectorAll(".star-rating label");
var value = 0;
labels.forEach((label, index) => {
  label.addEventListener("mouseover", function () {
    labels.forEach((innerLabel, innerIndex) => {
      if (innerIndex <= index) {
        innerLabel.querySelector("i").style.color = "#faec1b";
      }
    });
  });
  label.addEventListener("mouseout", function () {
    labels.forEach((innerLabel, innerIndex) => {
      if (innerIndex <= index) {
        innerLabel.querySelector("i").style.color = "#faec1b";
      }
    });
  });
  label.addEventListener("click", function () {
    labels.forEach((innerLabel, innerIndex) => {
      if (innerIndex <= index) {
        innerLabel.querySelector("i").style.color = "#faec1b";
      }
    });
  });
});

document
  .querySelector(".submit-feedback")
  .addEventListener("click", function () {
    const user_id = document.querySelector(".user-id");
    const text = document.querySelector(".feedback-text");
    const message_box = document.querySelector(".feedback_message");
    message_box.innerText = "";
    if (!user_id.value) {
      message_box.innerText = "User Id cannot be empty.";
    }
    if (!text.value) {
      message_box.innerText = "Please entry some feedback.";
    }
    if (value === 0) {
      message_box.innerText = "Rating cannot be empty.";
    } else {
      const dataToSend = {
        user_id: user_id.value,
        advice: text.value,
        rating: value,
      };
      sendData(dataToSend);
      location.reload();
    }
  });

document
  .querySelector(".submit-complain")
  .addEventListener("click", function () {
    const user_id = document.querySelector(".user-id-complain");
    const text = document.querySelector(".complain-text");
    const message_box = document.querySelector(".complaint_message");
    message_box.innerText = "";
    if (!user_id.value) {
      message_box.innerText = "User Id cannot be empty.";
    }
    if (!text.value) {
      message_box.innerText = "Please entry your complain.";
    } else {
      const dataToSend = {
        user_id: user_id.value,
        advice: text.value,
      };
      sendData(dataToSend);
      location.reload();
    }
  });
