import React from 'react';
import Particles from 'react-particles';
import particleConfig from './config/partical-config';

const ParticleBackground = () => { 
    return (
        <Particles params={particleConfig}>
        </Particles>
    );
}

export default ParticleBackground;
