const notification_tab = document.querySelector(".notification_tab");
const notification_icon = document.querySelector(".menu_notification");
const main = document.querySelector(".main");
var n_open = false;

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


const exit=document.querySelector(".exit i");
exit.addEventListener("click",function(){
  main.classList.toggle("n_hide");
  const leaderScreen=document.querySelector(".leader_board");
  leaderScreen.classList.toggle("hidden");
})
const leader=document.querySelector(".leader");
leader.addEventListener("click",function()
{
  main.classList.toggle("n_hide");
  const leaderScreen=document.querySelector(".leader_board");
  leaderScreen.classList.toggle("hidden");
});