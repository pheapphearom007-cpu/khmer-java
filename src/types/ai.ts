import { DifficultyLevel } from './index';

export type AITutorAction =
  | 'explain_code'
  | 'find_bug'
  | 'give_hint'
  | 'simplify'
  | 'generate_practice'
  | 'chat';

export type AIMessageRole = 'user' | 'assistant' | 'system';

export interface AIMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  timestamp: number;
  actionType?: AITutorAction;
  codeSnippet?: string;
  errorSnippet?: string;
  isVerifiedExecution?: boolean;
  isFallback?: boolean;
}

export interface AITutorRequest {
  prompt: string;
  actionType?: AITutorAction;
  codeContext?: string;
  lessonTitle?: string;
  lessonSlug?: string;
  moduleTitle?: string;
  errorContext?: string;
  level?: DifficultyLevel;
}

export interface AITutorResponse {
  message: string;
  actionType?: AITutorAction;
  suggestions?: string[];
  isVerifiedExecution: boolean;
  isFallback?: boolean;
  rateLimitRemaining?: number;
  error?: string;
}

export interface AITutorStatus {
  isAvailable: boolean;
  provider: 'gemini' | 'openai' | 'groq' | 'fallback';
  model: string;
  rateLimitPerMinute: number;
  currentMinuteRequests: number;
  hourlyLimit: number;
  currentHourRequests: number;
}
