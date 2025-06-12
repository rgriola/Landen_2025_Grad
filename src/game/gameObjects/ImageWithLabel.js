export class ImageWithLabel {
    constructor(scene, x, y, texture, options = {}) {
        // Default options
        const settings = {
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
        Object.assign(settings, options);
        
        // Create the image
        this.image = scene.add.image(x, y, texture)
            .setDepth(settings.depth)
            .setScale(settings.scale);
        
        // Calculate text position
        const textOffsetX = settings.textOffsetX || (this.image.displayWidth/2 + 10);
        
        // Create debug text with details (initially hidden)
        this.debugText = scene.add.text(
            x + textOffsetX,
            y + settings.textOffsetY,
            this._getDebugText(texture, settings.labelPrefix),
            settings.textStyle
        ).setOrigin(0, 0.5).setVisible(settings.debugMode);
        
        // Create simple image name text (always visible unless toggled)
        this.nameText = scene.add.text(
            x + textOffsetX,
            y + settings.textOffsetY - 20, // Position above debug text
            texture, // Just show the image key
            {
                fontFamily: settings.textStyle.fontFamily,
                fontSize: settings.textStyle.fontSize,
                color: '#ffffff',
                backgroundColor: '#00000099',
                padding: { x: 6, y: 3 }
            }
        ).setOrigin(0, 0.5);
        
        // Store reference to scene
        this.scene = scene;
        
        // Store offsets for animation
        this.textOffsetX = textOffsetX;
        this.textOffsetY = settings.textOffsetY;
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
        this.debugText.x = x + this.textOffsetX;
        this.debugText.y = y + this.textOffsetY;
        this.nameText.x = x + this.textOffsetX;
        this.nameText.y = y + this.textOffsetY - 20; // Keep above debug text
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