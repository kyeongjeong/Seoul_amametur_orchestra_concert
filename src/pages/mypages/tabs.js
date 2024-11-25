document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // 모든 탭 버튼의 active 클래스 제거
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        // 현재 클릭된 버튼에 active 클래스 추가
        button.classList.add('active');

        // 모든 탭 내용 숨기기
        document.querySelectorAll('.concert-list').forEach(list => list.style.display = 'none');
        // 클릭된 탭에 해당하는 콘텐츠 영역 표시
        const target = button.dataset.tab;
        document.getElementById(target).style.display = 'grid';
    });
});

// 모든 하트 아이콘에 클릭 이벤트 추가
document.querySelectorAll('.heart-icon').forEach(heart => {
    heart.addEventListener('click', () => {
        // 현재 상태 확인 후 토글
        if (heart.textContent === '❤️') {
            heart.textContent = '🤍'; // 비워진 하트
        } else {
            heart.textContent = '❤️'; // 채워진 하트
        }
    });
});
