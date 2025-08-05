// Animated Neuron Graph Component
class NeuronGraph {
    constructor(containerId) {
        this.containerId = containerId;
        this.canvas = null;
        this.ctx = null;
        this.animationProgress = 0;
        this.animationId = null;
        
        // Original data points for the four neuron types
        this.originalData = [
            { neuronId: 1, pv: 5, sst: 8, vip: 12, lamp5: 15 },
            { neuronId: 2, pv: 12, sst: 18, vip: 25, lamp5: 30 },
            { neuronId: 3, pv: 25, sst: 35, vip: 40, lamp5: 45 },
            { neuronId: 4, pv: 40, sst: 50, vip: 55, lamp5: 60 },
            { neuronId: 5, pv: 35, sst: 45, vip: 50, lamp5: 55 },
            { neuronId: 6, pv: 20, sst: 28, vip: 35, lamp5: 40 },
            { neuronId: 7, pv: 8, sst: 15, vip: 20, lamp5: 25 }
        ];

        this.colors = {
            pv: '#FF6B35',
            sst: '#0F7BCE',
            vip: '#10B981',
            lamp5: '#8B5CF6'
        };

        this.init();
    }

    init() {
        this.createHTML();
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
            this.setupCanvas();
            this.startAnimation();
        }, 10);
    }

    createHTML() {
        const container = document.getElementById(this.containerId);
        const canvasId = `neuronCanvas-${this.containerId}`;
        container.innerHTML = `
            <div class="neuron-graph-container" style="
                width: 100%;
                background-color: #090E14;
                padding: 15px;
                border-radius: 8px;
                margin: 0 auto;
                position: relative;
            ">
                <canvas id="${canvasId}" width="800" height="400" style="
                    width: 100%;
                    height: 400px;
                    background-color: transparent;
                "></canvas>
                <div class="neuron-legend" style="
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 15px;
                    flex-wrap: wrap;
                ">
                    <div class="legend-item" style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 16px; height: 3px; background-color: #FF6B35; border-radius: 2px;"></div>
                        <span style="color: #DADCE0; font-family: 'Oxanium', monospace; font-size: 12px; font-weight: 500;">PV</span>
                    </div>
                    <div class="legend-item" style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 16px; height: 3px; background-color: #0F7BCE; border-radius: 2px;"></div>
                        <span style="color: #DADCE0; font-family: 'Oxanium', monospace; font-size: 12px; font-weight: 500;">SST</span>
                    </div>
                    <div class="legend-item" style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 16px; height: 3px; background-color: #10B981; border-radius: 2px;"></div>
                        <span style="color: #DADCE0; font-family: 'Oxanium', monospace; font-size: 12px; font-weight: 500;">VIP</span>
                    </div>
                    <div class="legend-item" style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 16px; height: 3px; background-color: #8B5CF6; border-radius: 2px;"></div>
                        <span style="color: #DADCE0; font-family: 'Oxanium', monospace; font-size: 12px; font-weight: 500;">LAMP5</span>
                    </div>
                </div>
            </div>
        `;
    }

    setupCanvas() {
        const canvasId = `neuronCanvas-${this.containerId}`;
        this.canvas = document.getElementById(canvasId);
        
        if (!this.canvas) {
            console.error('Canvas not found:', canvasId);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size for high DPI displays
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Use minimum size if rect is not ready
        const width = rect.width > 0 ? rect.width : 800;
        const height = rect.height > 0 ? rect.height : 400;
        
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
    }

    drawGrid() {
        const width = this.canvas.offsetWidth || parseInt(this.canvas.style.width) || 800;
        const height = this.canvas.offsetHeight || parseInt(this.canvas.style.height) || 400;
        const padding = 60;
        
        this.ctx.strokeStyle = '#2A3441';
        this.ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 0; i <= 6; i++) {
            const x = padding + (i * (width - 2 * padding)) / 6;
            this.ctx.beginPath();
            this.ctx.moveTo(x, padding);
            this.ctx.lineTo(x, height - padding);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 6; i++) {
            const y = padding + (i * (height - 2 * padding)) / 6;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(width - padding, y);
            this.ctx.stroke();
        }
    }

    drawAxes() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        const padding = 60;
        
        this.ctx.strokeStyle = '#DADCE0';
        this.ctx.lineWidth = 2;
        
        // X axis
        this.ctx.beginPath();
        this.ctx.moveTo(padding, height - padding);
        this.ctx.lineTo(width - padding, height - padding);
        this.ctx.stroke();
        
        // Y axis
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, height - padding);
        this.ctx.stroke();
        
        // Labels
        this.ctx.fillStyle = '#DADCE0';
        this.ctx.font = '12px Oxanium, monospace';
        this.ctx.textAlign = 'center';
        
        // X axis labels
        for (let i = 0; i < 7; i++) {
            const x = padding + (i * (width - 2 * padding)) / 6;
            this.ctx.fillText((i + 1).toString(), x, height - padding + 20);
        }
        
        // Y axis labels
        this.ctx.textAlign = 'right';
        for (let i = 0; i <= 6; i++) {
            const y = height - padding - (i * (height - 2 * padding)) / 6;
            const value = Math.round((i * 65) / 6);
            this.ctx.fillText(value.toString(), padding - 10, y + 4);
        }
        
        // Axis titles
        this.ctx.fillStyle = '#DADCE0';
        this.ctx.font = 'bold 14px Oxanium, monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Cortical Layer', width / 2, height - 10);
        
        this.ctx.save();
        this.ctx.translate(20, height / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText('Inhibitory Strength (Hz)', 0, 0);
        this.ctx.restore();
    }

    drawLine(data, color, dash = false, progress = 1) {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        const padding = 60;
        
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        if (dash) {
            this.ctx.setLineDash([5, 5]);
        } else {
            this.ctx.setLineDash([]);
        }
        
        this.ctx.beginPath();
        
        // Calculate how much of the line to draw based on progress
        const totalSegments = data.length - 1;
        const segmentsToShow = Math.floor(totalSegments * progress);
        const partialSegment = (totalSegments * progress) - segmentsToShow;
        
        // Draw complete segments
        for (let i = 0; i <= segmentsToShow; i++) {
            const x = padding + (i * (width - 2 * padding)) / 6;
            const y = height - padding - (data[i] * (height - 2 * padding)) / 65;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        // Draw partial segment if needed
        if (partialSegment > 0 && segmentsToShow < totalSegments) {
            const currentIndex = segmentsToShow;
            const nextIndex = segmentsToShow + 1;
            
            if (nextIndex < data.length) {
                const x1 = padding + (currentIndex * (width - 2 * padding)) / 6;
                const y1 = height - padding - (data[currentIndex] * (height - 2 * padding)) / 65;
                const x2 = padding + (nextIndex * (width - 2 * padding)) / 6;
                const y2 = height - padding - (data[nextIndex] * (height - 2 * padding)) / 65;
                
                // Interpolate the partial segment
                const partialX = x1 + (x2 - x1) * partialSegment;
                const partialY = y1 + (y2 - y1) * partialSegment;
                
                this.ctx.lineTo(partialX, partialY);
            }
        }
        
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawGrid();
        this.drawAxes();
        
        // Calculate animated data - full values but progressive line drawing
        const animatedData = this.originalData.map(point => ({
            pv: point.pv,
            sst: point.sst,
            vip: point.vip,
            lamp5: point.lamp5
        }));
        
        // Draw lines for each neuron type with progressive tracing
        this.drawLine(animatedData.map(d => d.pv), this.colors.pv, false, this.animationProgress);
        this.drawLine(animatedData.map(d => d.sst), this.colors.sst, true, this.animationProgress);
        this.drawLine(animatedData.map(d => d.vip), this.colors.vip, true, this.animationProgress);
        this.drawLine(animatedData.map(d => d.lamp5), this.colors.lamp5, false, this.animationProgress);
    }

    startAnimation() {
        const animate = () => {
            this.animationProgress += 0.015;
            
            if (this.animationProgress >= 1) {
                this.animationProgress = 1;
                this.draw();
                setTimeout(() => {
                    this.animationProgress = 0;
                    this.animationId = requestAnimationFrame(animate);
                }, 2000);
            } else {
                this.draw();
                this.animationId = requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Usage: new NeuronGraph('your-container-id');
