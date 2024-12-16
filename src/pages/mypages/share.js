// 카카오톡 SDK 초기화
if (typeof Kakao !== 'undefined') {
    Kakao.init('358d93b68ce97def61422b61869da9b6'); // 여기에 카카오톡 앱 키를 입력하세요.
    console.log(Kakao.isInitialized()); // SDK 초기화 상태 확인
}

// 공유 팝업 열기 함수
function openShareModal(concertData) {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'block';

    // 카카오톡 공유 버튼 설정
    const kakaoShareButton = document.getElementById('kakao-share-button');
    kakaoShareButton.onclick = () => {
        kakaoShare(concertData);
        closeShareModal(); // 팝업 닫기
    };
}

// 공유 팝업 닫기 함수
function closeShareModal() {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'none';
}

// 카카오톡 공유 함수
function kakaoShare(concertData) {
    if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: concertData.title || '공연 정보',
                description: '이번 연주회에 함께하세요!',
                imageUrl: concertData.image || `https://seoul-amateur-orchestra-club.vercel.app/default-image.jpg`,
                link: {
                    mobileWebUrl: `https://seoul-amateur-orchestra-club.vercel.app/${concertData.link}`,
                    webUrl: `https://seoul-amateur-orchestra-club.vercel.app/${concertData.link}`,
                },
            },
            buttons: [
                {
                    title: '자세히 보기',
                    link: {
                        mobileWebUrl: `https://seoul-amateur-orchestra-club.vercel.app/${concertData.link}`,
                        webUrl: `https://seoul-amateur-orchestra-club.vercel.app/${concertData.link}`,
                    },
                },
            ],
        });
    } else {
        console.error('Kakao SDK not initialized.');
    }
}

// 클립보드에 링크 복사 함수
function clipboardShare(concertData) {
    const tmpTextarea = document.createElement('textarea');
    tmpTextarea.value = `https://seoul-amateur-orchestra-club.vercel.app/${concertData.link}`; // 공연 세부 페이지의 URL 복사
    tmpTextarea.setAttribute('readonly', '');
    tmpTextarea.style.position = 'absolute';
    tmpTextarea.style.left = '-9999px';
    document.body.appendChild(tmpTextarea);
    tmpTextarea.select();
    tmpTextarea.setSelectionRange(0, 9999); // 셀렉트 범위 설정
    const successChk = document.execCommand('copy');
    document.body.removeChild(tmpTextarea);

    // 클립보드 성공 여부 확인
    if (!successChk) {
        alert('클립보드 복사에 실패하였습니다.');
    } else {
        alert('링크가 클립보드에 복사되었습니다!');
    }
}

// 이벤트 리스너로 공유 버튼 연결
document.addEventListener('DOMContentLoaded', () => {
    // 공유 버튼 클릭 시 팝업 열기
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('click', () => {
            const concertData = {
                title: document.getElementById('concert-title').textContent,
                image: document.getElementById('concert-image').src,
                link: document.getElementById('concert-link').textContent
            };
            openShareModal(concertData);
        });
    }

    // 팝업 닫기 버튼 연결
    const closeModalButton = document.getElementById('close-modal');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeShareModal);
    }

    // 카카오톡 공유 버튼 클릭
    const kakaoShareButton = document.getElementById('kakao-share-button');
    if (kakaoShareButton) {
        kakaoShareButton.addEventListener('click', () => {
            const concertData = {
                title: document.getElementById('concert-title').textContent,
                image: document.getElementById('concert-image').src,
                link: document.getElementById('concert-link').textContent
            };
            kakaoShare(concertData);
            closeShareModal(); // 공유 후 팝업 닫기
        });
    }

    // 클립보드 공유 버튼 클릭
    const clipboardShareButton = document.getElementById('clipboard-share-button');
    if (clipboardShareButton) {
        clipboardShareButton.addEventListener('click', () => {
            const concertData = {
                link: document.getElementById('concert-link').textContent
            };
            clipboardShare(concertData);
            closeShareModal(); // 공유 후 팝업 닫기
        });
    }

    // 팝업 바깥 클릭 시 닫기
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('share-modal');
        if (event.target === modal) {
            closeShareModal();
        }
    });
});
