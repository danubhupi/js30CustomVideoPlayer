const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = Array.from(player.querySelectorAll("[data-skip]"));
const ranges = player.querySelectorAll(".player__slider");

updateButton = () => {
  if (video.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "| |";
  }
};

togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

skipVid = (event) => {
  if (event.target.id === "skip") {
    video.currentTime = video.currentTime + 25;
  } else {
    if (video.currentTime > 10) {
      video.currentTime = video.currentTime - 10;
    }
  }
};

sliderChange = (event) => {
  if (event.target.name === "volume") {
    video.volume = ranges[0].value;
  } else {
    video.playbackRate = ranges[1].value;
  }
};

handleProgress = () => {
  let percent = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
};

scrubForward = (event) => {
  if (!click) return;
  let percent = (event.offsetX / progress.clientWidth) * 100;
  video.currentTime = (percent * video.duration) / 100;
  progressBar.style.flexBasis = `${percent}%`;
};

let click = false;

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);
document.getElementById("rewind").addEventListener("click", skipVid);
document.getElementById("skip").addEventListener("click", skipVid);
ranges.forEach((slider) => slider.addEventListener("mousemove", sliderChange));
// ranges.forEach(slider=>slider.addEventListener('click',()=>{click=true;
ranges.forEach((slider) => slider.addEventListener("change", sliderChange));
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("mousedown", () => {
  click = true;
});
progress.addEventListener("mouseup", () => {
  click = false;
});
progress.addEventListener("mousemove", scrubForward);
