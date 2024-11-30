document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const upcomingContainer = document.getElementById('upcoming');
    const pastContainer = document.getElementById('past');

    // 로컬 스토리지에서 하트 상태 불러오기
    const heartState = Object.keys(localStorage).reduce((acc, key) => {
        if (key.startsWith('heartLiked_')) {
            acc[key.replace('heartLiked_', '')] = localStorage.getItem(key) === 'true';
        }
        return acc;
    }, {});

    // JSON 데이터 가져오기
    fetch('../../data/concert_infos_date.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(concert => {
                const concertDate = new Date(concert.date);
            
                if (isNaN(concertDate)) {
                    console.error(`Invalid date for concert: ${concert.title}`);
                    return;
                }
            
                const heartKey = `${concert.idx}`; // idx를 로컬 스토리지 키로 활용
            
                if (heartState[heartKey]) {
                    const concertCard = `
                        <div class="history-item">
                            <div class="history-image">
                                <img id="concert-image-${concert.idx}" src="${concert.image}" alt="${concert.title}">
                            </div>
                            <div class="reservation-info">
                                <h4><u>${concert.genre.join(', ')}</u></h4>
                                <h3 id="concert-title-${concert.idx}">${concert.title}</h3>
                                <p>${concert.date}<br>${concert.location}</p>
                                <a href="../classicConcertPages/${concert.link}" class="btn-more">세부 정보</a>
                                <button class="heart-button" data-heart-id="${concert.idx}">
                                    <i class="${heartState[heartKey] ? 'fas liked fa-heart' : 'far fa-heart'}"></i>
                                </button>
                                <button class="share-button" 
                                    data-title="${concert.title}" 
                                    data-image="${concert.image}">
                                    <i class="fas fa-share-alt"></i>
                                </button>
                            </div>
                        </div>
                    `;
            
                    if (concertDate >= today) {
                        upcomingContainer.innerHTML += concertCard;
                    } else {
                        pastContainer.innerHTML += concertCard;
                    }
                }
            });
            

            // 하트 버튼 이벤트 추가
            document.querySelectorAll('.heart-button').forEach(button => {
                const heartId = button.dataset.heartId; // idx 값 사용
                const heartIcon = button.querySelector('i');

                button.addEventListener('click', () => {
                    const isLiked = heartIcon.classList.contains('liked');
                    if (isLiked) {
                        // 하트가 눌린 상태 -> 해제
                        heartIcon.classList.remove('fas', 'liked');
                        heartIcon.classList.add('far');
                        localStorage.setItem(`heartLiked_${heartId}`, 'false');
                    } else {
                        // 하트가 꺼진 상태 -> 활성화
                        heartIcon.classList.remove('far');
                        heartIcon.classList.add('fas', 'liked');
                        localStorage.setItem(`heartLiked_${heartId}`, 'true');
                    }

                    // 새로고침을 통해 상태를 반영 (선택 사항)
                    location.reload();
                });
            });

            document.querySelectorAll('.share-button').forEach(button => {
                button.addEventListener('click', event => {
                    const title = event.currentTarget.getAttribute('data-title');
                    const image = event.currentTarget.getAttribute('data-image');
            
                    if (title && image) {
                        // 공유 데이터를 저장하여 팝업 창에서 선택적으로 사용 가능
                        const concertData = { title, image };
            
                        // 팝업 창 열기
                        const modal = document.getElementById('share-modal');
                        modal.style.display = 'block';
            
                        // 카카오톡 공유 버튼에 이벤트 추가
                        const kakaoShareButton = document.getElementById('kakao-share-button');
                        kakaoShareButton.onclick = () => {
                            kakaoShare(concertData); // 카카오톡 공유 호출
                            closeShareModal(); // 공유 후 팝업 닫기
                        };
                    } else {
                        console.error('공유 데이터를 가져오지 못했습니다.');
                        alert('공유 데이터를 가져오지 못했습니다.');
                    }
                });
            });
            
            // 팝업 외부 클릭 시 닫기
            window.addEventListener('click', event => {
                const modal = document.getElementById('share-modal');
                if (event.target === modal) {
                    closeShareModal();
                }
            });            

            // 공연이 없을 경우 메시지 표시
            if (upcomingContainer.innerHTML.trim() === '') {
                upcomingContainer.innerHTML = '<p>예정된 공연이 없습니다.</p>';
            }
            if (pastContainer.innerHTML.trim() === '') {
                pastContainer.innerHTML = '<p>지난 공연이 없습니다.</p>';
            }
        })
        .catch(error => console.error('Error loading concert data:', error));

    // 탭 전환 기능
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const target = button.dataset.tab;
            document.querySelectorAll('.concert-list').forEach(list => list.style.display = 'none');
            document.getElementById(target).style.display = 'grid';
        });
    });
});
