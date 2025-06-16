'use client';

import { forwardRef, type ForwardRefExoticComponent, type RefAttributes, type ComponentPropsWithoutRef } from 'react';
import { Root, List, Trigger, Content, type TabsProps } from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs: ForwardRefExoticComponent<TabsProps & RefAttributes<HTMLDivElement>> = Root;

const TabsList: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof List> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof List>>(({ className, ...props }: ComponentPropsWithoutRef<typeof List>, ref) => (
    <List
        ref={ref}
        className={cn(
            'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
            className
        )}
        {...props}
    />
));
TabsList.displayName = List.displayName;

const TabsTrigger: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof Trigger> & RefAttributes<HTMLButtonElement>> = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof Trigger>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Trigger>, ref) => (
    <Trigger
        ref={ref}
        className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
            className
        )}
        {...props}
    />
));
TabsTrigger.displayName = Trigger.displayName;

const TabsContent: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof Content> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Content>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Content>, ref) => (
    <Content
        ref={ref}
        className={cn(
            'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            className
        )}
        {...props}
    />
));
TabsContent.displayName = Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
