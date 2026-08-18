(function () {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const img = new Image();
  const computed = getComputedStyle(hero).backgroundImage;
  const match = computed.match(/url\(["']?(.+?)["']?\)/);
  if (match) img.src = match[1];

  function coverMetrics(box, imgW, imgH) {
    const scale = Math.max(box.width / imgW, box.height / imgH);
    const width = imgW * scale;
    const height = imgH * scale;
    return {
      width,
      height,
      x: (box.width - width) / 2,
      y: (box.height - height) / 2,
    };
  }

  function sync() {
    const imgW = img.naturalWidth || 2400;
    const imgH = img.naturalHeight || 1605;
    const heroBox = hero.getBoundingClientRect();
    const cover = coverMetrics(heroBox, imgW, imgH);
    const targets = hero.querySelectorAll(".contrast-fill, .content a");

    targets.forEach((el) => {
      const box = el.getBoundingClientRect();
      el.style.backgroundSize = cover.width + "px " + cover.height + "px";
      el.style.backgroundPosition =
        heroBox.left + cover.x - box.left + "px " +
        (heroBox.top + cover.y - box.top) + "px";
    });
  }

  img.addEventListener("load", sync);
  window.addEventListener("resize", sync);
  window.addEventListener("scroll", sync, { passive: true });
  sync();
})();
