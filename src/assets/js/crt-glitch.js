function second_passed() {
  document.querySelectorAll(".clock").forEach(function (el) {
    el.classList.remove("is-off");
  });
}
setTimeout(second_passed, 2000);

// Switcher click event
var switchers = document.querySelectorAll(".switcher");
switchers.forEach(function (switcher) {
  switcher.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".screen").forEach(function (screen) {
      screen.classList.toggle("glitch");
    });
  });
});

var newDate = new Date();
newDate.setDate(newDate.getDate());

setInterval(function () {
  var hours = new Date().getHours();
  var seconds = new Date().getSeconds();
  var minutes = new Date().getMinutes();

  var realTime =
    (hours < 10 ? "0" : "") +
    hours +
    " : " +
    (minutes < 10 ? "0" : "") +
    minutes +
    " : " +
    (seconds < 10 ? "0" : "") +
    seconds;

  document.querySelectorAll(".time").forEach(function (el) {
    el.innerHTML = realTime;
    el.setAttribute("data-time", realTime);
  });
}, 1000);
