import React from 'react';
import { COLORS } from '../constants';

interface SvgProps {
  className?: string;
  color?: string;
  strokeColor?: string;
}

export const Squiggle: React.FC<SvgProps> = ({ className = "", color = COLORS.coral, strokeColor = COLORS.mainBlue }) => (
  <svg className={`absolute ${className}`} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15 C 20 5, 80 5, 95 15" stroke={strokeColor} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const WobblyCloud: React.FC<SvgProps> = ({ className = "", color = COLORS.illustrationBlue, strokeColor = COLORS.mainBlue }) => (
  <svg className={`absolute ${className}`} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 30 C 5 10, 30 5, 50 10 C 70 15, 95 10, 90 30 C 95 50, 70 55, 50 50 C 30 45, 5 50, 10 30 Z" fill={color} stroke={strokeColor} strokeWidth="2"/>
  </svg>
);

export const Star: React.FC<SvgProps> = ({ className = "", color = COLORS.yellow, strokeColor = COLORS.coral }) => (
  <svg className={`absolute ${className}`} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 5 L30 20 L45 20 L35 30 L40 45 L25 35 L10 45 L15 30 L5 20 L20 20 Z" fill={color} stroke={strokeColor} strokeWidth="2"/>
  </svg>
);

export const AbstractBlob: React.FC<SvgProps> = ({ className = "", color = COLORS.pink, strokeColor = COLORS.mainBlue }) => (
  <svg className={`absolute ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 C 70 5, 95 25, 95 50 C 95 75, 70 95, 50 95 C 30 95, 5 75, 5 50 C 5 25, 30 5, 50 5 Z" fill={color} stroke={strokeColor} strokeWidth="2"/>
  </svg>
);

export const TriangleBlob: React.FC<SvgProps> = ({ className = "", color = COLORS.green, strokeColor = COLORS.coral }) => (
  <svg className={`absolute ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L95 80 L5 80 L50 5 Z M50 25 L80 70 L20 70 L50 25 Z" fill={color} stroke={strokeColor} strokeWidth="2"/>
  </svg>
);