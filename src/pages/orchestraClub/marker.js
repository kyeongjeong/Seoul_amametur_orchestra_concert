// 마커 데이터 배열
const markers = [
    { top: 50, left: 30, url: "../orchestraClubPages/index.html" },
    { top: 20, left: 45, url: "../orchestraClubPages/index.html" },
    { top: 30, left: 60, url: "../orchestraClubPages/index.html" }
];

// 지도 컨테이너 선택
const mapContainer = document.querySelector(".map");

function createMarker(top, left, url) {
    const marker = document.createElement("a");
    marker.className = "marker";
    marker.href = url;
    marker.title = "Orchestra Info";

    const markerImg = document.createElement("img");
    markerImg.src = "../../../public/images/map_marker.png";
    markerImg.alt = "Map Marker";

    // 이미지 크기 고정
    markerImg.style.width = "30px";
    markerImg.style.height = "30px";
    markerImg.style.objectFit = "contain"; // 이미지 왜곡 방지

    marker.appendChild(markerImg);

    marker.style.position = "absolute";
    marker.style.top = `${top}%`;
    marker.style.left = `${left}%`;

    marker.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(`Navigating to: ${url}`);
        window.location.href = url;
    });

    return marker;
}


// 마커 추가
markers.forEach(markerData => {
    const marker = createMarker(markerData.top, markerData.left, markerData.url);
    mapContainer.appendChild(marker);
});

