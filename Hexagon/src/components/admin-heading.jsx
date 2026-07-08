import React from 'react';

const AdminHeading = ({ content, level, align, animate, textColor }) => {
  const Tag = `h${level || 2}`;
  return (
    <Tag 
      className={`text-slate-800 font-bold mb-4 ${align ? `text-${align}` : ''} ${animate ? 'animate-fade-in' : ''}`}
      style={{ textAlign: align || 'left', color: textColor || '#1e293b' }}
    >
      {content || 'Tiêu đề'}
    </Tag>
  );
};

export default AdminHeading;
