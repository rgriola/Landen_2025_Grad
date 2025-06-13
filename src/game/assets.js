export const ASSETS = {
    images: [
        // Numbers first
        {
            key: '1974_East',
            path: '1974_East.png',
            label: '1974',
            scale: 1,
            speed: 1
        },
        {
            key: '1974',
            path: '1974.jpg',
            label: '1974',
            scale: 1,
            speed: 1
        },
        // Then alphabetically by path
        {
            key: 'background',
            path: 'bg.png',
            label: 'Background',
            scale: 1,
            speed: 0
        },
        {
            key: 'cameraman',
            path: 'cameraman.jpg',
            label: 'Cameraman',
            scale: 1,
            speed: 1
        },
        {
            key: 'dadandmepng',
            path: 'Dad_Me_San_Diego.png',
            label: 'Full of Love',
            scale: 1,
            speed: 1
        },
        {
            key: 'dakotalove',
            path: 'dakotalove.jpg',
            label: 'Dakota Love',
            scale: 1,
            speed: 1
        },
        {
            key: 'Gilla',
            path: 'Gilla_.png',
            label: 'Gilla',
            scale: 1,
            speed: 1,
            textOffsetY: 0
        },
        {
            key: 'handholders',
            path: 'handholders.png',
            label: 'Hand Holders',
            scale: 1,
            speed: 1
        },
        {
            key: 'jailbird',
            path: 'jailbird.jpg',
            label: 'Jailbird',
            scale: 1,
            speed: 1
        },
        {
            key: 'leaDogStroller',
            path: 'Lea_Dog_Stroller.png',
            label: 'Lea Dog Stroller',
            scale: 1,
            speed: 1
        },
        {
            key: 'logo',
            path: 'logo.png',
            label: 'Logo',
            scale: 1,
            speed: 1
        },
        {
            key: 'LoveMe',
            path: 'Love_Me.png',
            label: 'My Love Dakota',
            scale: 1,
            speed: 1
        },
        {
            key: 'LoveSign',
            path: 'Love_Sign.png',
            label: 'Ugh Again',
            scale: 1,
            speed: 1
        },
        {
            key: 'lucky',
            path: 'Lucky_Man.png',
            label: 'Lucky:',
            scale: 1,
            speed: 1
        },
        {
            key: 'Umzula-zuli_Zuli',
            path: 'packaderm.png',
            label: 'Umzula-zuli "Zuli"',
            scale: 1,
            speed: 1,
            textOffsetY: 0
        },
        {
            key: 'RonBurgundy',
            path: 'Ron_Burgundy.png',
            label: 'Reporter',
            scale: 1,
            speed: 1
        },
        {
            key: 'samenrosendave',
            path: 'samenrosendave.jpg',
            label: 'Sam & Rose &Dave:',
            scale: 1,
            speed: 1
        },
        {
            key: 'sisters',
            path: 'sisters.jpg',
            label: 'Sisters',
            scale: 1,
            speed: 1
        },
        {
            key: 'thelegend',
            path: 'thelegend.jpg',
            label: 'The Legend',
            scale: 1,
            speed: 1
        }
    ],
    
    // You can add other asset types here as well
    audio: [
         {
             key: 'backgroundMusic',
             path: 'Nu_Alkemi_t_East_London_instrumental_3_05.mp3'
         }
    ],
    
    videos: [
         {
            key: 'rivertimelapse',
            path: 'rivertimelapse.mp4',
            scale: 1,
            loop: true,
            muted: true,  // Looping background videos should usually be muted
            autoplay: false
         }
    ],

    // Load all images in the Preloader
    preloadAll: function(scene) {
        // Set path
        scene.load.setPath('assets');
        console.log('Assets PreloadALL loaded!');

        // Load all images
        this.images.forEach(img => {
            scene.load.image(img.key, img.path || `${img.key}.png`);
        });
        
        // Load all audio
        this.audio.forEach(audio => {
            scene.load.audio(audio.key, audio.path);
        });
        
        // Load all videos with proper settings
        this.videos.forEach(video => {
            scene.load.video(video.key, video.path, video.loop || false, video.muted || false);
        });
    }
};