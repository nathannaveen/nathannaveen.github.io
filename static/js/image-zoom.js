(function () {
  var SELECTOR = "main.post .post-content img, main.post .post-cover img";

  var page = document.querySelector(".container");
  var state = "closed";
  var images = [];
  var index = 0;
  var overlay = null;
  var photo = null;
  var status = null;
  var closeBtn = null;
  var activeTrigger = null;
  var openedFromKeyboard = false;
  var lockedScroll = 0;
  var token = 0;
  var closeTimer = 0;

  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function captionText(img) {
    var figure = img.closest("figure");
    var figcaption = figure && figure.querySelector("figcaption");
    if (figcaption) {
      var fromCaption = figcaption.textContent.replace(/\s+/g, " ").trim();
      if (fromCaption) return fromCaption;
    }
    return (img.getAttribute("alt") || "").replace(/\s+/g, " ").trim();
  }

  function isTiny(img) {
    var rect = img.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    return rect.width < 48 && rect.height < 48;
  }

  function isSelfLink(anchor, img) {
    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) === "#") return false;
    try {
      var target = new URL(href, window.location.href);
      var source = new URL(img.currentSrc || img.getAttribute("src"), window.location.href);
      return target.pathname === source.pathname && target.search === source.search;
    } catch (err) {
      return false;
    }
  }

  function canZoom(img) {
    if (!img.matches(SELECTOR)) return false;
    if (img.getAttribute("data-zoom") === "off") return false;
    if (img.complete && img.naturalWidth === 0 && img.naturalHeight === 0 && isTiny(img)) return false;
    if (isTiny(img)) return false;
    var link = img.closest("a");
    if (link && !isSelfLink(link, img)) return false;
    return true;
  }

  function activate(img) {
    if (!canZoom(img)) {
      deactivate(img);
      return;
    }
    var text = captionText(img);
    img.classList.add("image-zoomable");
    img.setAttribute("role", "button");
    img.tabIndex = 0;
    if (img.getAttribute("aria-expanded") !== "true") img.setAttribute("aria-expanded", "false");
    img.setAttribute("aria-haspopup", "dialog");
    img.setAttribute("aria-label", text ? "Expand image: " + text : "Expand image");
  }

  function deactivate(img) {
    img.classList.remove("image-zoomable");
    img.removeAttribute("role");
    img.removeAttribute("tabindex");
    img.removeAttribute("aria-expanded");
    img.removeAttribute("aria-haspopup");
    img.removeAttribute("aria-label");
  }

  function watch(img) {
    var run = function () {
      activate(img);
    };
    if (img.complete) run();
    else img.addEventListener("load", run, { once: true });
  }

  function pin(el) {
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.right = "0";
    el.style.bottom = "0";
    el.style.left = "0";
    el.style.width = "100vw";
    el.style.height = "100vh";
  }

  function build() {
    overlay = document.createElement("div");
    overlay.className = "image-zoom";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");
    pin(overlay);
    overlay.style.zIndex = "10000";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.boxSizing = "border-box";
    overlay.style.padding = "3.5rem 1.5rem 1.5rem";

    var backdrop = document.createElement("div");
    backdrop.className = "image-zoom__backdrop";
    pin(backdrop);
    backdrop.style.background = "#000000f2";
    backdrop.style.cursor = "pointer";

    var frame = document.createElement("div");
    frame.className = "image-zoom__frame";
    frame.style.position = "relative";
    frame.style.zIndex = "1";
    frame.style.display = "flex";
    frame.style.flexDirection = "column";
    frame.style.alignItems = "center";
    frame.style.maxWidth = "90vw";
    frame.style.maxHeight = "90vh";

    var media = document.createElement("div");
    media.className = "image-zoom__media";
    media.style.position = "relative";
    media.style.maxWidth = "90vw";
    media.style.maxHeight = "90vh";

    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "image-zoom__close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "\u00d7";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "-2.5rem";
    closeBtn.style.right = "0";
    closeBtn.style.margin = "0";
    closeBtn.style.padding = "0.25rem";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "0";
    closeBtn.style.background = "transparent";
    closeBtn.style.color = "#fff";
    closeBtn.style.fontSize = "2rem";
    closeBtn.style.fontWeight = "400";
    closeBtn.style.lineHeight = "1";
    closeBtn.style.cursor = "pointer";

    photo = document.createElement("img");
    photo.className = "image-zoom__photo";
    photo.alt = "";
    photo.draggable = false;
    photo.style.position = "static";
    photo.style.display = "block";
    photo.style.width = "auto";
    photo.style.height = "auto";
    photo.style.maxWidth = "90vw";
    photo.style.maxHeight = "90vh";
    photo.style.margin = "0";
    photo.style.objectFit = "contain";

    status = document.createElement("p");
    status.className = "image-zoom__status";
    status.setAttribute("aria-live", "polite");

    media.appendChild(closeBtn);
    media.appendChild(photo);
    frame.appendChild(media);
    frame.appendChild(status);
    overlay.appendChild(backdrop);
    overlay.appendChild(frame);
    document.documentElement.appendChild(overlay);

    backdrop.addEventListener("click", requestClose);
    closeBtn.addEventListener("click", requestClose);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) requestClose();
    });
  }

  function show(img) {
    photo.src = img.currentSrc || img.src;
    photo.alt = img.getAttribute("alt") || "";
    overlay.setAttribute("aria-label", "Expanded image");
  }

  function focusClose() {
    var options = { preventScroll: true };
    if (!openedFromKeyboard) options.focusVisible = false;
    try {
      closeBtn.focus(options);
    } catch (err) {
      closeBtn.focus();
    }
  }

  function openAt(img, fromKeyboard) {
    if (state !== "closed") return;
    if (!canZoom(img)) return;
    images = Array.prototype.filter.call(document.querySelectorAll("img.image-zoomable"), canZoom);
    index = images.indexOf(img);
    if (index < 0) {
      activate(img);
      images = Array.prototype.filter.call(document.querySelectorAll("img.image-zoomable"), canZoom);
      index = images.indexOf(img);
    }
    if (index < 0) return;

    window.clearTimeout(closeTimer);
    token += 1;
    var myToken = token;
    openedFromKeyboard = fromKeyboard;
    activeTrigger = img;
    if (!overlay) build();
    show(img);
    lockedScroll = window.scrollY;
    document.documentElement.classList.add("image-zoom-open");
    document.body.style.overflow = "hidden";
    if (page) page.inert = true;
    img.setAttribute("aria-expanded", "true");
    window.addEventListener("keydown", onKeyDown);
    state = "open";
    window.requestAnimationFrame(function () {
      if (myToken !== token || state !== "open" || !overlay) return;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      focusClose();
    });
  }

  function step(delta) {
    if (state !== "open") return;
    var next = index + delta;
    if (next < 0 || next >= images.length) return;
    images[index].setAttribute("aria-expanded", "false");
    index = next;
    activeTrigger = images[index];
    activeTrigger.setAttribute("aria-expanded", "true");
    show(activeTrigger);
    status.textContent = "Image " + (index + 1) + " of " + images.length;
  }

  function onKeyDown(event) {
    if (state === "closed") return;
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      closeBtn.focus();
    }
  }

  function requestClose() {
    if (state !== "open") return;
    state = "closing";
    token += 1;
    if (overlay) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    }
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(teardown, reduceMotion() ? 0 : 300);
  }

  function teardown() {
    var trigger = activeTrigger;
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (page) page.inert = false;
    document.documentElement.classList.remove("image-zoom-open");
    document.body.style.overflow = "";
    if (Math.abs(window.scrollY - lockedScroll) > 1) window.scrollTo(0, lockedScroll);
    window.removeEventListener("keydown", onKeyDown);
    if (overlay) overlay.remove();
    overlay = null;
    photo = null;
    status = null;
    closeBtn = null;
    activeTrigger = null;
    state = "closed";
    if (trigger) {
      try {
        trigger.focus({ preventScroll: true });
      } catch (err) {
        trigger.focus();
      }
    }
  }

  function onMainClick(event) {
    var img = event.target.closest && event.target.closest("img");
    if (!img || !canZoom(img)) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openAt(img, false);
  }

  function onMainKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var img = event.target.closest && event.target.closest("img");
    if (!img || !canZoom(img)) return;
    event.preventDefault();
    openAt(img, true);
  }

  var main = document.querySelector("main.post");
  if (!main || !document.querySelector(SELECTOR)) return;

  main.addEventListener("click", onMainClick);
  main.addEventListener("keydown", onMainKeyDown);
  Array.prototype.forEach.call(document.querySelectorAll(SELECTOR), watch);
})();
