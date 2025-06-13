//This is an example of how to use fonts. 
import { FONTS } from '../config/fonts.js';

export class Game extends Scene {
    // Your existing code...
    
    create() {
        // Your existing code...
        
        // Using predefined styles
        const title = this.add.text(
            this.scale.width / 2,
            50,
            'Landen 2025 Graduation',
            FONTS.styles.title
        ).setOrigin(0.5);
        
        // Using predefined style with overrides
        const subtitle = this.add.text(
            this.scale.width / 2,
            100,
            'Celebrating Our Journey',
            FONTS.getStyle('subtitle', { color: FONTS.colors.gold })
        ).setOrigin(0.5);
        
        // Creating a custom button with consistent styling
        const startButton = this.add.text(
            this.scale.width / 2,
            this.scale.height - 100,
            'START',
            FONTS.getStyle('button', { 
                fontSize: FONTS.sizes.lg,
                color: FONTS.colors.green 
            })
        ).setOrigin(0.5).setInteractive();
        
        // Rest of your code...
    }
    
    // Rest of your class...
}