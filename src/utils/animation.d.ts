import { Variants, VariantLabels, TargetAndTransition } from 'framer-motion';
import React from 'react';

export interface AnimationVariants {
  fadeIn: Variants;
  fadeUp: Variants;
  fadeDown: Variants;
  fadeLeft: Variants;
  fadeRight: Variants;
  scale: Variants;
  stagger: Variants;
  staggerItem: Variants;
  reduced: Variants;
}

export interface AnimationTransitions {
  default: {
    duration: number;
    ease: string;
  };
  spring: {
    type: string;
    stiffness: number;
    damping: number;
  };
  slow: {
    duration: number;
    ease: string;
  };
  fast: {
    duration: number;
    ease: string;
  };
}

export interface AnimationPresets {
  section: {
    container: Variants;
    item: Variants;
    reducedContainer: Variants;
    reducedItem: Variants;
  };
  card: {
    normal: Variants;
    reduced: Variants;
  };
  header: {
    normal: Variants;
    reduced: Variants;
  };
  button: {
    tap: object;
    hover: object;
    reducedTap: object;
    reducedHover: object;
  };
}

export interface ScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  animatedVariants: Variants;
  reducedVariants: Variants;
}

export interface ScrollAnimationResult {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  initial: VariantLabels | boolean;
  animate: VariantLabels | TargetAndTransition | boolean;
  variants: Variants;
}

export function usePrefersReducedMotion(): boolean;

export function useAccessibleAnimationVariants(
  animatedVariants: Variants,
  reducedVariants: Variants
): Variants;

export function useScrollAnimation(options: ScrollAnimationOptions): ScrollAnimationResult;

export const animationVariants: AnimationVariants;
export const transitions: AnimationTransitions;
export const animationPresets: AnimationPresets;

interface AnimationModule {
  usePrefersReducedMotion: typeof usePrefersReducedMotion;
  useAccessibleAnimationVariants: typeof useAccessibleAnimationVariants;
  useScrollAnimation: typeof useScrollAnimation;
  animationVariants: AnimationVariants;
  animationPresets: AnimationPresets;
  transitions: AnimationTransitions;
}

declare const animationModule: AnimationModule;
export default animationModule; 