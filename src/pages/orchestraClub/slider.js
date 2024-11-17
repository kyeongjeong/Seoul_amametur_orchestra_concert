const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// 슬라이더 데이터 및 상태
const sliderData = [
    { src: "../../../public/images/orchestraClub_images/경희대_엠됴피.jpg", alt: "경희대_엠됴피", url: "../orchestraClubPages/index.html" },
    { src: "../../../public/images/orchestraClub_images/서강대_에이시스.jpg", alt: "서강대_에이시스", url: "../orchestraClubPages/index.html" },
    { src: "../../../public/images/orchestraClub_images/서울대_스누포.jpg", alt: "서울대_스누포", url: "../orchestraClubPages/index.html" },
    { src: "../../../public/images/orchestraClub_images/성대_스쿠오.jpg", alt: "성대_스쿠오", url: "../orchestraClubPages/index.html" },
    { src: "../../../public/images/orchestraClub_images/한양대_하나클랑.jpg", alt: "한양대_하나클랑", url: "../orchestraClubPages/index.html" }
];

let currentIndex = 0; // 현재 슬라이더 인덱스
const itemWidth = 250 + 20; // 이미지 너비(250px) + 마진(10px * 2)
const containerWidth = 1200; // 버튼 사이의 슬라이더 최대 길이
const visibleItems = Math.floor(containerWidth / itemWidth); // 한 번에 보이는 이미지 수
const totalItems = sliderData.length;

// 슬라이더 아이템 생성 함수
function createSliderItems() {
    sliderData.forEach(item => {
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item';

        // 이미지 링크 생성
        const link = document.createElement('a');
        link.href = item.url; // 링크 URL 설정

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;

        // 링크에 이미지를 추가
        link.appendChild(img);
        sliderItem.appendChild(link);
        slider.appendChild(sliderItem);
    });
}

// 슬라이더 업데이트 함수
function updateSlider() {
    const offset = -currentIndex * itemWidth; // 현재 인덱스에 맞게 이동
    slider.style.transform = `translateX(${offset}px)`;
}

// 이전 버튼 클릭 이벤트
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

// 다음 버튼 클릭 이벤트
nextBtn.addEventListener('click', () => {
    if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
        updateSlider();
    }
});

// 초기화
createSliderItems();
const sliderItems = document.querySelectorAll('.slider-item');
updateSlider();
