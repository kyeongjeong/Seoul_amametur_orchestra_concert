// 카카오톡 SDK 초기화
if (typeof Kakao !== 'undefined') {
    Kakao.init('358d93b68ce97def61422b61869da9b6');
    console.log(Kakao.isInitialized()); // SDK 초기화 상태 확인
}

// 공유 팝업 열기 함수
function openShareModal() {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'block';
}

// 공유 팝업 닫기 함수
function closeShareModal() {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'none';
}

// 클립보드에 링크 복사 함수
function clipboardShare(link) {
    const tmpTextarea = document.createElement('textarea');
    tmpTextarea.value = link; // 인자로 전달된 링크 복사
    tmpTextarea.setAttribute('readonly', '');
    tmpTextarea.style.position = 'absolute';
    tmpTextarea.style.left = '-9999px';
    document.body.appendChild(tmpTextarea);
    tmpTextarea.select();
    tmpTextarea.setSelectionRange(0, 9999);
    document.execCommand('copy');
    document.body.removeChild(tmpTextarea);

    alert("링크가 클립보드에 복사되었습니다!");
}

// 이벤트 리스너로 공유 버튼 연결
document.addEventListener('DOMContentLoaded', () => {
    // 공유 버튼 클릭 시 팝업 열기
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('click', openShareModal);
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
            const modal = document.getElementById('share-modal');
            const title = modal.dataset.title;
            const image = modal.dataset.image;
            const link = modal.dataset.link;
            const description = modal.dataset.description;

            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: title,
                    description: description,
                    imageUrl: image,
                    link: {
                        mobileWebUrl: link,
                        webUrl: link
                    }
                },
                buttons: [
                    {
                        title: '자세히 보기',
                        link: {
                            mobileWebUrl: link,
                            webUrl: link
                        }
                    }
                ]
            });
            closeShareModal();
        });
    }

    // 클립보드 공유 버튼 클릭
    const clipboardShareButton = document.getElementById('clipboard-share-button');
    if (clipboardShareButton) {
        clipboardShareButton.addEventListener('click', () => {
            const modal = document.getElementById('share-modal');
            const link = modal.dataset.link; // 팝업에 저장된 링크 사용
            clipboardShare(link);
            closeShareModal();
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
