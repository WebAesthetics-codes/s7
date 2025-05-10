const fetchVideo = async () => {
  try {
    const res = await fetch("./assets/video/s7_video.mp4");
    const blobData = await res.blob();
    const videoUrl = URL.createObjectURL(blobData);
    const videoEl = document.getElementById("mainVideo");
    videoEl.src = videoUrl;
    videoEl.load();
  } catch (err) {
    console.error(err);
  }
};
fetchVideo();

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".screen",
    start: "top top",
    pin: true,
    markers: true,
    scrup: true,
  },
});
