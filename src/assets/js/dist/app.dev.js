"use strict";

var shrink_btn = document.querySelector(".shrink-btn");
var sidebar_links = document.querySelectorAll(".sidebar-links a");
var active_tab = document.querySelector(".active-tab");
var shortcuts = document.querySelector(".sidebar-links h4");
var tooltip_elements = document.querySelectorAll(".tooltip-element");
var activeIndex; //mostrar e esconder o menu

shrink_btn.addEventListener("click", function () {
  document.body.classList.toggle("shrink");
  setTimeout(moveActiveTab, 700);
});

function moveActiveTab() {
  var topPosition = activeIndex * 58 + 2.5; //Pula a label no meio do menu

  if (activeIndex > 5) {
    topPosition += shortcuts.clientHeight + 30;
  }

  active_tab.style.top = "".concat(topPosition, "px");
}

function changeLink() {
  sidebar_links.forEach(function (sideLink) {
    return sideLink.classList.remove("active");
  });
  this.classList.add("active");
  activeIndex = this.dataset.active;
  moveActiveTab();
}

sidebar_links.forEach(function (link) {
  return link.addEventListener("click", changeLink);
});

function showTooltip() {
  var tooltip = this.parentNode.lastElementChild;
  var spans = tooltip.children;
  var tooltipIndex = this.dataset.tooltip;
  Array.from(spans).forEach(function (sp) {
    return sp.classList.remove("show");
  });
  spans[tooltipIndex].classList.add("show");
  tooltip.style.top = "".concat(100 / (spans.length * 2) * (tooltipIndex * 2 + 1), "%");
}

tooltip_elements.forEach(function (elem) {
  elem.addEventListener("mouseover", showTooltip);
});