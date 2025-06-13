import { FONTS } from '../config/fonts.js';

export class ImageWithLabel {
    constructor(scene, x, y, texture, options = {}) {
        // Store reference to scene
        this.scene = scene;
        this.texture = texture;
        this.options = options;

        // Default options
        this.settings = {
            scale: 1,
            depth: 100,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: 14,
                color: '#ffffff',
                backgroundColor: '#333333',
                padding: { x: 8, y: 4 }
            },
            showDimensions: true,
            labelPrefix: '',
            textOffsetX: null,
            textOffsetY: 0,
            debugMode: false  // Default to debug off
        };
        
        // Override with provided options
        Object.assign(this.settings, this.options);

        // Create the image
        this.image = scene.add.image(x, y, texture)
            .setDepth(this.settings.depth)
            .setScale(this.settings.scale);

        // Calculate text position
        this.textOffsetX = this.settings.textOffsetX || (this.image.displayWidth/2 + 10);

        // DEBUG TEXT TO MOVE IT
        this.addDebugText();

        // Create simple image name text (always visible unless toggled)
        this.nameText = scene.add.text(
            x,
            y, // Position above debug text
            this.settings.labelPrefix, // Just show the image key
            FONTS.styles.imageLabelA
        ).setOrigin(0, 0)
        . setAlpha(0.5)
        .setDepth(101);

        // Store offsets for animation
        this.textOffsetX = this.textOffsetX;
        this.textOffsetY = this.settings.textOffsetY;
    }
    
    addDebugText() {
       // Create debug text with details (initially hidden)
        this.debugText = this.scene.add.text(
            this.x + this.textOffsetX,
            this.y + this.textOffsetY,
            this._getDebugText(this.texture, this.settings.labelPrefix),
            FONTS.styles.debug
        ).setOrigin(0, 0.5)
        .setVisible(this.options.debugMode || false);
    }

    _getDebugText(texture, labelPrefix) {
        let text = labelPrefix;
        text += `\nWidth: ${this.image.width}`;
        text += `\nHeight: ${this.image.height}`;
        text += `\nDisplay W: ${this.image.displayWidth.toFixed(1)}`;
        text += `\nDisplay H: ${this.image.displayHeight.toFixed(1)}`;
        return text;
    }
    
    // Set position of both image and texts
    setPosition(x, y) {
        this.image.x = x;
        this.image.y = y;
        this.nameText.x = x;
        this.nameText.y = y;
        // FOR DEBUGGING
        this.debugText.x = x + this.textOffsetX;
        this.debugText.y = y + this.textOffsetY;// Keep above debug text
        return this;
    }
    
    // Toggle debug text visibility
    setDebugVisible(visible) {
        this.debugText.setVisible(visible);
        return this;
    }
    
    // Set visibility of both image and texts
    setVisible(visible) {
        this.image.setVisible(visible);
        this.debugText.setVisible(visible && this.scene.debugMode);
        this.nameText.setVisible(visible);
        return this;
    }
    
    // Get the position of the image
    get x() { return this.image.x; }
    get y() { return this.image.y; }
    
    // Set alpha for all components
    setAlpha(alpha) {
        this.image.setAlpha(alpha);
        this.debugText.setAlpha(alpha);
        this.nameText.setAlpha(alpha);
        return this;
    }
    
    // Destroy all components
    destroy() {
        this.image.destroy();
        this.debugText.destroy();
        this.nameText.destroy();
    }
}