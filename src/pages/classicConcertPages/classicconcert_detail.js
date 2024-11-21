document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    if (sections.length === 0) {
        console.error("No sections found on the page. Please check your HTML structure.");
        return;
    }

    // 모든 버튼과 섹션 가져오기
    const buttons = document.querySelectorAll('.side-banner button');
    // 페이지가 처음 로드되었을 때 첫 번째 버튼 활성화 상태 설정
    buttons[0].classList.add('active');

    // 스크롤
    window.addEventListener('scroll', () => {
        let currentSectionIndex = -1;

        sections.forEach((section, index) => {
            if (!section) return;

            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSectionIndex = index;
            }
        });

        // 버튼 활성화 상태 업데이트
        buttons.forEach((button, index) => {
            if (index === currentSectionIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    });

    // 버튼 클릭 시 해당 섹션으로 스크롤 이동
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const targetSection = sections[index];
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const heartButton = document.querySelector('.heart-button');
    const heartIcon = heartButton.querySelector('i');

    heartButton.addEventListener('click', function () {
        if (heartIcon.classList.contains('far')) {
            // 빈 하트 -> 빨간 하트
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            heartButton.classList.add('liked');
        } else {
            // 빨간 하트 -> 빈 하트
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            heartButton.classList.remove('liked');
        }
    });
});

