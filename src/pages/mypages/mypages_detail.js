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
                const concertDate = new Date(concert.date); // YYYY-MM-DD 형식을 그대로 사용

                if (isNaN(concertDate)) {
                    console.error(`Invalid date for concert: ${concert.title}`);
                    return;
                }

                const heartKey = `${concert.idx}`; // idx를 로컬 스토리지 키로 활용

                // 하트가 눌린 공연만 표시
                if (heartState[heartKey]) {
                    const concertCard = `
                        <div class="history-item">
                            <div class="history-image">
                                <img src="${concert.image}" alt="${concert.title}">
                            </div>
                            <div class="reservation-info">
                                <h4><u>${concert.genre.join(', ')}</u></h4>
                                <h3>${concert.title}</h3>
                                <p>${concert.date}<br>${concert.location}</p>
                                <a href="../classicConcertPages/${concert.link}" class="btn-more">세부 정보</a>
                                <button class="heart-button" data-heart-id="${concert.idx}">
                                    <i class="${heartState[heartKey] ? 'fas liked fa-heart' : 'far fa-heart'}"></i>
                                </button>
                            </div>
                        </div>
                    `;

                    // 공연 날짜에 따라 분류
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
