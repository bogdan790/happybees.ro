import { Keystatic } from '@keystatic/core/ui';
import React from 'react';
import { createRoot } from 'react-dom/client';
import config from '../keystatic.config';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Keystatic config={config} />);
}
