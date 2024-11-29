// YouTube API 스크립트 동적으로 로드
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubePlayerAPIReady() {
    // 플레이어 생성 및 설정
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'Jruqk1rSGeg',
        playerVars: {
            'autoplay': 1,  // 자동 재생
            'controls': 0,  // 컨트롤 숨김
            'rel': 0       // 관련 동영상 표시 안 함
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 플레이어 준비 시 음소거 및 재생 시작
function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
}

// 플레이어 상태 변화 감지
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log('동영상 재생이 종료되었습니다.');
    } else if (event.data == YT.PlayerState.PLAYING) {
        console.log('동영상이 재생 중입니다.');
    } else if (event.data == YT.PlayerState.PAUSED) {
        console.log('동영상이 일시정지되었습니다.');
    }
}