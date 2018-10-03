module.exports = function solveSudoku(matrix) {
  let board = matrix;
  const isSolved = (board) => {
    let check = 1;
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) check = 0;
      };
    return (check);
  };
  
  const possibleVariants = (board, x, y) => {
    let variantsArray = [];
    for (let i = 0; i < 9; i++) variantsArray.push(0);

    for (let i = 0; i < 9; i++) {
      if (board[x][i] !== 0) variantsArray[board[x][i] - 1] = 1;
      if (board[i][y] !== 0) variantsArray[board[i][y] - 1] = 1;
    };

    let k = 0, 
        l = 0;
    
    if ((x >= 0)&&(x <= 2)) 
      k = 0
    else if ((x >= 3)&&(x <= 5)) 
      k = 3
    else 
      k = 6;
    
    if ((y >= 0)&&(y <= 2)) 
      l = 0
    else if ((y >= 3)&&(y <= 5)) 
      l = 3
    else 
      l = 6;

    for (let i = k; i <= k+2; i++)
      for (let j = l; j <= l+2; j++) {
        if (board[i][j] !== 0) variantsArray[board[i][j] - 1] = 1;
      };
    for (let i = 0; i < 9; i++) {
      if (variantsArray[i] === 0) variantsArray[i] = i+1
      else variantsArray[i] = 0;
    }
    return variantsArray;
  };
  
  const sudokuSolver = (board) => {
    let x = 0,
        y = 0,
        variantsArray = [];

    if (isSolved(board) === 1) {
      return board;
    };
    if (isSolved(board) === 0) {
      loop: for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
          if (board[i][j] === 0) {
            x = i;
            y = j;
            break loop;
          };
      variantsArray = possibleVariants(board, x, y);
      let empty = true;
        for (let i = 0; i < 9; i++) {
          if (variantsArray[i] !== 0) {
            empty = false;
            board[x][y] = variantsArray[i];
            variantsArray[i] = 0;
            let res = sudokuSolver(board);
            if (res) return res;
          };
          board[x][y] = 0;
        };
        if (empty) return false;
    };
  };
  return sudokuSolver(board);
};
