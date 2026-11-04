(function () {
  "use strict";
  var root = document.documentElement;
  var BP = 900;
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var burger = document.getElementById("hamburger");
  var closeBtn = document.getElementById("drawer-close");

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("open");
    overlay.classList.add("visible");
    drawer.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    root.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open");
    overlay.classList.remove("visible");
    drawer.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    root.style.overflow = "";
  }
  if (burger) burger.addEventListener("click", function () {
    if (drawer.classList.contains("open")) closeDrawer(); else openDrawer();
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { closeDrawer(); if (burger) burger.focus(); });
  if (overlay) overlay.addEventListener("click", closeDrawer);
  if (drawer) drawer.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeDrawer();
  });
  window.addEventListener("resize", function () { if (window.innerWidth > BP) closeDrawer(); });

  var dds = document.querySelectorAll(".has-dropdown");
  function closeDropdowns(except) {
    dds.forEach(function (d) {
      if (d !== except) {
        d.classList.remove("open");
        var b = d.querySelector(".dd-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      }
    });
  }
  dds.forEach(function (d) {
    var b = d.querySelector(".dd-btn");
    if (!b) return;
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = d.classList.toggle("open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
      closeDropdowns(d);
    });
  });
  document.addEventListener("click", function () { closeDropdowns(null); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDropdowns(null); closeDrawer(); }
  });

  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentNode;
      var a = item.querySelector(".faq-a");
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    });
  });
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq-item.open .faq-a").forEach(function (a) { a.style.maxHeight = a.scrollHeight + "px"; });
  });

  var fc = document.getElementById("float-call");
  var foot = document.querySelector(".site-footer");
  if (fc && foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      fc.classList.toggle("hide", en[0].isIntersecting);
    }, { threshold: 0 }).observe(foot);
  }
})();
