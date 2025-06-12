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
            textOffsetX: null, // Will be auto-calculated based on image width
            textOffsetY: 0
        };
        
        // Override with provided options
        Object.assign(settings, options);
        
        // Create the image
        this.image = scene.add.image(x, y, texture)
            .setDepth(settings.depth)
            .setScale(settings.scale);
        
        // Calculate text position
        const textOffsetX = settings.textOffsetX || (this.image.displayWidth/2 + 10);
        
        // Prepare label text
        let labelText = settings.labelPrefix;
        
        // Add dimensions if needed
        if (settings.showDimensions) {
            labelText += `\nWidth: ${this.image.width}`;
            labelText += `\nHeight: ${this.image.height}`;
            labelText += `\nDisplay W: ${this.image.displayWidth.toFixed(1)}`;
            labelText += `\nDisplay H: ${this.image.displayHeight.toFixed(1)}`;
        }
        
        // Create the text
        this.text = scene.add.text(
            x + textOffsetX,
            y + settings.textOffsetY,
            labelText,
            settings.textStyle
        ).setOrigin(0, 0.5);
        
        // Store reference to scene
        this.scene = scene;
        
        // Store offsets for animation
        this.textOffsetX = textOffsetX;
        this.textOffsetY = settings.textOffsetY;
    }
    
    // Set position of both image and text
    setPosition(x, y) {
        this.image.x = x;
        this.image.y = y;
        this.text.x = x + this.textOffsetX;
        this.text.y = y + this.textOffsetY;
        return this;
    }
    
    // Set visibility of both image and text
    setVisible(visible) {
        this.image.setVisible(visible);
        this.text.setVisible(visible);
        return this;
    }
    
    // Get the position of the image
    get x() { return this.image.x; }
    get y() { return this.image.y; }
    
    // Set alpha for both components
    setAlpha(alpha) {
        this.image.setAlpha(alpha);
        this.text.setAlpha(alpha);
        return this;
    }
    
    // Destroy both components
    destroy() {
        this.image.destroy();
        this.text.destroy();
    }
}