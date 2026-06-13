import React from 'react';

// Helper để tự động chuyển số thuần túy thành đơn vị px
const formatFontSize = (size, defaultVal) => {
  if (!size) return defaultVal;
  const trimmed = String(size).trim();
  if (!isNaN(trimmed) && trimmed !== '') {
    return `${trimmed}px`;
  }
  return trimmed;
};

// Hero component — banner với title, subtitle, buttons.
const AdminHero = ({ 
  topText,
  topTextColor,
  topTextSize,
  title, 
  titleColor, 
  titleSize, 
  subtitle, 
  subtitleColor,
  subtitleSize,
  boxRadius, 
  buttons = [], 
  background = {}, 
  layout = {} 
}) => {

  const alignClass = layout.align === 'left' ? 'text-left' : layout.align === 'right' ? 'text-right' : 'text-center';
  const alignFlex = layout.align === 'left' ? 'justify-start' : layout.align === 'right' ? 'justify-end' : 'justify-center';
  const alignItems = layout.align === 'left' ? 'items-start' : layout.align === 'right' ? 'items-end' : 'items-center';

  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#667eea'}, ${bg.gradientTo || '#764ba2'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#ffffff' };
  };

  const getButtonClass = (btn) => {
    const base = 'inline-flex items-center gap-2 px-6 py-3 font-medium transition-all';
    
    // Nếu nút có màu nền tự chọn hoặc màu chữ tự chọn thì xử lý qua inline style
    if (btn.btnColor || btn.btnTextColor) {
      const classes = [base];
      if (!btn.btnTextColor) classes.push('text-white'); // mặc định là chữ trắng nếu chỉ đổi nền
      return classes.join(' ');
    }
    
    switch (btn.style || 'primary') {
      case 'primary': return `${base} bg-blue-600 text-white hover:bg-blue-700`;
      case 'outline': return `${base} border-2 border-white text-white hover:bg-white hover:text-gray-900`;
      default: return `${base} bg-gray-200 text-gray-800 hover:bg-gray-300`;
    }
  };

  // Căn lề danh sách nút: Ưu tiên dùng căn lề tự chọn (btnAlign) của nút đầu tiên, nếu không có thì căn lề theo layout chung
  const buttonAlignClass = (buttons[0] && buttons[0].btnAlign) || alignFlex;

  return (
    <section className="relative py-32 px-4 overflow-hidden flex items-center min-h-[550px]" style={getBackgroundStyle()}>
      <div className={`relative mx-auto max-w-7xl w-full flex flex-col ${alignItems}`}>
        
        {/* Hộp kính mờ (Glassmorphism Container) - Bọc nội dung để bo góc & tạo hiệu ứng như Ảnh 1 */}
        <div 
          className={`p-8 md:p-10 bg-white/15 backdrop-blur-xl border border-white/20 max-w-2xl w-full flex flex-col shadow-2xl transition-all duration-300 ${alignClass}`}
          style={{ borderRadius: boxRadius || '24px' }}
        >
          {/* LAN TỎA GIÁ TRỊ ĐẤT */}
          <span 
            className="font-semibold tracking-widest uppercase mb-3 block"
            style={{ 
              color: topTextColor || 'rgba(255, 255, 255, 0.9)',
              fontSize: formatFontSize(topTextSize, '12px') 
            }}
          >
            {topText || 'LAN TỎA GIÁ TRỊ ĐẤT'}
          </span>

          {title && (
            <h1 
              className="font-bold mb-4 font-sans tracking-wide transition-all"
              style={{ 
                color: titleColor || '#ffffff',
                fontSize: formatFontSize(titleSize, '60px') 
              }}
            >
              {title}
            </h1>
          )}
          
          {subtitle && (
            <p 
              className="mb-6 opacity-90 leading-relaxed text-justify font-sans"
              style={{ 
                color: subtitleColor || '#ffffff',
                fontSize: formatFontSize(subtitleSize, '18px')
              }}
            >
              {subtitle}
            </p>
          )}
          
          {buttons && buttons.length > 0 && (
            <div className={`flex flex-wrap ${buttonAlignClass} gap-4`}>
              {buttons.map((btn, idx) => (
                <a 
                  key={idx} 
                  href={btn.url || '#'} 
                  className={getButtonClass(btn)}
                  style={{
                    backgroundColor: btn.btnColor ? btn.btnColor : undefined,
                    color: btn.btnTextColor ? btn.btnTextColor : undefined,
                    borderRadius: btn.btnRadius || '30px',
                    fontSize: formatFontSize(btn.btnTextSize, '14px')
                  }}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AdminHero;
