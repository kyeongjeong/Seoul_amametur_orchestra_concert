fetch('concerts.json')
    .then(response => response.json())
    .then(data => {
        const itemsPerPage = 3;
        let currentPage = 1;
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const pageGroupSize = 5;
        
        // 페이지 그룹의 첫 번째와 마지막 그룹 번호 추적
        let currentPageGroup = 1;
        const totalPageGroups = Math.ceil(totalPages / pageGroupSize);

        const concertList = document.getElementById('concert-list');
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');
        const pageNumbersContainer = document.getElementById('page-numbers');

        // 데이터 렌더링 함수
        function renderPage(page) {
            concertList.innerHTML = ''; // 기존 콘텐츠 초기화
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, data.length);

            for (let i = startIndex; i < endIndex; i++) {
                const concert = data[i];

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

                // 마지막이 아니라면 구분선 추가
                if (i < endIndex - 1) {
                    const dividingLine = document.createElement('div');
                    dividingLine.classList.add('dividing_line2');
                    concertList.appendChild(dividingLine);
                }
            }

            // 페이지 번호 렌더링
            renderPageNumbers();

            // 버튼 상태 업데이트
            prevButton.disabled = currentPageGroup === 1;
            nextButton.disabled = currentPageGroup === totalPageGroups;
        }

        // 페이지 번호 렌더링 함수
        function renderPageNumbers() {
            pageNumbersContainer.innerHTML = ''; // 기존 페이지 번호 초기화
            const startPage = (currentPageGroup - 1) * pageGroupSize + 1;
            const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

            // 페이지 버튼 생성
            for (let i = startPage; i <= endPage; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.classList.add('page-button');
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }

                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    renderPage(currentPage);
                });

                pageNumbersContainer.appendChild(pageButton);
            }
        }

        // 이전/다음 버튼 이벤트 리스너
        prevButton.addEventListener('click', () => {
            if (currentPageGroup > 1) {
                currentPageGroup--;
                currentPage = currentPageGroup * pageGroupSize; // 이전 그룹의 마지막 페이지로 이동
                renderPage(currentPage);
            }
        });        

        nextButton.addEventListener('click', () => {
            if (currentPageGroup < totalPageGroups) {
                currentPageGroup++;
                currentPage = (currentPageGroup - 1) * pageGroupSize + 1; // 다음 그룹의 첫 페이지로 이동
                renderPage(currentPage);
            }
        });

        // 초기 렌더링
        renderPage(currentPage);
    })
    .catch(error => console.error('Error loading concert data:', error));