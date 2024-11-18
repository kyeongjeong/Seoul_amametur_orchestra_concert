document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        { id: 'concert-details', button: document.querySelector('.btn-info') },
        { id: 'intro', button: document.querySelector('.btn-intro') },
        { id: 'conductor', button: document.querySelector('.btn-conductor') },
        { id: 'composer', button: document.querySelector('.btn-composer') },
        { id: 'program', button: document.querySelector('.btn-programs') },
        { id: 'concert-details-extra', button: document.querySelector('.btn-concent_details') }
    ];

    // 모든 버튼과 섹션이 정상적으로 로드되었는지 확인
    sections.forEach((section, index) => {
        if (!section.button || !document.getElementById(section.id)) {
            console.error(`Error: Button or section at index ${index} is not properly defined.`);
        }
    });

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', () => {
        let currentSectionIndex = -1;

        // 현재 화면에 표시되는 섹션 찾기
        sections.forEach((section, index) => {
            const sectionElement = document.getElementById(section.id);
            if (sectionElement) {
                const rect = sectionElement.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSectionIndex = index;
                }
            }
        });

        // 버튼 활성화 상태 업데이트
        sections.forEach((section, index) => {
            if (index === currentSectionIndex) {
                section.button.classList.add('active');
            } else {
                section.button.classList.remove('active');
            }
        });
    });

    // 버튼 클릭 시 해당 섹션으로 부드럽게 스크롤 이동
    sections.forEach((section) => {
        section.button.addEventListener('click', () => {
            const targetSection = document.getElementById(section.id);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
