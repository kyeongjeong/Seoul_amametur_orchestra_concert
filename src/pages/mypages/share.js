// 카카오톡 SDK 초기화
if (typeof Kakao !== 'undefined') {
    Kakao.init('08144bd4bb478060dc34ae7834e7bd1d');
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
                imageUrl: concertData.image || `${window.location.origin}/default-image.jpg`,
                link: {
                    mobileWebUrl: `${window.location.origin}/${concertData.link}`,
                    webUrl: `${window.location.origin}/${concertData.link}`,
                },
            },
            buttons: [
                {
                    title: '자세히 보기',
                    link: {
                        mobileWebUrl: `${window.location.origin}/${concertData.link}`,
                        webUrl: `${window.location.origin}/${concertData.link}`,
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
    tmpTextarea.value = `${window.location.origin}/${concertData.link}`; // 공연 세부 페이지의 URL 복사
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

// 팝업 외부 클릭 시 닫기
window.addEventListener('click', (event) => {
    const modal = document.getElementById('share-modal');
    if (event.target === modal) {
        closeShareModal();
    }
});

// 공유 팝업 버튼 클릭 이벤트 추가
document.addEventListener('DOMContentLoaded', () => {
    const clipboardShareButton = document.getElementById('clipboard-share-button');
    if (clipboardShareButton) {
        clipboardShareButton.addEventListener('click', () => {
            const concertData = JSON.parse(clipboardShareButton.dataset.concert); // 공연 데이터 가져오기
            clipboardShare(concertData);
            closeShareModal(); // 공유 후 팝업 닫기
        });
    }
});
