// Animated WTA Diagram Component
class WTADiagram {
    constructor(containerId) {
        this.containerId = containerId;
        this.svg = null;
        this.animationPhase = 0;
        this.pulseIntensity = 0;
        this.animationId = null;
        this.isPlaying = true;

        this.init();
    }

    init() {
        this.createHTML();
        this.setupSVG();
        this.startAnimation();
    }

    createHTML() {
        const container = document.getElementById(this.containerId);
        const svgId = `wtaSvg-${this.containerId}`;
        container.innerHTML = `
            <div class="wta-diagram-container" style="
                width: 100%;
                background-color: #090E14;
                padding: 15px;
                border-radius: 8px;
                margin: 0 auto;
                position: relative;
            ">
                <svg id="${svgId}" width="100%" height="400" viewBox="0 0 600 400" style="
                    width: 100%;
                    height: 400px;
                    background-color: transparent;
                ">
                    <!-- SVG content will be added programmatically -->
                </svg>
            </div>
        `;
    }

    setupSVG() {
        const svgId = `wtaSvg-${this.containerId}`;
        this.svg = document.getElementById(svgId);
        
        // Create SVG defs for filters
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Glow filter
        const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        glowFilter.setAttribute('id', 'glow');
        glowFilter.setAttribute('x', '-50%');
        glowFilter.setAttribute('y', '-50%');
        glowFilter.setAttribute('width', '200%');
        glowFilter.setAttribute('height', '200%');
        
        const gaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        gaussianBlur.setAttribute('stdDeviation', '3');
        gaussianBlur.setAttribute('result', 'coloredBlur');
        
        const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
        const mergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        mergeNode1.setAttribute('in', 'coloredBlur');
        const mergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        mergeNode2.setAttribute('in', 'SourceGraphic');
        
        merge.appendChild(mergeNode1);
        merge.appendChild(mergeNode2);
        glowFilter.appendChild(gaussianBlur);
        glowFilter.appendChild(merge);
        defs.appendChild(glowFilter);
        
        this.svg.appendChild(defs);
        
        this.createStaticElements();
    }

    createStaticElements() {
        // State WTA Pool Background
        const statePool = this.createSVGElement('rect', {
            x: '50', y: '50', width: '500', height: '120',
            rx: '60', ry: '60', fill: 'none',
            stroke: '#2A3441', 'stroke-width': '2'
        });
        this.svg.appendChild(statePool);
        
        // Pointer WTA Pool Background
        const pointerPool = this.createSVGElement('rect', {
            x: '50', y: '220', width: '500', height: '120',
            rx: '60', ry: '60', fill: 'none',
            stroke: '#2A3441', 'stroke-width': '2'
        });
        this.svg.appendChild(pointerPool);
        
        // Connection lines
        this.createConnectionLines();
        
        // Create nodes
        this.createNodes();
        
        // Create labels
        this.createLabels();
        
        // Create legend
        this.createLegend();
    }

    createSVGElement(type, attributes) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', type);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        return element;
    }

    createConnectionLines() {
        // Vertical connections
        const connections = [
            {x1: '150', y1: '170', x2: '150', y2: '220', id: 'conn1'},
            {x1: '250', y1: '170', x2: '250', y2: '220', id: 'conn2'},
            {x1: '150', y1: '170', x2: '250', y2: '220', id: 'conn3'},
            {x1: '250', y1: '170', x2: '150', y2: '220', id: 'conn4'},
        ];
        
        connections.forEach(conn => {
            const line = this.createSVGElement('line', {
                x1: conn.x1, y1: conn.y1, x2: conn.x2, y2: conn.y2,
                stroke: '#FF6B35', 'stroke-width': '2',
                opacity: '0.5', id: conn.id
            });
            this.svg.appendChild(line);
        });
        
        // Horizontal connections
        const hConnections = [
            {x1: '350', y1: '100', x2: '450', y2: '100', id: 'hconn1'},
            {x1: '350', y1: '130', x2: '450', y2: '130', id: 'hconn2'},
            {x1: '350', y1: '270', x2: '450', y2: '270', id: 'hconn3'},
        ];
        
        hConnections.forEach(conn => {
            const line = this.createSVGElement('line', {
                x1: conn.x1, y1: conn.y1, x2: conn.x2, y2: conn.y2,
                stroke: '#10B981', 'stroke-width': '2',
                opacity: '0.5', id: conn.id
            });
            this.svg.appendChild(line);
        });
    }

    createNodes() {
        // State WTA Pool nodes (S1)
        const s1Nodes = [
            {cx: '150', cy: '100', id: 's1-1'},
            {cx: '150', cy: '140', id: 's1-2'}
        ];
        
        s1Nodes.forEach(node => {
            const circle = this.createSVGElement('circle', {
                cx: node.cx, cy: node.cy, r: '20',
                fill: '#CD919E', stroke: '#8B4513', 'stroke-width': '2',
                id: node.id
            });
            this.svg.appendChild(circle);
        });
        
        // State WTA Pool nodes (S2)
        const s2Nodes = [
            {cx: '250', cy: '100', id: 's2-1'},
            {cx: '250', cy: '140', id: 's2-2'}
        ];
        
        s2Nodes.forEach(node => {
            const circle = this.createSVGElement('circle', {
                cx: node.cx, cy: node.cy, r: '20',
                fill: '#CD919E', stroke: '#8B4513', 'stroke-width': '2',
                id: node.id
            });
            this.svg.appendChild(circle);
        });
        
        // Inhibitory pools for state WTA
        const inhibNodes = [
            {cx: '470', cy: '100', id: 'inhib-1'},
            {cx: '470', cy: '130', id: 'inhib-2'}
        ];
        
        inhibNodes.forEach(node => {
            const circle = this.createSVGElement('circle', {
                cx: node.cx, cy: node.cy, r: '15',
                fill: '#87CEEB', id: node.id
            });
            this.svg.appendChild(circle);
        });
        
        // Pointer WTA Pool nodes
        const pointerNodes = [
            {cx: '150', cy: '270', id: 'p12'},
            {cx: '250', cy: '270', id: 'p21'}
        ];
        
        pointerNodes.forEach(node => {
            const circle = this.createSVGElement('circle', {
                cx: node.cx, cy: node.cy, r: '20',
                fill: '#CD919E', stroke: '#8B4513', 'stroke-width': '2',
                id: node.id
            });
            this.svg.appendChild(circle);
        });
        
        // Inhibitory pool for pointer WTA
        const pointerInhib = this.createSVGElement('circle', {
            cx: '470', cy: '270', r: '15',
            fill: '#87CEEB', id: 'pointer-inhib'
        });
        this.svg.appendChild(pointerInhib);
        
        // Dashed boxes around S1 and S2
        const s1Box = this.createSVGElement('rect', {
            x: '120', y: '80', width: '60', height: '80',
            rx: '5', ry: '5', fill: 'none',
            stroke: '#4CAF50', 'stroke-width': '2',
            'stroke-dasharray': '8,4', opacity: '0.6', id: 's1-box'
        });
        this.svg.appendChild(s1Box);
        
        const s2Box = this.createSVGElement('rect', {
            x: '220', y: '80', width: '60', height: '80',
            rx: '5', ry: '5', fill: 'none',
            stroke: '#2196F3', 'stroke-width': '2',
            'stroke-dasharray': '8,4', opacity: '0.6', id: 's2-box'
        });
        this.svg.appendChild(s2Box);
    }

    createLabels() {
        const labels = [
            {x: '90', y: '110', text: 'S1', fill: '#4CAF50', id: 's1-label'},
            {x: '290', y: '110', text: 'S2', fill: '#2196F3', id: 's2-label'},
            {x: '120', y: '300', text: 'P12', fill: '#DADCE0', id: 'p12-label'},
            {x: '220', y: '300', text: 'P21', fill: '#DADCE0', id: 'p21-label'},
            {x: '80', y: '320', text: 'Input-X', fill: '#DADCE0', id: 'inputx-label'},
            {x: '215', y: '320', text: 'Input-Y', fill: '#DADCE0', id: 'inputy-label'},
            {x: '350', y: '40', text: 'state WTA pool', fill: '#DADCE0', id: 'state-label'},
            {x: '340', y: '210', text: 'pointer WTA pool', fill: '#DADCE0', id: 'pointer-label'},
            {x: '180', y: '150', text: 'γ', fill: '#FF6B35', id: 'gamma-label'},
            {x: '200', y: '200', text: 'φ', fill: '#FF6B35', id: 'phi-label'}
        ];
        
        labels.forEach(label => {
            const text = this.createSVGElement('text', {
                x: label.x, y: label.y, fill: label.fill,
                'font-size': '14', 'font-weight': 'bold',
                'font-family': 'Oxanium, monospace', id: label.id
            });
            text.textContent = label.text;
            this.svg.appendChild(text);
        });
    }

    createLegend() {
        // Excitatory pool legend
        const excitatoryCircle = this.createSVGElement('circle', {
            cx: '350', cy: '360', r: '10', fill: '#CD919E'
        });
        this.svg.appendChild(excitatoryCircle);
        
        const excitatoryText = this.createSVGElement('text', {
            x: '370', y: '365', fill: '#DADCE0', 'font-size': '12',
            'font-family': 'Oxanium, monospace'
        });
        excitatoryText.textContent = 'excitatory pool';
        this.svg.appendChild(excitatoryText);
        
        // Inhibitory pool legend
        const inhibitoryCircle = this.createSVGElement('circle', {
            cx: '480', cy: '360', r: '8', fill: '#87CEEB'
        });
        this.svg.appendChild(inhibitoryCircle);
        
        const inhibitoryText = this.createSVGElement('text', {
            x: '500', y: '365', fill: '#87CEEB', 'font-size': '12',
            'font-family': 'Oxanium, monospace'
        });
        inhibitoryText.textContent = 'inhibitory pool';
        this.svg.appendChild(inhibitoryText);
    }

    updateAnimation() {
        // Create flowing animation effect
        const flowPhase = Math.sin(this.animationPhase);
        const glowIntensity = 0.5 + 0.5 * Math.sin(this.animationPhase * 1.2);
        
        // Animate nodes with subtle pulsing
        const nodeIds = [
            `input-node-${this.containerId}`, `wta-circuit-${this.containerId}`, 
            `b1-${this.containerId}`, `b2-${this.containerId}`, 
            `a1-${this.containerId}`, `a2-${this.containerId}`, 
            `w-${this.containerId}`, `output-${this.containerId}`
        ];
        
        nodeIds.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const pulseScale = 1 + Math.sin(this.animationPhase + index * 0.3) * 0.05;
                const cx = element.getAttribute('cx') || (parseFloat(element.getAttribute('x') || 0) + parseFloat(element.getAttribute('width') || 0) / 2);
                const cy = element.getAttribute('cy') || (parseFloat(element.getAttribute('y') || 0) + parseFloat(element.getAttribute('height') || 0) / 2);
                element.style.transform = `scale(${pulseScale})`;
                element.style.transformOrigin = `${cx}px ${cy}px`;
                
                // Add glow effect occasionally
                if (glowIntensity > 0.8) {
                    element.setAttribute('filter', `url(#glow-${this.containerId})`);
                } else {
                    element.setAttribute('filter', `url(#nodeShadow-${this.containerId})`);
                }
            }
        });

        // Animate neural nodes
        for (let i = 0; i < 4; i++) {
            const element = document.getElementById(`neural-${i}-${this.containerId}`);
            if (element) {
                const pulseScale = 1 + Math.sin(this.animationPhase * 1.5 + i * 0.5) * 0.08;
                element.style.transform = `scale(${pulseScale})`;
                element.style.transformOrigin = `center`;
            }
        }

        // Animate edges with opacity flow
        const edgeIds = [
            `input-wta-${this.containerId}`, `wta-b1-${this.containerId}`, `wta-b2-${this.containerId}`, 
            `b1-a1-${this.containerId}`, `b2-a2-${this.containerId}`, 
            `a1-w-${this.containerId}`, `a2-w-${this.containerId}`, 
            `w-n11-${this.containerId}`, `w-n20-${this.containerId}`, `w-n21-${this.containerId}`, `w-n22-${this.containerId}`,
            `n11-out-${this.containerId}`, `n20-out-${this.containerId}`, `n21-out-${this.containerId}`, `n22-out-${this.containerId}`
        ];
        
        edgeIds.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const flowOpacity = 0.6 + 0.4 * Math.sin(this.animationPhase * 2 + index * 0.2);
                element.setAttribute('opacity', flowOpacity.toString());
            }
        });
    }

    startAnimation() {
        const animate = () => {
            if (this.isPlaying) {
                this.animationPhase += 0.1;
                this.pulseIntensity += 0.15;
                
                if (this.animationPhase > Math.PI * 4) {
                    this.animationPhase = 0;
                }
                if (this.pulseIntensity > Math.PI * 2) {
                    this.pulseIntensity = 0;
                }
                
                this.updateAnimation();
            }
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    toggleAnimation() {
        this.isPlaying = !this.isPlaying;
    }

    resetAnimation() {
        this.animationPhase = 0;
        this.pulseIntensity = 0;
        this.isPlaying = true;
        this.updateAnimation();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Usage: new WTADiagram('your-container-id');
