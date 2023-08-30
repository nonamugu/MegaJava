document.addEventListener("DOMContentLoaded", function () {
    const mbtiSelect = document.getElementById("mbtiSelect");
    const recommendButton = document.getElementById("recommendButton");
    const recommendationsDiv = document.getElementById("recommendations");

    recommendButton.addEventListener("click", function () {
        const selectedMbti = mbtiSelect.value;
        const recommendedGames = getRecommendedGames(selectedMbti);

        recommendationsDiv.innerHTML = "";
        recommendedGames.forEach(game => {
            const gameName = game.game_name;
            const gameImage = game.image;
            
            recommendationsDiv.innerHTML += `
                <div class="game">
                    <img src="${gameImage}" alt="${gameName} 이미지">
                    <p id="text">${gameName}</p>
                </div>`;
        });
    });
    // 가상의 추천 게임 데이터를 반환하는 함수
    function getRecommendedGames(mbti) {
        const gameData = {
            "ESTP": [
                { "game_name": "StarCraft II",
                "image": 'image/StarCraft 2.png' },
                { "game_name": "Overwatch",
                "image": 'image/Overwatch.png' },
                { "game_name": "Counter-Strike: Global Offensive",
                "image": 'image/Counter Strike.png' }
            ],
            "ESFP": [
                { "game_name": "Just Dance",
                "image": 'image/Just Dance.png'},
                { "game_name": "Mario Kart 8",
                "image": 'image/Mario Kart 8.png' },
                { "game_name": "FIFA",
                "image": 'image/FIFA.png' }
            ],
            "ENTP": [
                { "game_name": "Portal 2",
                "image": "image/Portal 2.png" },
                { "game_name": "Civilzation VI",
                "image": 'image/Civilzation 4.png' },
                { "game_name": "Factorio",
                "image": 'image/Factorio.png' }
            ],
            "ENFP": [
                { "game_name": "The Legend of Zelda: Breath of the Wild",
                "image": 'image/The Legend of Zelda.png' },
                { "game_name": "Animal Crossing: New Horizons",
                "image": 'image/Animal Crossing.png' },
                { "game_name": "Sims 4",
                "image": 'image/Sims 4.png' }
            ]
        };

        return gameData[mbti] || [];
    }
});
