<template>
  <div class="min-h-screen md:min-h-0">
    <ModalView :isOpen="isModalOpen" :title="modalTitle">
      <template #description>
        <div
          v-if="hasWon"
          class="flex gap-[9px] items-center justify-center md:gao-6"
          :class="turn === 'X' ? 'text-black' : ''"
        >
          <XIcon v-if="turn === 'X'" class="w-7 md:w-16" /><OIcon
            v-else
            class="w-7 md:w-16"
          /><span>takes the round</span>
        </div>
        <div v-else-if="hasTied">Round Tied</div>
        <div v-else>Restart Game?</div>
      </template>
      <button
        class="bg-zinc-300 rounded-2xl px-4 pt-[15px] pb-[17px] mr-4 md:btn"
        @click="backHome"
      >
        {{ wannaRestart ? "No, cancel" : "Quit" }}
      </button>
      <button
        class="bg-amber-400 rounded-2xl px-4 pt-[15px] pb-[17px] mr-4 md:btn"
        @click="nextRound"
      >
        {{ wannaRestart ? "Yes, restart" : "Next round" }}
      </button>
    </ModalView>
    <header class="grid grid-cols-3 items-center gap-5 mb-16 md:mb-5">
      <button
        @click="emit('back')"
        class="class-restart bg-zinc-300 class-restart w-10 aspect-square self-start md:btn md:btn md:w-[52px] rounded-2xl"
      >
        <ArrowLeftBold class="w-4 md:w-5" />
      </button>
      <div
        class="class-restart p-[9px] pb-[13px] flex items-center justify-center gap-[9px] uppercase font-bold text-sm md:text-base md:gap-[13px] md:p-[13px] md:pb-[19px]"
      >
        <XIcon v-if="turn === 'X'" class="w-4 md:w-5" />
        <OIcon v-else class="w-4 md:w-5" />
        <span class="leading-none">Turn</span>
      </div>
      <button
        class="bg-zinc-300 class-restart w-10 aspect-square self-start ml-auto md:btn md:btn md:w-[52px] rounded-2xl"
        @click="handleRestart"
      >
        <Restart class="w-4 md:w-5" />
      </button>
      <p
        v-if="isCpuPlaying"
        class="absolute font-semibold left-1/2 -bottom-7 -translate-x-1/2 translate-y-1/2 w-full text-center md:-top-8 md:-translate-y-1/2 md:bottom-auto"
        :class="playerOneMark === 'X' ? 'text-slate-400' : 'text-slate-800'"
      >
        CPU is currenly playing...
      </p>
    </header>
    <main class="grid grid-cols-3 gap-5">
      <BoardBox
        v-for="(box, index) in board"
        :key="index"
        :mark="box"
        :index="index"
        :is-cpu-playing="isCpuPlaying"
        :highlighted="highlightedBoxes.includes(index)"
        :current-turn="turn"
        @update-board="updateBoard"
      />
    </main>
    <footer class="grid grid-cols-3 gap-5 mt-5">
      <div
        class="text-center bg-teal-400 text-black rounded-[10px] md:rounded-[15px] p-3"
      >
        <h2 class="uppercase text-sm font-medium">X ({{ whoIsX }})</h2>
        <span class="font-bold text-xl md:text-2xl">{{ nbWinsX }}</span>
      </div>
      <div
        class="text-center bg-blue-300 text-black rounded-[10px] md:rounded-[15px] p-3"
      >
        <h2 class="uppercase text-sm font-medium">Ties</h2>
        <span class="font-bold text-xl md:text-2xl">{{ nbTies }}</span>
      </div>
      <div
        class="text-center bg-amber-400 text-black rounded-[10px] md:rounded-[15px] p-3"
      >
        <h2 class="uppercase text-sm font-medium">O ({{ whoIsO }})</h2>
        <span class="font-bold text-xl md:text-2xl">{{ nbWinsO }}</span>
      </div>
    </footer>
    <button @click="sendMessage('Hello World')">Send Message</button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeftBold from "vue-material-design-icons/ArrowLeftBold.vue";
import { computed, defineEmits, defineProps, ref, onMounted } from "vue";
import XIcon from "@/components/icons/XIcon.vue";
import OIcon from "@/components/icons/OIcon.vue";
import Restart from "vue-material-design-icons/Restart.vue";
import BoardBox from "./BoardBox.vue";
import ModalView from "@/components/ModalView.vue";

const props = defineProps<{
  playerOneMark: string;
  opponent: string;
}>();

const emit = defineEmits<{
  (e: "back"): void;
}>();

const winning_rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = ref(["", "", "", "", "", "", "", "", ""]);
const turn = ref("X");
const nbWinsX = ref(0);
const nbWinsO = ref(0);
const nbTies = ref(0);
const hasWon = ref(false);
const hasTied = ref(false);
const wannaRestart = ref(false);
const isCpuPlaying = ref(false);
const isModalOpen = ref(false);
const highlightedBoxes = ref([-1, -1, -1]);
const socket = new WebSocket("ws://localhost:3000");

(async () => {
  if (props.opponent === "cpu" && props.playerOneMark !== turn.value) {
    await cpuTurn();
  }
})();

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === "move" && !hasWon.value && !hasTied.value) {
    const { index, player } = message.data;
    if (board.value[index] === "") {
      board.value[index] = player;
      checkIfWin();
      if (!hasWon.value && !hasTied.value) {
        turn.value = turn.value === "X" ? "O" : "X";
      }
    }
  }
};

async function updateBoard(index: number) {
  if (!isCpuPlaying.value) {
    board.value[index] = turn.value;
    checkIfWin();
    if (!hasWon.value && !hasTied.value) {
      checkIfRemainingBoxes();
      changeTurn();
      if (props.opponent === "friend") {
        const moveData = { type: "move", data: { index, player: turn.value } };
        socket.send(JSON.stringify(moveData));
      }
      await cpuTurn();
    }
  }
}

function changeTurn() {
  if (turn.value === "X") {
    turn.value = "O";
  } else {
    turn.value = "X";
  }
}

async function cpuTurn() {
  if (props.playerOneMark !== turn.value && props.opponent === "cpu") {
    isCpuPlaying.value = true;

    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 600);
    });

    const choices = [];

    for (const row of winning_rows) {
      if (
        (board.value[row[0]] === "" && board.value[row[1]] === "") ||
        (board.value[row[1]] === "" && board.value[row[2]] === "") ||
        (board.value[row[0]] === "" && board.value[row[2]] === "")
      ) {
        continue;
      } else if (
        board.value[row[0]] === board.value[row[1]] &&
        board.value[row[2]] === ""
      ) {
        choices.push({ index: row[2], player: board.value[row[0]] });
      } else if (
        board.value[row[0]] === board.value[row[2]] &&
        board.value[row[1]] === ""
      ) {
        choices.push({ index: row[1], player: board.value[row[0]] });
      } else if (
        board.value[row[1]] === board.value[row[2]] &&
        board.value[row[0]] === ""
      ) {
        choices.push({ index: row[0], player: board.value[row[1]] });
      }
    }

    isCpuPlaying.value = false;

    if (choices.length === 0) {
      const remainingBoxesIndex = board.value.reduce((acc, curr, index) => {
        if (curr === "") {
          return [...acc, index];
        }
        return acc;
      }, [] as number[]);
      const randomIndex = Math.floor(
        Math.random() * remainingBoxesIndex.length
      );
      updateBoard(remainingBoxesIndex[randomIndex]);
    } else if (choices.length === 1) {
      updateBoard(choices[0].index);
    } else {
      const winMoves = choices.filter(
        (choice) => choice.player !== props.playerOneMark
      );

      if (winMoves.length > 0) {
        updateBoard(winMoves[0].index);
      } else {
        updateBoard(choices[0].index);
      }
    }
  }
}

function checkIfWin() {
  for (const row of winning_rows) {
    if (
      board.value[row[0]] === "" ||
      board.value[row[1]] === "" ||
      board.value[row[2]] === ""
    ) {
      continue;
    } else if (
      board.value[row[0]] === board.value[row[1]] &&
      board.value[row[1]] === board.value[row[2]]
    ) {
      highlightedBoxes.value = [row[0], row[1], row[2]];
      isModalOpen.value = true;
      if (turn.value === "X") {
        nbWinsX.value++;
      } else {
        nbWinsO.value++;
      }
      hasWon.value = true;
    }
  }
}

function checkIfRemainingBoxes() {
  if (board.value.findIndex((box) => box === "") === -1) {
    isModalOpen.value = true;
    hasTied.value = true;
    nbTies.value++;
  }
}

async function nextRound() {
  isModalOpen.value = false;
  hasWon.value = false;
  hasTied.value = false;
  highlightedBoxes.value = [-1, -1, -1];
  if (wannaRestart.value) {
    nbWinsX.value = 0;
    nbWinsO.value = 0;
    nbTies.value = 0;
    wannaRestart.value = false;
  }
  await resetBoard();
}

async function resetBoard() {
  board.value = board.value.map((box) => (box = ""));
  turn.value = "X";
  await cpuTurn();
}

function handleRestart() {
  isModalOpen.value = true;
  wannaRestart.value = true;
}

function backHome() {
  if (!wannaRestart.value) {
    emit("back");
  } else {
    isModalOpen.value = false;
    wannaRestart.value = false;
  }
}

const modalTitle = computed(() => {
  if (hasWon.value) {
    if (props.opponent === "cpu") {
      if (props.playerOneMark === turn.value) {
        return "You won";
      }
      return "Oh no, you lost...";
    } else {
      if (props.playerOneMark === turn.value) {
        return "Player 1 wins!";
      }
      return "Player 2 wins!";
    }
  }
  return "";
});

const whoIsX = computed(() => {
  if (props.opponent === "cpu") {
    if (props.playerOneMark === "X") {
      return "You";
    }
    return "CPU";
  } else {
    if (props.playerOneMark === "X") {
      return "P1";
    }
    return "P2";
  }
});

const whoIsO = computed(() => {
  if (props.opponent === "cpu") {
    if (props.playerOneMark === "O") {
      return "You";
    }
    return "CPU";
  } else {
    if (props.playerOneMark === "O") {
      return "P1";
    }
    return "P2";
  }
});
</script>

<style scoped>
.class-restart {
  text-align: -webkit-center;
  box-shadow: inset 0px -4px 0px #6b8997;
}
</style>