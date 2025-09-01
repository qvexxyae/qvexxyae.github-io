let hasUserInteracted = false;

function initMedia() {
  console.log("initMedia called");
  const backgroundVideo = document.getElementById('background');
  if (!backgroundVideo) {
    console.error("Video element not found");
    return;
  }
  
  // Start with muted autoplay due to browser restrictions
  backgroundVideo.muted = true;
  backgroundVideo.volume = 0.3;
  
  backgroundVideo.play().catch(err => {
    console.error("Failed to play background video:", err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const homeButton = document.getElementById('home-theme');
  const hackerButton = document.getElementById('hacker-theme');
  const rainButton = document.getElementById('rain-theme');
  const animeButton = document.getElementById('anime-theme');
  const carButton = document.getElementById('car-theme');
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const transparencySlider = document.getElementById('transparency-slider');
  const backgroundVideo = document.getElementById('background');
  const hackerOverlay = document.getElementById('hacker-overlay');
  const snowOverlay = document.getElementById('snow-overlay');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-icon');
  const badges = document.querySelectorAll('.badge');

  // Initialize media on load (muted autoplay)
  initMedia();

  // Custom cursor setup
  const cursor = document.querySelector('.custom-cursor');
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchend', () => {
      cursor.style.display = 'none'; 
    });
  } else {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8) translate(-50%, -50%)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1) translate(-50%, -50%)';
    });
  }

  // Start screen typewriter
  const startMessage = "Click here to see the motion baby";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
    }
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    setTimeout(typeWriterStart, 100);
  }

  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
  }, 500);

  // Visitor counter
  function initializeVisitorCounter() {
    let totalVisitors = localStorage.getItem('totalVisitorCount');
    if (!totalVisitors) {
      totalVisitors = "∞";
      localStorage.setItem('totalVisitorCount', totalVisitors);
    } else if (totalVisitors !== "∞") {
      totalVisitors = parseInt(totalVisitors);
    }

    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited && totalVisitors !== "∞") {
      totalVisitors++;
      localStorage.setItem('totalVisitorCount', totalVisitors);
      localStorage.setItem('hasVisited', 'true');
    }
  }

  initializeVisitorCounter();

  // Set static name and bio text
  function setStaticContent() {
    profileName.textContent = "AIMLESS";
    profileBio.textContent = 'Chuck Schuldiner says "Fuck CANCER"';
  }

  // Enhanced start screen click handler
  function handleStartScreen() {
    hasUserInteracted = true;
    startScreen.classList.add('hidden');
    
    // Unmute and play video with sound
    backgroundVideo.muted = false;
    backgroundVideo.volume = volumeSlider.value;
    
    // Ensure video continues playing with sound
    backgroundVideo.play().catch(err => {
      console.error("Failed to play video with sound:", err);
    });
    
    profileBlock.classList.remove('hidden');
    gsap.fromTo(profileBlock,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
        profileBlock.classList.add('profile-appear');
        profileContainer.classList.add('orbit');
      }}
    );
    
    if (!isTouchDevice) {
      try {
        new cursorTrailEffect({
          length: 10,
          size: 8,
          speed: 0.2
        });
        console.log("Cursor trail initialized");
      } catch (err) {
        console.error("Failed to initialize cursor trail effect:", err);
      }
    }
    
    setStaticContent();
  }

  startScreen.addEventListener('click', handleStartScreen);
  startScreen.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleStartScreen();
  });

  // Audio controls - now control video element
  volumeIcon.addEventListener('click', () => {
    toggleMute();
  });

  volumeIcon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleMute();
  });

  function toggleMute() {
    backgroundVideo.muted = !backgroundVideo.muted;
    updateVolumeIcon();
  }

  function updateVolumeIcon() {
    volumeIcon.innerHTML = backgroundVideo.muted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  }

  volumeSlider.addEventListener('input', () => {
    backgroundVideo.volume = volumeSlider.value;
    backgroundVideo.muted = false;
    updateVolumeIcon();
  });

  // Transparency controls
  transparencySlider.addEventListener('input', () => {
    const opacity = transparencySlider.value;
    const elements = [profileBlock, skillsBlock];
    
    elements.forEach(element => {
      if (opacity == 0) {
        element.style.background = 'rgba(0, 0, 0, 0)';
        element.style.borderOpacity = '0';
        element.style.borderColor = 'transparent';
        element.style.backdropFilter = 'none';
      } else {
        element.style.background = `rgba(0, 0, 0, ${opacity})`;
        element.style.borderOpacity = opacity;
        element.style.borderColor = '';
        element.style.backdropFilter = `blur(${10 * opacity}px)`;
      }
    });
    
    // Keep interactive elements visible
    [socialIcons, badges].forEach(nodeList => {
      nodeList.forEach(item => {
        item.style.pointerEvents = 'auto';
        item.style.opacity = '1';
      });
    });
    
    [profilePicture, profileName, profileBio, visitorCount].forEach(element => {
      if (element) {
        element.style.pointerEvents = 'auto';
        element.style.opacity = '1';
      }
    });
  });

  // Theme switching - simplified for video sound
  function switchTheme(videoSrc, themeClass, overlay = null, overlayOverProfile = false) {
    // Save current audio state
    const wasMuted = backgroundVideo.muted;
    const volumeLevel = backgroundVideo.volume;
    
    gsap.to(backgroundVideo, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        backgroundVideo.src = videoSrc;
        backgroundVideo.muted = wasMuted;
        backgroundVideo.volume = volumeLevel;
        
        // Play new video source
        backgroundVideo.play().catch(err => {
          console.error("Failed to play theme video:", err);
        });

        // Theme class management
        document.body.classList.remove('home-theme', 'hacker-theme', 'rain-theme', 'anime-theme', 'car-theme');
        document.body.classList.add(themeClass);

        // Overlay management
        [hackerOverlay, snowOverlay].forEach(overlayEl => {
          if (overlayEl) overlayEl.classList.add('hidden');
        });
        
        const zIndex = overlayOverProfile ? 10 : 20;
        [profileBlock, skillsBlock].forEach(block => {
          if (block) block.style.zIndex = zIndex;
        });
        
        if (overlay) {
          overlay.classList.remove('hidden');
        }

        // Special handling for hacker theme
        if (themeClass === 'hacker-theme') {
          resultsButtonContainer.classList.remove('hidden');
        } else {
          resultsButtonContainer.classList.add('hidden');
          skillsBlock.classList.add('hidden');
          resultsHint.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.to(profileBlock, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        }

        gsap.to(backgroundVideo, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            // Restart orbit animation
            if (profileContainer) {
              profileContainer.classList.remove('orbit');
              void profileContainer.offsetWidth;
              profileContainer.classList.add('orbit');
            }
          }
        });
      }
    });
  }

  // Theme button event listeners
  const themeButtons = [
    { button: homeButton, video: 'assets/background.mp4', theme: 'home-theme' },
    { button: hackerButton, video: 'assets/background.mp4', theme: 'hacker-theme', overlay: hackerOverlay },
    { button: rainButton, video: 'assets/background.mp4', theme: 'rain-theme', overlay: snowOverlay, overlayOverProfile: true },
    { button: animeButton, video: 'assets/background.mp4', theme: 'anime-theme' },
    { button: carButton, video: 'assets/background.mp4', theme: 'car-theme' }
  ];

  themeButtons.forEach(({ button, video, theme, overlay, overlayOverProfile }) => {
    if (button) {
      button.addEventListener('click', () => {
        switchTheme(video, theme, overlay, overlayOverProfile);
      });
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        switchTheme(video, theme, overlay, overlayOverProfile);
      });
    }
  });

  // 3D tilt effect
  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;

    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;
    const maxTilt = 15;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  }

  function resetTilt(element) {
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  // Apply tilt effects
  [profileBlock, skillsBlock].forEach(block => {
    if (block) {
      block.addEventListener('mousemove', (e) => handleTilt(e, block));
      block.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleTilt(e, block);
      });
      block.addEventListener('mouseleave', () => resetTilt(block));
      block.addEventListener('touchend', () => resetTilt(block));
    }
  });

  // Profile picture interactions
  if (profilePicture && glitchOverlay) {
    profilePicture.addEventListener('mouseenter', () => {
      glitchOverlay.style.opacity = '1';
      setTimeout(() => {
        glitchOverlay.style.opacity = '0';
      }, 500);
    });

    function triggerFastOrbit() {
      if (profileContainer) {
        profileContainer.classList.remove('fast-orbit', 'orbit');
        void profileContainer.offsetWidth;
        profileContainer.classList.add('fast-orbit');
        setTimeout(() => {
          profileContainer.classList.remove('fast-orbit');
          void profileContainer.offsetWidth;
          profileContainer.classList.add('orbit');
        }, 500);
      }
    }

    profilePicture.addEventListener('click', triggerFastOrbit);
    profilePicture.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerFastOrbit();
    });
  }

  // Skills toggle
  let isShowingSkills = false;
  function toggleSkills() {
    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
          // Animate skill bars
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  }

  if (resultsButton) {
    resultsButton.addEventListener('click', toggleSkills);
    resultsButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      toggleSkills();
    });
  }

  // Start the typewriter for start screen
  typeWriterStart();
});
