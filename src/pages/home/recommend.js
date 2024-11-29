document.addEventListener('DOMContentLoaded', () => {
    
    const selectedOptions = {}; // 선택된 옵션 저장
    const selectedOptionsList = document.getElementById('selected-options-list');

    const suggestedMusic = document.querySelector('.suggested-music');
    const suggestedMusicTitle = document.getElementById('suggested-music-title');
    const suggestedConcert = document.getElementById("suggested-concert");

    let musicData = []; // 음악 데이터를 저장할 변수
    let concertData = []; // 공연 데이터를 저장할 변수
    let isMusicDataLoaded = false; // JSON 데이터 로드 상태를 확인하는 변수

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    //JSON 데이터 로드
    Promise.all([
        fetch('../../data/composer_music.json').then(response => response.json()),
        fetch('../../data/concert_infos.json').then(response => response.json())
    ])
        .then(([music, concerts]) => {
            musicData = music;
            concertData = concerts;
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

    // Suggested Concert 카드 생성 함수
    function createConcertCards(concerts) {
        const concertCardsContainer = document.querySelector('.concert-cards');
        concertCardsContainer.innerHTML = ''; // 기존 콘텐츠 초기화

        concerts.forEach(concert => {
            // 카드 생성
            const card = document.createElement('div');
            card.className = 'concert-card';

            // 이미지 추가
            const img = document.createElement('img');
            img.src = concert.image || 'placeholder.jpg'; // 이미지가 없을 경우 기본 이미지 사용
            img.alt = concert.title;

            // 설명 추가
            const description = document.createElement('div');
            description.className = 'card-description';

            const title = document.createElement('h3');
            title.textContent = concert.title; // title 값 설정

            const date = document.createElement('p');
            date.textContent = concert.date; // date 값 설정

            // 구성 추가
            description.appendChild(title);
            description.appendChild(date);
            card.appendChild(img);
            card.appendChild(description);

            // 클릭 시 이동
            card.addEventListener('click', () => {
                const url = `../classicConcertPages/${concert.link}`; // URL 경로 설정
                window.location.href = url;
            });

            // 컨테이너에 추가
            concertCardsContainer.appendChild(card);
        });
    }

    // 콘서트 관련 메시지 생성 함수
    function displayConcertMessage(message) {
        const concertCardsContainer = document.querySelector('.concert-cards');
        concertCardsContainer.innerHTML = ''; // 기존 콘텐츠 초기화
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.textAlign = 'center';
        messageElement.style.color = '#777';
        messageElement.style.fontSize = '16px';
        concertCardsContainer.appendChild(messageElement);
        suggestedConcert.style.alignItems = 'center';
        document.getElementById('suggested-concert').style.display = 'block';
    }

    // 플레이어 준비 시 음소거 및 재생 시작
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 플레이어 상태 변화 감지
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            console.log('동영상 재생이 종료되었습니다.');
        } else if (event.data == YT.PlayerState.PLAYING) {
            console.log('동영상이 재생 중입니다.');
        } else if (event.data == YT.PlayerState.PAUSED) {
            console.log('동영상이 일시정지되었습니다.');
        }
    }

    // YouTube 플레이어 설정 함수
    function setupYouTubePlayer(videoId, message) {
        const playerContainer = document.getElementById('player');
        playerContainer.style.display = 'block';
        playerContainer.style.textAlign = 'left'; // 플레이어 내부 콘텐츠 좌측 정렬
        playerContainer.style.width = '100%'; // 부모 요소의 너비를 따라감 (필요 시 조정)

        // 메시지 컨테이너 추가 (유튜브 상단 메시지)
        // const messageContainer = document.createElement('div');
        // messageContainer.innerHTML = `
        //     <div style="margin-bottom: 10px; font-size: 14px; color: #555;">
        //         ${message}
        //     </div>
        // `;
        // playerContainer.parentElement.insertBefore(messageContainer, playerContainer);

        // 기존 YouTube 플레이어 제거 후 다시 생성 (중복 방지)
        if (player) {
            player.destroy();
        }

        // 새로운 YouTube 플레이어 생성
        player = new YT.Player('player', {
            height: '540', // 유튜브 플레이어 높이
            width: '960',  // 유튜브 플레이어 너비
            videoId: videoId, // 동적으로 전달받은 videoId 사용
            playerVars: {
                'autoplay': 1,  // 자동 재생
                'controls': 1,  // 컨트롤 표시
                'rel': 1        // 관련 동영상 표시
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
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

        // 콘서트 카드 컨테이너 초기화
        const concertCardsContainer = document.querySelector('.concert-cards');
        concertCardsContainer.innerHTML = ''; 
        
        // 선택된 태그와 일치하는 곡 필터링
        let filteredMusic = musicData.filter(music => {
            return Object.keys(selectedOptions).every(category => {
                if (!selectedOptions[category].length) return true; // 해당 카테고리에 선택된 옵션이 없는 경우 통과
                return selectedOptions[category].some(option => option.toLowerCase() === music[category].toLowerCase());
            });
        });

        // 필터링된 곡이 없으면 전체 음악 데이터 중 랜덤 추천
        let message = '';
        if (filteredMusic.length === 0) {
            filteredMusic = [musicData[Math.floor(Math.random() * musicData.length)]];
            message = `
                <div style="margin-bottom: 10px; font-size: 14px; color: #555;">
                    We couldn't find any matches for your selected options.<br>
                    But don't worry! We've picked a great piece for you to explore :
                </div>
            `;
        }

        // 랜덤 곡 선택
        const randomMusic = filteredMusic[Math.floor(Math.random() * filteredMusic.length)];
        suggestedMusicTitle.innerHTML = `${message} ${randomMusic.composer} - ${randomMusic.title}`;
        
        // Suggested Concert 로직
        if (randomMusic.eventDetailsAvailable === 1) {
            
            // 관련 콘서트 필터링
            const relatedConcerts = concertData.filter(concert => concert.music.includes(randomMusic.idx));
            if (relatedConcerts.length > 0) {
                createConcertCards(relatedConcerts); // 카드 생성 함수 호출
                document.getElementById('suggested-concert').style.display = 'block'; // 관련 콘서트 표시
                suggestedConcert.style.alignItems = 'flex-start';
            } 
            else {
                displayConcertMessage('No related concerts found.');
            }
        } else if (randomMusic.eventDetailsAvailable === 0 || randomMusic.eventDetailsAvailable === -1) {
            if (randomMusic.youtube && randomMusic.youtube.length > 0) {
                setupYouTubePlayer(
                    randomMusic.youtube,
                    "No recent concerts related to this piece are available. Instead, enjoy the YouTube preview below!"
                );
            } else {
                displayConcertMessage('No related concerts found.');
            }
        }

        suggestedMusic.style.display = 'flex'; // Suggested Music 표시
        suggestedConcert.style.display = 'flex'; // Suggested Concert 표시
    });
});