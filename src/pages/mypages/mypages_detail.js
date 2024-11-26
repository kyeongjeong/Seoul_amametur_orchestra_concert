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