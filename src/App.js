import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './style/App.css'
import Cell from './style/StyledCell.js'
import ClickedCell from './style/StyledCellClicked'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
function generateBombs(rowCount, colCount, bombCount) {
  const bombPositions = new Set();

  while(bombPositions.size < bombCount) {
    const row = Math.floor(Math.random() * rowCount);
    const col = Math.floor(Math.random() * colCount);
    bombPositions.add(`${row},${col}`);
  }

  return bombPositions;
}
function Minesweeper() {
  const rows = new Array(10).fill(0);
  const cols = new Array(10).fill(0);
  const [bombs] = useState(generateBombs(10, 10, 10));
  const [clickedCells, setClickedCells] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [losingCell, setLosingCell] = useState(null);
  const [adjacentBombCounts, setAdjacentBombCounts] = useState({});

  function handleClick(rowIndex, colIndex, clicked = new Set()) {
    const cellKey = `${rowIndex},${colIndex}`;
  
    if (clicked.has(cellKey)) return;
    clicked.add(cellKey);
  
    console.log(`Cell ${cellKey} clicked`);
  
    if (bombs.has(cellKey)) {
      setLosingCell(cellKey);
      setTimeout(() => setGameOver(true), 500);  
    } else {
      const adjacentBombs = countAdjacentBombs(rowIndex, colIndex, bombs, rows.length, cols.length, clicked);
  
      setClickedCells(prev => new Set([...prev, ...clicked]));
      setAdjacentBombCounts(prev => ({...prev, [cellKey]: adjacentBombs}));
  
      if (adjacentBombs === 0) {
        const directions = [
          [-1, -1], [-1, 0], [-1, 1],
          [ 0, -1],          [ 0, 1],
          [ 1, -1], [ 1, 0], [ 1, 1],
        ];
  
        directions.forEach(([x, y]) => {
          const newRow = rowIndex + x;
          const newCol = colIndex + y;
          if (newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length) {
            handleClick(newRow, newCol, clicked);
          }
        });
      }
    }
  }
  
  function countAdjacentBombs(i, j, bombs, rowCount, colCount, clicked) {
    let bombCount = 0;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [ 0, -1],           [ 0, 1],
      [ 1, -1], [ 1, 0], [ 1, 1],
    ];
  
    directions.forEach(([x, y]) => {
      const newRow = i + x;
      const newCol = j + y;
      if (newRow >= 0 && newRow < rowCount && newCol >= 0 && newCol < colCount) {
        if (bombs.has(`${newRow},${newCol}`) && !clicked.has(`${newRow},${newCol}`)) {
          bombCount++;
        }
      }
    });
  
    return bombCount;
  }
  
  function resetGame() {
    window.location.reload();
  }
  return (
    <Box className='OuterBox' sx={{  p: 1 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Minesweeper
      </Typography>
      <Box className='InnerBox' sx={{ gap: .5 }}>
        {rows.flatMap((row, rowIndex) =>
          cols.map((col, colIndex) => {
            const cellKey = `${rowIndex},${colIndex}`;
            const isBomb = bombs.has(cellKey);
            const isClicked = clickedCells.has(cellKey) || losingCell === cellKey;
            const CellComponent = isClicked ? ClickedCell : Cell;
            return (
              <CellComponent 
                elevation={isClicked ? 0 : 3} key={cellKey}
                onClick={() => handleClick(rowIndex, colIndex)}
                style={{ cursor: 'pointer' }}>
                {isClicked ? (isBomb ? '💣' : adjacentBombCounts[cellKey] || '') : ''}
              </CellComponent>
            );
          }),
        )}
      </Box>
      <Dialog
        open={gameOver}
        onClose={resetGame}
        PaperProps={{
          style: {
            marginTop: '10%', 
          },
        }}
      >
        <DialogTitle>You Lose</DialogTitle>
      </Dialog>
    </Box>
  );
}

export default Minesweeper;

