const searchBar = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");

// 검색 데이터 (동아리명 및 소속대학교명)
const clubs = [
    { name: "MDOP", university: "경희대학교", url: "../orchestraClubPages/index.html" },
    { name: "ACES", university: "서강대학교", url: "../orchestraClubPages/index.html" },
    { name: "SNUP", university: "서울대학교", url: "../orchestraClubPages/index.html" },
    { name: "SKKUO", university: "성균관대학교", url: "../orchestraClubPages/index.html" },
    { name: "HANAKLANG", university: "한양대학교", url: "../orchestraClubPages/index.html" }
];

// 검색 결과 업데이트
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    searchResults.innerHTML = ""; // 기존 검색 결과 초기화

    if (query) {
        const filteredClubs = clubs.filter(
            club =>
                club.name.toLowerCase().includes(query) ||
                club.university.toLowerCase().includes(query)
        );

        filteredClubs.forEach(club => {
            const listItem = document.createElement("li");
            listItem.textContent = `${club.name} (${club.university})`;
            listItem.addEventListener("click", () => {
                window.location.href = club.url; // 세부 페이지로 이동
            });
            searchResults.appendChild(listItem);
        });
    }
});
