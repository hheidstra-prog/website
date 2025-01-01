import { forwardRef } from 'react';
import clsx from 'clsx';

export const ContainerOuter = forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
  >(({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
        <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
      </div>
    );
});

ContainerOuter.displayName = 'ContainerOuter';

export const ContainerInner = forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
  >(({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
        {...props}
      >
        <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
    );
});

ContainerInner.displayName = 'ContainerInner';

export const Container = forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
  >(({ children, ...props }, ref) => {
    return (
      <ContainerOuter ref={ref} {...props}>
        <ContainerInner>{children}</ContainerInner>
      </ContainerOuter>
    );
});

Container.displayName = 'Container';