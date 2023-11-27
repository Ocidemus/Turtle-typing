function fetchDataFromPHP() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        const leader_15 = document.querySelector(".board_15");
        const leader_60 = document.querySelector(".board_60");
        var c_15 = 0,
          c_60 = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i]["time"] === "15") {
            const className = c_15 % 2 === 0 ? "even_row" : "odd_row";
            const num =
              c_15 === 0 ? '<i class="fa-solid fa-crown"></i>' : c_15 + 1;
            c_15++;
            leader_15.innerHTML += `<div class="leader_data ${className}">
              <ul>
                <li>${num}</li>
                <li><i class="fa-solid fa-user"></i>  ${data[i]["username"]}</li>
                <li>${data[i]["wpm"]}<br><span class="weight">${data[i]["accuracy"]}%</span></li>
                <li>${data[i]["rawspeed"]}<br><span class="weight">${data[i]["consistency"]}%</span></li>
                <li>${data[i]["time"]}</li>
              </ul>
            </div>`;
          } else {
            const className = c_60 % 2 === 0 ? "even_row" : "odd_row";
            const num1 =
              c_60 === 0 ? '<i class="fa-solid fa-crown"></i>' : c_60 + 1;
            c_60++;
            leader_60.innerHTML += `<div class="leader_data ${className}">
              <ul>
                <li>${num1}</li>
                <li><i class="fa-solid fa-user"></i>  ${data[i]["username"]}</li>
                <li>${data[i]["wpm"]}<br><span class="weight">${data[i]["accuracy"]}%</span></li>
                <li>${data[i]["rawspeed"]}<br><span class="weight">${data[i]["consistency"]}%</span></li>
                <li>${data[i]["time"]}</li>
              </ul>
            </div>`;
          }
        }
      } else {
        console.error("Request error:", xhr.status);
      }
    }
  };

  xhr.open("GET", "../php/leader.php", true);
  xhr.send();
}
fetchDataFromPHP();
