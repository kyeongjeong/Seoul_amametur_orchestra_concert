// document.addEventListener('DOMContentLoaded', () => {

//     const selectedOptions = {}; // 선택된 옵션 저장
//     const selectedOptionsList = document.getElementById('selected-options-list');
//     const suggestedMusic = document.querySelector('.suggested-music'); // Suggested Music 요소
//     const suggestedMusicTitle = document.getElementById('suggested-music-title');

//     // 카테고리 옵션 클릭 이벤트 처리
//     document.querySelectorAll('.options div').forEach(option => {
//         option.addEventListener('click', () => {
//             const category = option.closest('.category').id; // 상위 카테고리 ID
//             if (!selectedOptions[category]) {
//                 selectedOptions[category] = [];
//             }
//             if (selectedOptions[category].includes(option.innerText)) {
//                 // 선택 해제
//                 selectedOptions[category] = selectedOptions[category].filter(opt => opt !== option.innerText);
//                 option.classList.remove('selected');
//             } else {
//                 // 선택 추가
//                 selectedOptions[category].push(option.innerText);
//                 option.classList.add('selected');
//             }
//             updateSelectedOptions();
//         });
//     });

//     // 선택된 옵션 업데이트
//     function updateSelectedOptions() {
//         selectedOptionsList.innerHTML = ''; // 초기화
//         Object.keys(selectedOptions).forEach(category => {
//             selectedOptions[category].forEach(option => {
//                 const optionDiv = document.createElement('div');
//                 optionDiv.textContent = `${option} ×`;
//                 optionDiv.className = 'selected-option';
//                 optionDiv.addEventListener('click', () => {
//                     selectedOptions[category] = selectedOptions[category].filter(opt => opt !== option);
//                     updateSelectedOptions();
//                     document.querySelectorAll('.options div').forEach(optDiv => {
//                         if (optDiv.innerText === option) optDiv.classList.remove('selected');
//                     });
//                 });
//                 selectedOptionsList.appendChild(optionDiv);
//             });
//         });
//     }

//     // 추천 버튼 클릭 이벤트
//     document.getElementById('recommend-btn').addEventListener('click', () => {
//         if (Object.keys(selectedOptions).length === 0) {
//             alert('Please select at least one option.');
//             return;
//         }

//         // 선택된 태그와 일치하는 곡 필터링
//         const filteredMusic = musicData.filter(music => {
//             return Object.keys(selectedOptions).every(category => {
//                 if (!selectedOptions[category].length) return true; // 해당 카테고리에 선택된 옵션이 없는 경우 통과
//                 return selectedOptions[category].some(option => option.toLowerCase() === music[category].toLowerCase());
//             });
//         });

//         // 랜덤 곡 선택
//         if (filteredMusic.length > 0) {
//             const randomMusic = filteredMusic[Math.floor(Math.random() * filteredMusic.length)];
//             suggestedMusicTitle.innerText = `${randomMusic.composer} - ${randomMusic.title}`;
//         } else {
//             suggestedMusicTitle.innerText = 'No results found.';
//         }

//         suggestedMusic.style.display = 'flex'; // Suggested Music 표시
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const selectedOptions = {}; // 선택된 옵션 저장
    const selectedOptionsList = document.getElementById('selected-options-list');
    const suggestedMusic = document.querySelector('.suggested-music');
    const suggestedMusicTitle = document.getElementById('suggested-music-title');

    let musicData = []; // JSON 데이터를 저장할 변수
    let isMusicDataLoaded = false; // JSON 데이터 로드 상태를 확인하는 변수

    // JSON 데이터 로드
    fetch('composer_music.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            musicData = data;
            isMusicDataLoaded = true; // 데이터가 성공적으로 로드되었음을 표시
        })
        .catch(error => console.error('Error loading JSON:', error));

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
        if (!isMusicDataLoaded) {
            alert('Music data is not loaded yet. Please wait.');
            return;
        }

        if (Object.keys(selectedOptions).length === 0) {
            alert('Please select at least one option.');
            return;
        }

        // 사용자 선택값과 JSON 데이터를 비교하기 위한 매핑 함수
        function normalize(value) {
            return value.toLowerCase().replace(/\s+/g, '');
        }

        // 선택된 태그와 일치하는 곡 필터링
        const filteredMusic = musicData.filter(music => {
            return Object.keys(selectedOptions).every(category => {
                if (!selectedOptions[category].length) return true; // 해당 카테고리에 선택된 옵션이 없는 경우 통과
                return selectedOptions[category].some(option => 
                    normalize(option) === normalize(music[category])
                );
            });
        });

        // 랜덤 곡 선택
        if (filteredMusic.length > 0) {
            const randomMusic = filteredMusic[Math.floor(Math.random() * filteredMusic.length)];
            suggestedMusicTitle.innerText = `${randomMusic.composer} - ${randomMusic.title}`;
        } else {
            suggestedMusicTitle.innerText = 'No results found.';
        }

        suggestedMusic.style.display = 'flex'; // Suggested Music 표시
    });
});
