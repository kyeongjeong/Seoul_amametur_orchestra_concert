document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var detailsEl = document.getElementById('monthly-concerts');

    // FullCalendar 초기화
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        initialDate: new Date().toISOString().split('T')[0],
        navLinks: false,
        businessHours: true,
        editable: false,
        selectable: false,
        events: function (fetchInfo, successCallback, failureCallback) {
            loadConcertData(fetchInfo.start, fetchInfo.end, successCallback, failureCallback);
        },
        datesSet: function (info) {
            // 현재 달의 공연을 새로 로드
            loadConcertData(info.start, info.end, function (events) {
                calendar.removeAllEvents();
                calendar.addEventSource(events);
            });
        },
        eventClick: function (info) {
            // 이벤트 클릭 시 상세 페이지로 이동
            const eventProps = info.event.extendedProps;
            if (eventProps.link) {
                window.location.href = eventProps.link;
            }
        },
        dayCellDidMount: function (info) {
            // 날짜 클릭 비활성화
            info.el.style.pointerEvents = 'none';
            info.el.style.cursor = 'default';
        }
    });

    calendar.render();

    // JSON 데이터 로드 및 필터링
    function loadConcertData(start, end, successCallback, failureCallback) {
        fetch('../../data/concert_infos_date.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('JSON 데이터를 불러오는 데 실패했습니다.');
                }
                return response.json();
            })
            .then(data => {
                // 현재 달에 맞는 공연만 필터링
                const filteredConcerts = data.filter(concert => {
                    const concertDate = new Date(concert.date);
                    return concertDate >= start && concertDate <= end;
                });

                // FullCalendar 이벤트로 변환
                const events = filteredConcerts.map(concert => ({
                    title: concert.title,
                    start: concert.date,
                    extendedProps: {
                        link: `../../pages/classicConcertPages/${concert.link}`,
                        university: concert.university,
                        club: concert.club,
                        time: concert.time,
                        location: concert.location,
                        image: concert.image
                    },
                    color: 'orange',
                    textColor: '#FFFFFF'
                }));

                // "Monthly Concert"에 페이징 추가
                paginateMonthlyConcerts(filteredConcerts, 1, 4);

                successCallback(events);
            })
            .catch(error => {
                console.error('JSON 데이터 로드 중 오류:', error);
                if (failureCallback) failureCallback(error);
            });
    }

    // 페이징 처리 함수
    function paginateMonthlyConcerts(concerts, page = 1, itemsPerPage = 4) {
        const totalItems = concerts.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = concerts.slice(startIndex, endIndex);

        // 기존 내용 초기화
        detailsEl.innerHTML = '<div class="concert-grid"></div>';

        // 콘서트 추가
        const gridEl = detailsEl.querySelector('.concert-grid');
        paginatedItems.forEach(concert => {
            gridEl.innerHTML += `
                <div class="concert-item">
                    <img src="${concert.image}" alt="${concert.title}">
                    <h3>${concert.title}</h3>
                    <p><strong>학교:</strong> ${concert.university}</p>
                    <p><strong>일시:</strong> ${concert.date} ${concert.time}</p>
                    <p><strong>장소:</strong> ${concert.location}</p>
                    <a href="../../pages/classicConcertPages/${concert.link}" class="detail-link">공연 상세보기</a>
                </div>
            `;
        });

        // 페이징 버튼 생성
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination');
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => paginateMonthlyConcerts(concerts, i, itemsPerPage));
            if (i === page) button.classList.add('active');
            paginationContainer.appendChild(button);
        }

        // 페이징 버튼 추가
        detailsEl.appendChild(paginationContainer);
    }
});
