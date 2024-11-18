// 페이지 로드 시 "소개" 버튼을 기본 활성화 상태로 설정
document.addEventListener('DOMContentLoaded', () => {
    const introButton = document.querySelector('.btn-intro');
    introButton.classList.add('active');
});

// 스크롤 위치에 따라 버튼 스타일을 변경하는 함수
window.addEventListener('scroll', () => {
    const introSection = document.getElementById('intro');
    const historySection = document.getElementById('history');
    const introButton = document.querySelector('.btn-intro');
    const historyButton = document.querySelector('.btn-history');

    const introPosition = introSection.getBoundingClientRect().top;
    const historyPosition = historySection.getBoundingClientRect().top;

    // 스크롤 위치에 따라 버튼 스타일을 변경
    if (introPosition <= window.innerHeight / 2 && historyPosition > window.innerHeight / 2) {
        introButton.classList.add('active');
        historyButton.classList.remove('active');
    } else if (historyPosition <= window.innerHeight / 2) {
        introButton.classList.remove('active');
        historyButton.classList.add('active');
    }
});

// 버튼 클릭 시 해당 섹션으로 부드럽게 스크롤 이동
document.querySelector('.btn-intro').addEventListener('click', () => {
    document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.btn-history').addEventListener('click', () => {
    document.getElementById('history').scrollIntoView({ behavior: 'smooth' });
});