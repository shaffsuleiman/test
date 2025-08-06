// Neocortical Circuit Component
class NeocorticalCircuit {
    constructor(containerId) {
        this.containerId = containerId;
        this.svg = null;
        this.animationPhase = 0;
        this.signalFlow = 0;
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
        container.innerHTML = `
            <div class="neocortical-circuit-container" style="
                width: 100%;
                background-color: #0F1923;
                padding: 15px;
                border-radius: 8px;
                margin: 0 auto;
                position: relative;
            ">
                <svg id="neocorticalSvg" width="100%" height="400" viewBox="0 0 800 600" style="
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
        this.svg = document.getElementById('neocorticalSvg');
        
        // Create SVG defs for filters and markers
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Glow filter
        const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        glowFilter.setAttribute('id', 'neocorticalGlow');
        glowFilter.setAttribute('x', '-50%');
        glowFilter.setAttribute('y', '-50%');
        glowFilter.setAttribute('width', '200%');
        glowFilter.setAttribute('height', '200%');
        
        const gaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        gaussianBlur.setAttribute('stdDeviation', '4');
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
        
        // Connection glow filter
        const connectionGlowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        connectionGlowFilter.setAttribute('id', 'connectionGlow2');
        connectionGlowFilter.setAttribute('x', '-50%');
        connectionGlowFilter.setAttribute('y', '-50%');
        connectionGlowFilter.setAttribute('width', '200%');
        connectionGlowFilter.setAttribute('height', '200%');
        
        const connectionBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        connectionBlur.setAttribute('stdDeviation', '2');
        connectionBlur.setAttribute('result', 'coloredBlur');
        
        const connectionMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
        const connectionMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        connectionMergeNode1.setAttribute('in', 'coloredBlur');
        const connectionMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        connectionMergeNode2.setAttribute('in', 'SourceGraphic');
        
        connectionMerge.appendChild(connectionMergeNode1);
        connectionMerge.appendChild(connectionMergeNode2);
        connectionGlowFilter.appendChild(connectionBlur);
        connectionGlowFilter.appendChild(connectionMerge);
        defs.appendChild(connectionGlowFilter);
        
        // Arrow marker
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead2');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '10');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        
        const arrowPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrowPolygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        arrowPolygon.setAttribute('fill', '#DADCE0');
        marker.appendChild(arrowPolygon);
        defs.appendChild(marker);
        
        this.svg.appendChild(defs);
        
        this.createStaticElements();
    }

    createSVGElement(type, attributes) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', type);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        return element;
    }

    createStaticElements() {
        // Main circuit boundaries
        const leftBoundary = this.createSVGElement('rect', {
            x: '50', y: '150', width: '300', height: '350',
            rx: '10', ry: '10', fill: 'none',
            stroke: '#2A3441', 'stroke-width': '3'
        });
        this.svg.appendChild(leftBoundary);
        
        const rightBoundary = this.createSVGElement('rect', {
            x: '450', y: '150', width: '300', height: '350',
            rx: '10', ry: '10', fill: 'none',
            stroke: '#2A3441', 'stroke-width': '3'
        });
        this.svg.appendChild(rightBoundary);
        
        // Top-down contextual input
        const contextualInput = this.createSVGElement('rect', {
            x: '80', y: '50', width: '120', height: '40',
            rx: '5', ry: '5', fill: 'none',
            stroke: '#DADCE0', 'stroke-width': '2'
        });
        this.svg.appendChild(contextualInput);
        
        const contextualText = this.createSVGElement('text', {
            x: '140', y: '75', 'text-anchor': 'middle',
            fill: '#DADCE0', 'font-size': '14', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        contextualText.textContent = 'Top-down';
        this.svg.appendChild(contextualText);
        
        // Contextual input arrow
        const contextualArrow = this.createSVGElement('line', {
            x1: '200', y1: '70', x2: '350', y2: '70',
            stroke: '#DADCE0', 'stroke-width': '2',
            'marker-end': 'url(#arrowhead2)', id: 'contextual-arrow'
        });
        this.svg.appendChild(contextualArrow);
        
        const contextualLabel = this.createSVGElement('text', {
            x: '275', y: '60', 'text-anchor': 'middle',
            fill: '#DADCE0', 'font-size': '12',
            'font-family': 'Oxanium, monospace'
        });
        contextualLabel.textContent = 'Contextual input';
        this.svg.appendChild(contextualLabel);
        
        this.createNeurons();
        this.createConnections();
        this.createLabels();
        this.createInputs();
    }

    createNeurons() {
        // Lamp5 neuron
        const lamp5 = this.createSVGElement('circle', {
            cx: '400', cy: '120', r: '30',
            fill: '#F4A460', stroke: '#D2691E', 'stroke-width': '3',
            id: 'lamp5-neuron'
        });
        this.svg.appendChild(lamp5);
        
        const lamp5Text = this.createSVGElement('text', {
            x: '400', y: '127', 'text-anchor': 'middle',
            fill: '#8B4513', 'font-size': '14', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        lamp5Text.textContent = 'Lamp5';
        this.svg.appendChild(lamp5Text);
        
        // VIP neuron
        const vip = this.createSVGElement('circle', {
            cx: '400', cy: '200', r: '20',
            fill: '#E6E6FA', stroke: '#9370DB', 'stroke-width': '2',
            id: 'vip-neuron'
        });
        this.svg.appendChild(vip);
        
        const vipText = this.createSVGElement('text', {
            x: '400', y: '206', 'text-anchor': 'middle',
            fill: '#4B0082', 'font-size': '12', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        vipText.textContent = 'VIP';
        this.svg.appendChild(vipText);
        
        // Recurrent Excitation clusters
        const leftCluster = this.createSVGElement('circle', {
            cx: '150', cy: '250', r: '25',
            fill: '#F4A460', stroke: '#D2691E', 'stroke-width': '2',
            id: 'left-cluster'
        });
        this.svg.appendChild(leftCluster);
        
        const leftClusterBg = this.createSVGElement('rect', {
            x: '135', y: '235', width: '30', height: '30',
            fill: '#8B4513', opacity: '0.3'
        });
        this.svg.appendChild(leftClusterBg);
        
        const rightCluster = this.createSVGElement('circle', {
            cx: '650', cy: '250', r: '25',
            fill: '#F4A460', stroke: '#D2691E', 'stroke-width': '2',
            id: 'right-cluster'
        });
        this.svg.appendChild(rightCluster);
        
        const rightClusterBg = this.createSVGElement('rect', {
            x: '635', y: '235', width: '30', height: '30',
            fill: '#8B4513', opacity: '0.3'
        });
        this.svg.appendChild(rightClusterBg);
        
        // Main neurons
        const neuron1 = this.createSVGElement('circle', {
            cx: '200', cy: '350', r: '25',
            fill: '#DADCE0', stroke: '#666', 'stroke-width': '2',
            id: 'neuron-1'
        });
        this.svg.appendChild(neuron1);
        
        const neuron1Text = this.createSVGElement('text', {
            x: '200', y: '357', 'text-anchor': 'middle',
            fill: '#090E14', 'font-size': '16', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        neuron1Text.textContent = '1';
        this.svg.appendChild(neuron1Text);
        
        const neuron10 = this.createSVGElement('circle', {
            cx: '600', cy: '350', r: '25',
            fill: '#DADCE0', stroke: '#666', 'stroke-width': '2',
            id: 'neuron-10'
        });
        this.svg.appendChild(neuron10);
        
        const neuron10Text = this.createSVGElement('text', {
            x: '600', y: '357', 'text-anchor': 'middle',
            fill: '#090E14', 'font-size': '16', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        neuron10Text.textContent = '10';
        this.svg.appendChild(neuron10Text);
        
        // PV neurons
        const pv1 = this.createSVGElement('circle', {
            cx: '120', cy: '420', r: '18',
            fill: '#87CEEB', stroke: '#4682B4', 'stroke-width': '2',
            id: 'pv-1'
        });
        this.svg.appendChild(pv1);
        
        const pv1Text = this.createSVGElement('text', {
            x: '120', y: '427', 'text-anchor': 'middle',
            fill: '#000080', 'font-size': '12', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        pv1Text.textContent = 'PV';
        this.svg.appendChild(pv1Text);
        
        const pv10 = this.createSVGElement('circle', {
            cx: '680', cy: '420', r: '18',
            fill: '#87CEEB', stroke: '#4682B4', 'stroke-width': '2',
            id: 'pv-10'
        });
        this.svg.appendChild(pv10);
        
        const pv10Text = this.createSVGElement('text', {
            x: '680', y: '427', 'text-anchor': 'middle',
            fill: '#000080', 'font-size': '12', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        pv10Text.textContent = 'PV';
        this.svg.appendChild(pv10Text);
        
        // SST neuron
        const sst = this.createSVGElement('circle', {
            cx: '400', cy: '550', r: '25',
            fill: '#FF6B6B', stroke: '#DC143C', 'stroke-width': '3',
            id: 'sst-neuron'
        });
        this.svg.appendChild(sst);
        
        const sstText = this.createSVGElement('text', {
            x: '400', y: '557', 'text-anchor': 'middle',
            fill: 'white', 'font-size': '14', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        sstText.textContent = 'SST';
        this.svg.appendChild(sstText);
    }

    createConnections() {
        // Connection lines that will be animated
        const connections = [
            {id: 'lamp5-left', x1: '380', y1: '140', x2: '170', y2: '230', stroke: '#D2691E', width: '3'},
            {id: 'lamp5-right', x1: '420', y1: '140', x2: '630', y2: '230', stroke: '#D2691E', width: '3'},
            {id: 'vip-lamp5-1', x1: '385', y1: '185', x2: '385', y2: '145', stroke: '#9370DB', width: '2'},
            {id: 'vip-lamp5-2', x1: '415', y1: '185', x2: '415', y2: '145', stroke: '#9370DB', width: '2'},
            {id: 'recurrent-conn', x1: '175', y1: '340', x2: '575', y2: '340', stroke: '#8B4513', width: '3'},
            {id: 'pv1-conn', x1: '140', y1: '410', x2: '180', y2: '370', stroke: '#4682B4', width: '2'},
            {id: 'pv10-conn', x1: '660', y1: '410', x2: '620', y2: '370', stroke: '#4682B4', width: '2'},
            {id: 'sst1-conn', x1: '380', y1: '530', x2: '220', y2: '370', stroke: '#DC143C', width: '3'},
            {id: 'sst10-conn', x1: '420', y1: '530', x2: '580', y2: '370', stroke: '#DC143C', width: '3'},
            {id: 'input1-conn', x1: '120', y1: '480', x2: '180', y2: '370', stroke: '#DADCE0', width: '2'},
            {id: 'input10-conn', x1: '680', y1: '480', x2: '620', y2: '370', stroke: '#DADCE0', width: '2'}
        ];
        
        connections.forEach(conn => {
            const line = this.createSVGElement('line', {
                x1: conn.x1, y1: conn.y1, x2: conn.x2, y2: conn.y2,
                stroke: conn.stroke, 'stroke-width': conn.width,
                opacity: '0.5', id: conn.id
            });
            
            if (conn.id === 'recurrent-conn') {
                line.setAttribute('stroke-dasharray', '10,5');
            }
            
            this.svg.appendChild(line);
        });
    }

    createLabels() {
        const labels = [
            {x: '70', y: '230', text: 'Recurrent', id: 'rec-label-1'},
            {x: '70', y: '245', text: 'Excitation', id: 'rec-label-2'},
            {x: '670', y: '230', text: 'Recurrent', id: 'rec-label-3'},
            {x: '670', y: '245', text: 'Excitation', id: 'rec-label-4'},
            {x: '130', y: '390', text: 'Neuron 1', id: 'neuron1-label'},
            {x: '630', y: '390', text: 'Neuron 10', id: 'neuron10-label'},
            {x: '95', y: '440', text: '1', id: 'pv1-label'},
            {x: '705', y: '440', text: '10', id: 'pv10-label'},
            {x: '145', y: '410', text: 'FFI', id: 'ffi1-label'},
            {x: '645', y: '410', text: 'FFI', id: 'ffi10-label'},
            {x: '420', y: '540', text: 'FBI', id: 'fbi-label'},
            {x: '70', y: '530', text: 'Bottom-up', id: 'bottom1-label'},
            {x: '70', y: '545', text: 'Sensory input', id: 'sensory1-label'},
            {x: '630', y: '530', text: 'Bottom-up', id: 'bottom10-label'},
            {x: '630', y: '545', text: 'Sensory input', id: 'sensory10-label'}
        ];
        
        labels.forEach(label => {
            const text = this.createSVGElement('text', {
                x: label.x, y: label.y, fill: '#DADCE0',
                'font-size': '12', 'font-weight': 'bold',
                'font-family': 'Oxanium, monospace', id: label.id
            });
            text.textContent = label.text;
            this.svg.appendChild(text);
        });
    }

    createInputs() {
        // Input boxes
        const input1Box = this.createSVGElement('rect', {
            x: '80', y: '480', width: '80', height: '30',
            rx: '5', ry: '5', fill: 'none',
            stroke: '#DADCE0', 'stroke-width': '2'
        });
        this.svg.appendChild(input1Box);
        
        const input1Text = this.createSVGElement('text', {
            x: '120', y: '500', 'text-anchor': 'middle',
            fill: '#DADCE0', 'font-size': '12', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        input1Text.textContent = 'Input 1';
        this.svg.appendChild(input1Text);
        
        const input10Box = this.createSVGElement('rect', {
            x: '640', y: '480', width: '80', height: '30',
            rx: '5', ry: '5', fill: 'none',
            stroke: '#DADCE0', 'stroke-width': '2'
        });
        this.svg.appendChild(input10Box);
        
        const input10Text = this.createSVGElement('text', {
            x: '680', y: '500', 'text-anchor': 'middle',
            fill: '#DADCE0', 'font-size': '12', 'font-weight': 'bold',
            'font-family': 'Oxanium, monospace'
        });
        input10Text.textContent = 'Input 10';
        this.svg.appendChild(input10Text);
    }

    updateAnimation() {
        // Calculate data flow progression (0 to 1)
        const flowProgress = (Math.sin(this.animationPhase) + 1) / 2; // Normalized sine wave 0-1
        
        // Define flow stages
        const stage1 = flowProgress < 0.2; // Input stage
        const stage2 = flowProgress >= 0.2 && flowProgress < 0.5; // Processing stage
        const stage3 = flowProgress >= 0.5 && flowProgress < 0.8; // Output stage
        const stage4 = flowProgress >= 0.8; // Reset/feedback stage
        
        // Reset all elements to base state
        this.resetAllElements();
        
        // Stage 1: Input activation
        if (stage1) {
            this.activateElement('lamp5-neuron', 1.0);
            this.activateConnection('contextual-arrow', 0.8);
        }
        
        // Stage 2: Processing through PV and VIP
        if (stage2) {
            this.activateElement('pv-1', 0.9);
            this.activateElement('pv-10', 0.9);
            this.activateElement('vip-neuron', 0.8);
            this.activateConnection('lamp5-left', 0.7);
            this.activateConnection('lamp5-right', 0.7);
            this.activateConnection('vip-lamp5-1', 0.6);
            this.activateConnection('vip-lamp5-2', 0.6);
        }
        
        // Stage 3: Main neuron processing and SST inhibition
        if (stage3) {
            this.activateElement('left-cluster', 0.8);
            this.activateElement('right-cluster', 0.8);
            this.activateElement('neuron-1', 0.9);
            this.activateElement('neuron-10', 0.9);
            this.activateElement('sst-neuron', 0.7);
            this.activateConnection('pv1-conn', 0.8);
            this.activateConnection('pv10-conn', 0.8);
            this.activateConnection('sst1-conn', 0.6);
            this.activateConnection('sst10-conn', 0.6);
        }
        
        // Stage 4: Output and feedback
        if (stage4) {
            this.activateConnection('recurrent-conn', 0.7);
            this.activateConnection('input1-conn', 0.8);
            this.activateConnection('input10-conn', 0.8);
        }
    }
    
    resetAllElements() {
        // Reset all neurons to base state
        const allNeurons = ['lamp5-neuron', 'neuron-1', 'neuron-10', 'left-cluster', 'right-cluster', 'vip-neuron', 'pv-1', 'pv-10', 'sst-neuron'];
        allNeurons.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.transform = 'scale(1)';
                element.removeAttribute('filter');
                element.style.filter = 'brightness(1)';
            }
        });
        
        // Reset all connections to low opacity
        const allConnections = [
            'contextual-arrow', 'lamp5-left', 'lamp5-right', 'vip-lamp5-1', 'vip-lamp5-2',
            'recurrent-conn', 'pv1-conn', 'pv10-conn', 'input1-conn', 'input10-conn',
            'sst1-conn', 'sst10-conn'
        ];
        
        allConnections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.setAttribute('opacity', '0.2');
                element.removeAttribute('filter');
            }
        });
    }
    
    activateElement(id, intensity) {
        const element = document.getElementById(id);
        if (element) {
            const scale = 1 + intensity * 0.2;
            element.style.transform = `scale(${scale})`;
            element.style.transformOrigin = `${element.getAttribute('cx')}px ${element.getAttribute('cy')}px`;
            
            if (intensity > 0.5) {
                element.setAttribute('filter', 'url(#neocorticalGlow)');
            }
            
            if (id === 'sst-neuron') {
                const brightness = 1 + intensity * 0.4;
                element.style.filter = `brightness(${brightness})`;
            }
        }
    }
    
    activateConnection(id, intensity) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('opacity', intensity);
            if (intensity > 0.6) {
                element.setAttribute('filter', 'url(#connectionGlow2)');
            }
        }
    }

    startAnimation() {
        const animate = () => {
            if (this.isPlaying) {
                this.animationPhase += 0.02; // Slower animation for clearer data flow
                
                if (this.animationPhase > Math.PI * 2) {
                    this.animationPhase = 0;
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
        this.signalFlow = 0;
        this.isPlaying = true;
        this.updateAnimation();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Usage: new NeocorticalCircuit('your-container-id');
