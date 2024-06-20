import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '../../tests/utils.js';

import ContentSubstr from '../components/contentSubstr.js';

describe('Component', () => {
	it('renders full content if less than or equal to 100 characters', () => {
    const content = 'This is a short note.';
    render(<ContentSubstr content={content} />);
    const renderedContent = screen.getByText(content);
    expect(renderedContent).toBeInTheDocument();
  });

  it('renders truncated content if more than 100 characters', () => {
    const longContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
    render(<ContentSubstr content={longContent} />);
    const renderedContent = screen.getByText('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ...');
    expect(renderedContent).toBeInTheDocument();
  });
});