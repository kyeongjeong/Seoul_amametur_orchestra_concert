const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const sliderData = [
    { 
        src: "../../../public/images/orchestra_logo/경희대_엠됴피.jpg", 
        alt: "경희대_엠됴피", 
        url: "../orchestraClubPages/index.html",
        clubName: "MDOP",
        university: "경희대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/서강대_에이시스.jpg", 
        alt: "서강대_에이시스", 
        url: "../orchestraClubPages/index.html",
        clubName: "ACES",
        university: "서강대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/서울대_스누포.jpg", 
        alt: "서울대_스누포", 
        url: "../orchestraClubPages/index.html",
        clubName: "SNUPO",
        university: "서울대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/성균관대_스쿠오.jpg", 
        alt: "성균관대_스쿠오", 
        url: "../orchestraClubPages/index.html",
        clubName: "SKKUO",
        university: "성균관대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/한양대_하나클랑.jpg", 
        alt: "한양대_하나클랑", 
        url: "../orchestraClubPages/index.html",
        clubName: "HANAKLANG",
        university: "한양대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/건국대_쿠필.jpg", 
        alt: "건국대_쿠필", 
        url: "../orchestraClubPages/index.html",
        clubName: "KUPHIL",
        university: "건국대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/고려대_관현악단.jpg", 
        alt: "고려대_관현악단", 
        url: "../orchestraClubPages/index.html",
        clubName: "Korea University Orchestra",
        university: "고려대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/광운대_다카포.jpg", 
        alt: "광운대_다카포", 
        url: "../orchestraClubPages/index.html",
        clubName: "Da KAPO",
        university: "광운대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/동국대_오퍼스.jpg", 
        alt: "동국대_오퍼스", 
        url: "../orchestraClubPages/index.html",
        clubName: "OPUS",
        university: "동국대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/숙명여대_소피아.jpg", 
        alt: "숙명여대_소피아", 
        url: "../orchestraClubPages/index.html",
        clubName: "S.O.Phi.A",
        university: "숙명여자대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/시립대_칸타빌레.jpg", 
        alt: "시립대_칸타빌레", 
        url: "../orchestraClubPages/index.html",
        clubName: "Cantabile",
        university: "서울시립대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/중앙대_루바토.jpg", 
        alt: "중앙대_루바토", 
        url: "../orchestraClubPages/index.html",
        clubName: "RUBATO",
        university: "중앙대학교 아마추어 오케스트라"
    },
    { 
        src: "../../../public/images/orchestra_logo/홍익대_히아모.jpg", 
        alt: "홍익대_히아모", 
        url: "../orchestraClubPages/index.html",
        clubName: "HIAMO",
        university: "홍익대학교 아마추어 오케스트라"
    }
];

let currentIndex = 0; // 현재 슬라이더 인덱스
const itemWidth = 250 + 20; // 카드 너비(250px) + 마진(10px * 2)
const containerWidth = 1200; // 버튼 사이의 슬라이더 최대 길이
const visibleItems = Math.floor(containerWidth / itemWidth); // 한 번에 보이는 카드 수
const totalItems = sliderData.length;

// 슬라이더 아이템 생성 함수
function createSliderItems() {
    sliderData.forEach(item => {
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item';

        // 이미지 링크 생성
        const link = document.createElement('a');
        link.href = item.url;

        // 카드 내용 구성
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;

        const description = document.createElement('div');
        description.className = 'card-description';

        const clubName = document.createElement('h3');
        clubName.textContent = item.clubName;

        const university = document.createElement('p');
        university.textContent = item.university;

        // 설명 추가
        description.appendChild(clubName);
        description.appendChild(university);

        // 링크에 이미지와 설명 추가
        link.appendChild(img);
        link.appendChild(description);
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
