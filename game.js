// Inicjalizacja canvasa
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Ustawienia gry
var gameSettings = {
  width: 800,
  height: 450,
  fps: 60,
  backgroundColor: "#f1f1f1",
  playerSpeed: 5,
  playerSize: 10,
  playerColor: "#ff0000",
  obstacleSpeed: 2,
  obstacleColor: "#000000",
  bonusSpeed: 3,
  bonusColor: "#00ff00",
  bonusSize: 10,
  obstacleSize: 10,
  wallSize: 10,
};

// Inicjalizacja gracza
var player = {
  x: Math.random() * (gameSettings.width - gameSettings.playerSize),
  y: Math.random() * (gameSettings.height - gameSettings.playerSize),
  size: 10,
  color: gameSettings.playerColor,
  speed: gameSettings.playerSpeed,
  direction: "right",
  trail: [],
  collided: false,
};

// Inicjalizacja drugiego gracza
var player2 = {
  x: Math.random() * (gameSettings.width - gameSettings.playerSize),
  y: Math.random() * (gameSettings.height - gameSettings.playerSize),
  size: 10,
  color: "#0000ff", // Blue color for player 2
  speed: gameSettings.playerSpeed,
  direction: "right",
  trail: [],
  collided: false,
};

// Inicjalizacja bonusów i przeszkód
var bonuses = [];
var obstacles = [];

// Inicjalizacja punktów gracza
var scorePlayer1 = 0;
var scorePlayer2 = 0;

// Funkcja rysująca gracza
function drawPlayer() {
  ctx.fillStyle = player.color;
  for (var i = 0; i < player.trail.length; i++) {
    ctx.fillRect(
      player.trail[i].x,
      player.trail[i].y,
      player.size,
      player.size
    );
  }
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Funkcja rysująca drugiego gracza
function drawPlayer2() {
  ctx.fillStyle = player2.color;
  for (var i = 0; i < player2.trail.length; i++) {
    ctx.fillRect(
      player2.trail[i].x,
      player2.trail[i].y,
      player2.size,
      player2.size
    );
  }
  ctx.fillRect(player2.x, player2.y, player2.size, player2.size);
}

// Funkcja rysująca przeszkody
function drawObstacles() {
  for (var i = 0; i < obstacles.length; i++) {
    ctx.fillStyle = gameSettings.obstacleColor;
    ctx.fillRect(
      obstacles[i].x,
      obstacles[i].y,
      gameSettings.obstacleSize,
      gameSettings.obstacleSize
    );
  }
}

// Funkcja rysująca bonusy
function drawBonuses() {
  for (var i = 0; i < bonuses.length; i++) {
    ctx.fillStyle = gameSettings.bonusColor;
    ctx.fillRect(
      bonuses[i].x,
      bonuses[i].y,
      gameSettings.bonusSize,
      gameSettings.bonusSize
    );
  }
}

// Aktualizacja gracza
function updatePlayer() {
  if (player.direction == "left") {
    player.x -= player.speed;
  } else if (player.direction == "right") {
    player.x += player.speed;
  } else if (player.direction == "up") {
    player.y -= player.speed;
  } else if (player.direction == "down") {
    player.y += player.speed;
  }

  // Sprawdzenie kolizji z własnym śladem gracza
  for (var i = 1; i < player.trail.length - 1; i++) {
    if (
      player.x < player.trail[i - 1].x + player.size &&
      player.x + player.size > player.trail[i - 1].x &&
      player.y < player.trail[i - 1].y + player.size &&
      player.y + player.size > player.trail[i - 1].y
    ) {
      player.collided = true;
      break;
    }
  }

  // Sprawdzenie kolizji z drugim graczem
  for (var i = 0; i < player2.trail.length; i++) {
    if (
      player.x < player2.trail[i].x + player2.size &&
      player.x + player.size > player2.trail[i].x &&
      player.y < player2.trail[i].y + player2.size &&
      player.y + player.size > player2.trail[i].y
    ) {
      player.collided = true;
      break;
    }
  }
  player.trail.push({ x: player.x, y: player.y });

  if (
    player.x < gameSettings.wallSize - player.size ||
    player.x > gameSettings.width - gameSettings.wallSize ||
    player.y < gameSettings.wallSize - player.size ||
    player.y > gameSettings.height - gameSettings.wallSize ||
    player.collided == true
  ) {
    clearInterval(gameLoop);
    alert("Koniec gry! Wynik gracza1: " + scorePlayer1);
    return;
  }
}

// Aktualizacja drugiego gracza
function updatePlayer2() {
  if (player2.direction == "left") {
    player2.x -= player2.speed;
  } else if (player2.direction == "right") {
    player2.x += player2.speed;
  } else if (player2.direction == "up") {
    player2.y -= player2.speed;
  } else if (player2.direction == "down") {
    player2.y += player2.speed;
  }

  // Sprawdzenie kolizji z własnym śladem gracza
  for (var i = 1; i < player2.trail.length - 1; i++) {
    if (
      player2.x < player2.trail[i - 1].x + player2.size &&
      player2.x + player2.size > player2.trail[i - 1].x &&
      player2.y < player2.trail[i - 1].y + player2.size &&
      player2.y + player2.size > player2.trail[i - 1].y
    ) {
      player2.collided = true;
      break;
    }
  }

  // Sprawdzenie kolizji z pierwszym graczem
  for (var i = 0; i < player.trail.length; i++) {
    if (
      player2.x < player.trail[i].x + player.size &&
      player2.x + player2.size > player.trail[i].x &&
      player2.y < player.trail[i].y + player.size &&
      player2.y + player2.size > player.trail[i].y
    ) {
      player2.collided = true;
      break;
    }
  }

  player2.trail.push({ x: player2.x, y: player2.y });

  if (
    player2.x < gameSettings.wallSize - player2.size ||
    player2.x > gameSettings.width - gameSettings.wallSize ||
    player2.y < gameSettings.wallSize - player2.size ||
    player2.y > gameSettings.height - gameSettings.wallSize ||
    player2.collided == true
  ) {
    clearInterval(gameLoop);
    alert("Koniec gry! Wynik gracza2: " + scorePlayer2);
    return;
  }
}

// Funkcja rysująca grę
function drawGame() {
  ctx.clearRect(0, 0, gameSettings.width, gameSettings.height);
  ctx.fillStyle = gameSettings.backgroundColor;
  ctx.fillRect(0, 0, gameSettings.width, gameSettings.height);
  drawPlayer();
  drawPlayer2();
  drawObstacles();
  drawBonuses();
}

// Funkcja aktualizująca grę
function update() {
  updatePlayer2();
  updatePlayer();
  drawGame();

  // Sprawdzenie kolizji z bonusami
  for (var i = 0; i < bonuses.length; i++) {
    if (
      player.x < bonuses[i].x + gameSettings.bonusSize &&
      player.x + player.size > bonuses[i].x &&
      player.y < bonuses[i].y + gameSettings.bonusSize &&
      player.y + player.size > bonuses[i].y
    ) {
      scorePlayer1++;
      bonuses.splice(i, 1);
      break;
    }
  }

  // Sprawdzenie kolizji z drugim graczem
  if (
    player.x < player2.x + player2.size &&
    player.x + player.size > player2.x &&
    player.y < player2.y + player2.size &&
    player.y + player.size > player2.y
  ) {
    player.collided = true;
    player2.collided = true;
  }

  // Sprawdzenie kolizji z przeszkodami
  for (var i = 0; i < obstacles.length; i++) {
    if (
      player.x < obstacles[i].x + gameSettings.obstacleSize &&
      player.x + player.size > obstacles[i].x &&
      player.y < obstacles[i].y + gameSettings.obstacleSize &&
      player.y + player.size > obstacles[i].y
    ) {
      clearInterval(gameLoop);
      alert("Koniec gry! Wynik gracza1: " + scorePlayer1);
      return;
    }
  }

  // Sprawdzenie kolizji drugiego gracza z przeszkodami
  for (var i = 0; i < obstacles.length; i++) {
    if (
      player2.x < obstacles[i].x + gameSettings.obstacleSize &&
      player2.x + player2.size > obstacles[i].x &&
      player2.y < obstacles[i].y + gameSettings.obstacleSize &&
      player2.y + player2.size > obstacles[i].y
    ) {
      clearInterval(gameLoop);
      alert("Koniec gry! Wynik gracza2: " + scorePlayer1);
      return;
    }
  }

  // Dodanie nowych bonusów i przeszkód
  if (Math.random() < 0.01) {
    bonuses.push({
      x: Math.random() * (gameSettings.width - gameSettings.bonusSize),
      y: Math.random() * (gameSettings.height - gameSettings.bonusSize),
      speed: gameSettings.bonusSpeed,
    });
  }
  if (Math.random() < 0.01) {
    obstacles.push({
      x: Math.random() * (gameSettings.width - gameSettings.obstacleSize),
      y: Math.random() * (gameSettings.height - gameSettings.obstacleSize),
      speed: gameSettings.obstacleSpeed,
    });
  }
}

// Obsługa klawiszy
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    player.direction = "left";
  } else if (event.keyCode == 39) {
    player.direction = "right";
  } else if (event.keyCode == 38) {
    player.direction = "up";
  } else if (event.keyCode == 40) {
    player.direction = "down";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 65) {
    player2.direction = "left";
  } else if (event.keyCode == 68) {
    player2.direction = "right";
  } else if (event.keyCode == 87) {
    player2.direction = "up";
  } else if (event.keyCode == 83) {
    player2.direction = "down";
  }
});

// Uruchomienie gry
var gameLoop = setInterval(update, 1000 / gameSettings.fps);
