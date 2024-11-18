var mapContainer = document.getElementById('map'),
mapOption = { 
    center: new kakao.maps.LatLng(37.611369, 127.059208), // 지도 중심좌표
    level: 7 // 확대
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var overlays = []; // 열린 오버레이를 저장할 배열

// JSON 데이터 로드
fetch('positions.json') // JSON 파일 경로
    .then(response => response.json())
    .then(positions => {
        // 마커와 커스텀 오버레이 생성
        positions.forEach((position, index) => {
            // 마커 생성
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(position.latLng.lat, position.latLng.lng)
            });

            // 커스텀 오버레이 콘텐츠 생성
            var content = `
                <div class="wrap">
                    <div class="info">
                        <div class="title">
                            ${position.title}
                            <div class="close" onclick="closeOverlay(${index})" title="닫기"></div>
                        </div>
                        <div class="body">
                            <div class="img">
                                <img src="${position.image}" width="73" height="70">
                            </div>
                            <div class="desc">
                                <div class="ellipsis">${position.address}</div>
                                ${position.date ? `<div class="jibun ellipsis">${position.date}</div>` : ""}
                                ${position.postal ? `<div class="jibun ellipsis">${position.postal}</div>` : ""}
                                <div><a href="${position.link}" target="_blank" class="link">홈페이지</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // 오버레이 생성
            var overlay = new kakao.maps.CustomOverlay({
                content: content,
                position: new kakao.maps.LatLng(position.latLng.lat, position.latLng.lng),
                map: null // 처음에는 보이지 않도록 설정
            });

            overlays.push(overlay);

            // 마커 클릭 시 오버레이 표시/닫기
            kakao.maps.event.addListener(marker, 'click', function() {
                if (overlay.getMap()) {
                    overlay.setMap(null); // 오버레이가 열려 있다면 닫기
                } else {
                    closeAllOverlays(); // 모든 오버레이 닫기
                    overlay.setMap(map); // 해당 오버레이 표시
                }
            });
        });
    });

// 모든 오버레이 닫기
function closeAllOverlays() {
    overlays.forEach(function(overlay) {
        overlay.setMap(null);
    });
}

// 특정 오버레이 닫기
function closeOverlay(index) {
    overlays[index].setMap(null);
}