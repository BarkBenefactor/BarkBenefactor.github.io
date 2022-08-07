(function() {
  const imageSize = [4000, 2250];
  const breakPoint = 850;



  // Add event listener
  document.addEventListener("mousemove", parallax);
  const elem = document.querySelector("#Parallax");

  // Magic happens here
  function parallax(e) {
      let _w = window.innerWidth/1;
      let _h = window.innerHeight/1
      let _mouseX = e.clientX;
      let _mouseY = e.clientY;
      let _depth1 = `${20 - (_mouseX - _w) * 0.01}% ${20 - (_mouseY - _h) * 0.01}%`;
      let _depth2 = `${20 - (_mouseX - _w) * 0.01}% ${20 - (_mouseY - _h) * 0.01}%`;
      let _depth3 = `${20 - (_mouseX - _w) * 0.02}% ${20 - (_mouseY - _h) * 0.02}%`;
      let x = `${_depth3}, ${_depth2}, ${_depth1}`;
      elem.style.backgroundPosition = x;
  }


  function handleTouch(e) {
      e.preventDefault();
  }
  elem.addEventListener('touchstart', handleTouch, false);

  let lastTouchPosition = undefined;

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);    
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const xLimits = [0, 0];
  const yLimits = [0, 0];

  const bgPosition = [0, 0];

  function handleTouchMove(e) {
      e.preventDefault();

      if (window.matchMedia(`(max-width: ${breakPoint}px)`).matches) {
          const imageWidth = imageSize[0] * vh / imageSize[1];
          xLimits[0] = - (imageWidth - vw) / 2;
          xLimits[1] = + (imageWidth - vw) / 2;
      } else {
          xLimits[0] = -100;
          xLimits[1] = +100;
          yLimits[0] = -100;
          yLimits[1] = +100;
      }

      if (lastTouchPosition !== undefined) {
          const deltaX = lastTouchPosition.clientX - e.touches[0].clientX;
          bgPosition[0] += deltaX;
          bgPosition[0] = Math.max(Math.min(bgPosition[0], xLimits[1]), xLimits[0]);

          const deltaY = lastTouchPosition.clientY - e.touches[0].clientY;
          bgPosition[1] += deltaY;
          bgPosition[1] = Math.max(Math.min(bgPosition[1], yLimits[1]), yLimits[0]);

          const percentage = window.matchMedia(`(max-width: ${breakPoint}px)`).matches ? 50 : 50;
          elem.style.backgroundPosition = `calc(${percentage}% - ${bgPosition[0]}px) calc(${percentage}% - ${bgPosition[1]}px)`;
      }

      lastTouchPosition = e.touches[0];
  }
  elem.addEventListener('touchmove', handleTouchMove, false);

  function handleTouchEnd(e) {
      lastTouchPosition = undefined;
  }
  elem.addEventListener('touchend', handleTouchEnd, false);

  const mute = document.getElementById('mute');
  const music = document.getElementById("musica"); 
  let paused = false;
  mute.addEventListener('click', function(e) {
    e.preventDefault();
    paused = !paused;
    if (paused) {
      music.pause();
      mute.firstChild.src = 'mute.png';
    } else {        
      music.play();
      mute.firstChild.src = 'play.png';
    }
  })

})();
const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
trigger.addEventListener("click", function (event) {
  event.preventDefault();
  const modal = document.getElementById(trigger.dataset.modal);
  modal.classList.add("close");
  const exits = modal.querySelectorAll(".modal-exit");r
  exits.forEach(function (exit) {
    exit.addEventListener("click", function (event) {
      event.preventDefault();
      modal.classList.remove("open");
    });
  });
});
});
