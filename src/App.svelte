<script>
  import { init, game } from "./script.js";

  const player_id = 1;
  let gameEnded = false;
  let lastHoveredId = null;
  let warning = "";
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  function checkValue(value) {
    if (value > 0) return "cross";
    else if (value < 0) return "circle";
    else "";
  }
  function handleClick({ srcElement }) {
    const id = srcElement.id;
    if (lastHoveredId == id) {
      lastHoveredId = null;
      arr[id] = 0;
    }
    if (arr[id] == 0 && !gameEnded) {
      arr[id] = player_id;
      warning = "";
      loop();
    } else if (arr[id] != 0) warning = id + " already selected!";
  }
  function loop() {
    let temp = game(arr);
    if (temp != null) {
      if (temp == 0) warning = "Draw";
      else warning = (temp == player_id ? "X" : "O") + " wins";
      gameEnded = true;
    }
    if (gameEnded) return;

    temp = init(arr.slice());
    arr[temp] = player_id * -1;
    arr = arr.slice();

    temp = game(arr);
    if (temp != null) {
      if (temp == 0) warning = "Draw";
      else warning = (temp == player_id ? "X" : "O") + " wins";
      gameEnded = true;
    }
  }
  function reset() {
    arr = new Array(9).fill(0);
    gameEnded = false;
    warning = "";
  }
  function hover({ srcElement }) {
    if (gameEnded) return;
    const id = srcElement.id;
    if (arr[id] == 0) {
      lastHoveredId = id;
      srcElement.classList.add("grey_cross");
      const temp_arr = arr.slice();
      temp_arr[id] = player_id;
      const temp = init(temp_arr);
      document.getElementById(temp).classList.add("grey_circle");
    }
  }
  function out({ srcElement }) {
    srcElement.classList.remove("grey_cross");
    const eles = document.getElementsByClassName("grey_circle");
    if (eles != null) {
      for (const ele of eles) ele.classList.remove("grey_circle");
    }
  }
</script>

<main>
  <header>
    <h1>the unbeatable tik tac toe ai</h1>
    <p>using minmax algorithm</p>
  </header>
  <h3 contenteditable bind:innerHTML={warning} />
  <button on:click={gameEnded ? reset() : loop()}>
    {gameEnded ? "Reset" : "Pass"}
  </button>
  <section>
    {#each arr as value, i}
      <div
        on:mouseout={out}
        on:mouseover={hover}
        id={i}
        on:click={handleClick}
        class={checkValue(value)}
      />
    {/each}
  </section>
  <footer>
    <p>
      <a href="https://github.com/AyushmanTripathy/tik-tac-toe-ai"
        >source code</a
      > <br /> made by @AyushmanTripathy
    </p>
  </footer>
</main>

<style lang="scss">
  main {
    @include absolute;
    @include flex(column);
    @include flex-center;
    @include fullscreen;

    color: $light;
    background-color: $pri;
    justify-content: space-between;
    user-select: none;
  }
  h1 {
    $margin: 5vw;
    margin-right: $margin;
    margin-left: $margin;
  }
  footer,
  header {
    text-align: center;
  }
  section {
    @include section(60%, 60%);
    @include shadow;
    @include grid(1fr 1fr 1fr, 1fr 1fr 1fr);

    gap: 10px;
    border-radius: 10px;
    background-color: $sec;
    padding: 10px;
    max-width: 680px;
    max-height: 420px;
  }
  button {
    @include section(5vh, 20vw);
    @include shadow;

    color: $light;
    margin-bottom: 3vh;
    border: none;
    border-radius: 3px;
    background-color: $sec;
  }
  .cross {
    @include cover("../cross.svg");
  }
  .circle {
    @include cover("../circle.svg");
  }
  .grey_circle {
    @include cover("../grey_circle.svg");
  }
  .grey_cross {
    @include cover("../grey_cross.svg");
  }
  div {
    @include flex(column);
    @include flex-center;
    background-color: $tri;
    border-radius: 10px;
  }
  a {
    color: $hl;
    text-decoration: none;
  }
</style>
