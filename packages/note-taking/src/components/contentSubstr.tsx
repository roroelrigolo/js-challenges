import React from 'react';

interface NoteContentSubstrProps {
  content: string;
}

const NoteContentSubstr: React.FC<NoteContentSubstrProps> = ({ content }) => {
  const contentSubstr = content.length > 100 ? content.substring(0, 100) + '...' : content;
  return (
    <p>{contentSubstr}</p>
  );
};

export default NoteContentSubstr;