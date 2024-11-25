var mapContainer = document.getElementById('map'),
mapOption = { 
    center: new kakao.maps.LatLng(37.611369, 127.059208), // 지도 중심좌표
    level: 7 // 확대
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var overlays = []; // 열린 오버레이를 저장할 배열

var placesService = new kakao.maps.services.Places();
var geocoder = new kakao.maps.services.Geocoder();
var markers = [];
var startPoint = null;
var endPoint = null;

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


// 마커 생성
function addMarker(position, idx) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
        imageSize = new kakao.maps.Size(36, 37),
        imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691),
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
            offset: new kakao.maps.Point(13, 37)
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position,
            image: markerImage 
        });

    marker.setMap(map);
    markers.push(marker);

    return marker;
}

// 검색 함수
function searchPlaces(type) {
    var keyword = document.getElementById(type + 'Keyword').value;

    if (!keyword.trim()) {
        alert('키워드를 입력해주세요.');
        return;
    }

    placesService.keywordSearch(keyword, function(result, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            displayPlaces(result.slice(0, 5), type);
            displayPagination(pagination, type);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 없습니다.');
        } else {
            alert('검색 중 오류가 발생했습니다.');
        }
    }, {size: 5});
}

// 검색 결과 표시
function displayPlaces(places, type) {
    var listEl = document.getElementById(type + 'PlacesList');
    listEl.innerHTML = '';

    removeMarkers();

    // 검색 결과의 중심 계산
    var bounds = new kakao.maps.LatLngBounds();

    places.forEach((place, index) => {
        var marker = addMarker(new kakao.maps.LatLng(place.y, place.x), index);

        var itemEl = document.createElement('li');
        itemEl.innerHTML = `
            <h3>${place.place_name}</h3>
            <div>${place.address_name}</div>
            <button onclick="selectPlace(${place.y}, ${place.x}, '${type}')">선택</button>
        `;
        listEl.appendChild(itemEl);

        // 마커 클릭 시 지도 이동
        kakao.maps.event.addListener(marker, 'click', function() {
            map.panTo(new kakao.maps.LatLng(place.y, place.x));
        });

        // Bounds에 포함
        bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    });

    // 지도 중심을 검색 결과 중심으로 설정
    map.setBounds(bounds);
}

// 페이징 처리
function displayPagination(pagination, type) {
    var paginationEl = document.getElementById(type + 'Pagination');
    paginationEl.innerHTML = '';

    for (var i = 1; i <= Math.ceil(pagination.totalCount / 5); i++) {
        var btn = document.createElement('button');
        btn.innerHTML = i;
        btn.onclick = (function(page) {
            return function() {
                pagination.gotoPage(page);
            };
        })(i);
        paginationEl.appendChild(btn);
    }
}

// 마커 제거
function removeMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// 장소 선택
function selectPlace(lat, lng, type) {
    var selectedPoint = new kakao.maps.LatLng(lat, lng);

    if (type === 'start') {
        startPoint = selectedPoint;
        alert(`출발지가 설정되었습니다: ${lat}, ${lng}`);
    } else if (type === 'end') {
        endPoint = selectedPoint;
        alert(`도착지가 설정되었습니다: ${lat}, ${lng}`);
    }
}

// 길찾기 실행
async function findRoute() {
    if (startPoint && endPoint) {
        const startLat = startPoint.getLat();
        const startLng = startPoint.getLng();
        const endLat = endPoint.getLat();
        const endLng = endPoint.getLng();

        // API 요청 URL 생성
        const apiUrl = `https://apis-navi.kakaomobility.com/v1/directions?` +
            `origin=${startLng},${startLat}` +
            `&destination=${endLng},${endLat}`;

        try {
            // GET 요청
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'KakaoAK ',
                    'Content-Type': 'application/json'
                }
            });

            // 응답 처리
            if (response.ok) {
                const data = await response.json();
                const routes = data.routes; // 경로 정보

                if (routes && routes.length > 0) {
                    const route = routes[0]; // 가장 추천된 경로
                    alert(`경로 찾기 성공!\n총 거리: ${route.summary.distance}m\n예상 시간: ${route.summary.duration / 60}분`);
                } else {
                    alert('경로를 찾을 수 없습니다.');
                }
            } else {
                alert(`API 요청 실패: ${response.status}`);
            }
        } catch (error) {
            console.error('길찾기 중 오류 발생:', error);
            alert('길찾기 중 오류가 발생했습니다.');
        }
    } else {
        alert('출발지와 도착지를 모두 설정하세요.');
    }
}