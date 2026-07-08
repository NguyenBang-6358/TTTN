import React from 'react';

// Text component — render đoạn văn bản.
const AdminText = ({ content, align = 'left', textColor }) => {
  return <p style={{ textAlign: align, color: textColor || '#334155' }} className="whitespace-pre-wrap">{content}</p>;
};

export default AdminText;
