document.addEventListener('DOMContentLoaded', function() {
    // Audio elements

    
    const bgMusic = document.getElementById('background-music');
    const clickSound = document.getElementById('click-sound');
    
    // Start button
    const startBtn = document.querySelector('.start-btn');
    
    // Subtle floating elements container
    const floatContainer = document.querySelector('.subtle-floating-elements');
    
    // Create subtle floating elements
    function createFloatingElements() {
        const elements = ['✦', '✧', '•', '◦', '♔', '♕'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.textContent = elements[Math.floor(Math.random() * elements.length)];
                element.style.left = `${Math.random() * 100}%`;
                element.style.top = `${Math.random() * 100}%`;
                element.style.fontSize = `${Math.random() * 16 + 16}px`;
                element.style.opacity = Math.random() * 1 + 1;
                element.style.animation = `floatUp ${Math.random() * 20 + 10}s linear infinite ${Math.random() * 5}s`;
                element.style.color = `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.3})`;
                floatContainer.appendChild(element);
            }, i * 500);
        }
    }
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.1; }
            50% { transform: translateY(-50vh) translateX(${Math.random() > 0.5 ? '-' : ''}20px) rotate(180deg); opacity: 0.4; }
            100% { transform: translateY(-100vh) translateX(0) rotate(360deg); opacity: 0; }
        }
        .floating-element {
            position: absolute;
            pointer-events: none;
            will-change: transform;
        }
    `;
    document.head.appendChild(style);
    
    // Start button hover effect
    startBtn.addEventListener('mouseenter', function() {
        if (soundEnabled) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        
        // Create subtle gold particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            this.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    });

    

    // Start button click'
    startBtn.addEventListener('click', function() {
        if (soundEnabled) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        
        // Create elegant transition effect
        createElegantTransition();
        
        // Redirect after animation
        setTimeout(() => {
            window.location.href = "quiz.html";
        }, 1200);
    });
    
    // Create elegant transition effect
    function createElegantTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        document.body.appendChild(overlay);
        
        // Add CSS for transition
        const transitionStyle = document.createElement('style');
        transitionStyle.textContent = `
            .transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to bottom, rgba(255,215,0,0.8), rgba(26,26,46,1));
                z-index: 100;
                opacity: 0;
                animation: fadeInOut 1.2s ease-out forwards;
            }
            @keyframes fadeInOut {
                0% { opacity: 0; transform: scale(0.95); }
                50% { opacity: 1; transform: scale(1); }
                100% { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(transitionStyle);
    }
    
    // Enable sound on first interaction
    let soundEnabled = false;
    document.body.addEventListener('click', function enableSound() {
        soundEnabled = true;
        bgMusic.volume = 0.2;
        bgMusic.play().catch(e => console.log("Auto-play prevented"));
        document.body.removeEventListener('click', enableSound);
    }, { once: true });
    
    // Start animations
    createFloatingElements();
    
    // Add subtle sparkle to title
    const title = document.querySelector('.title');
    setInterval(() => {
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('span');
            sparkle.className = 'title-sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            title.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }, 300);
});