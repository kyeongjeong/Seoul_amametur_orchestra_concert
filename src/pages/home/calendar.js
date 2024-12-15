document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var detailsEl = document.getElementById('monthly-concerts');

    // 현재 날짜로 초기화
    var today = new Date().toISOString().split('T')[0];

    // FullCalendar 초기화
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        initialDate: today,
        navLinks: true,
        businessHours: true,
        editable: false,
        selectable: false,
        events: function(fetchInfo, successCallback, failureCallback) {
            // JSON 데이터 로드
            fetch('../../data/concert_infos_date.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('JSON 데이터를 불러오는 데 실패했습니다.');
                    }
                    return response.json();
                })
                .then(data => {
                    // JSON 데이터를 FullCalendar 이벤트 형식으로 변환
                    const events = data.map(concert => ({
                        title: concert.title,
                        start: concert.date,
                        extendedProps: {
                            link: concert.link,
                            university: concert.university,
                            club: concert.club,
                            time: concert.time,
                            location: concert.location,
                            image: concert.image
                        }
                    }));

                    // "Monthly Concert"에 표시
                    displayMonthlyConcerts(data, fetchInfo.startStr, fetchInfo.endStr);

                    // 이벤트 로드 성공
                    successCallback(events);
                })
                .catch(error => {
                    console.error('JSON 데이터 로드 중 오류:', error);
                    failureCallback(error);
                });
        },
        eventClick: function(info) {
            // 이벤트 클릭 시 상세 페이지로 이동
            const eventProps = info.event.extendedProps;
            if (eventProps.link) {
                window.location.href = eventProps.link;
            }
        }
    });

    calendar.render();

    // Monthly Concerts 표시 함수
    function displayMonthlyConcerts(data, startDate, endDate) {
        // 기존 데이터 초기화
        detailsEl.innerHTML = '';

        // 선택된 월에 해당하는 공연 필터링
        const monthlyConcerts = data.filter(concert => {
            const concertDate = new Date(concert.date);
            return concertDate >= new Date(startDate) && concertDate <= new Date(endDate);
        });

        if (monthlyConcerts.length > 0) {
            monthlyConcerts.forEach(concert => {
                detailsEl.innerHTML += `
                    <div class="concert-item">
                        <img src="${concert.image}" alt="${concert.title}">
                        <h3>${concert.title}</h3>
                        <p><strong>학교:</strong> ${concert.university}</p>
                        <p><strong>일시:</strong> ${concert.date} ${concert.time}</p>
                        <p><strong>장소:</strong> ${concert.location}</p>
                        <a href="${concert.link}" class="detail-link">공연 상세보기</a>
                    </div>
                `;
            });
        } else {
            detailsEl.innerHTML = '<p>이번 달에 공연이 없습니다.</p>';
        }
    }
});
