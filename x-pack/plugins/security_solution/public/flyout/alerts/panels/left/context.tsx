/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { createContext, useContext } from 'react';
import type { LeftPanelProps } from '.';

export interface LeftPanelContext {
  /**
   * Id of the alert (passed from the alerts table row)
   */
  eventId: string;
  /**
   * Name of the index used in the alerts page
   */
  indexName: string;
}

export const LeftFlyoutContext = createContext<LeftPanelContext | undefined>(undefined);

export type LeftPanelProviderProps = {
  /**
   * React components to render
   */
  children: React.ReactNode;
} & Partial<LeftPanelProps['params']>;

export const LeftPanelProvider = ({ id, indexName, children }: LeftPanelProviderProps) => {
  const contextValue = {
    eventId: id as string,
    indexName: indexName as string,
  };

  return <LeftFlyoutContext.Provider value={contextValue}>{children}</LeftFlyoutContext.Provider>;
};

export const useLeftPanelContext = () => {
  const contextValue = useContext(LeftFlyoutContext);

  if (!contextValue) {
    throw new Error('LeftPanelContext can only be used within LeftPanelContext provider');
  }

  return contextValue;
};
