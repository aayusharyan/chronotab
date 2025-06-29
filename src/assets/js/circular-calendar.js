/*
 * Cirulcar Calendar Display.js
 * Matthew Juggins
 * Change log:
 * 		25/09/16 - Quick fix to day of the week
 */

// Helper: Add lettering effect (wrap each character in a span with class charN)
function lettering(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    const text = el.textContent;
    el.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.className = `char${i + 1}`;
      span.textContent = text[i];
      el.appendChild(span);
    }
  });
}

function setCss(el, styles) {
  for (const prop in styles) {
    el.style[prop] = styles[prop];
  }
}

function fadeTo(selector, duration, opacity, cb) {
  document.querySelectorAll(selector).forEach((el) => {
    el.style.transition = `opacity ${duration}ms`;
    el.style.opacity = opacity;
    if (cb) {
      setTimeout(cb, duration);
    }
  });
}

var date, dayName, day, month, year;
var range = 270,
  sectionsDayName = 7,
  sectionsDay = 31,
  sectionsMonth = 12,
  charactersDayName = 3,
  charactersDay = 2,
  charactersMonth = 3,
  dayColor = "#FF2D55",
  monthColor = "#007AFF",
  dayNameColor = "#4CD964";

function rotateRing(input, sections, characters, ring, text, color) {
  var sectionWidth = range / sections;
  var initialRotation = 135 - sectionWidth / 2;
  var rotateAmount = initialRotation - sectionWidth * (input - 1);
  var start = characters * (input - 1) + (input - 1) + 1;

  document.querySelectorAll(ring).forEach((el) => {
    setCss(el, {
      WebkitTransform: `rotate(${rotateAmount}deg)`,
      MozTransform: `rotate(${rotateAmount}deg)`,
      msTransform: `rotate(${rotateAmount}deg)`,
      transform: `rotate(${rotateAmount}deg)`,
    });
  });

  document.querySelectorAll(text).forEach((parent) => {
    for (var i = start; i < start + characters; i++) {
      var charEl = parent.querySelector(".char" + i);
      if (charEl) charEl.style.color = color;
    }
  });
}

function clockRotation() {
  setInterval(function () {
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var secondsRotation = seconds * 6;
    var minutesRotation = minutes * 6;
    var hoursRotation = hours * 30 + minutes / 2;
    var s = document.getElementById("seconds");
    var m = document.getElementById("minutes");
    var h = document.getElementById("hours");
    if (s)
      setCss(s, {
        WebkitTransform: `rotate(${secondsRotation}deg)`,
        MozTransform: `rotate(${secondsRotation}deg)`,
        msTransform: `rotate(${secondsRotation}deg)`,
        transform: `rotate(${secondsRotation}deg)`,
      });
    if (m)
      setCss(m, {
        WebkitTransform: `rotate(${minutesRotation}deg)`,
        MozTransform: `rotate(${minutesRotation}deg)`,
        msTransform: `rotate(${minutesRotation}deg)`,
        transform: `rotate(${minutesRotation}deg)`,
      });
    if (h)
      setCss(h, {
        WebkitTransform: `rotate(${hoursRotation}deg)`,
        MozTransform: `rotate(${hoursRotation}deg)`,
        msTransform: `rotate(${hoursRotation}deg)`,
        transform: `rotate(${hoursRotation}deg)`,
      });
  }, 1000);
}

function loadBars() {
  for (var i = 1; i <= dayName; i++) {
    var newHeight = Math.floor(Math.random() * 85) + 5;
    var el = document.getElementById("x" + i);
    if (el) el.style.height = newHeight + "px";
  }
}

function init() {
  lettering(".center-preview");
  lettering(".day-name-preview");
  lettering(".day-name-text");
  lettering(".day-preview");
  lettering(".day-text");
  lettering(".month-preview");
  lettering(".month-text");
  fadeTo(".day-preview", 10, 1);
  fadeTo(".month-preview", 10, 1);
  fadeTo(".day-name-preview", 10, 1);
  fadeTo(".center-preview", 10, 1);

  date = new Date();
  dayName = date.getDay();
  day = date.getDate();
  month = date.getMonth() + 1;
  if (dayName == 0) {
    dayName = 7;
  }
  setTimeout(function () {
    fadeTo(".day-preview", 500, 0);
    fadeTo(".day-text", 500, 1, function () {
      rotateRing(day, sectionsDay, charactersDay, "#r3", ".day-text", dayColor);
    });
  }, 500);

  setTimeout(function () {
    fadeTo(".month-preview", 500, 0);
    fadeTo(".fa-cloud", 500, 1);
    fadeTo(".temperature", 500, 1);
    fadeTo(".bars", 500, 1);
    fadeTo(".month-text", 500, 1, function () {
      rotateRing(
        month,
        sectionsMonth,
        charactersMonth,
        "#r2",
        ".month-text",
        monthColor
      );
      loadBars();
    });
  }, 1000);

  setTimeout(function () {
    fadeTo(".day-name-preview", 500, 0);
    fadeTo(".day-name-text", 500, 1, function () {
      rotateRing(
        dayName,
        sectionsDayName,
        charactersDayName,
        "#r1",
        ".day-name-text",
        dayNameColor
      );
    });
  }, 1500);

  setTimeout(function () {
    fadeTo(".center-preview", 500, 0);
    fadeTo(".head", 500, 0);
    fadeTo(".torso", 500, 0);
    fadeTo(".hand-container", 500, 1, function () {
      //console.log("Clock faded in");
    });
  }, 2000);

  clockRotation();
}

init();
