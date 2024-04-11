<template>
  <div>
    <h1>Jogo Resta Um</h1>
    <div>
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <button
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          @click="handleCellClick(rowIndex, colIndex)"
          :disabled="cell === ''"
          :class="[
            {
              selected:
                cell !== '' &&
                cell === 1 &&
                selectedCell &&
                selectedCell.row === rowIndex &&
                selectedCell.col === colIndex,
            },
            cell !== '' ? 'cell' : 'noCell',
          ]"
        >
          {{ cell }}
        </button>
      </div>
    </div>
    <div v-if="gameWinner">Congratulations, you win!</div>
    <div v-else-if="gameOver">Game over, play again?</div>
    <button v-if="gameWinner || gameOver" @click="restartGame">Restart</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const board = ref([
  ["", "", 1, 1, 1, "", ""],
  ["", "", 1, 1, 1, "", ""],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  ["", "", 1, 1, 1, "", ""],
  ["", "", 1, 1, 1, "", ""],
]);

const selectedCell = ref(null);
const gameWinner = ref(false);
const gameOver = ref(false);

const handleCellClick = (row: number, col: number) => {
  if (selectedCell.value) {
    if (isValidMore(selectedCell.value.row, selectedCell.value.col, row, col)) {
      // Executar o movimento se for válido.
      executeMove(selectedCell.value.row, selectedCell.value.col, row, col);
      selectedCell.value = null;
      checkGameOver();
      // Movimento inválido, desselecionar a célula.
    } else {
      selectedCell.value = null;
    }
  } else {
    // Selecione a célula se ainda não estiver selecionada.
    selectedCell.value = { row, col };
  }
  if (checkGameLost()) {
    gameOver.value = true;
  }
};

const isValidMore = (sR: number, sC: number, eR: number, eC: number) => {
  // Verifica a validade de um movimento
  return (
    ((Math.abs(sR - eR) === 2 && sC === eC) ||
      (Math.abs(sC - eC) === 2 && sR === eR)) &&
    board.value[(sR + eR) / 2][(sC + eC) / 2] === 1 &&
    board.value[eR][eC] === 0
  );
};

// Executa o movimento, atualizando o tabuleiro.
const executeMove = (sR: number, sC: number, eR: number, eC: number) => {
  board.value[(sR + eR) / 2][(sC + eC) / 2] = 0;
  board.value[sR][sC] = 0;
  board.value[eR][eC] = 1;
};

const checkGameLost = () => {
  for (let i = 0; i < board.value.length; i++) {
    for (let j = 0; j < board.value.length; j++) {
      if (board.value[i][j] === 1) {
        if (
          (i >= 2 &&
            board.value[i - 1][j] === 1 &&
            board.value[i - 2][j] === 0) || // Movimento para cima
          (i <= board.value.length - 3 &&
            board.value[i + 1][j] === 1 &&
            board.value[i + 2][j] === 0) || // Movimento para baixo
          (j >= 2 &&
            board.value[i][j - 1] === 1 &&
            board.value[i][j - 2] === 0) || // Movimento para esquerda
          (j <= board.value[i].length - 3 &&
            board.value[i][j + 1] === 1 &&
            board.value[i][j + 2] === 0) // Movimento para direita
        ) {
          // Se houver um movimento válido para esta peça, o jogo não está perdido
          return false;
        }
      }
    }
  }
  // Se nenhum movimento válido foi encontrado para qualquer peça, o jogo está perdido
  return true;
};

const checkGameOver = () => {
  let remainingPieces = 0;
  for (let row of board.value) {
    remainingPieces += row.filter((cell) => cell === 1).length;
  }
  gameWinner.value = remainingPieces === 1;
};

const restartGame = () => {
  // Reinicializa o estado do jogo
  board.value = [
    ["", "", 1, 1, 1, "", ""],
    ["", "", 1, 1, 1, "", ""],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    ["", "", 1, 1, 1, "", ""],
    ["", "", 1, 1, 1, "", ""],
  ];
  selectedCell.value = null;
  gameWinner.value = false;
  gameOver.value = false;
};
</script>

<style scoped>
.row {
  display: flex;
}

.cell,
.selected {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.cell {
  background-color: lightblue; /* Cor de fundo para células com '1' */
}

.selected {
  background-color: yellow; /* Cor de fundo para células selecionadas */
}

.noCell {
  width: 30px;
  height: 30px;
}
</style>
