export const ASSETS = {
    images: [
        {
            key: 'RonBurgundy',
            path: 'Ron_Burgundy.png',
            label: 'Ron:',
            scale: 0.1,
            speed: 0.5
        },
        {
            key: 'Gilla',
            path: 'Gilla_.png',
            label: 'Gilla:',
            scale: 0.25,
            speed: 1,
            textOffsetY: 20
        },
        {
            key: 'packaderm',
            path: 'packaderm.png',
            label: 'Milo The Elephant:',
            scale: 0.25,
            speed: 1,
            textOffsetY: 20
        },
        {
            key: '1974',
            path: '1974.jpg',
            label: '1974:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'background',
            path: 'bg.png',
            label: 'Background:',
            scale: 1.0,
            speed: 0
        },
        {
            key: 'cameraman',
            path: 'cameraman.jpg',
            label: 'Cameraman:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'dadandme',
            path: 'dadandme.jpg',
            label: 'Dad and Me:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'dakotalove',
            path: 'dakotalove.jpg',
            label: 'Dakota Love:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'handholders',
            path: 'handholders.png',
            label: 'Hand Holders:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'jailbird',
            path: 'jailbird.jpg',
            label: 'Jailbird:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'leaDogStroller',
            path: 'Lea_Dog_Stroller.png',
            label: 'Lea Dog Stroller:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'logo',
            path: 'logo.png',
            label: 'Logo:',
            scale: 1.0,
            speed: 0
        },
        {
            key: 'lucky',
            path: 'lucky.png',
            label: 'Lucky:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'samenrosendave',
            path: 'samenrosendave.jpg',
            label: 'Sam, En, Rose, and Dave:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'sisters',
            path: 'sisters.jpg',
            label: 'Sisters:',
            scale: 0.25,
            speed: 1
        },
        {
            key: 'thelegend',
            path: 'thelegend.jpg',
            label: 'The Legend:',
            scale: 0.25,
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
            scale: 1.0,
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