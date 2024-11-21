// 슬라이더 이미지 데이터
const images = [
    "../../../public/images/main_banner/main_banner_1.jpg",
    "../../../public/images/main_banner/main_banner_2.jpg",
    "../../../public/images/main_banner/main_banner_3.jpg",
    "../../../public/images/main_banner/main_banner_4.jpg",
    "../../../public/images/main_banner/main_banner_5.jpg"
];

// 슬라이더 요소 선택
const sliderImages = document.getElementById('slider-images');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// 이미지 추가
images.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    sliderImages.appendChild(img);
});

// 초기 상태
let index = 0;

// 슬라이드 표시 함수
function showSlide(i) {
    if (i >= images.length) {
        index = 0;
    } else if (i < 0) {
        index = images.length - 1;
    } else {
        index = i;
    }
    sliderImages.style.transform = `translateX(-${index * 100}%)`;
}

// 버튼 이벤트 추가
prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// 초기 슬라이드 표시
showSlide(index);
