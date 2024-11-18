var mapContainer = document.getElementById('map'),
mapOption = { 
    center: new kakao.maps.LatLng(37.611369, 127.059208), // 지도 중심좌표
    level: 7 // 확대
};

var map = new kakao.maps.Map(mapContainer, mapOption);

// 마커위치
var positions = [
{
    title: '광운대학교',
    latLng: new kakao.maps.LatLng(37.619247, 127.058271),
    iwRemoveable: false,
    content:  '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' + 
        '            공연이름' + 
        '            <div class="close" onclick="closeOverlay(' + 0 + ')" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        '                <img src="/public/images/kwangwoon.jpg" width="73" height="70">' +
        '           </div>' + 
        '            <div class="desc">' + 
        '                <div class="ellipsis">서울 노원구 광운로 20</div>' + 
        '                <div class="jibun ellipsis">날짜' + 
        '                <div><a href="https://www.kw.ac.kr/ko/" target="_blank" class="link">홈페이지</a></div>' + 
        '            </div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>'
},
{
    title: '경희대학교',
    latLng: new kakao.maps.LatLng(37.597173, 127.051746),
    iwRemoveable: false,
    content:  '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' + 
        '            경희대학교' + 
        '            <div class="close" onclick="closeOverlay(' + 1 + ')" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        '                <img src="/public/images/kyunghee.jpg" width="73" height="70">' +
        '           </div>' + 
        '            <div class="desc">' + 
        '                <div class="ellipsis">서울 동대문구 경희대로 26</div>' + 
        '                <div class="jibun ellipsis">(우) 02447 (지번) 회기동 1-5</div>' + 
        '                <div><a href="http://www.khu.ac.kr/" target="_blank" class="link">홈페이지</a></div>' + 
        '            </div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>'
}
];

var overlays = []; // 열린 오버레이를 저장할 배열

// 마커와 커스텀 오버레이 생성
positions.forEach(function(position) {
var marker = new kakao.maps.Marker({
    map: map,
    position: position.latLng
});

var overlay = new kakao.maps.CustomOverlay({
    content: position.content,
    position: position.latLng,
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