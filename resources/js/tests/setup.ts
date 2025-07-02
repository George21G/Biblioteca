import '@testing-library/jest-dom';
import React from 'react';

// Mock de Inertia.js
jest.mock('@inertiajs/react', () => ({
  Head: ({ children }: { children: React.ReactNode }) => children,
  Link: ({ children, href, ...props }: any) => {
    return React.createElement('a', { href, ...props }, children);
  },
  router: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    visit: jest.fn(),
  },
  useForm: () => ({
    data: {},
    setData: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    processing: false,
    errors: {},
    reset: jest.fn(),
  }),
}));

// Mock de fetch global
global.fetch = jest.fn();

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 