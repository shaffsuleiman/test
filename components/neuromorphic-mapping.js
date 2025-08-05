class NeuromorphicMapping {
    constructor(containerId) {
        this.containerId = containerId;
        this.animationPhase = 0;
        this.isPlaying = true;
        this.animationId = null;
        
        this.init();
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with id ${this.containerId} not found`);
            return;
        }
        
        container.innerHTML = this.createHTML();
        this.startAnimation();
    }

    createHTML() {
        return `
            <div class="neuromorphic-mapping-container" style="
                position: relative;
                width: 100%;
                height: 400px;
                background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
                border-radius: 12px;
                overflow: hidden;
                font-family: 'Oxanium', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            ">
                <!-- Title -->
                <div class="mapping-title" style="
                    position: absolute;
                    top: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 16px;
                    font-weight: 600;
                    color: #E0E6ED;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                ">Neuromorphic Hardware Mapping</div>
                
                <!-- Section labels -->
                <div class="section-label input-label" style="
                    position: absolute;
                    left: 60px;
                    top: 50px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #4A90E2;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 0.5s;
                ">Input</div>
                
                <div class="section-label wta-label" style="
                    position: absolute;
                    left: 220px;
                    top: 50px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #7C4DFF;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 0.5s;
                ">WTA-Circuit</div>
                
                <div class="section-label output-label" style="
                    position: absolute;
                    right: 60px;
                    top: 180px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #FF6B6B;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 0.5s;
                ">Output</div>
                
                <!-- Circuit boundaries -->
                <div class="input-boundary" style="
                    position: absolute;
                    left: 30px;
                    top: 80px;
                    width: 120px;
                    height: 280px;
                    border: 2px solid rgba(74, 144, 226, 0.3);
                    border-radius: 8px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 0.5s;
                "></div>
                
                <div class="wta-boundary" style="
                    position: absolute;
                    left: 180px;
                    top: 70px;
                    width: 320px;
                    height: 300px;
                    border: 2px solid rgba(124, 77, 255, 0.3);
                    border-radius: 8px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 0.5s;
                "></div>
                
                <!-- Separator line -->
                <div class="separator" style="
                    position: absolute;
                    left: 170px;
                    top: 80px;
                    width: 2px;
                    height: 300px;
                    background: repeating-linear-gradient(
                        to bottom,
                        #666 0px,
                        #666 4px,
                        transparent 4px,
                        transparent 8px
                    );
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1s;
                "></div>
                
                <!-- Input neurons -->
                <div class="neuron input-neuron-1" id="input-neuron-1-${this.containerId}" style="
                    position: absolute;
                    left: 80px;
                    top: 320px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 12px solid #4A90E2;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1s;
                "></div>
                <div class="neuron-label" style="
                    position: absolute;
                    left: 70px;
                    top: 340px;
                    font-size: 12px;
                    color: #E0E6ED;
                    text-align: center;
                    width: 20px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1s;
                ">N₁</div>
                
                <div class="neuron input-neuron-10" id="input-neuron-10-${this.containerId}" style="
                    position: absolute;
                    left: 110px;
                    top: 320px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 12px solid #4A90E2;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1s;
                "></div>
                <div class="neuron-label" style="
                    position: absolute;
                    left: 98px;
                    top: 340px;
                    font-size: 12px;
                    color: #E0E6ED;
                    text-align: center;
                    width: 24px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1s;
                ">N₁₀</div>
                
                <!-- WTA neurons -->
                <div class="neuron wta-neuron-11" id="wta-neuron-11-${this.containerId}" style="
                    position: absolute;
                    left: 220px;
                    top: 320px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 12px solid #7C4DFF;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1.5s;
                "></div>
                <div class="neuron-label" style="
                    position: absolute;
                    left: 206px;
                    top: 340px;
                    font-size: 12px;
                    color: #E0E6ED;
                    text-align: center;
                    width: 28px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1.5s;
                ">N₁₁</div>
                
                <div class="neuron wta-neuron-20" id="wta-neuron-20-${this.containerId}" style="
                    position: absolute;
                    left: 280px;
                    top: 320px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 12px solid #7C4DFF;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1.5s;
                "></div>
                <div class="neuron-label" style="
                    position: absolute;
                    left: 266px;
                    top: 340px;
                    font-size: 12px;
                    color: #E0E6ED;
                    text-align: center;
                    width: 28px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1.5s;
                ">N₂₀</div>
                
                <div class="neuron wta-neuron-21" id="wta-neuron-21-${this.containerId}" style="
                    position: absolute;
                    left: 340px;
                    top: 320px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 12px solid #00E676;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1.5s;
                "></div>
                <div class="neuron-label" style="
                    position: absolute;
                    left: 326px;
                    top: 340px;
                    font-size: 12px;
                    color: #E0E6ED;
                    text-align: center;
                    width: 28px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1.5s;
                ">N₂₁</div>
                
                <div class="neuron wta-neuron-22" id="wta-neuron-22-${this.containerId}" style="
                    position: absolute;
                    left: 400px;
                    top: 320px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 12px solid #7C4DFF;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1.5s;
                "></div>
                <div class="neuron-label" style="
                    position: absolute;
                    left: 386px;
                    top: 340px;
                    font-size: 12px;
                    color: #E0E6ED;
                    text-align: center;
                    width: 28px;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 1.5s;
                ">N₂₂</div>
                
                <!-- Input pathways -->
                <div class="input-pathway" id="input-pathway-1-${this.containerId}" style="
                    position: absolute;
                    left: 40px;
                    top: 220px;
                    width: 120px;
                    height: 2px;
                    background-color: #FF6B6B;
                    opacity: 0;
                    animation: drawLine 1s ease-in-out forwards;
                    animation-delay: 2s;
                "></div>
                <div class="param-label" style="
                    position: absolute;
                    left: 10px;
                    top: 210px;
                    font-size: 12px;
                    color: #FF6B6B;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 2.5s;
                ">I₁₀</div>
                
                <div class="input-pathway" id="input-pathway-2-${this.containerId}" style="
                    position: absolute;
                    left: 40px;
                    top: 260px;
                    width: 120px;
                    height: 2px;
                    background-color: #FF6B6B;
                    opacity: 0;
                    animation: drawLine 1s ease-in-out forwards;
                    animation-delay: 2s;
                "></div>
                <div class="param-label" style="
                    position: absolute;
                    left: 18px;
                    top: 250px;
                    font-size: 12px;
                    color: #FF6B6B;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 2.5s;
                ">I₁</div>
                
                <!-- Dotted connections to WTA -->
                <div class="dotted-connection" id="dotted-conn-1-${this.containerId}" style="
                    position: absolute;
                    left: 88px;
                    top: 326px;
                    width: 132px;
                    height: 2px;
                    background: repeating-linear-gradient(
                        to right,
                        #888 0px,
                        #888 4px,
                        transparent 4px,
                        transparent 8px
                    );
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 3s;
                "></div>
                
                <div class="dotted-connection" id="dotted-conn-2-${this.containerId}" style="
                    position: absolute;
                    left: 118px;
                    top: 326px;
                    width: 102px;
                    height: 2px;
                    background: repeating-linear-gradient(
                        to right,
                        #888 0px,
                        #888 4px,
                        transparent 4px,
                        transparent 8px
                    );
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 3s;
                "></div>
                
                <!-- WTA grid lines -->
                <div class="grid-line h-grid" id="h-grid-1-${this.containerId}" style="
                    position: absolute;
                    left: 200px;
                    top: 120px;
                    width: 280px;
                    height: 1px;
                    background-color: rgba(124, 77, 255, 0.4);
                    opacity: 0;
                    animation: drawLine 1s ease-in-out forwards;
                    animation-delay: 3.5s;
                "></div>
                
                <div class="grid-line h-grid" id="h-grid-2-${this.containerId}" style="
                    position: absolute;
                    left: 200px;
                    top: 150px;
                    width: 280px;
                    height: 1px;
                    background-color: rgba(124, 77, 255, 0.4);
                    opacity: 0;
                    animation: drawLine 1s ease-in-out forwards;
                    animation-delay: 3.5s;
                "></div>
                
                <div class="grid-line h-grid" id="h-grid-3-${this.containerId}" style="
                    position: absolute;
                    left: 200px;
                    top: 190px;
                    width: 280px;
                    height: 1px;
                    background-color: rgba(124, 77, 255, 0.4);
                    opacity: 0;
                    animation: drawLine 1s ease-in-out forwards;
                    animation-delay: 3.5s;
                "></div>
                
                <div class="grid-line h-grid" id="h-grid-4-${this.containerId}" style="
                    position: absolute;
                    left: 200px;
                    top: 230px;
                    width: 280px;
                    height: 1px;
                    background-color: rgba(124, 77, 255, 0.4);
                    opacity: 0;
                    animation: drawLine 1s ease-in-out forwards;
                    animation-delay: 3.5s;
                "></div>
                
                <div class="grid-line h-grid" id="h-grid-5-${this.containerId}" style="
                    position: absolute;
                    left: 200px;
                    top: 270px;
                    width: 280px;
                    height: 1px;
                    background-color: rgba(124, 77, 255, 0.4);
                    opacity: 0;
                    animation: drawLine 1s ease-in-out forwards;
                    animation-delay: 3.5s;
                "></div>
                
                <!-- WTA vertical lines -->
                <div class="grid-line v-grid" id="v-grid-1-${this.containerId}" style="
                    position: absolute;
                    left: 228px;
                    top: 120px;
                    width: 2px;
                    height: 200px;
                    background-color: #FF6B6B;
                    opacity: 0;
                    animation: drawVertical 1s ease-in-out forwards;
                    animation-delay: 4s;
                "></div>
                
                <div class="grid-line v-grid" id="v-grid-2-${this.containerId}" style="
                    position: absolute;
                    left: 288px;
                    top: 120px;
                    width: 2px;
                    height: 200px;
                    background-color: #FF6B6B;
                    opacity: 0;
                    animation: drawVertical 1s ease-in-out forwards;
                    animation-delay: 4s;
                "></div>
                
                <div class="grid-line v-grid" id="v-grid-3-${this.containerId}" style="
                    position: absolute;
                    left: 348px;
                    top: 120px;
                    width: 2px;
                    height: 200px;
                    background-color: #00E676;
                    opacity: 0;
                    animation: drawVertical 1s ease-in-out forwards;
                    animation-delay: 4s;
                "></div>
                
                <div class="grid-line v-grid" id="v-grid-4-${this.containerId}" style="
                    position: absolute;
                    left: 408px;
                    top: 120px;
                    width: 2px;
                    height: 200px;
                    background-color: #FF6B6B;
                    opacity: 0;
                    animation: drawVertical 1s ease-in-out forwards;
                    animation-delay: 4s;
                "></div>
                
                <!-- Parameter labels -->
                <div class="param-label" style="
                    position: absolute;
                    left: 235px;
                    top: 105px;
                    font-size: 11px;
                    color: #FF6B6B;
                    font-weight: 600;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 5s;
                ">β₁</div>
                
                <div class="param-label" style="
                    position: absolute;
                    left: 295px;
                    top: 105px;
                    font-size: 11px;
                    color: #FF6B6B;
                    font-weight: 600;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 5s;
                ">β₁</div>
                
                <div class="param-label" style="
                    position: absolute;
                    left: 245px;
                    top: 135px;
                    font-size: 11px;
                    color: #FF6B6B;
                    font-weight: 600;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 5s;
                ">α</div>
                
                <div class="param-label" style="
                    position: absolute;
                    left: 305px;
                    top: 135px;
                    font-size: 11px;
                    color: #FF6B6B;
                    font-weight: 600;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 5s;
                ">α</div>
                
                <div class="param-label" style="
                    position: absolute;
                    left: 355px;
                    top: 135px;
                    font-size: 11px;
                    color: #00E676;
                    font-weight: 600;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 5s;
                ">β₂</div>
                
                <div class="param-label" style="
                    position: absolute;
                    left: 415px;
                    top: 135px;
                    font-size: 11px;
                    color: #FF6B6B;
                    font-weight: 600;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 5s;
                ">β₂</div>
                
                <!-- Weight labels -->
                <div class="param-label" style="
                    position: absolute;
                    left: 250px;
                    top: 210px;
                    font-size: 11px;
                    color: #E0E6ED;
                    font-weight: 600;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 5.5s;
                ">w</div>
                
                <div class="param-label" style="
                    position: absolute;
                    left: 370px;
                    top: 210px;
                    font-size: 11px;
                    color: #E0E6ED;
                    font-weight: 600;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 5.5s;
                ">w</div>
                
                <!-- Output line -->
                <div class="output-line" style="
                    position: absolute;
                    left: 520px;
                    top: 220px;
                    width: 60px;
                    height: 2px;
                    background-color: #FF6B6B;
                    opacity: 0;
                    animation: drawLine 1s ease-in-out forwards;
                    animation-delay: 6s;
                "></div>
                
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes drawLine {
                        from { 
                            opacity: 0;
                            width: 0;
                        }
                        to { 
                            opacity: 1;
                        }
                    }
                    
                    @keyframes drawVertical {
                        from { 
                            opacity: 0;
                            height: 0;
                        }
                        to { 
                            opacity: 1;
                        }
                    }
                </style>
            </div>
        `;
    }

    updateAnimation() {
        // Create pulsing animation for neurons
        const pulseIntensity = 0.5 + 0.5 * Math.sin(this.animationPhase);
        
        // Animate input neurons
        const inputNeurons = [
            `input-neuron-1-${this.containerId}`,
            `input-neuron-10-${this.containerId}`
        ];
        
        inputNeurons.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const scale = 1 + pulseIntensity * 0.2 * (1 + index * 0.1);
                element.style.transform = `scale(${scale})`;
                element.style.transformOrigin = 'center bottom';
            }
        });
        
        // Animate WTA neurons
        const wtaNeurons = [
            `wta-neuron-11-${this.containerId}`,
            `wta-neuron-20-${this.containerId}`,
            `wta-neuron-21-${this.containerId}`,
            `wta-neuron-22-${this.containerId}`
        ];
        
        wtaNeurons.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const scale = 1 + Math.sin(this.animationPhase * 1.2 + index * 0.5) * 0.15;
                element.style.transform = `scale(${scale})`;
                element.style.transformOrigin = 'center bottom';
            }
        });
        
        // Animate pathways with opacity flow
        const pathways = [
            `input-pathway-1-${this.containerId}`,
            `input-pathway-2-${this.containerId}`,
            `dotted-conn-1-${this.containerId}`,
            `dotted-conn-2-${this.containerId}`
        ];
        
        pathways.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const opacity = 0.7 + 0.3 * Math.sin(this.animationPhase * 2 + index * 0.3);
                element.style.opacity = opacity;
            }
        });
        
        // Animate grid lines
        const gridLines = [
            `h-grid-1-${this.containerId}`, `h-grid-2-${this.containerId}`,
            `h-grid-3-${this.containerId}`, `h-grid-4-${this.containerId}`,
            `h-grid-5-${this.containerId}`, `v-grid-1-${this.containerId}`,
            `v-grid-2-${this.containerId}`, `v-grid-3-${this.containerId}`,
            `v-grid-4-${this.containerId}`
        ];
        
        gridLines.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const opacity = 0.6 + 0.4 * Math.sin(this.animationPhase * 0.8 + index * 0.2);
                element.style.opacity = opacity;
            }
        });
    }

    startAnimation() {
        const animate = () => {
            if (this.isPlaying) {
                this.animationPhase += 0.05;
                
                if (this.animationPhase > Math.PI * 4) {
                    this.animationPhase = 0;
                }
                
                this.updateAnimation();
            }
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        // Start animation after initial sequential animations complete
        setTimeout(animate, 8000);
    }

    toggleAnimation() {
        this.isPlaying = !this.isPlaying;
    }

    resetAnimation() {
        this.animationPhase = 0;
        this.isPlaying = true;
        this.updateAnimation();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Usage: new NeuromorphicMapping('your-container-id');