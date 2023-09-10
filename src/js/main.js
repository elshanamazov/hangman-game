import '../css/style.css';
import { startGame } from './game';
import { darkModehandle } from './utils';

darkModehandle();

const startGameBtn = document.getElementById('startGame');
startGameBtn.addEventListener('click', startGame);
