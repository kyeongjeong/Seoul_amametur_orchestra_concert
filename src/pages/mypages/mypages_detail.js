document.addEventListener('DOMContentLoaded', () => {
    
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