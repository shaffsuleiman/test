import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const AnimatedNeuronGraph = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Original data points for the four neuron types
  const originalData = [
    { neuronId: 1, pv: 5, sst: 8, vip: 12, lamp5: 15 },
    { neuronId: 2, pv: 12, sst: 18, vip: 25, lamp5: 30 },
    { neuronId: 3, pv: 25, sst: 35, vip: 40, lamp5: 45 },
    { neuronId: 4, pv: 40, sst: 50, vip: 55, lamp5: 60 },
    { neuronId: 5, pv: 35, sst: 45, vip: 50, lamp5: 55 },
    { neuronId: 6, pv: 20, sst: 28, vip: 35, lamp5: 40 },
    { neuronId: 7, pv: 8, sst: 15, vip: 20, lamp5: 25 }
  ];

  // Animate data based on progress
  const getAnimatedData = (progress) => {
    return originalData.map(point => ({
      neuronId: point.neuronId,
      pv: point.pv * progress,
      sst: point.sst * progress,
      vip: point.vip * progress,
      lamp5: point.lamp5 * progress
    }));
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setAnimationProgress(prev => {
        const next = prev + 0.015;
        if (next >= 1) {
          setTimeout(() => setAnimationProgress(0), 1500);
          return 1;
        }
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentData = getAnimatedData(animationProgress);

  return (
    <div className="neuron-graph-container" style={{ 
      width: '100%', 
      height: '500px', 
      backgroundColor: '#090E14',
      padding: '20px',
      borderRadius: '8px'
    }}>
      <div style={{ height: '460px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3,3" stroke="#2A3441" />
            <XAxis 
              dataKey="neuronId"
              axisLine={{ stroke: '#DADCE0', strokeWidth: 2 }}
              tickLine={{ stroke: '#DADCE0', strokeWidth: 1 }}
              tick={{ fontSize: 12, fontWeight: 'bold', fill: '#DADCE0' }}
              label={{ 
                value: 'Cortical Layer', 
                position: 'insideBottom', 
                offset: -10, 
                style: { fontSize: '14px', fontWeight: 'bold', fill: '#DADCE0' } 
              }}
              domain={[1, 7]}
              type="number"
              ticks={[1, 2, 3, 4, 5, 6, 7]}
            />
            <YAxis 
              axisLine={{ stroke: '#DADCE0', strokeWidth: 2 }}
              tickLine={{ stroke: '#DADCE0', strokeWidth: 1 }}
              tick={{ fontSize: 12, fontWeight: 'bold', fill: '#DADCE0' }}
              label={{ 
                value: 'Inhibitory Strength (Hz)', 
                angle: -90, 
                position: 'insideLeft', 
                style: { fontSize: '14px', fontWeight: 'bold', fill: '#DADCE0' } 
              }}
              domain={[0, 65]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
            />
            
            {/* PV - Bouncer (Red/Orange) */}
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#FF6B35"
              strokeWidth={3}
              dot={false}
              name="PV (Bouncer)"
              strokeDasharray="0"
            />
            
            {/* SST - Feedback (Blue) */}
            <Line
              type="monotone"
              dataKey="sst"
              stroke="#0F7BCE"
              strokeWidth={3}
              dot={false}
              name="SST (Feedback)"
              strokeDasharray="5,5"
            />
            
            {/* VIP - Gate Opener (Green) */}
            <Line
              type="monotone"
              dataKey="vip"
              stroke="#10B981"
              strokeWidth={3}
              dot={false}
              name="VIP (Gate Opener)"
              strokeDasharray="10,5"
            />
            
            {/* LAMP5 - Balancer (Purple) */}
            <Line
              type="monotone"
              dataKey="lamp5"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={false}
              name="LAMP5 (Balancer)"
              strokeDasharray="0"
            />
            
            <Legend 
              wrapperStyle={{ 
                paddingTop: '15px',
                color: '#DADCE0'
              }}
              iconType="line"
              formatter={(value) => <span style={{ color: '#DADCE0', fontSize: '12px' }}>{value}</span>}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnimatedNeuronGraph;
