// Seleciona todas as células da tabela
const cells = document.querySelectorAll("td");

// Inicia o jogo com o jogador X
let currentPlayer = "X";

// Adiciona um evento de clique a cada célula
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // Verifica se a célula está vazia
    if (cell.textContent === "") {
      // Marca a célula com o símbolo do jogador atual
      cell.textContent = currentPlayer;

      // Verifica se o jogador atual ganhou o jogo
      if (checkWin()) {
        alert(`O jogador ${currentPlayer} ganhou!`);
        resetGame();
      } else if (checkTie()) { // Verifica se houve empate
        alert("O jogo terminou em empate!");
        resetGame();
      } else {
        // Alterna o jogador atual
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

// Verifica se um jogador ganhou o jogo
function checkWin() {
  const winConditions = [
    // Condições de vitória horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Condições de vitória vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Condições de vitória diagonal
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Verifica cada condição de vitória
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (cells[a].textContent === currentPlayer &&
        cells[b].textContent === currentPlayer &&
        cells[c].textContent === currentPlayer) {
      return true; // Um jogador ganhou
    }
  }

  return false; // Nenhum jogador ganhou ainda
}

// Verifica se houve empate
function checkTie() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      return false; // Ainda existem células vazias
    }
  }

  return true; // Todas as células estão preenchidas
}

// Reinicia o jogo
function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  currentPlayer = "X";
}
