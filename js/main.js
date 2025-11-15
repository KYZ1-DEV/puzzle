// ===============================
// MODULE: NAVIGATION
// ===============================
const NavigationModule = (() => {
    // Elemen navigasi
    const navDashboard = document.getElementById('nav-dashboard');
    const navWarna = document.getElementById('nav-warna');
    const navSuara = document.getElementById('nav-suara');
    const navVisual = document.getElementById('nav-visual');
    
    // Elemen mobile navigation
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMobileDashboard = document.querySelector('.nav-mobile-dashboard');
    const navMobileWarna = document.querySelector('.nav-mobile-warna');
    const navMobileSuara = document.querySelector('.nav-mobile-suara');
    const navMobileVisual = document.querySelector('.nav-mobile-visual');
    const userInfoControls = document.getElementById('user-info-controls');

    // Elemen section game
    const dashboardSection = document.getElementById('dashboard');
    const gameWarnaSection = document.getElementById('game-warna');
    const gameSuaraSection = document.getElementById('game-suara');
    const gameVisualSection = document.getElementById('game-visual');
    
    // Tombol navigasi di dalam game
    const navToWarnaButtons = document.querySelectorAll('.nav-to-warna');
    const navToSuaraButtons = document.querySelectorAll('.nav-to-suara');
    const navToVisualButtons = document.querySelectorAll('.nav-to-visual');
    
    // Fungsi untuk menampilkan section tertentu
    const showSection = (section) => {
        // Hentikan semua game yang sedang berjalan
        GameWarnaModule.stopGame();
        GameSuaraModule.stopGame();
        GameVisualModule.stopGame();
        
        // Sembunyikan semua section
        dashboardSection.classList.remove('active-game');
        gameWarnaSection.classList.remove('active-game');
        gameSuaraSection.classList.remove('active-game');
        gameVisualSection.classList.remove('active-game');
        
        // Tampilkan section yang dipilih
        section.classList.add('active-game');
        
        // Update navigasi aktif
        updateActiveNav(section.id);
        
        // Tutup menu mobile jika terbuka
        mobileMenu.classList.remove('open');
    };
    



    const updateActiveNav = (activeId) => {
        // Hapus kelas aktif dari semua navigasi
        navDashboard.classList.remove('active');
        navWarna.classList.remove('active');
        navSuara.classList.remove('active');
        navVisual.classList.remove('active');

        document.querySelectorAll('.mobile-menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // Tampilkan navigasi yang aktif
        if (activeId === 'dashboard') {
            navDashboard.classList.add('active');
            navMobileDashboard.classList.add('active');
            userInfoControls.classList.add('visible'); // tampilkan dengan animasi
        } else {
            userInfoControls.classList.remove('visible'); // sembunyikan dengan animasi
        }

        if (activeId === 'game-warna') {
            navWarna.classList.add('active');
            navMobileWarna.classList.add('active');
        } else if (activeId === 'game-suara') {
            navSuara.classList.add('active');
            navMobileSuara.classList.add('active');
        } else if (activeId === 'game-visual') {
            navVisual.classList.add('active');
            navMobileVisual.classList.add('active');
        }
    };





    
    // Event listeners untuk navigasi desktop
    navDashboard.addEventListener('click', () => showSection(dashboardSection));
    navWarna.addEventListener('click', () => showSection(gameWarnaSection));
    navSuara.addEventListener('click', () => showSection(gameSuaraSection));
    navVisual.addEventListener('click', () => showSection(gameVisualSection));
    
    // Event listeners untuk navigasi mobile
    navMobileDashboard.addEventListener('click', () => showSection(dashboardSection));
    navMobileWarna.addEventListener('click', () => showSection(gameWarnaSection));
    navMobileSuara.addEventListener('click', () => showSection(gameSuaraSection));
    navMobileVisual.addEventListener('click', () => showSection(gameVisualSection));
    

    navToWarnaButtons.forEach(button => {
        button.addEventListener('click', () => showSection(gameWarnaSection));
    });
    
    navToSuaraButtons.forEach(button => {
        button.addEventListener('click', () => showSection(gameSuaraSection));
    });
    
    navToVisualButtons.forEach(button => {
        button.addEventListener('click', () => showSection(gameVisualSection));
    });
    
    // Toggle menu mobile
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    
    // Tutup menu mobile saat klik di luar
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('open');
        }
    });
    
    return {
        showSection,
        updateActiveNav
    };
})();


// ===============================
// MODULE: STATISTICS MANAGER
// ===============================
const StatsModule = (() => {
    // Simplified stats - only high scores
    let gameStats = {
        highScores: {
            warna: 0,
            suara: 0,
            visual: 0
        },
        currentScores: {
            warna: 0,
            suara: 0,
            visual: 0
        }
    };
    
    // Load stats from localStorage
    const loadStats = () => {
        const savedStats = localStorage.getItem('gamePatternsStats');
        if (savedStats) {
            gameStats = JSON.parse(savedStats);
            updateStatsDisplay();
        }
    };
    
    // Save stats to localStorage
    const saveStats = () => {
        localStorage.setItem('gamePatternsStats', JSON.stringify(gameStats));
        updateStatsDisplay();
    };
    
    // Update stats display (simplified)
    const updateStatsDisplay = () => {
        // Update total score (sum of all high scores)
        document.getElementById('total-score').textContent = 
            gameStats.highScores.warna + gameStats.highScores.suara + gameStats.highScores.visual;
        
        // Update individual high scores
        document.getElementById('highscore-warna').textContent = gameStats.highScores.warna;
        document.getElementById('highscore-suara').textContent = gameStats.highScores.suara;
        document.getElementById('highscore-visual').textContent = gameStats.highScores.visual;
    };
    
    // Update high score for a specific game
    const updateHighScore = (gameType, score) => {
        if (score > gameStats.highScores[gameType]) {
            gameStats.highScores[gameType] = score;
            saveStats();
        }
    };
    
    // Reset all scores
    const resetStats = () => {
        if (confirm('Apakah Anda yakin ingin mereset semua skor?')) {
            gameStats = {
                highScores: {
                    warna: 0,
                    suara: 0,
                    visual: 0
                },
                currentScores: {
                    warna: 0,
                    suara: 0,
                    visual: 0
                }
            };
            saveStats();
            
            // Reset current scores in all games
            document.getElementById('score-warna').textContent = '0';
            document.getElementById('score-suara').textContent = '0';
            document.getElementById('score-visual').textContent = '0';
        }
    };
    
    // Event listener for reset button
    document.getElementById('reset-score').addEventListener('click', resetStats);
    
    return {
        loadStats,
        saveStats,
        updateHighScore,
        gameStats
    };
})();







// ===============================
// MODULE: GAME WARNA
// ===============================
const GameWarnaModule = (() => {
    // Konfigurasi game warna
    const colors = [
        { name: 'Merah', value: 'red', emoji: '🔴', class: 'bg-red-500' },
        { name: 'Biru', value: 'blue', emoji: '🔵', class: 'bg-blue-500' },
        { name: 'Hijau', value: 'green', emoji: '🟢', class: 'bg-green-500' },
        { name: 'Kuning', value: 'yellow', emoji: '🟡', class: 'bg-yellow-500' }
    ];

    // State game warna
    let sequence = [];
    let correctColor = null;
    let gameStarted = false;
    let patternLength = 4;

    // Elemen DOM game warna
    const startBtn = document.getElementById('start-btn-warna');
    const stopBtn = document.getElementById('stop-btn-warna');
    const gameSection = document.getElementById('game-section-warna');
    const sequenceDisplay = document.getElementById('sequence-display-warna');
    const optionsContainer = document.getElementById('options-container-warna');
    const feedback = document.getElementById('feedback-warna');
    const nextBtn = document.getElementById('next-btn-warna');
    const scoreDisplay = document.getElementById('score-warna');

const stopGame = () => {
    if (!gameStarted) return;

    gameStarted = false; // penting, akan dipakai di displaySequence untuk menghentikan animasi

    // Reset tampilan
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    gameSection.classList.add('hidden');
    feedback.innerHTML = '';
    nextBtn.classList.add('hidden');
    sequenceDisplay.innerHTML = '';

    // Reset skor
    StatsModule.gameStats.currentScores.warna = 0;
    scoreDisplay.textContent = '0';

    // Reset panjang pola
    patternLength = 4;
};


    // Fungsi untuk menghasilkan pola warna versi “implicit learning-friendly”
const generatePattern = () => {
    // 1. Buat sequence awal acak (misal patternLength)
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    const sequenceLength = patternLength + 3; // sequence agak lebih panjang
    sequence = [];

    // Pilih warna pertama acak
    let currentColor = shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
    sequence.push(currentColor);

    // Bangun urutan berdasarkan “follow-up rule”
    for (let i = 1; i < sequenceLength; i++) {
        // Pilih warna berikutnya berbeda dari sebelumnya untuk variasi
        const nextColors = shuffledColors.filter(c => c.value !== currentColor.value);
        currentColor = nextColors[Math.floor(Math.random() * nextColors.length)];
        sequence.push(currentColor);
    }

    // Tentukan warna yang harus ditebak
    // Ambil warna terakhir dari sequence, lalu jawabannya adalah warna yang mengikuti warna sebelumnya
    const lastIndex = sequence.length - 1;
    const prevColor = sequence[lastIndex - 1];
    // Cari warna setelah prevColor dalam sequence (first occurrence setelah prevColor)
    let nextColor = colors[0]; // default fallback
    for (let i = 0; i < sequence.length - 1; i++) {
        if (sequence[i].value === prevColor.value) {
            nextColor = sequence[i + 1];
            break;
        }
    }
    correctColor = nextColor;

    // Potong sequence agar tebakan muncul di akhir
    sequence = sequence.slice(0, sequence.length - 1); 

    return sequence;
};


// Fungsi untuk menampilkan urutan warna versi immersive
const displaySequence = async () => {
    sequenceDisplay.innerHTML = '';

    for (let i = 0; i < sequence.length; i++) {
        if (!gameStarted) return; // hentikan animasi jika game dihentikan

        const color = sequence[i];
        const colorElement = document.createElement('div');
        colorElement.className = `color-card w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl ${color.class} opacity-0 transition-opacity duration-500`;
        colorElement.textContent = color.emoji;
        sequenceDisplay.appendChild(colorElement);

        await new Promise(resolve => setTimeout(resolve, 500));
        if (!gameStarted) return;

        colorElement.style.opacity = 1;
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (!gameStarted) return;

    const placeholder = document.createElement('div');
    placeholder.className = 'w-16 h-16 rounded-lg flex items-center justify-center bg-gray-300 text-gray-500 font-bold text-2xl animate-pulse';
    placeholder.textContent = '?';
    sequenceDisplay.appendChild(placeholder);
};


    // Fungsi untuk menampilkan opsi pilihan
    const displayOptions = () => {
        optionsContainer.innerHTML = '';
        
        const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
        
        shuffledColors.forEach(color => {
            const option = document.createElement('button');
            option.className = `color-card ${color.class} text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2`;
            option.innerHTML = `${color.emoji} ${color.name}`;
            option.dataset.color = color.value;
            
            option.addEventListener('click', () => checkAnswer(color.value));
            optionsContainer.appendChild(option);
        });
    };

    // Fungsi untuk memeriksa jawaban
    const checkAnswer = (selectedColor) => {
        const isCorrect = selectedColor === correctColor.value;
        
        if (isCorrect) {
            feedback.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-2"></i>Benar! Kamu mulai menangkap pola warna berulang!</span>';
            StatsModule.gameStats.currentScores.warna++;
            scoreDisplay.textContent = StatsModule.gameStats.currentScores.warna;

            
            if (StatsModule.gameStats.currentScores.warna % 3 === 0 && patternLength < colors.length) {
                patternLength++;
            }
        } else {
            feedback.innerHTML = `<span class="text-red-600"><i class="fas fa-times-circle mr-2"></i>Salah! Seharusnya ${correctColor.emoji} ${correctColor.name}</span>`;
        }
        
        const optionButtons = optionsContainer.querySelectorAll('button');
        optionButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.color === correctColor.value) {
                btn.classList.add('ring-4', 'ring-green-400');
            } else if (btn.dataset.color === selectedColor && !isCorrect) {
                btn.classList.add('ring-4', 'ring-red-400');
            }
        });
        
        nextBtn.classList.remove('hidden');
        StatsModule.saveStats();
    };

    // Fungsi untuk memulai game baru
    const startNewRound = () => {
        generatePattern();
        displaySequence();
        displayOptions();
        
        feedback.innerHTML = '';
        nextBtn.classList.add('hidden');
        
        const optionButtons = optionsContainer.querySelectorAll('button');
        optionButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('ring-4', 'ring-green-400', 'ring-red-400');
        });
    };

    // Event listeners game warna
    startBtn.addEventListener('click', () => {
        gameStarted = true;
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        gameSection.classList.remove('hidden');
        startNewRound();
    });

    stopBtn.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin menghentikan game?')) {
            stopGame();
        }
    });

    nextBtn.addEventListener('click', () => {
        startNewRound();
        StatsModule.updateHighScore('warna', StatsModule.gameStats.currentScores.warna);
    });

    // Inisialisasi game warna
    displayOptions();
    
    return {
        startNewRound,
        stopGame
    };
})();





// ===============================
// MODULE: GAME SUARA
// ===============================
const GameSuaraModule = (() => {
    // Konfigurasi game suara

    const sounds = [
        { name: 'Ting', value: 'ting', emoji: '🔊', class: 'bg-blue-500', frequency: 1046, type: 'triangle', duration: 0.35, volume: 0.6,        description: 'Nada Tinggi' },
        { name: 'Tong', value: 'tong', emoji: '🔉', class: 'bg-green-500', frequency: 784, type: 'sine', duration: 0.35, volume: 0.6,description: 'Nada Sedang' },
        { name: 'Tang', value: 'tang', emoji: '🔉', class: 'bg-yellow-500', frequency: 659, type: 'sawtooth', duration: 0.35, volume: 0.6,description: 'Nada Rendah' },
        { name: 'Deng', value: 'deng', emoji: '🔈', class: 'bg-red-500', frequency: 392, type: 'square', duration: 0.5, volume: 0.5,  description: 'Nada Sangat Rendah' }
    ];

    // State game suara
    let sequence = [];
    let correctSound = null;
    let gameStarted = false;
    let patternLength = 3;
    let audioContext = null;
    let isPlaying = false;

    // Elemen DOM game suara
    const startBtn = document.getElementById('start-btn-suara');
    const stopBtn = document.getElementById('stop-btn-suara');
    const gameSection = document.getElementById('game-section-suara');
    const sequenceDisplay = document.getElementById('sequence-display-suara');
    const optionsContainer = document.getElementById('options-container-suara');
    const feedback = document.getElementById('feedback-suara');
    const nextBtn = document.getElementById('next-btn-suara');
    const scoreDisplay = document.getElementById('score-suara');

    // Fungsi untuk menghentikan game
    const stopGame = () => {
        if (!gameStarted) return;
        
        gameStarted = false;
        isPlaying = false;
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        gameSection.classList.add('hidden');
        feedback.innerHTML = '';
        nextBtn.classList.add('hidden');
        sequenceDisplay.innerHTML = '';
        
        // Hentikan audio context jika sedang bermain
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
        
        // Reset skor sementara
        StatsModule.gameStats.currentScores.suara = 0;
        scoreDisplay.textContent = '0';
        patternLength = 3;
    };

       // Fungsi untuk menghasilkan pola suara yang lebih alami dan menarik
        const generatePattern = () => {
            sequence = [];
            const motifLength = Math.min(3 + Math.floor(StatsModule.gameStats.currentScores.suara / 2), sounds.length);
            
            // Buat motif dasar (pola kecil) — misalnya "ting-tong-tang"
            const motif = [];
            for (let i = 0; i < motifLength; i++) {
                motif.push(sounds[i % sounds.length]);
            }

            // Tambahkan variasi: balik urutan / ubah satu elemen
            const variantMotif = [...motif];
            if (Math.random() < 0.4) variantMotif.reverse(); // 40% kemungkinan dibalik
            if (Math.random() < 0.3) {
                const changeIndex = Math.floor(Math.random() * variantMotif.length);
                variantMotif[changeIndex] = sounds[Math.floor(Math.random() * sounds.length)];
            }

            // Gabungkan dua motif (pola dasar dan variasi)
            sequence = [...motif, ...variantMotif];

            // Pilih titik di mana pola berhenti → pemain harus menebak kelanjutannya
            const stopAt = motifLength + Math.floor(Math.random() * variantMotif.length);
            sequence = sequence.slice(0, stopAt);

            // Prediksi yang seharusnya muncul berikutnya mengikuti logika “rotasi pola”
            const nextIndex = (stopAt) % motifLength;
            correctSound = motif[nextIndex];

            return sequence;
        };



    // Fungsi untuk memainkan suara
    const playSound = (sound, index) => {
        return new Promise((resolve) => {
            if (!gameStarted || !isPlaying) {
                resolve();
                return;
            }
            
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.value = sound.frequency;
            gainNode.gain.value = sound.volume;
            
            const soundElements = sequenceDisplay.querySelectorAll('.sound-card');
            if (soundElements[index]) {
                soundElements[index].classList.add('ring-4', 'ring-indigo-400');
                setTimeout(() => {
                    soundElements[index].classList.remove('ring-4', 'ring-indigo-400');
                }, sound.duration * 1000);
            }
            
            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + sound.duration);
            oscillator.stop(audioContext.currentTime + sound.duration);
            
            oscillator.onended = () => {
                resolve();
            };
        });
    };

    // Fungsi untuk memainkan urutan suara
    const playSequence = async () => {
        isPlaying = true;
        for (let i = 0; i < sequence.length; i++) {
            if (!isPlaying) break;
            await playSound(sequence[i], i);
            if (!isPlaying) break;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        isPlaying = false;
    };

    // Fungsi untuk menampilkan urutan suara versi immersive
        const displaySequence = async () => {
            sequenceDisplay.innerHTML = '';

            for (let i = 0; i < sequence.length; i++) {
                if (!gameStarted) return; // hentikan animasi jika game dihentikan

                const sound = sequence[i];
                const soundElement = document.createElement('div');
                soundElement.className = `
                    sound-card w-16 h-16 rounded-lg flex items-center justify-center 
                    text-white font-bold text-2xl ${sound.class} opacity-0 
                    transition-opacity duration-500 shadow-md transform scale-90
                `;
                soundElement.innerHTML = sound.emoji;
                sequenceDisplay.appendChild(soundElement);

                // jeda antar muncul
                await new Promise(resolve => setTimeout(resolve, 400));
                if (!gameStarted) return;

                // fade-in + sedikit scale-up animasi
                soundElement.style.opacity = 1;
                soundElement.style.transform = 'scale(1)';
                await new Promise(resolve => setTimeout(resolve, 400));
            }

            if (!gameStarted) return;

            // Placeholder akhir — tempat pemain menebak
            const placeholder = document.createElement('div');
            placeholder.className = 'w-16 h-16 rounded-lg flex flex-col items-center justify-center bg-gray-300 text-gray-500 font-bold pulse-animation';
            placeholder.innerHTML = `
                <div class="flex">
                    <div class="sound-wave"></div>
                    <div class="sound-wave"></div>
                    <div class="sound-wave"></div>
                    <div class="sound-wave"></div>
                </div>
                <div class="text-xs mt-1">?</div>
            `;
            sequenceDisplay.appendChild(placeholder);
        };



    // Fungsi untuk menampilkan opsi pilihan
    const displayOptions = () => {
        optionsContainer.innerHTML = '';
        
        const shuffledSounds = [...sounds].sort(() => Math.random() - 0.5);
        
        shuffledSounds.forEach(sound => {
            const option = document.createElement('button');
            option.className = `sound-card ${sound.class} text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-3`;
            option.innerHTML = `
                <span class="text-xl">${sound.emoji}</span>
                <div class="text-left">
                    <div class="font-semibold">${sound.name}</div>
                    <div class="text-xs opacity-80">${sound.description}</div>
                </div>
            `;
            option.dataset.sound = sound.value;
            
            option.addEventListener('click', () => checkAnswer(sound.value));
            optionsContainer.appendChild(option);
        });
    };


    // Fungsi untuk memeriksa jawaban
    const checkAnswer = (selectedSound) => {
        const isCorrect = selectedSound === correctSound.value;

        // Mainkan feedback audio singkat
        playFeedbackTone(isCorrect);

        if (isCorrect) {
            feedback.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-2"></i>Benar! Kamu mulai menangkap polanya!</span>';
            StatsModule.gameStats.currentScores.suara++;
            scoreDisplay.textContent = StatsModule.gameStats.currentScores.suara;
            StatsModule.gameStats.correctAnswers++;

            // Tambah kesulitan bertahap
            if (StatsModule.gameStats.currentScores.suara % 3 === 0 && patternLength < sounds.length + 2) {
                patternLength++;
            }
        } else {
            feedback.innerHTML = `<span class="text-red-600"><i class="fas fa-times-circle mr-2"></i>Salah! Polanya seharusnya ${correctSound.emoji} ${correctSound.name}</span>`;
        }

        // Highlight jawaban benar/salah
        const optionButtons = optionsContainer.querySelectorAll('button');
        optionButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.sound === correctSound.value) {
                btn.classList.add('ring-4', 'ring-green-400');
            } else if (btn.dataset.sound === selectedSound && !isCorrect) {
                btn.classList.add('ring-4', 'ring-red-400');
            }
        });

        nextBtn.classList.remove('hidden');
        StatsModule.saveStats();

        // Tambahkan refleksi edukatif setiap beberapa ronde
        if (StatsModule.gameStats.currentScores.suara > 0 && StatsModule.gameStats.currentScores.suara % 5 === 0) {
            setTimeout(() => {
                alert(
                    "🧠 Refleksi Singkat:\n\n" +
                    "Tanpa sadar kamu sedang belajar mengenali pola suara dari pengalaman berulang.\n" +
                    "Inilah yang disebut *pembelajaran implisit* — dan itulah cara kerja deep learning: " +
                    "membentuk prediksi dari data berulang tanpa instruksi eksplisit!"
                );
            }, 600);
        }
    };




    // Fungsi untuk memulai game baru
    const startNewRound = async () => {
        generatePattern();
        displaySequence();
        displayOptions();
        
        feedback.innerHTML = '';
        nextBtn.classList.add('hidden');
        
        const optionButtons = optionsContainer.querySelectorAll('button');
        optionButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('ring-4', 'ring-green-400', 'ring-red-400');
        });
        
        await playSequence();
    };

    // Event listeners game suara
    startBtn.addEventListener('click', () => {
        gameStarted = true;
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        gameSection.classList.remove('hidden');
        startNewRound();
    });

    stopBtn.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin menghentikan game?')) {
            stopGame();
        }
    });

    nextBtn.addEventListener('click', () => {
        startNewRound();
        StatsModule.updateHighScore('suara', StatsModule.gameStats.currentScores.suara);
    });

    // Fungsi untuk memainkan feedback nada (seperti sinyal training di deep learning)
        const playFeedbackTone = (isCorrect) => {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.value = isCorrect ? 1000 : 200; // Nada tinggi = benar, nada rendah = salah
            gainNode.gain.value = 0.3;

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        };


    // Inisialisasi game suara
    displayOptions();
    
    return {
        startNewRound,
        stopGame
    };
})();












// ===============================
// MODULE: GAME VISUAL
// ===============================
const GameVisualModule = (() => {
    // Konfigurasi game visual
    const gridSize = 3;
    const totalCells = gridSize * gridSize;
    
    const basePatterns = [
        [0, 4, 8],
        [2, 4, 6],
        [0, 1, 2],
        [6, 7, 8],
        [0, 3, 6],
        [2, 5, 8]
    ];

    // State game visual
    let sequence = [];
    let correctCell = null;
    let gameStarted = false;
    let isShowingSequence = false;
    let isWaitingForGuess = false;
    let round = 1;
    let sequenceTimeouts = [];

    // Elemen DOM game visual
    const startBtn = document.getElementById('start-btn-visual');
    const stopBtn = document.getElementById('stop-btn-visual');
    const gameSection = document.getElementById('game-section-visual');
    const gridContainer = document.getElementById('grid-container');
    const gameState = document.getElementById('game-state-visual');
    const feedback = document.getElementById('feedback-visual');
    const nextBtn = document.getElementById('next-btn-visual');
    const scoreDisplay = document.getElementById('score-visual');
    const roundDisplay = document.getElementById('round-visual');
    const overlay = document.getElementById('overlay-visual');
    const closeOverlay = document.getElementById('close-overlay-visual');

    // Fungsi untuk menghentikan game
    const stopGame = () => {
        if (!gameStarted) return;
        
        gameStarted = false;
        isShowingSequence = false;
        isWaitingForGuess = false;
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        gameSection.classList.add('hidden');
        feedback.innerHTML = '';
        nextBtn.classList.add('hidden');
        overlay.classList.add('hidden');
        
        // Hentikan semua timeout sequence
        sequenceTimeouts.forEach(timeout => clearTimeout(timeout));
        sequenceTimeouts = [];
        
        // Reset grid
        resetGrid();
        
        // Reset skor sementara
        StatsModule.gameStats.currentScores.visual = 0;
        scoreDisplay.textContent = '0';
        round = 1;
        roundDisplay.textContent = '1';
    };

    // Fungsi untuk membuat grid
    const createGrid = () => {
        gridContainer.innerHTML = '';
        
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 fade-in';
            cell.dataset.index = i;
            
            cell.addEventListener('click', () => handleGuess(i));
            
            gridContainer.appendChild(cell);
        }
    };


    // Fungsi untuk menghasilkan pola visual yang lebih dinamis dan “hidup”
        const generatePattern = () => {
            const basePattern = basePatterns[Math.floor(Math.random() * basePatterns.length)];
            const shift = Math.floor(Math.random() * 3); // variasi kecil
            const patternVariant = basePattern.map(i => (i + shift) % totalCells);

            // Bangun sequence dengan kombinasi motif dasar dan variasi
            sequence = [];
            for (let i = 0; i < Math.min(round, 3); i++) {
                const currentMotif = i % 2 === 0 ? basePattern : patternVariant;
                sequence.push(...currentMotif);
            }

            // Tentukan titik berhenti acak (prediksi missing pattern)
            const stopAt = Math.floor(Math.random() * (sequence.length - 3)) + 2;
            sequence = sequence.slice(0, stopAt);

            // Prediksi titik berikutnya mengikuti pola motif dasar
            correctCell = basePattern[(stopAt) % basePattern.length];

            return sequence;
        };


    // Fungsi untuk menampilkan urutan visual yang lebih immersive
    const showSequence = async () => {
        if (!gameStarted) return;
        
        isShowingSequence = true;
        gameState.textContent = "Perhatikan pola titik yang menyala...";
        resetGrid();

        for (let i = 0; i < sequence.length; i++) {
            if (!gameStarted) break;

            const cellIndex = sequence[i];
            const cell = document.querySelector(`[data-index="${cellIndex}"]`);

            // Glow efek menyala
            cell.classList.add('bg-indigo-500', 'shadow-lg', 'scale-110', 'transition-all', 'duration-300');
            cell.classList.remove('bg-gray-200');

            const delay = 600 + Math.random() * 300; // variasi tempo
            await new Promise(resolve => setTimeout(resolve, delay));

            if (!gameStarted) break;

            // Padam perlahan
            cell.classList.remove('bg-indigo-500', 'scale-110');
            cell.classList.add('bg-gray-200');
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        if (gameStarted) {
            isShowingSequence = false;
            overlay.classList.remove('hidden');
        }
    };


    // Fungsi untuk menangani tebakan pemain
    const handleGuess = (cellIndex) => {
        if (!isWaitingForGuess || isShowingSequence || !gameStarted) return;
        
        const isCorrect = cellIndex === correctCell;
        const cell = document.querySelector(`[data-index="${cellIndex}"]`);
        
        if (isCorrect) {
            cell.classList.remove('bg-gray-200');
            cell.classList.add('correct');
            
            feedback.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-2"></i>Benar! Kamu menangkap polanya!</span>';
            StatsModule.gameStats.currentScores.visual++;
            scoreDisplay.textContent = StatsModule.gameStats.currentScores.visual;
        } else {
            cell.classList.remove('bg-gray-200');
            cell.classList.add('incorrect');
            
            const correctCellElement = document.querySelector(`[data-index="${correctCell}"]`);
            correctCellElement.classList.remove('bg-gray-200');
            correctCellElement.classList.add('bg-indigo-500', 'pulse-animation');
            
            feedback.innerHTML = `<span class="text-red-600"><i class="fas fa-times-circle mr-2"></i>Salah! Seharusnya titik ${getCellPosition(correctCell)}</span>`;
        }
        
        isWaitingForGuess = false;
        nextBtn.classList.remove('hidden');
        StatsModule.saveStats();
    };

    // Fungsi untuk mendapatkan posisi sel
    const getCellPosition = (index) => {
        const row = Math.floor(index / gridSize) + 1;
        const col = (index % gridSize) + 1;
        return `baris ${row}, kolom ${col}`;
    };

    // Fungsi untuk mereset grid
    const resetGrid = () => {
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            cell.classList.remove('active', 'correct', 'incorrect', 'bg-indigo-500', 'pulse-animation');
            cell.classList.add('bg-gray-200');
        });
    };

    // Fungsi untuk memulai ronde baru
    const startNewRound = () => {
        round++;
        roundDisplay.textContent = round;
        
        generatePattern();
        resetGrid();
        
        feedback.innerHTML = '';
        nextBtn.classList.add('hidden');
        
        gameState.textContent = "Bersiap...";
        
        // Gunakan timeout untuk memulai sequence
        const timeoutId = setTimeout(() => {
            if (gameStarted) showSequence();
        }, 1000);
        sequenceTimeouts.push(timeoutId);
    };

    // Event listeners game visual
    startBtn.addEventListener('click', () => {
        gameStarted = true;
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        gameSection.classList.remove('hidden');
        createGrid();
        
        generatePattern();
        showSequence();
    });

    stopBtn.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin menghentikan game?')) {
            stopGame();
        }
    });

    nextBtn.addEventListener('click', () => {
        startNewRound();
        StatsModule.updateHighScore('visual', StatsModule.gameStats.currentScores.visual);
    });

    closeOverlay.addEventListener('click', () => {
        overlay.classList.add('hidden');
        isWaitingForGuess = true;
        gameState.textContent = "Sekarang tebak titik mana yang akan menyala berikutnya!";
    });

    // Inisialisasi game visual
    createGrid();
    
    return {
        startNewRound,
        stopGame
    };
})();

// ===============================
// INISIALISASI UMUM
// ===============================

// Muat statistik saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    StatsModule.loadStats();
});

