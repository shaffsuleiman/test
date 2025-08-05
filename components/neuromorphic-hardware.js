class NeuromorphicHardware {
    constructor(containerId) {
        this.containerId = containerId;
        this.animationId = null;
        this.isPlaying = true;
        this.init();
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with id ${this.containerId} not found`);
            return;
        }

        container.innerHTML = this.createHTML();
        this.startLoopingAnimation();
    }

    startLoopingAnimation() {
        // Start the initial animation cycle
        this.resetAnimation();
        
        // Set up looping every 10 seconds (8s animation + 2s pause)
        this.animationId = setInterval(() => {
            if (this.isPlaying) {
                this.resetAnimation();
            }
        }, 10000);
    }

    resetAnimation() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        // Reset all animations by removing and re-adding animation classes
        const animatedElements = container.querySelectorAll('[class*="delay-"]');
        animatedElements.forEach(element => {
            // Force reflow to reset animation
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = null;
        });
    }

    stopAnimation() {
        this.isPlaying = false;
        if (this.animationId) {
            clearInterval(this.animationId);
            this.animationId = null;
        }
    }

    startAnimation() {
        this.isPlaying = true;
        if (!this.animationId) {
            this.startLoopingAnimation();
        }
    }

    createHTML() {
        return `
            <div class="diagram-container">
                <div class="title"></div>
                
                <!-- Section labels -->
                <div class="section-label input-label">Input</div>
                <div class="section-label wta-label">WTA-Circuit</div>
                <div class="section-label output-label">Output</div>
                
                <!-- Circuit boundaries -->
                <div class="input-boundary"></div>
                <div class="wta-boundary"></div>
                <div class="separator"></div>
                
                <!-- Input neurons -->
                <div class="neuron delay-1" style="left: 110px; top: 420px;"></div>
                <div class="neuron-label delay-1" style="left: 110px; top: 420px;">N₁</div>
                
                <div class="neuron delay-1" style="left: 150px; top: 420px;"></div>
                <div class="neuron-label delay-1" style="left: 150px; top: 420px;">N₁₀</div>
                
                <!-- WTA neurons -->
                <div class="neuron delay-2" style="left: 290px; top: 420px;"></div>
                <div class="neuron-label delay-2" style="left: 290px; top: 420px;">N₁₁</div>
                
                <div class="neuron delay-2" style="left: 390px; top: 420px;"></div>
                <div class="neuron-label delay-2" style="left: 390px; top: 420px;">N₂₀</div>
                
                <div class="neuron blue delay-2" style="left: 480px; top: 420px;"></div>
                <div class="neuron-label delay-2" style="left: 480px; top: 420px;">N₂₁</div>
                
                <div class="neuron delay-2" style="left: 570px; top: 420px;"></div>
                <div class="neuron-label delay-2" style="left: 570px; top: 420px;">N₂₂</div>
                
                <!-- Input horizontal lines -->
                <div class="h-line red delay-3" style="left: 60px; top: 300px; width: 140px;">
                    <div class="param-label white" style="left: -40px; top: -10px;">I₁₀</div>
                </div>
                <div class="h-line red delay-3" style="left: 60px; top: 350px; width: 140px;">
                    <div class="param-label white" style="left: -30px; top: -10px;">I₁</div>
                </div>
                
                <!-- Dotted connections to WTA -->
                <div class="h-line dotted delay-4" style="left: 125px; top: 430px; width: 95px;"></div>
                <div class="h-line dotted delay-4" style="left: 165px; top: 430px; width: 55px;"></div>
                
                <!-- WTA horizontal grid -->
                <div class="h-line delay-5" style="left: 260px; top: 160px; width: 380px;"></div>
                <div class="h-line delay-5" style="left: 260px; top: 200px; width: 380px;"></div>
                <div class="h-line delay-5" style="left: 260px; top: 250px; width: 380px;"></div>
                <div class="h-line delay-5" style="left: 260px; top: 300px; width: 380px;"></div>
                <div class="h-line delay-5" style="left: 260px; top: 350px; width: 380px;"></div>
                
                <!-- WTA vertical lines -->
                <div class="v-line red delay-6" style="left: 305px; top: 160px; height: 260px;"></div>
                <div class="v-line red delay-6" style="left: 405px; top: 160px; height: 260px;"></div>
                <div class="v-line blue delay-6" style="left: 495px; top: 160px; height: 260px;"></div>
                <div class="v-line red delay-6" style="left: 585px; top: 160px; height: 260px;"></div>
                
                <!-- Dotted vertical lines -->
                <div class="v-line dotted delay-6" style="left: 355px; top: 200px; height: 150px;"></div>
                <div class="v-line dotted delay-6" style="left: 540px; top: 200px; height: 150px;"></div>
                
                <!-- Parameter labels -->
                <div class="param-label red delay-7" style="left: 315px; top: 145px;">β₁</div>
                <div class="param-label red delay-7" style="left: 415px; top: 145px;">β₁</div>
                <div class="param-label red delay-7" style="left: 315px; top: 185px;">α</div>
                <div class="param-label red delay-7" style="left: 415px; top: 185px;">α</div>
                <div class="param-label blue delay-7" style="left: 505px; top: 185px;">β₂</div>
                <div class="param-label red delay-7" style="left: 595px; top: 185px;">β₂</div>
                
                <!-- Weight labels -->
                <div class="param-label white delay-7" style="left: 340px; top: 285px;">w</div>
                <div class="param-label white delay-7" style="left: 520px; top: 285px;">w</div>
                
                <!-- Output line -->
                <div class="h-line delay-7" style="left: 680px; top: 300px; width: 80px;"></div>
            </div>

            <style>
                .diagram-container {
                    width: 900px;
                    height: 600px;
                    position: relative;
                    background-color: #0F1923;
                    padding: 40px;
                }

                .title {
                    text-align: center;
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: white;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                }

                /* Section labels */
                .section-label {
                    position: absolute;
                    font-size: 18px;
                    font-weight: bold;
                    color: white;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                }

                .input-label {
                    left: 80px;
                    top: 80px;
                }

                .wta-label {
                    left: 420px;
                    top: 80px;
                }

                .output-label {
                    right: 80px;
                    top: 280px;
                }

                /* Circuit boundaries */
                .input-boundary {
                    position: absolute;
                    left: 40px;
                    top: 120px;
                    width: 160px;
                    height: 350px;
                    border: 2px solid #555;
                    border-radius: 5px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 0.5s;
                }

                .wta-boundary {
                    position: absolute;
                    left: 240px;
                    top: 100px;
                    width: 420px;
                    height: 390px;
                    border: 2px solid #555;
                    border-radius: 5px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 0.5s;
                }

                /* Separator line */
                .separator {
                    position: absolute;
                    left: 220px;
                    top: 100px;
                    width: 2px;
                    height: 390px;
                    background: repeating-linear-gradient(
                        to bottom,
                        #666 0px,
                        #666 6px,
                        transparent 6px,
                        transparent 12px
                    );
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1s;
                }

                /* Neurons */
                .neuron {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 15px solid #d32f2f;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                }

                .neuron.blue {
                    border-bottom-color: #2196f3;
                }

                .neuron-label {
                    position: absolute;
                    font-size: 14px;
                    color: white;
                    text-align: center;
                    width: 30px;
                    margin-left: -15px;
                    margin-top: 5px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                }

                /* Horizontal lines */
                .h-line {
                    position: absolute;
                    height: 2px;
                    background-color: #888;
                    opacity: 0;
                }

                .h-line.red {
                    background-color: #d32f2f;
                }

                .h-line.dotted {
                    background: repeating-linear-gradient(
                        to right,
                        #888 0px,
                        #888 4px,
                        transparent 4px,
                        transparent 8px
                    );
                }

                /* Vertical lines */
                .v-line {
                    position: absolute;
                    width: 2px;
                    background-color: #888;
                    opacity: 0;
                }

                .v-line.red {
                    background-color: #d32f2f;
                }

                .v-line.blue {
                    background-color: #2196f3;
                }

                .v-line.dotted {
                    background: repeating-linear-gradient(
                        to bottom,
                        #888 0px,
                        #888 4px,
                        transparent 4px,
                        transparent 8px
                    );
                }

                /* Labels */
                .param-label {
                    position: absolute;
                    font-size: 16px;
                    font-weight: bold;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                }

                .param-label.red {
                    color: #d32f2f;
                }

                .param-label.blue {
                    color: #2196f3;
                }

                .param-label.white {
                    color: white;
                }

                /* Animation delays for looping */
                .delay-1 { 
                    animation-delay: 1s; 
                    animation: fadeIn 0.5s ease-in-out forwards;
                }
                .delay-2 { 
                    animation-delay: 2s; 
                    animation: fadeIn 0.5s ease-in-out forwards;
                }
                .delay-3 { 
                    animation-delay: 3s; 
                    animation: drawLine 1s ease-in-out forwards;
                }
                .delay-4 { 
                    animation-delay: 4s; 
                    animation: drawLine 1s ease-in-out forwards;
                }
                .delay-5 { 
                    animation-delay: 5s; 
                    animation: drawLine 1s ease-in-out forwards;
                }
                .delay-6 { 
                    animation-delay: 6s; 
                    animation: drawVertical 1s ease-in-out forwards;
                }
                .delay-7 { 
                    animation-delay: 7s; 
                    animation: fadeIn 0.5s ease-in-out forwards;
                }

                /* Neurons get pulsing animation */
                .neuron {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 15px solid #d32f2f;
                    opacity: 0;
                    animation: fadeInPulse 0.5s ease-in-out forwards;
                }

                .neuron.blue {
                    border-bottom-color: #2196f3;
                    animation: fadeInPulseBlue 0.5s ease-in-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeInPulse {
                    0% { opacity: 0; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); border-bottom-color: #ff5722; }
                    100% { opacity: 1; transform: scale(1); border-bottom-color: #d32f2f; }
                }

                @keyframes fadeInPulseBlue {
                    0% { opacity: 0; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); border-bottom-color: #03a9f4; }
                    100% { opacity: 1; transform: scale(1); border-bottom-color: #2196f3; }
                }

                @keyframes drawLine {
                    0% { 
                        opacity: 0;
                        width: 0;
                        box-shadow: 0 0 0 rgba(255, 255, 255, 0);
                    }
                    50% {
                        opacity: 1;
                        box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
                    }
                    100% { 
                        opacity: 1;
                        box-shadow: 0 0 0 rgba(255, 255, 255, 0);
                    }
                }

                @keyframes drawVertical {
                    0% { 
                        opacity: 0;
                        height: 0;
                        box-shadow: 0 0 0 rgba(255, 255, 255, 0);
                    }
                    50% {
                        opacity: 1;
                        box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
                    }
                    100% { 
                        opacity: 1;
                        box-shadow: 0 0 0 rgba(255, 255, 255, 0);
                    }
                }
            </style>
        `;
    }
}

// Make the class available globally
window.NeuromorphicHardware = NeuromorphicHardware;
