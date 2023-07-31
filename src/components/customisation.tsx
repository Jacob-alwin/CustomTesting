"use client";
import React, { useEffect, useRef } from 'react';

const MyComponent: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const width = window.innerWidth;
        const height = window.innerHeight;

        const stage = new (window as any).Konva.Stage({
            container: containerRef.current,
            width,
            height,
        });

        const layer = new (window as any).Konva.Layer();
        stage.add(layer);

        const text1 = new (window as any).Konva.Text({
            x: 50,
            y: 70,
            fontSize: 30,
            text: 'keepRatio = true',
            draggable: true,
        });
        layer.add(text1);

        const tr1 = new (window as any).Konva.Transformer({
            nodes: [text1],
            keepRatio: true,
            enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        });
        layer.add(tr1);

        const text2 = new (window as any).Konva.Text({
            x: 50,
            y: 200,
            fontSize: 30,
            text: 'keepRatio = false',
            draggable: true,
        });
        layer.add(text2);

        const tr2 = new (window as any).Konva.Transformer({
            nodes: [text2],
            keepRatio: false,
            enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        });
        layer.add(tr2);
    }, []);

    return (
        <div ref={containerRef} style={{ margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#f0f0f0' }}></div>
    );
};

export default MyComponent;
