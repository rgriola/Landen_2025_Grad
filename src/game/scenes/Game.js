import { Scene } from 'phaser';
import { ImageWithLabel } from '../gameObjects/ImageWithLabel.js';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background').setAlpha(0.5);

        // Create Ron with label
        this.ron = new ImageWithLabel(this, 760, 250, 'RonBurgundy', {
            scale: 0.1,
            depth: 101,
            labelPrefix: 'Ron:'
        });

        // Create Gilla with label
        this.gilla = new ImageWithLabel(this, 760, 350, 'Gilla', {
            scale: 0.25,
            depth: 101,
            labelPrefix: 'Gilla:',
            textOffsetY: 20 // Position text below the image
        });

        // Setup scene transition on click
        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }

    update() {
        // Move Ron and Gilla
        this.moveImageWithLabel(this.ron, 2);
        this.moveImageWithLabel(this.gilla, 1);
    }

    moveImageWithLabel(imageObj, speed = 2) {
        if (!imageObj) return;
        
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        
        // Initialize starting position if not set
        if (imageObj.image.startX === undefined) {
            // Get the image's half-width for proper off-screen positioning
            const imageHalfWidth = imageObj.image.displayWidth / 2;
            
            // Choose a position that's completely off screen to the left
            // (image center is at least its half-width beyond the left edge)
            const offscreenX = -imageHalfWidth - Math.floor(Math.random() * 40);
            const randomY = Math.floor(Math.random() * (screenHeight - 100)) + 50;
            
            // Set the initial position
            imageObj.setPosition(offscreenX, randomY);
            
            // Store original position for reference
            imageObj.image.startX = offscreenX;
            imageObj.image.startY = randomY;
        }
        
        // Move the image and text together
        imageObj.setPosition(imageObj.x + speed, imageObj.y);
        
        // Reset position when it's completely off screen to the right
        // (image center is at least its half-width beyond the right edge)
        const imageHalfWidth = imageObj.image.displayWidth / 2;
        if (imageObj.x > screenWidth + imageHalfWidth) {
            // Choose a new random starting position completely off screen to the left
            const offscreenX = -imageHalfWidth - Math.floor(Math.random() * 40);
            const randomY = Math.floor(Math.random() * (screenHeight - 100)) + 50;
            imageObj.setPosition(offscreenX, randomY);
        }
    }
}
