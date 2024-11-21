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


    // 현재 HTML 파일의 클럽명을 구분하기 위한 dataset 사용
    const currentClub = document.body.dataset.club;

    // JSON 파일 불러오기
    fetch('concert_infos.json')
        .then(response => response.json())
        .then(data => {
            // 현재 클럽과 일치하는 콘서트 데이터를 필터링
            const concertData = data.find(concert => concert.club === currentClub);

            // 콘서트 정보가 존재할 경우 HTML에 동적으로 삽입
            if (concertData) {
                document.getElementById('concert-title').textContent = concertData.title;
                document.getElementById('concert-date').textContent = concertData.date;
                document.getElementById('concert-time').textContent = concertData.time;
                document.getElementById('concert-location').textContent = concertData.location;
                document.getElementById('concert-univ').textContent = concertData.university;
                document.getElementById('concert-image').src = concertData.image;
            } else {
                console.error(`No concert information found for club: ${currentClub}`);
            }
        })
        .catch(error => console.error('Error fetching JSON data:', error));

    // 하트 버튼 클릭 이벤트
    document.querySelector('.heart-button').addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas', 'liked');
        } else {
            icon.classList.remove('fas', 'liked');
            icon.classList.add('far');
        }
    });
});



