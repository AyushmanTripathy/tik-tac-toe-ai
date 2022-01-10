const player = 1;
const ai = -1;
let target = null;

const log = (str) => console.log(str);
export function game(arr) {
  if (checkTriplets(arr, 0, 4, 8)) return arr[0];
  if (checkTriplets(arr, 2, 4, 6)) return arr[2];

  for (let n = 0; n < 3; n++)
    if (checkTriplets(arr, n, n + 3, n + 6)) return arr[n];
  for (let n = 0; n < 9; n = n + 3)
    if (checkTriplets(arr, n, n + 1, n + 2)) return arr[n];
  return arr.includes(0) ? null : 0;
}

function checkTriplets(arr, a, b, c) {
  return (
    arr[a] == arr[b] && arr[b] == arr[c] && arr[a] == arr[c] && arr[a] != 0
  );
}

// mix max algorithm
export function init(arr) {
  let bestScore = 2;
  let bestDepth = null;
  let bestMove = null;

  for (let i = 0; i < 9; i++) {
    if (arr[i] == 0) {
      arr[i] = ai;
      const [score, depth] = minmax(arr, 1, false);
      if (score < bestScore || (bestScore == score && bestDepth > depth)) {
        bestScore = score;
        bestDepth = depth;
        bestMove = i;
      }
      arr[i] = 0;
    }
  }
  return bestMove;
}

function minmax(arr, depth, isMax) {
  const presentScore = game(arr);
  if (presentScore == null) {
    let bestScore = isMax ? 2 : -2;
    let bestDepth = Infinity;
    // other posibilites
    for (let i = 0; i < 9; i++) {
      if (arr[i] == 0) {
        arr[i] = isMax ? ai : player;
        const [score, dep] = minmax(arr, depth + 1, isMax ? false : true);
        if (isMax ? score < bestScore : score > bestScore) {
          bestScore = score;
          bestDepth = dep;
        }
        arr[i] = 0;
      }
    }
    return [bestScore, bestDepth];
  } else return [presentScore, depth];
}
