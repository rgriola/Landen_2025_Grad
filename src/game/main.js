if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Determine appropriate path based on hostname
    const isGithubPages = window.location.hostname === 'rgriola.github.io';
    const swPath = isGithubPages ? '/Landen_2025_Grad/service-worker.js' : '/service-worker.js';
    
    navigator.serviceWorker.register(swPath)
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      })
      .catch((err) => {
        // Log but don't break the app
        console.log('ServiceWorker registration failed (app will still work):', err);
      });
  });
} else {
  // Service workers not supported but app continues
  console.log('Service workers not supported in this browser (app will still work)');
}

import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { AUTO, Game } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
   /* type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },*/
    type: AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
        fullscreenTarget: document.body // Important: Specify the fullscreen target
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame, // GAME
        GameOver
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;
