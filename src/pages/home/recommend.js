document.addEventListener('DOMContentLoaded', () => {
    const selectedOptions = {}; // 선택된 옵션 저장
    const selectedOptionsList = document.getElementById('selected-options-list');

    // 카테고리 옵션 클릭 이벤트 처리
    document.querySelectorAll('.options div').forEach(option => {
        option.addEventListener('click', () => {
            const category = option.closest('.category').id; // 상위 카테고리 ID
            if (!selectedOptions[category]) {
                selectedOptions[category] = [];
            }
            if (selectedOptions[category].includes(option.innerText)) {
                // 선택 해제
                selectedOptions[category] = selectedOptions[category].filter(opt => opt !== option.innerText);
                option.classList.remove('selected');
            } else {
                // 선택 추가
                selectedOptions[category].push(option.innerText);
                option.classList.add('selected');
            }
            updateSelectedOptions();
        });
    });

    // 선택된 옵션 업데이트
    function updateSelectedOptions() {
        selectedOptionsList.innerHTML = ''; // 초기화
        Object.keys(selectedOptions).forEach(category => {
            selectedOptions[category].forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.textContent = `${option} ×`;
                optionDiv.className = 'selected-option';
                optionDiv.addEventListener('click', () => {
                    selectedOptions[category] = selectedOptions[category].filter(opt => opt !== option);
                    updateSelectedOptions();
                    document.querySelectorAll('.options div').forEach(optDiv => {
                        if (optDiv.innerText === option) optDiv.classList.remove('selected');
                    });
                });
                selectedOptionsList.appendChild(optionDiv);
            });
        });
    }

    // 추천 버튼 클릭 이벤트
    document.getElementById('recommend-btn').addEventListener('click', () => {
        if (Object.keys(selectedOptions).length === 0) {
            alert('Please select at least one option.');
            return;
        }
        // 임의의 추천 메시지 출력 (예제 데이터)
        document.getElementById('suggested-music-title').innerText = `Egmont Overture by Beethoven`;
    });
});
