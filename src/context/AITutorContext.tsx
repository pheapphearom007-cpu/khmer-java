import React, { createContext, useContext, useState, useCallback } from 'react';
import { AITutorAction } from '../types/ai';

export interface OpenTutorOptions {
  code?: string;
  error?: string;
  lessonTitle?: string;
  lessonSlug?: string;
  prompt?: string;
  action?: AITutorAction;
}

interface AITutorContextType {
  isOpen: boolean;
  openTutor: (options?: OpenTutorOptions) => void;
  closeTutor: () => void;
  toggleTutor: () => void;
  activeCode?: string;
  activeError?: string;
  lessonTitle?: string;
  lessonSlug?: string;
  initialAction?: AITutorAction;
  initialPrompt?: string;
}

const AITutorContext = createContext<AITutorContextType | undefined>(undefined);

export const AITutorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCode, setActiveCode] = useState<string | undefined>(undefined);
  const [activeError, setActiveError] = useState<string | undefined>(undefined);
  const [lessonTitle, setLessonTitle] = useState<string | undefined>(undefined);
  const [lessonSlug, setLessonSlug] = useState<string | undefined>(undefined);
  const [initialAction, setInitialAction] = useState<AITutorAction | undefined>(undefined);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

  const openTutor = useCallback((options?: OpenTutorOptions) => {
    if (options) {
      if (options.code !== undefined) setActiveCode(options.code);
      if (options.error !== undefined) setActiveError(options.error);
      if (options.lessonTitle !== undefined) setLessonTitle(options.lessonTitle);
      if (options.lessonSlug !== undefined) setLessonSlug(options.lessonSlug);
      if (options.action !== undefined) setInitialAction(options.action);
      if (options.prompt !== undefined) setInitialPrompt(options.prompt);
    }
    setIsOpen(true);
  }, []);

  const closeTutor = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleTutor = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <AITutorContext.Provider
      value={{
        isOpen,
        openTutor,
        closeTutor,
        toggleTutor,
        activeCode,
        activeError,
        lessonTitle,
        lessonSlug,
        initialAction,
        initialPrompt,
      }}
    >
      {children}
    </AITutorContext.Provider>
  );
};

export const useAITutor = (): AITutorContextType => {
  const context = useContext(AITutorContext);
  if (!context) {
    throw new Error('useAITutor must be used within an AITutorProvider');
  }
  return context;
};
