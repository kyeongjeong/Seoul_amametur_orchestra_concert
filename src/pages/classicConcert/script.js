// JSON 데이터 로드
fetch('concerts.json')
    .then(response => response.json())
    .then(data => {
        const concertList = document.querySelector('.concert-list');

        // 각 콘서트 정보를 동적으로 생성
        data.forEach((concert, index) => {
            // 콘서트 아이템 생성
            const concertItem = document.createElement('div');
            concertItem.classList.add('concert-item');

            concertItem.innerHTML = `
                <div class="concert-image"></div>
                <div class="concert-details">
                    <h2 class="concert-title">${concert.university} ${concert.club}</h2>
                    <p class="concert-date">날짜: ${concert.date}</p>
                    <p class="concert-time">일시: ${concert.time}</p>
                    <p class="concert-location">장소: ${concert.location}</p>
                    <button class="details-button">세부 정보</button>
                </div>
            `;

            concertList.appendChild(concertItem);

            // 마지막 아이템이 아니면 dividing_line2 추가
            if (index < data.length - 1) {
                const dividingLine = document.createElement('div');
                dividingLine.classList.add('dividing_line2');
                concertList.appendChild(dividingLine);
            }
        });
    })
    .catch(error => console.error('Error loading concert data:', error));