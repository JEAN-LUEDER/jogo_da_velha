// Constantes do jogo -- parte logica do jogo--
// combinaçoes possiveis vencedoras
const PLAYER_1 = "X";
const PLAYER_2 = "O";
const WINNING_COMBINATIONS = [
  ["00", "01", "02"], // Linhas horizontais
  ["10", "11", "12"],
  ["20", "21", "22"],
  ["00", "10", "20"], // Linhas verticais
  ["01", "11", "21"],
  ["02", "12", "22"],
  ["00", "11", "22"], // Linhas diagonais
  ["02", "11", "20"]
];

// Variáveis do jogo
let currentPlayer = PLAYER_1;
let gameBoard = createGameBoard();
let gameOver = false;
let winningCells = null;
let winningRow = null;
let movesCouter = 0;

// Função para criar o tabuleiro do jogo
function createGameBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
}

// Função para alternar o jogador atual
function togglePlayer() {
  currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
}

// Função para processar o movimento do jogador
function makeMove(row, col) {
  if (!gameOver && gameBoard[row][col] === "") {
    gameBoard[row][col] = currentPlayer;
    document.getElementById("cell" + row + col).innerHTML = currentPlayer;
    movesCouter++;

    if (checkWinner()) {
      gameOver = true;
      setTimeout(function() {
        alert("Jogador " + currentPlayer + " venceu!");
      }, 100);
      resetGame();
    } else if (movesCouter === 9) {
      gameOver = true;
      setTimeout(function() {
        alert("Empate!");
        resetGame();
      }, 100);
    } else{
      togglePlayer();
    }
  }
}


// Função para verificar se há um vencedor
function checkWinner() {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (
      gameBoard[a.charAt(0)][a.charAt(1)] === currentPlayer &&
      gameBoard[b.charAt(0)][b.charAt(1)] === currentPlayer &&
      gameBoard[c.charAt(0)][c.charAt(1)] === currentPlayer
    ) {
      winningRow = a.charAt(0);
      return true;
    }
  }
  return false;
}

// Função para reiniciar o jogo
function resetGame() {
  gameBoard = createGameBoard();
  currentPlayer = PLAYER_1;
  gameOver = false;
  winningCells = null;
  winningRow = null;
  movesCouter = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j] = "";
      document.getElementById("cell" + i + j).innerHTML = "";
    }
  }
  
  
  if (winningRow !== null) {
    document.getElementById(winningRow).classList.remove("winning-row");
    winningRow = null;
  }
  gameOver = false;
}

// Eventos de clique para as células da tabela
document.querySelectorAll("td").forEach(function(cell) {
  cell.addEventListener("click", function() {
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;
    makeMove(row, col);
  });
});

// Evento de clique para o botão de reinício
document.getElementById("reset-button").addEventListener("click", resetGame);

