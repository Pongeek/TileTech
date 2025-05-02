'use client';

import React from 'react';
import { Heading2, Heading3, BodyText, BodyLarge } from '@/components/ui/Typography';
import Container from '@/components/layout/Container';
import { Stack } from '@/components/ui/Spacer';
import Button from '@/components/ui/Button';
import ScrollAnimated, { StaggerItem } from '@/components/ui/ScrollAnimated';

interface StandardizedSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  items?: {
    id: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

/**
 * StandardizedSection Component
 * A section layout with consistent spacing, typography, and animation
 */
const StandardizedSection: React.FC<StandardizedSectionProps> = ({
  id,
  title,
  subtitle,
  description,
  items = [],
  ctaText,
  ctaLink,
  className = '',
}) => {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <Container>
        {/* Section Header */}
        <ScrollAnimated type="fadeDown" className="text-center mb-12">
          <Heading2 className="mb-4">{title}</Heading2>
          
          {subtitle && (
            <Heading3 className="mb-6" color="muted">{subtitle}</Heading3>
          )}
          
          {description && (
            <BodyLarge className="max-w-3xl mx-auto">{description}</BodyLarge>
          )}
        </ScrollAnimated>
        
        {/* Items Grid */}
        {items.length > 0 && (
          <ScrollAnimated
            type="stagger"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            threshold={0.05}
          >
            {items.map((item) => (
              <StaggerItem key={item.id}>
                <div className="bg-white rounded-lg shadow-md p-6 h-full">
                  {item.icon && (
                    <div className="text-primary mb-4">
                      {item.icon}
                    </div>
                  )}
                  
                  <Heading3 className="mb-3" color="secondary">
                    {item.title}
                  </Heading3>
                  
                  <BodyText>
                    {item.description}
                  </BodyText>
                </div>
              </StaggerItem>
            ))}
          </ScrollAnimated>
        )}
        
        {/* CTA Button */}
        {ctaText && ctaLink && (
          <ScrollAnimated type="fadeUp" className="text-center mt-8">
            <Stack direction="row" justify="center">
              <Button
                variant="primary"
                href={ctaLink}
                size="large"
              >
                {ctaText}
              </Button>
            </Stack>
          </ScrollAnimated>
        )}
      </Container>
    </section>
  );
};

export default StandardizedSection; 