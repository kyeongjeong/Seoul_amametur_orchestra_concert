// Slider functionality
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// 슬라이더에 표시할 이미지 데이터 배열
const sliderData = [
    { src: "../../../public/images/orchestraClub_images/경희대_엠됴피.jpg", alt: "Orchestra Poster 1" },
    { src: "../../../public/images/orchestraClub_images/서강대_에이시스.jpg", alt: "Orchestra Poster 2" },
    { src: "../../../public/images/orchestraClub_images/서울대_스누포.jpg", alt: "Orchestra Poster 3" },
    { src: "../../../public/images/orchestraClub_images/성대_스쿠오.jpg", alt: "Orchestra Poster 4" }
];

// 슬라이더 아이템 생성 함수
function createSliderItems() {
    sliderData.forEach(item => {
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;

        sliderItem.appendChild(img);
        slider.appendChild(sliderItem);
    });
}

// 슬라이더 업데이트 함수
function updateSlider() {
    const offset = -currentIndex * (sliderItems[0].offsetWidth);
    slider.style.transform = `translateX(${offset}px)`;
}

// 이전 버튼 클릭 이벤트
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + sliderData.length) % sliderData.length;
    updateSlider();
});

// 다음 버튼 클릭 이벤트
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % sliderData.length;
    updateSlider();
});

// 슬라이더 초기화
createSliderItems();
const sliderItems = document.querySelectorAll('.slider-item'); // 생성 후 아이템 다시 선택
