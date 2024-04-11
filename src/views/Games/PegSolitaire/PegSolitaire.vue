<template>
  <div class="p-4 mx-auto md:w-1/2 text-center">
    <div class="flex items-center justify-center">
      <h1 class="text-3xl font-bold mr-4">Game Peg Solitaire</h1>
      <Information
        @click="showInstructions"
        class="animate-bounce cursor-pointer"
      />
    </div>
    <div class="text-left mb-4">
      <!-- Modal de instruções -->
      <ModalView
        isClose
        :isOpen="showModal"
        @close="showModal = false"
        dialogHeight="auto"
        dialogWidth="auto"
        :title="$t('pegSolitaire.title')"
      >
        <div class="text-left">
          <p class="mb-4">{{ $t("pegSolitaire.text1") }}</p>
          <p class="mb-4">
            {{ $t("pegSolitaire.text2") }}
          </p>
          <p class="mb-4">
            {{ $t("pegSolitaire.text3") }}
          </p>
        </div>
      </ModalView>
    </div>
    <div class="justify-center">
      <div
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
        class="flex md:w-1/2 mx-auto justify-center"
      >
        <button
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          @click="handleCellClick(rowIndex, colIndex)"
          :disabled="cell === ''"
          class="h-12 w-12"
          :class="[
            cell !== '' ? 'bg-blue-200 border-2' : '',
            cell === 1 &&
            selectedCell &&
            selectedCell.row === rowIndex &&
            selectedCell.col === colIndex
              ? 'bg-yellow-300'
              : '',
          ]"
        >
          <div
            v-if="cell === 1"
            class="h-1/2 w-1/2 m-auto rounded-full bg-black"
          ></div>
        </button>
      </div>
    </div>
    <div class="text-green-500 font-semibold mt-4" v-if="gameWinner">
      Congratulations, you win!
    </div>
    <div class="text-red-500 font-semibold mt-4" v-else-if="gameOver">
      Game over, play again?
    </div>
    <button
      class="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
      v-if="gameWinner || gameOver"
      @click="restartGame"
    >
      Restart
    </button>
  </div>
</template>

<script setup lang="ts">
import ModalView from "@/components/ModalView.vue";
import { ref } from "vue";
import Information from "vue-material-design-icons/Information.vue";

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
const showModal = ref(false);

const showInstructions = () => {
  showModal.value = true;
};

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
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
