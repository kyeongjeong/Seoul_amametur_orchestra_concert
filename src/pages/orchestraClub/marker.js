// // 마커 데이터 배열
// const markers = [
//     { top: 49, left: 38, url: "../orchestraClubPages/index.html" }, //서강대
//     { top: 75, left: 37, url: "../orchestraClubPages/index.html" }, //서울대
//     { top: 40, left: 60, url: "../orchestraClubPages/index.html" }, //경희대
//     { top: 36, left: 48, url: "../orchestraClubPages/index.html" }, //성균관대
//     { top: 46, left: 60, url: "../orchestraClubPages/index.html" }, //한양대
// ];

// // 지도 컨테이너 선택
// const mapContainer = document.querySelector(".map");

// function createMarker(top, left, url) {
//     const marker = document.createElement("a");
//     marker.className = "marker";
//     marker.href = url;
//     marker.title = "Orchestra Info";

//     const markerImg = document.createElement("img");
//     markerImg.src = "../../../public/images/map_marker.png";
//     markerImg.alt = "Map Marker";

//     // 이미지 크기 고정
//     markerImg.style.width = "30px";
//     markerImg.style.height = "30px";
//     markerImg.style.objectFit = "contain"; // 이미지 왜곡 방지

//     marker.appendChild(markerImg);

//     marker.style.position = "absolute";
//     marker.style.top = `${top}%`;
//     marker.style.left = `${left}%`;

//     marker.addEventListener("click", (event) => {
//         event.preventDefault();
//         console.log(`Navigating to: ${url}`);
//         window.location.href = url;
//     });

//     return marker;
// }


// // 마커 추가
// markers.forEach(markerData => {
//     const marker = createMarker(markerData.top, markerData.left, markerData.url);
//     mapContainer.appendChild(marker);
// });


// 마커 데이터 배열
const markers = [
    { top: 49, left: 38, university: "서강대학교", club: "ACES", url: "../orchestraClubPages/index.html" },
    { top: 75, left: 37, university: "서울대학교", club: "SNUP", url: "../orchestraClubPages/index.html" },
    { top: 40, left: 60, university: "경희대학교", club: "MDOP", url: "../orchestraClubPages/index.html" },
    { top: 36, left: 48, university: "성균관대학교", club: "SKKUO", url: "../orchestraClubPages/index.html" },
    { top: 46, left: 60, university: "한양대학교", club: "HANAKLANG", url: "../orchestraClubPages/index.html" },
];

// 지도 컨테이너 선택
const mapContainer = document.querySelector(".map");

function createMarker(top, left, university, club, url) {
    const marker = document.createElement("a");
    marker.className = "marker";
    marker.href = url;

    const markerImg = document.createElement("img");
    markerImg.src = "../../../public/images/map_marker.png";
    markerImg.alt = "Map Marker";
    markerImg.style.width = "30px";
    markerImg.style.height = "30px";
    markerImg.style.objectFit = "contain";

    // 툴팁 요소 생성
    const tooltip = document.createElement("div");
    tooltip.className = "marker-tooltip";
    tooltip.textContent = `${university} ${club}`;

    // 마커에 마우스 이벤트 추가
    marker.addEventListener("mouseover", () => {
        tooltip.style.display = "block";
    });

    marker.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
    });

    // 마커 클릭 이벤트
    marker.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = url;
    });

    marker.appendChild(markerImg);
    marker.appendChild(tooltip);

    marker.style.position = "absolute";
    marker.style.top = `${top}%`;
    marker.style.left = `${left}%`;

    return marker;
}

// 마커 추가
markers.forEach(markerData => {
    const marker = createMarker(
        markerData.top,
        markerData.left,
        markerData.university,
        markerData.club,
        markerData.url
    );
    mapContainer.appendChild(marker);
});
