module.exports = function solveSudoku(matrix) {
  let board = matrix;
  const isSolved = (board) => {
    let check = 1;
    for (let i = 0; i <= 8; i++)
      for (let j = 0; j <= 8; j++) {
        if (board[i][j] === 0) check = 0;
      };
    return (check);
  };
  
  const possibleVariants = (board, x, y) => {
    let variantsArray = [];
    for (let i = 0; i <= 8; i++) variantsArray.push(0);

    for (let i = 0; i <= 8; i++) {
      if (board[x][i] !== 0) variantsArray[board[x][i] - 1] = 1;
      if (board[i][y] !== 0) variantsArray[board[i][y] - 1] = 1;
    };

    let k = 0, 
        l = 0;
    
    if ((x >= 0)&&(x <= 2)) k = 0
      else if ((x >= 3)&&(x <= 5)) k = 3
        else k = 5;
    if ((y >= 0)&&(y <= 2)) l = 0
      else if ((y >= 3)&&(y <= 5)) l = 3
        else l = 5;

    for (let i = k; i !== k+2; i++)
      for (let j = l; j !== l+2; j++) {
        if (board[i][j] !== 0) variantsArray[board[i][j] - 1] = 1;
      };
    for (let i = 0; i <= 8; i++) {
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
      console.log(board);
      return board;
    }
    else {
      for (let i = 0; i <= 8; i++)
        for (let j = 0; j <= 8; j++) {
          if (board[i][j] === 0) {
            x = i;
            y = j;
            break;
          };
        };
      
      variantsArray = possibleVariants(board, x, y);
      for (let i = 0; i <= 8; i++) {
        if (variantsArray[i] !== 0) {
          board[x][y] = variantsArray[i];
          sudokuSolver(board);
        };
        board[x][y] = 0;
      };
    };
  };
  
  sudokuSolver(board);
  console.log(board);
  return board;
};

