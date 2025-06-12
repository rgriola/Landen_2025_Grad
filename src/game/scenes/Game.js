import { Scene } from 'phaser';
import { ImageWithLabel } from '../gameObjects/ImageWithLabel.js';

export class Game extends Scene {
    constructor() {
        super('Game');
        this.activeImages = [];
        this.imageConfigs = [
            {
                key: 'RonBurgundy',
                label: 'Ron:',
                scale: 0.1,
                speed: 0.5
            },
            {
                key: 'Gilla',
                label: 'Gilla:',
                scale: 0.25,
                speed: 1,
                textOffsetY: 20
            },
            {
                key: 'packaderm',
                label: 'Milo The Elephant:',
                scale: 0.25,
                speed: 1,
                textOffsetY: 20
            }
        ];
        this.pendingImages = [...this.imageConfigs]; // Make a copy to work with
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background').setAlpha(0.5);

        // Add space bar to navigate to GameOver scene - no visual hint
        this.spaceKey = this.input.keyboard.addKey('SPACE');
        
        // Add debug key
        this.debugKey = this.input.keyboard.addKey('D');
        
        // Initialize debug mode (off by default)
        this.debugMode = false;
        
        // Setup debug mode toggle
        this.input.keyboard.on('keydown-D', () => {
            this.debugMode = !this.debugMode;
            
            // Update all existing images
            for (const imageObj of this.activeImages) {
                imageObj.setDebugVisible(this.debugMode);
            }
        });

        // Setup scene transition on click
        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });

        // Schedule the first image
        this.scheduleNextImage();
    }

    scheduleNextImage() {
        // Get a random delay between 1-5 seconds
        const delay = Phaser.Math.Between(1000, 5000);
        
        // Schedule next image creation
        this.time.delayedCall(delay, () => {
            this.createRandomImage();
            // Schedule the next one
            this.scheduleNextImage();
        });
    }

    createRandomImage() {
      if (this.pendingImages.length === 0){
             this.pendingImages = [...this.imageConfigs];
        }
      
        // Get a random config from the pending list
        const randomIndex = Phaser.Math.Between(0, this.pendingImages.length - 1);
        const config = this.pendingImages.splice(randomIndex, 1)[0];
        
        // Create the image at a random Y position off-screen
        const screenHeight = this.scale.height;
        const randomY = Math.floor(Math.random() * (screenHeight - 100)) + 50;
        
        const imageObj = new ImageWithLabel(this, -50, randomY, config.key, {
            scale: config.scale,
            depth: 101,
            labelPrefix: config.label,
            textOffsetY: config.textOffsetY || 0,
            debugMode: this.debugMode // Pass the current debug mode state
        });
        
        // Store the speed with the image object
        imageObj.speed = config.speed;
        
        // Add to active images
        this.activeImages.push(imageObj);
    }

    update() {
        // Move all active images
        for (const imageObj of this.activeImages) {
            this.moveImageWithLabel(imageObj, imageObj.speed);
        }
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
            const offscreenX = -imageHalfWidth - Math.floor(Math.random() * 40);
            
            // Set the initial position
            imageObj.setPosition(offscreenX, imageObj.y);
            
            // Store original position for reference
            imageObj.image.startX = offscreenX;
            imageObj.image.startY = imageObj.y;
        }
        
        // Move the image and text together
        imageObj.setPosition(imageObj.x + speed, imageObj.y);
        
        // Reset position when it's completely off screen to the right
        const imageHalfWidth = imageObj.image.displayWidth / 2;
        if (imageObj.x > screenWidth + imageHalfWidth) {
            // Remove this image from active images
            const index = this.activeImages.indexOf(imageObj);
            if (index !== -1) {
                this.activeImages.splice(index, 1);
            }
            
            // Destroy the image
            imageObj.destroy();
        }
    }
}
