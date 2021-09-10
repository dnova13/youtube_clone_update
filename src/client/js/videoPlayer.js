const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");

// 기본 볼륨 값 설정
let volumeValue = 0.5;
video.volume = volumeValue;

// 비디오 클릭시 이벤트 설정. 코드 간략화
const handlePlayClick = (e) => {

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

    playBtn.innerText = video.paused ? "Play" : "Pause";
};

// 음소거 이벤트 메소드
const handleMuteClick = (e) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

// 볼륨 변화 메소드
const handleVolumeChange = (event) => {
    const {
        target: { value },
    } = event;
    
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }

    volumeValue = value;
    video.volume = value;
};


// 시간 포맷팅
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);


// 영상의 총 길이 설정
const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
};

// 현재 영상의 시간 설정.
const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);

// loadedmetadata 비디오를 제외한 메타데이터 길이, 크기등이 실행되는 이벤트가 발생할때, 메소드를 동작시킴
video.addEventListener("loadedmetadata", handleLoadedMetadata);

// 시간이 변경되는 이벤트가 생길때 동작
video.addEventListener("timeupdate", handleTimeUpdate);


// 새로고침 할경우
// JS에서 eventlistener을 추가하기 전에 video가 전부 로딩이 되어서
// handleLoadedMetadata() 가 아예 불러지지 않음.
// video.readyState가 4라는 뜻은 video가 충분히 불러와진 상태에서 handleLoadedMetadata() 실행하도록 함.
if (video.readyState == 4) {
    handleLoadedMetadata();
}