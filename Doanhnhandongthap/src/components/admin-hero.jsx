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
      return {
        backgroundImage: `url('${bg.imageUrl}'), linear-gradient(to bottom right, #206bb3 0%, #3b82f6 50%, #a8dfff 100%)`,
        backgroundBlendMode: 'screen',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
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

  // Đánh dấu cho Header biết Hero đang tồn tại
  React.useEffect(() => {
    document.body.setAttribute('data-has-hero', 'true');
    return () => document.body.removeAttribute('data-has-hero');
  }, []);

  return (
    <section data-admin-hero="true" className="relative py-32 px-4 overflow-hidden flex items-center min-h-[550px]" style={getBackgroundStyle()}>
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
            <>
              <style>{`
                .puck-hero-title {
                  font-weight: 800;
                  line-height: 1.1;
                  color: #ffffff;
                  text-shadow: 0 0 12px rgba(255, 215, 0, 0.45);
                  background: linear-gradient(135deg, #ffffff 40%, var(--gold-color) 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  padding-bottom: 0.12em;
                  margin-bottom: 1.5rem !important;
                  caret-color: var(--gold-color) !important;
                }
                .puck-hero-title::selection,
                .puck-hero-title *::selection {
                  background: rgba(255, 215, 0, 0.35) !important;
                  -webkit-text-fill-color: #ffffff !important;
                  color: #ffffff !important;
                }
                .puck-hero-btn {
                  background: linear-gradient(135deg, #00c6ff, #0072ff) !important;
                  color: #ffffff !important;
                  border: none !important;
                  padding: 14px 36px !important;
                  font-size: 15px !important;
                  font-weight: 600 !important;
                  border-radius: 0 30px !important;
                  cursor: pointer !important;
                  box-shadow: 0 10px 25px rgba(0, 114, 255, 0.35) !important;
                  transition: all 0.3s ease !important;
                }
                .puck-hero-btn:hover {
                  transform: translateY(-2px) !important;
                  box-shadow: 0 12px 30px rgba(0, 114, 255, 0.5) !important;
                }
              `}</style>
              <h1
                className="font-sans tracking-wide transition-all puck-hero-title"
                style={{
                  fontSize: formatFontSize(titleSize, '85px'),
                  '--gold-color': titleColor || '#ffe082'
                }}
              >
                {title}
              </h1>
            </>
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
                  className={`${getButtonClass(btn)} puck-hero-btn`}
                  style={{
                    backgroundColor: btn.btnColor ? btn.btnColor : undefined,
                    color: btn.btnTextColor ? btn.btnTextColor : undefined,
                    borderRadius: btn.btnRadius ? formatFontSize(btn.btnRadius) : undefined,
                    fontSize: formatFontSize(btn.btnTextSize, '15px')
                  }}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
      {/* Lớp phủ gradient ở đáy để fade dần mép cứng của hình nền Hero vào màu nền của khối Hội Viên (#a8dfff) */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#a8dfff] pointer-events-none" style={{ zIndex: 0 }} />
    </section>
  );
};

export default AdminHero;

// --- Component: Header ---
export const AdminHeader = ({
  logoUrl,
  title,
  menu1, url1,
  menu2, url2,
  menu3, url3,
  menu4, url4,
  menu5, url5,
  menu6, url6,
  background = {},
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isStandalone, setIsStandalone] = React.useState(true);
  const sentinelRef = React.useRef(null);

  React.useEffect(() => {
    // Polling nhẹ nhàng để đảm bảo luôn bắt được trạng thái chính xác nhất
    const checkEnvironment = () => {
      const hasHero = document.querySelector('[data-admin-hero="true"]') !== null || document.body.getAttribute('data-has-hero') === 'true';
      setIsStandalone(!hasHero);
    };
    
    checkEnvironment();
    const interval = setInterval(checkEnvironment, 500);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: [0, 1],
        rootMargin: '0px 0px 0px 0px'
      }
    );

    observer.observe(sentinel);
    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, []);

  const getBackgroundStyle = () => {
    return {
      backgroundColor: (isStandalone || isScrolled) ? '#0f4c81' : 'transparent',
      transition: 'background-color 0.3s ease'
    };
  };

  const navClass = "hover:text-pink-500 transition-colors duration-300 cursor-pointer";

  return (
    <>
      <div
        ref={sentinelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '1px',
          width: '1px',
          pointerEvents: 'none',
          opacity: 0
        }}
      />
      <header
        className={`w-full ${isStandalone ? 'sticky' : isScrolled ? 'fixed' : 'absolute'} top-0 left-0 z-[100] text-white border-none transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}
        style={getBackgroundStyle()}
      >
        <div className={`max-w-7xl mx-auto px-4 ${isScrolled || isStandalone ? 'py-3' : 'py-4'} flex items-center justify-between transition-all duration-300`}>

          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            {logoUrl && (
              <img src={logoUrl} alt="Logo" className="h-12 w-12 object-contain" />
            )}
            {title && (
              <div className="font-bold text-sm md:text-[15px] leading-snug uppercase text-center max-w-[320px] text-slate-100">
                {title}
              </div>
            )}
          </div>

          {/* Middle: Menu */}
          <nav className="hidden lg:flex items-center gap-6 text-base font-medium text-slate-100">
            {menu1 && <a href={url1 || '#'} className={navClass}>{menu1}</a>}
            {menu2 && <a href={url2 || '#'} className={navClass}>{menu2}</a>}
            {menu3 && <a href={url3 || '#'} className={navClass}>{menu3}</a>}
            {menu4 && <a href={url4 || '#'} className={navClass}>{menu4}</a>}
            {menu5 && <a href={url5 || '#'} className={navClass}>{menu5}</a>}
            {menu6 && <a href={url6 || '#'} className={navClass}>{menu6}</a>}
          </nav>

          {/* Right: Language Toggle */}
          <div className="hidden md:flex items-center bg-gradient-to-b from-[#eecd76] to-[#d69f28] rounded-full p-[3px] shadow-sm cursor-pointer drop-shadow-md">
            <div className="flex items-center justify-center w-[26px] h-[26px] bg-[#3a3000] text-[#eecd76] rounded-full font-extrabold text-[11px] tracking-wider">
              VN
            </div>
            <div className="px-2 font-extrabold text-[#3a3000] text-[11px] tracking-wider">
              EN
            </div>
          </div>

        </div>
      </header>
    </>
  );
};
