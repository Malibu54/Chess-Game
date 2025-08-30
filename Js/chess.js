
        // Piezas Unicode
        const pieces = {
            'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
            'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟'
        };

        // Estado inicial del tablero
        const initialBoard = [
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
        ];

        class ChessGame {
            constructor() {
                this.board = JSON.parse(JSON.stringify(initialBoard));
                this.currentPlayer = 'w';
                this.selectedSquare = null;
                this.moveHistory = [];
                this.gameStats = this.loadStats();
                this.gameStatus = 'active';
                this.initializeBoard();
                this.updateUI();
            }

            loadStats() {
                const defaultStats = {
                    gamesPlayed: 0,
                    whiteWins: 0,
                    blackWins: 0,
                    draws: 0
                };
                
                try {
                    const saved = JSON.parse(localStorage.getItem('chessStats') || '{}');
                    return { ...defaultStats, ...saved };
                } catch (e) {
                    return defaultStats;
                }
            }

            saveStats() {
                try {
                    localStorage.setItem('chessStats', JSON.stringify(this.gameStats));
                } catch (e) {
                    console.log('No se pudieron guardar las estadísticas');
                }
            }

            initializeBoard() {
                const boardElement = document.getElementById('chessBoard');
                boardElement.innerHTML = '';

                for (let row = 0; row < 8; row++) {
                    for (let col = 0; col < 8; col++) {
                        const square = document.createElement('div');
                        square.classList.add('chess-square');
                        square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
                        square.dataset.row = row;
                        square.dataset.col = col;
                        
                        square.addEventListener('click', () => this.handleSquareClick(row, col));
                        boardElement.appendChild(square);
                    }
                }
                
                this.renderBoard();
            }

            renderBoard() {
                const squares = document.querySelectorAll('.chess-square');
                squares.forEach((square, index) => {
                    const row = Math.floor(index / 8);
                    const col = index % 8;
                    const piece = this.board[row][col];
                    
                    square.innerHTML = piece ? `<span class="piece">${pieces[piece]}</span>` : '';
                    
                    // Limpiar clases de estado
                    square.classList.remove('selected', 'possible-move');
                });
            }

            handleSquareClick(row, col) {
                if (this.gameStatus !== 'active') return;

                const piece = this.board[row][col];
                
                if (this.selectedSquare) {
                    const [selectedRow, selectedCol] = this.selectedSquare;
                    
                    if (row === selectedRow && col === selectedCol) {
                        // Deseleccionar
                        this.selectedSquare = null;
                        this.clearHighlights();
                        return;
                    }
                    
                    if (this.isValidMove(selectedRow, selectedCol, row, col)) {
                        this.makeMove(selectedRow, selectedCol, row, col);
                        this.selectedSquare = null;
                        this.clearHighlights();
                        this.switchPlayer();
                        this.checkGameEnd();
                    } else if (piece && piece[0] === this.currentPlayer) {
                        // Seleccionar nueva pieza
                        this.selectedSquare = [row, col];
                        this.highlightSquare(row, col);
                        this.highlightPossibleMoves(row, col);
                    } else {
                        this.selectedSquare = null;
                        this.clearHighlights();
                    }
                } else if (piece && piece[0] === this.currentPlayer) {
                    // Seleccionar pieza
                    this.selectedSquare = [row, col];
                    this.highlightSquare(row, col);
                    this.highlightPossibleMoves(row, col);
                }
            }

            isValidMove(fromRow, fromCol, toRow, toCol) {
                // Validaciones básicas
                if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;
                
                const piece = this.board[fromRow][fromCol];
                const targetPiece = this.board[toRow][toCol];
                
                if (!piece || piece[0] !== this.currentPlayer) return false;
                if (targetPiece && targetPiece[0] === this.currentPlayer) return false;
                
                const pieceType = piece[1];
                const rowDiff = toRow - fromRow;
                const colDiff = toCol - fromCol;
                const absRowDiff = Math.abs(rowDiff);
                const absColDiff = Math.abs(colDiff);
                
                switch (pieceType) {
                    case 'P': // Peón
                        const direction = piece[0] === 'w' ? -1 : 1;
                        const startRow = piece[0] === 'w' ? 6 : 1;
                        
                        if (colDiff === 0) {
                            // Movimiento hacia adelante
                            if (rowDiff === direction && !targetPiece) return true;
                            if (fromRow === startRow && rowDiff === 2 * direction && !targetPiece) return true;
                        } else if (absColDiff === 1 && rowDiff === direction && targetPiece) {
                            // Captura diagonal
                            return true;
                        }
                        return false;
                        
                    case 'R': // Torre
                        if (rowDiff === 0 || colDiff === 0) {
                            return this.isPathClear(fromRow, fromCol, toRow, toCol);
                        }
                        return false;
                        
                    case 'N': // Caballo
                        return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);
                        
                    case 'B': // Alfil
                        if (absRowDiff === absColDiff) {
                            return this.isPathClear(fromRow, fromCol, toRow, toCol);
                        }
                        return false;
                        
                    case 'Q': // Reina
                        if (rowDiff === 0 || colDiff === 0 || absRowDiff === absColDiff) {
                            return this.isPathClear(fromRow, fromCol, toRow, toCol);
                        }
                        return false;
                        
                    case 'K': // Rey
                        return absRowDiff <= 1 && absColDiff <= 1;
                        
                    default:
                        return false;
                }
            }

            isPathClear(fromRow, fromCol, toRow, toCol) {
                const rowStep = toRow === fromRow ? 0 : (toRow > fromRow ? 1 : -1);
                const colStep = toCol === fromCol ? 0 : (toCol > fromCol ? 1 : -1);
                
                let currentRow = fromRow + rowStep;
                let currentCol = fromCol + colStep;
                
                while (currentRow !== toRow || currentCol !== toCol) {
                    if (this.board[currentRow][currentCol]) return false;
                    currentRow += rowStep;
                    currentCol += colStep;
                }
                
                return true;
            }

            makeMove(fromRow, fromCol, toRow, toCol) {
                const piece = this.board[fromRow][fromCol];
                const capturedPiece = this.board[toRow][toCol];
                
                this.board[toRow][toCol] = piece;
                this.board[fromRow][fromCol] = '';
                
                // Notación algebraica simple
                const moveNotation = `${String.fromCharCode(97 + fromCol)}${8 - fromRow}-${String.fromCharCode(97 + toCol)}${8 - toRow}`;
                this.moveHistory.push({
                    notation: moveNotation,
                    piece: piece,
                    captured: capturedPiece,
                    player: this.currentPlayer === 'w' ? 'Blancas' : 'Negras'
                });
                
                this.renderBoard();
                this.updateMoveHistory();
            }

            switchPlayer() {
                this.currentPlayer = this.currentPlayer === 'w' ? 'b' : 'w';
                this.updateUI();
            }

            highlightSquare(row, col) {
                const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if (square) square.classList.add('selected');
            }

            highlightPossibleMoves(row, col) {
                for (let toRow = 0; toRow < 8; toRow++) {
                    for (let toCol = 0; toCol < 8; toCol++) {
                        if (this.isValidMove(row, col, toRow, toCol)) {
                            const square = document.querySelector(`[data-row="${toRow}"][data-col="${toCol}"]`);
                            if (square) square.classList.add('possible-move');
                        }
                    }
                }
            }

            clearHighlights() {
                document.querySelectorAll('.chess-square').forEach(square => {
                    square.classList.remove('selected', 'possible-move');
                });
            }

            checkGameEnd() {
                // Verificación simplificada de jaque mate (aquí puedes expandir la lógica)
                const hasValidMoves = this.hasValidMoves(this.currentPlayer);
                
                if (!hasValidMoves) {
                    this.gameStatus = 'ended';
                    const winner = this.currentPlayer === 'w' ? 'Negras' : 'Blancas';
                    
                    if (winner === 'Blancas') {
                        this.gameStats.whiteWins++;
                    } else {
                        this.gameStats.blackWins++;
                    }
                    
                    this.gameStats.gamesPlayed++;
                    this.saveStats();
                    
                    document.getElementById('gameStatus').innerHTML = `¡Jaque Mate! Ganan las ${winner}`;
                    document.getElementById('gameStatus').style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
                    
                    this.updateStats();
                }
            }

            hasValidMoves(player) {
                for (let row = 0; row < 8; row++) {
                    for (let col = 0; col < 8; col++) {
                        const piece = this.board[row][col];
                        if (piece && piece[0] === player) {
                            for (let toRow = 0; toRow < 8; toRow++) {
                                for (let toCol = 0; toCol < 8; toCol++) {
                                    if (this.isValidMove(row, col, toRow, toCol)) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            }

            newGame() {
                this.board = JSON.parse(JSON.stringify(initialBoard));
                this.currentPlayer = 'w';
                this.selectedSquare = null;
                this.moveHistory = [];
                this.gameStatus = 'active';
                this.clearHighlights();
                this.renderBoard();
                this.updateUI();
                this.updateMoveHistory();
                
                document.getElementById('gameStatus').innerHTML = '¡Nueva partida! Las blancas comienzan';
                document.getElementById('gameStatus').style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            }

            updateUI() {
                const playerText = this.currentPlayer === 'w' ? 'Blancas' : 'Negras';
                document.getElementById('currentPlayer').innerHTML = `<i class="fas fa-chess-pawn"></i> Turno: ${playerText}`;
                document.getElementById('moveCount').textContent = this.moveHistory.length;
            }

            updateStats() {
                document.getElementById('gamesPlayed').textContent = this.gameStats.gamesPlayed;
                document.getElementById('whiteWins').textContent = this.gameStats.whiteWins;
                document.getElementById('blackWins').textContent = this.gameStats.blackWins;
                document.getElementById('draws').textContent = this.gameStats.draws;
            }

            updateMoveHistory() {
                const historyElement = document.getElementById('moveHistory');
                if (this.moveHistory.length === 0) {
                    historyElement.innerHTML = '<div class="text-muted">Los movimientos aparecerán aquí...</div>';
                    return;
                }
                
                historyElement.innerHTML = this.moveHistory.map((move, index) => 
                    `<div class="move-item">
                        ${index + 1}. ${move.player}: ${move.notation}
                        ${move.captured ? ` (captura ${pieces[move.captured]})` : ''}
                    </div>`
                ).join('');
                
                historyElement.scrollTop = historyElement.scrollHeight;
            }
        }

        // Inicializar juego
        let game;

        document.addEventListener('DOMContentLoaded', function() {
            game = new ChessGame();
            
            document.getElementById('newGameBtn').addEventListener('click', () => {
                game.newGame();
            });
            
            document.getElementById('resetBtn').addEventListener('click', () => {
                if (confirm('¿Estás seguro de que quieres reiniciar la partida actual?')) {
                    game.newGame();
                }
            });
        });
