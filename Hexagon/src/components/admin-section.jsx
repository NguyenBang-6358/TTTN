import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Section component — container có background, padding, và children (slot).
const containerMap = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' };

export const getHomeHashUrl = (urlStr) => {
  if (!urlStr) return '#';
  const url = typeof urlStr === 'string' ? urlStr : (urlStr.url || urlStr.href || '#');
  if (typeof url !== 'string') return '#';
  if (typeof window === 'undefined') return url;

  const currentPath = window.location.pathname;
  const isEn = currentPath.startsWith('/en');
  const isHome = currentPath === '/' || currentPath === '/vi/trang-chu' || currentPath === '/en/trang-chu';

  // Handle simple hashes like #lien-he
  if (url.startsWith('#')) {
    if (isHome) return url;
    return (isEn ? '/en/trang-chu' : '/vi/trang-chu') + url;
  }

  // Handle hardcoded absolute paths to ensure language matches the current page
  if (isEn && url.startsWith('/vi/')) {
    return url.replace('/vi/', '/en/');
  } else if (!isEn && url.startsWith('/en/')) {
    return url.replace('/en/', '/vi/');
  }

  return url;
};

export const getValidImageUrl = (image) => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return image.url || image.src || '';
};

export class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Admin component crashed:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 bg-red-50 border border-red-500 rounded text-red-900 w-full font-mono text-sm overflow-auto">
          <h2 className="text-xl font-bold mb-4">React Error!</h2>
          <p className="mb-2 font-bold">{this.state.error?.toString()}</p>
          <pre>{this.state.errorInfo?.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Helper function để xử lý chung các loại Background
export const getBackgroundStyle = (background = {}, defaultStyles = {}) => {
  if (!background || Object.keys(background).length === 0) return defaultStyles;

  const bgStyle = { ...defaultStyles };
  if (background.type === 'color') {
    bgStyle.background = background.color || 'transparent';
  }
  if (background.type === 'image' && background.bg_image) {
    bgStyle.backgroundImage = `url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }
  if (background.type === 'gradient') {
    bgStyle.background = `linear-gradient(${background.direction || 'to right'}, ${background.fromColor || '#fff'}, ${background.toColor || '#000'})`;
  }
  if (background.type === 'image+gradient' && background.bg_image) {
    bgStyle.backgroundImage = `linear-gradient(${background.direction || 'to right'}, ${background.fromColor || '#fff'}80, ${background.toColor || '#000'}80), url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }
  if (background.type === 'image+color' && background.bg_image) {
    bgStyle.backgroundImage = `linear-gradient(${background.color || '#fff'}80, ${background.color || '#fff'}80), url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }
  if (background.opacity !== undefined && background.opacity !== "") {
    bgStyle.opacity = background.opacity;
  }
  return bgStyle;
};

const AdminSection = ({ container = 'lg', background = {}, padding_x = 4, padding_y = 4, children }) => {
  const bgStyle = getBackgroundStyle(background);

  return (
    <section style={{ ...bgStyle, padding: `${(padding_y || 0) * 4}px ${(padding_x || 0) * 4}px` }}>
      <div style={{ maxWidth: containerMap[container] || '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
};

export default AdminSection;

// Components : Header
export const AdminHeader = ({ logoUrl, title, titleColor, menuItems, background, animate = true, activeLang = 'vn', vnLink = '/vi/trang-chu', enLink = '/en/trang-chu' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#1A6B49' });

  return (
    <>
      {/* Thẻ div giữ chỗ (placeholder) để khối bên dưới không bị Header đè lên */}
      <div className="h-[80px] w-full bg-transparent pointer-events-none" aria-hidden="true"></div>

      <header
        className="fixed top-0 left-0 w-full z-50 px-8 py-2 flex items-center justify-between font-sans shadow-md transition-all duration-300"
        style={{ ...bgStyle, filter: scrolled ? 'brightness(0.8)' : 'brightness(1)' }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16">
            <a href={activeLang === 'en' ? '/en/trang-chu' : '/vi/trang-chu'} className="block" onClick={(e) => {
              e.preventDefault();
              const currentPath = window.location.pathname;
              const isHome = currentPath === '/' || currentPath === '/vi/trang-chu' || currentPath === '/en/trang-chu';

              if (isHome) {
                // Clear the hash from the URL so we go back to the true top
                if (window.location.hash) {
                  window.history.pushState('', document.title, window.location.pathname + window.location.search);
                }
                if ('scrollRestoration' in window.history) {
                  window.history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
                window.location.reload();
              } else {
                window.location.href = activeLang === 'en' ? '/en/trang-chu' : '/vi/trang-chu';
              }
            }}>
              <img
                src={logoUrl || 'https://beta.hexagon.xyz/assets/images/logo-hhc.png'}
                alt="Hexagon Logo"
                className="w-full h-full object-contain"
              />
            </a>
          </div>
          <span className="text-xl font-bold text-white" style={titleColor ? { color: titleColor } : {}}>
            {title || 'HEXAGON'}
          </span>
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-8">
            {(menuItems || []).map((item, idx) => {
              const isExternal = item.url && item.url.startsWith('http');
              return (
                <a
                  key={idx}
                  href={getHomeHashUrl(item.url || '#')}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={`text-gray-300 text-sm font-medium ${animate ? 'hover:!text-yellow-400 transition' : ''}`}
                  style={item.color ? { color: item.color } : {}}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link to={vnLink || '#'} className={`${activeLang !== 'vn' ? 'opacity-50' : ''} ${animate ? 'hover:opacity-80 transition-opacity' : ''}`}>
              <img src="https://flagcdn.com/w40/vn.png" alt="VN" className="w-6 h-4 rounded-[2px] object-cover" />
            </Link>
            <Link to={enLink || '#'} className={`${activeLang !== 'en' ? 'opacity-50' : ''} ${animate ? 'hover:opacity-80 transition-opacity' : ''}`}>
              <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-6 h-4 rounded-[2px] object-cover" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

// Components: Giới Thiệu Về Hexagon
export const AdminGioiThieu = ({
  imageUrl,
  quoteText,
  quoteTextColor,
  quoteAuthor,
  quoteAuthorColor,
  title,
  description,
  coreValues,
  background,
  titleColor,
  descriptionColor,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#FFFFFF' });

  return (
    <section id="gioi-thieu" className="py-16 lg:py-24" style={bgStyle}>
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Cột trái: Hình ảnh */}
          <div className="w-full h-full flex items-center justify-center order-2 md:order-1 relative">
            <div className="relative p-3 w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl transform rotate-2"></div>
              <img
                src={imageUrl || 'https://beta.hexagon.xyz/assets/images/VPX16.jpg'}
                alt="Văn phòng Hexagon"
                className="relative rounded-lg shadow-2xl object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px] w-full"
              />
            </div>
            <div className={`absolute -bottom-4 right-4 md:bottom-8 md:-right-8 bg-white p-5 rounded-xl shadow-[0_10px_40px_rgba(217,119,6,0.3)] max-w-[280px] z-10 ${animate ? 'transition-transform hover:-translate-y-2 duration-300' : ''}`}>
              <p className="text-sm md:text-base italic text-gray-900 font-medium leading-relaxed" style={quoteTextColor ? { color: quoteTextColor } : { color: '#111827' }}>
                {quoteText || '"Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"'}
              </p>
              <p className="text-yellow-500 text-xs mt-2 font-bold uppercase tracking-wider text-right" style={quoteAuthorColor ? { color: quoteAuthorColor } : { color: '#eab308' }}>
                — {quoteAuthor || 'Hexagon Culture'}
              </p>
            </div>
          </div>

          {/* Cột phải: Văn bản */}
          <div className="text-left order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight" style={titleColor ? { color: titleColor } : { color: '#111827' }}>
              {title || 'Về Hexagon'}
            </h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed" style={descriptionColor ? { color: descriptionColor } : { color: '#374151' }}>
              {description || 'Hexagon Corporation – Công nghệ tiên phong...'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              {(coreValues || []).map((val, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2" style={val.titleColor ? { color: val.titleColor } : { color: '#1D6A49' }}>
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={val.descriptionColor ? { color: val.descriptionColor } : { color: '#4b5563' }}>
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Components: Lĩnh vực hoạt động
export const AdminLinhVucHoatDong = ({
  title,
  titleColor,
  subtitle,
  subtitleColor,
  items,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#f8fafc' });

  useEffect(() => {
    if (window.location.hash === '#dich-vu') {
      setTimeout(() => {
        const el = document.getElementById('dich-vu');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return (
    <section id="dich-vu" className="py-8" style={bgStyle}>
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Tiêu đề Khối */}
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight" style={titleColor ? { color: titleColor } : { color: '#000000' }}>
            {title || 'Lĩnh vực hoạt động'}
          </h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed px-4" style={subtitleColor ? { color: subtitleColor } : { color: '#374151' }}>
            {subtitle || 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện...'}
          </p>
        </div>

        {/* Lưới các lĩnh vực */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {(items || []).map((item, idx) => (
            <a
              key={idx}
              href={item.url || '#'}
              className={`block relative rounded-2xl overflow-hidden shadow-sm ${animate ? 'hover:shadow-xl transition-all duration-300' : ''} group cursor-pointer aspect-[3/4]`}
            >
              {/* === TRẠNG THÁI MẶC ĐỊNH === */}
              {/* Ảnh nền mặc định */}
              <img
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover ${animate ? 'transition-opacity duration-500' : ''} group-hover:opacity-0`}
              />

              {/* Overlay mờ phía trên để nổi chữ (tùy chọn) - Sẽ ẩn đi khi hover */}
              <div className={`absolute inset-0 bg-gradient-to-b from-black/20 to-transparent h-1/3 opacity-0 ${animate ? 'transition-opacity duration-300' : ''} group-hover:opacity-0`}></div>

              {/* Chữ tiêu đề mặc định */}
              <div className={`absolute top-0 left-0 w-full p-5 z-10 ${animate ? 'transition-opacity duration-300' : ''} group-hover:opacity-0`}>
                <h3 className="font-bold text-lg sm:text-xl leading-snug" style={item.titleColor ? { color: item.titleColor } : { color: '#FFB800' }}>
                  {item.title}
                </h3>
              </div>

              {/* === TRẠNG THÁI KHI LIA CHUỘT (HOVER) === */}
              <div className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 ${animate ? 'transition-opacity duration-500' : ''} z-20`}>
                {/* Ảnh nền Hover */}
                <img
                  src={item.hoverImage || 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png'}
                  alt="Hover background"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Nội dung khi Hover */}
                <div className="absolute inset-0 p-5 flex flex-col">
                  {/* Tiêu đề đứng yên (hoặc fade) */}
                  <h3 className="font-bold text-lg sm:text-xl leading-snug mb-3" style={item.titleColor ? { color: item.titleColor } : { color: '#E69A0B' }}>
                    {item.title}
                  </h3>

                  {/* Mô tả và Link dạt xuống */}
                  <div className={`flex flex-col flex-grow ${animate ? 'transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out' : ''}`}>
                    <p className="text-sm leading-relaxed mb-4" style={item.descriptionColor ? { color: item.descriptionColor } : { color: '#1f2937' }}>
                      {item.description}
                    </p>
                    <div className="font-semibold text-sm hover:underline flex items-center" style={item.linkColor ? { color: item.linkColor } : { color: '#2563eb' }}>
                      {item.linkText || 'Xem chi tiết'}
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

// Components: Tin tức (News)
export const AdminTinTuc = ({
  title,
  titleColor,
  subtitle,
  subtitleColor,
  viewAllText,
  viewAllColor,
  viewAllUrl,
  items,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#ffffff' });

  return (
    <section id="tin-tuc" className="py-16" style={bgStyle}>
      <div className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Tiêu đề */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight" style={titleColor ? { color: titleColor } : { color: '#000000' }}>
            {title || 'Tin tức'}
          </h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed px-4" style={subtitleColor ? { color: subtitleColor } : { color: '#374151' }}>
            {subtitle || 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.'}
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Lưới bài viết (Lưới 6 cột để chia tỉ lệ 1/2 và 1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {(items || []).map((item, idx) => {
            // 2 item đầu chiếm 3/6 cột (1/2), 3 item sau chiếm 2/6 cột (1/3)
            const colSpan = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';

            return (
              <a
                key={idx}
                href={item.url || '#'}
                className={`block group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col ${animate ? 'transition-all duration-300 hover:shadow-md hover:border-yellow-400/50 cursor-pointer' : ''} h-full ${colSpan} md:col-span-1`}
              >
                {/* Ảnh đại diện */}
                <div className="w-full h-48 sm:h-52 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover ${animate ? 'group-hover:scale-[1.04] transition-transform duration-500' : ''}`}
                  />
                </div>

                {/* Nội dung bài viết */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className={`text-base font-bold mb-2 leading-snug ${animate ? 'group-hover:!text-yellow-600 transition-colors' : ''}`} style={item.titleColor ? { color: item.titleColor } : { color: '#111827' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm mb-4 flex-grow leading-relaxed" style={item.descriptionColor ? { color: item.descriptionColor } : { color: '#4b5563' }}>
                    {item.description}
                  </p>

                  {/* Footer của Card */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                      <svg className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {item.date}
                    </div>
                    <span className={`text-yellow-600 font-semibold text-xs ${animate ? 'group-hover:underline' : ''}`}>
                      {item.linkText || 'Xem chi tiết'} →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Nút xem tất cả */}
        <div className="text-center mt-10">
          <a
            href={viewAllUrl || '#'}
            className="inline-flex items-center gap-2 px-8 py-3 text-white font-bold rounded-lg bg-gradient-to-r from-[#008374] to-[#89BA16] hover:from-[#007164] hover:to-[#78A614] hover:ring-2 hover:ring-green-500 transition-all duration-200"
            style={viewAllColor ? { color: viewAllColor } : { color: '#ffffff' }}
          >
            {viewAllText || 'Xem tất cả bài viết'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

// Components: Đối tác liên kết 
export const AdminDoiTacLienKet = ({
  title,
  titleColor,
  logos,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { background: 'linear-gradient(180deg, #0f826b, #12846d 35%, #86efac)' });

  return (
    <div className="sponsor-bar" style={bgStyle}>
      {/* Inline styles bám sát 100% web mẫu */}
      <style>{`
        .sponsor-bar { padding: 36px 0; text-align: center; overflow: hidden; position: relative; z-index: 10; }
        .logo-marquee { position: relative; width: 100%; overflow: hidden; display: flex; }
        .logo-marquee:before, .logo-marquee:after { content: ""; position: absolute; top: 0; width: 150px; height: 100%; z-index: 2; pointer-events: none; }
        .logo-marquee:before { left: 0; background: linear-gradient(90deg, #12846d, #12846d00); }
        .logo-marquee:after { right: 0; background: linear-gradient(270deg, #12846d, #12846d00); }
        .marquee-track { display: flex; gap: 24px; width: max-content; ${animate ? 'animation: marquee-scroll 24s linear infinite;' : ''} }
        .logo-marquee:hover .marquee-track { animation-play-state: paused; }
        .logo-card { background: #fff; border-radius: 16px; width: 180px; height: 108px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 16px; box-shadow: 0 4px 12px #0a25400a; ${animate ? 'transition: transform .3s ease, box-shadow .3s ease;' : ''} flex-shrink: 0; }
        .logo-card:hover { ${animate ? 'transform: translateY(-4px); box-shadow: 0 8px 20px #0a254014;' : ''} }
        .logo-card img { max-height: 64px; max-width: 140px; object-fit: contain; ${animate ? 'transition: transform .3s ease;' : ''} }
        @keyframes marquee-scroll { 0% { transform: translateZ(0); } to { transform: translate3d(-50%, 0, 0); } }
      `}</style>

      <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5" style={titleColor ? { color: titleColor } : { color: '#000000' }}>
          {title || 'Các đối tác liên kết'}
        </h2>
        <div className="logo-marquee">
          <div className="marquee-track">
            {/* Render 2 lần mảng logos để tạo hiệu ứng vòng lặp vô tận (infinite marquee) */}
            {(logos || []).map((logo, idx) => (
              <div className="logo-card" key={`first-${idx}`}>
                <img src={logo.imageUrl} alt={logo.name || 'Đối tác'} />
              </div>
            ))}
            {(logos || []).map((logo, idx) => (
              <div className="logo-card" key={`second-${idx}`}>
                <img src={logo.imageUrl} alt={logo.name || 'Đối tác'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Components: Liên hệ 
export const AdminLienHe = ({
  title,
  titleColor,
  subtitle,
  subtitleColor,
  contactDetails,
  socialLinks,
  mapEmbedUrl,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: "#f8fafc" });

  return (
    <section id="lien-he" className="py-10 lg:py-24" style={bgStyle}>
      <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className={`flex flex-col lg:mt-10 gap-6 ${animate ? "animate-fade-in-up" : ""}`}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={titleColor ? { color: titleColor } : { color: '#111827' }}>{title || "Liên hệ với chúng tôi"}</h2>
              <p className="text-sm sm:text-base leading-relaxed" style={subtitleColor ? { color: subtitleColor } : { color: '#374151' }}>{subtitle}</p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {(contactDetails || []).map((contact, idx) => {
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal-500/40 flex items-center justify-center bg-teal-500/10">
                      {contact.iconUrl ? (
                        <img src={contact.iconUrl} alt="icon" className="w-5 h-5 object-contain" />
                      ) : (
                        <div className="w-5 h-5 bg-teal-400 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={contact.titleColor ? { color: contact.titleColor } : { color: '#111827' }}>{contact.title}</p>
                      <p className="text-sm" style={contact.contentColor ? { color: contact.contentColor } : { color: '#000000' }}>{contact.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
              {(socialLinks || []).map((social, idx) => (
                <a key={idx} href={social.url || "#"} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 font-bold rounded-lg transition-all duration-300 border border-teal-500/30 hover:border-teal-500/50 text-sm shadow-sm" style={social.textColor ? { color: social.textColor } : { color: '#0f766e' }}>
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className={`w-full h-full min-h-[400px] rounded-lg overflow-hidden shadow-xl ${animate ? "animate-fade-in-up" : ""}`}>
            <div className="relative text-right w-full h-full">
              <div className="overflow-hidden bg-none w-full h-full">
                {mapEmbedUrl ? (
                  <iframe className="w-full h-full" src={mapEmbedUrl} style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">Chưa có link Google Maps</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Components: Footer
export const AdminFooter = ({
  content,
  textColor,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: "#0D5939" });

  return (
    <footer
      className={`w-full py-4 border-t ${animate ? "animate-fade-in-up" : ""}`}
      style={{ ...bgStyle, borderColor: bgStyle.backgroundColor || '#0D5939' }}
    >
      <div className="text-center flex justify-center items-center">
        <p className="text-sm font-medium" style={{ color: textColor || '#9ca3af' }}>
          {content}
        </p>
      </div>
    </footer>
  );
};

// Components: Giải pháp công nghệ 
export const AdminGiaiPhapCN = ({
  breadcrumb,
  heroTitle,
  heroTitleColor,
  heroDesc,
  heroDescColor,
  heroBtnText,
  heroBtnColor,
  heroBtnLink,
  heroImage,
  featuresTitle,
  featuresTitleColor,
  features,
  processTitle,
  processTitleColor,
  processSubtitle,
  processSubtitleColor,
  processSteps,
  ctaTitle,
  ctaTitleColor,
  ctaDesc,
  ctaDescColor,
  ctaButtons,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#f8fafc' });
  const isAnimated = animate === true || animate === 'true';

  return (
    <div className={`antialiased text-base min-h-screen ${isAnimated ? 'animate-fade-in-up' : ''}`} style={bgStyle}>
      <main className="pt-8 md:pt-10">
        <div className="container mx-auto px-6 py-6">

          {/* BREADCRUMB */}
          {breadcrumb && (
            <section className="text-left mb-10 text-base">
              <nav className="text-sm mb-2 text-gray-500 font-medium">
                {breadcrumb.split('>').map((part, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const text = part.trim();

                  let href = '#';
                  if (index === 0) href = '/vi/trang-chu';
                  if (index === 1) href = '/vi/trang-chu#dich-vu';

                  return (
                    <span key={index}>
                      {isLast ? (
                        <span className="text-gray-900">{text}</span>
                      ) : (
                        <a href={getHomeHashUrl(href)} className="hover:text-[#f59e0b] transition-colors duration-300">{text}</a>
                      )}
                      {!isLast && <span className="mx-2">&gt;</span>}
                    </span>
                  );
                })}
              </nav>
            </section>
          )}

          {/* HERO SECTION */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-20 lg:mb-32">
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: heroTitleColor || '#eab308' }}>
                {heroTitle}
              </h1>
              <p className="max-w-xl text-lg mb-10 leading-relaxed" style={{ color: heroDescColor || '#374151' }}>
                {heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {heroBtnText && (
                  <a href={getHomeHashUrl(heroBtnLink || '#')} className={`px-8 py-3.5 bg-[#f59e0b] font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-[#d97706] transition-all shadow-lg shadow-yellow-500/20' : ''}`} style={{ color: heroBtnColor || '#ffffff' }}>
                    {heroBtnText}
                  </a>
                )}
              </div>
            </div>
            <div className="relative max-w-[600px] mx-auto w-full">
              <div className={`rounded-lg overflow-hidden shadow-2xl aspect-[16/9] ${isAnimated ? 'transition-transform duration-500 hover:scale-105' : ''}`}>
                {heroImage && (
                  <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: featuresTitleColor || '#111827' }}>{featuresTitle}</h2>
              <div className="w-16 h-1 bg-[#f59e0b] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {(features || []).map((feature, idx) => (
                <div key={idx} className={`bg-white border border-gray-200 shadow-sm rounded-xl p-8 text-left ${isAnimated ? 'transition-all hover:shadow-md hover:border-[#f59e0b]/40 group' : ''}`}>
                  <div className={`w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 ${isAnimated ? 'group-hover:bg-green-500/20 transition-colors' : ''}`}>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-4" style={{ color: feature.titleColor || '#111827' }}>{feature.title}</h4>
                  <p className="text-base leading-relaxed" style={{ color: feature.descColor || '#374151' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: processTitleColor || '#111827' }}>{processTitle}</h2>
              <p className="mt-2 max-w-2xl mx-auto" style={{ color: processSubtitleColor || '#4b5563' }}>{processSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {(processSteps || []).map((step, idx) => (
                <div key={idx} className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm ${isAnimated ? 'transition-all hover:shadow-md' : ''}`}>
                  <div className="text-3xl font-bold mb-4" style={{ color: step.stepColor || '#f59e0b' }}>{step.step}</div>
                  <h4 className="font-bold mb-2" style={{ color: step.titleColor || '#111827' }}>{step.title}</h4>
                  <p className="text-base text-gray-700 leading-relaxed"></p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="bg-[#0D5939] bg-gradient-to-r from-gray-800/30 rounded-2xl p-8 md:p-16 text-center border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: ctaTitleColor || '#ffffff' }}>{ctaTitle}</h2>
            <p className="mb-10 max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: ctaDescColor || 'rgba(255, 255, 255, 0.8)' }}>{ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {(ctaButtons || []).map((btn, idx) => {
                if (btn.variant === 'solid') {
                  return (
                    <a key={idx} href={getHomeHashUrl(btn.link || '#')} className={`px-10 py-3.5 bg-[#f59e0b] font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-[#d97706] transition-all shadow-lg shadow-yellow-500/20' : ''}`} style={{ color: btn.textColor || '#ffffff' }}>
                      {btn.text}
                    </a>
                  );
                }
                return (
                  <a key={idx} href={getHomeHashUrl(btn.link || '#')} className={`px-10 py-3.5 bg-white/5 border border-white/10 font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-white/10 transition-all' : ''}`} style={{ color: btn.textColor || '#ffffff' }}>
                    {btn.text}
                  </a>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

// Components: Giải pháp thi công & lắp đặt
export const AdminGiaiPhapTC = ({
  breadcrumb,
  heroTitle,
  heroTitleColor,
  heroDesc,
  heroDescColor,
  heroBtnText,
  heroBtnColor,
  heroBtnLink,
  heroImage,
  featuresTitle,
  featuresTitleColor,
  features,
  processTitle,
  processTitleColor,
  processSubtitle,
  processSubtitleColor,
  processSteps,
  ctaTitle,
  ctaTitleColor,
  ctaDesc,
  ctaDescColor,
  ctaButtons,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#f8fafc' });
  const isAnimated = animate === true || animate === 'true';

  return (
    <div className={`antialiased text-base min-h-screen ${isAnimated ? 'animate-fade-in-up' : ''}`} style={bgStyle}>
      <main className="pt-8 md:pt-10">
        <div className="container mx-auto px-6 py-6">

          {/* BREADCRUMB */}
          {breadcrumb && (
            <section className="text-left mb-10 text-base">
              <nav className="text-sm mb-2 text-gray-500 font-medium">
                {breadcrumb.split('>').map((part, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const text = part.trim();

                  let href = '#';
                  if (index === 0) href = '/vi/trang-chu';
                  if (index === 1) href = '/vi/trang-chu#dich-vu';

                  return (
                    <span key={index}>
                      {isLast ? (
                        <span className="text-gray-900">{text}</span>
                      ) : (
                        <a href={getHomeHashUrl(href)} className="hover:text-[#f59e0b] transition-colors duration-300">{text}</a>
                      )}
                      {!isLast && <span className="mx-2">&gt;</span>}
                    </span>
                  );
                })}
              </nav>
            </section>
          )}

          {/* HERO SECTION */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-20 lg:mb-32">
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: heroTitleColor || '#eab308' }}>
                {heroTitle}
              </h1>
              <p className="max-w-xl text-lg mb-10 leading-relaxed" style={{ color: heroDescColor || '#374151' }}>
                {heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {heroBtnText && (
                  <a href={getHomeHashUrl(heroBtnLink || '#')} className={`px-8 py-3.5 bg-[#f59e0b] font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-[#d97706] transition-all shadow-lg shadow-yellow-500/20' : ''}`} style={{ color: heroBtnColor || '#ffffff' }}>
                    {heroBtnText}
                  </a>
                )}
              </div>
            </div>
            <div className="relative max-w-[600px] mx-auto w-full">
              <div className={`rounded-lg overflow-hidden shadow-2xl aspect-[16/9] ${isAnimated ? 'transition-transform duration-500 hover:scale-105' : ''}`}>
                {heroImage && (
                  <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: featuresTitleColor || '#111827' }}>{featuresTitle}</h2>
              <div className="w-16 h-1 bg-[#f59e0b] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {(features || []).map((feature, idx) => (
                <div key={idx} className={`bg-white border border-gray-200 shadow-sm rounded-xl p-8 text-left ${isAnimated ? 'transition-all hover:shadow-md hover:border-[#f59e0b]/40 group' : ''}`}>
                  <div className={`w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 ${isAnimated ? 'group-hover:bg-green-500/20 transition-colors' : ''}`}>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-4" style={{ color: feature.titleColor || '#111827' }}>{feature.title}</h4>
                  <p className="text-base leading-relaxed" style={{ color: feature.descColor || '#374151' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: processTitleColor || '#111827' }}>{processTitle}</h2>
              <p className="mt-2 max-w-2xl mx-auto" style={{ color: processSubtitleColor || '#4b5563' }}>{processSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {(processSteps || []).map((step, idx) => (
                <div key={idx} className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm ${isAnimated ? 'transition-all hover:shadow-md' : ''}`}>
                  <div className="text-3xl font-bold mb-4" style={{ color: step.stepColor || '#f59e0b' }}>{step.step}</div>
                  <h4 className="font-bold mb-2" style={{ color: step.titleColor || '#111827' }}>{step.title}</h4>
                  <p className="text-base text-gray-700 leading-relaxed"></p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="bg-[#0D5939] bg-gradient-to-r from-gray-800/30 rounded-2xl p-8 md:p-16 text-center border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: ctaTitleColor || '#ffffff' }}>{ctaTitle}</h2>
            <p className="mb-10 max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: ctaDescColor || 'rgba(255, 255, 255, 0.8)' }}>{ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {(ctaButtons || []).map((btn, idx) => {
                if (btn.variant === 'solid') {
                  return (
                    <a key={idx} href={getHomeHashUrl(btn.link || '#')} className={`px-10 py-3.5 bg-[#f59e0b] font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-[#d97706] transition-all shadow-lg shadow-yellow-500/20' : ''}`} style={{ color: btn.textColor || '#ffffff' }}>
                      {btn.text}
                    </a>
                  );
                }
                return (
                  <a key={idx} href={getHomeHashUrl(btn.link || '#')} className={`px-10 py-3.5 bg-white/5 border border-white/10 font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-white/10 transition-all' : ''}`} style={{ color: btn.textColor || '#ffffff' }}>
                    {btn.text}
                  </a>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

// Components: Cung cấp thiết bị CNTT
export const AdminCungCapTB = ({
  breadcrumb,
  heroTitle,
  heroTitleColor,
  heroDesc,
  heroDescColor,
  heroBtnText,
  heroBtnColor,
  heroBtnLink,
  heroImage,
  featuresTitle,
  featuresTitleColor,
  features,
  processTitle,
  processTitleColor,
  processSubtitle,
  processSubtitleColor,
  processSteps,
  ctaTitle,
  ctaTitleColor,
  ctaDesc,
  ctaDescColor,
  ctaButtons,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#f8fafc' });
  const isAnimated = animate === true || animate === 'true';

  return (
    <div className={`antialiased text-base min-h-screen ${isAnimated ? 'animate-fade-in-up' : ''}`} style={bgStyle}>
      <main className="pt-8 md:pt-10">
        <div className="container mx-auto px-6 py-6">

          {/* BREADCRUMB */}
          {breadcrumb && (
            <section className="text-left mb-10 text-base">
              <nav className="text-sm mb-2 text-gray-500 font-medium">
                {breadcrumb.split('>').map((part, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const text = part.trim();

                  let href = '#';
                  if (index === 0) href = '/vi/trang-chu';
                  if (index === 1) href = '/vi/trang-chu#dich-vu';

                  return (
                    <span key={index}>
                      {isLast ? (
                        <span className="text-gray-900">{text}</span>
                      ) : (
                        <a href={getHomeHashUrl(href)} className="hover:text-[#f59e0b] transition-colors duration-300">{text}</a>
                      )}
                      {!isLast && <span className="mx-2">&gt;</span>}
                    </span>
                  );
                })}
              </nav>
            </section>
          )}

          {/* HERO SECTION */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-20 lg:mb-32">
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: heroTitleColor || '#eab308' }}>
                {heroTitle}
              </h1>
              <p className="max-w-xl text-lg mb-10 leading-relaxed" style={{ color: heroDescColor || '#374151' }}>
                {heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {heroBtnText && (
                  <a href={getHomeHashUrl(heroBtnLink || '#')} className={`px-8 py-3.5 bg-[#f59e0b] font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-[#d97706] transition-all shadow-lg shadow-yellow-500/20' : ''}`} style={{ color: heroBtnColor || '#ffffff' }}>
                    {heroBtnText}
                  </a>
                )}
              </div>
            </div>
            <div className="relative max-w-[600px] mx-auto w-full">
              <div className={`rounded-lg overflow-hidden shadow-2xl aspect-[16/9] ${isAnimated ? 'transition-transform duration-500 hover:scale-105' : ''}`}>
                {heroImage && (
                  <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: featuresTitleColor || '#111827' }}>{featuresTitle}</h2>
              <div className="w-16 h-1 bg-[#f59e0b] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {(features || []).map((feature, idx) => (
                <div key={idx} className={`bg-white border border-gray-200 shadow-sm rounded-xl p-8 text-left ${isAnimated ? 'transition-all hover:shadow-md hover:border-[#f59e0b]/40 group' : ''}`}>
                  <div className={`w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 ${isAnimated ? 'group-hover:bg-green-500/20 transition-colors' : ''}`}>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-4" style={{ color: feature.titleColor || '#111827' }}>{feature.title}</h4>
                  <p className="text-base leading-relaxed" style={{ color: feature.descColor || '#374151' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: processTitleColor || '#111827' }}>{processTitle}</h2>
              <p className="mt-2 max-w-2xl mx-auto" style={{ color: processSubtitleColor || '#4b5563' }}>{processSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {(processSteps || []).map((step, idx) => (
                <div key={idx} className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm ${isAnimated ? 'transition-all hover:shadow-md' : ''}`}>
                  <div className="text-3xl font-bold mb-4" style={{ color: step.stepColor || '#f59e0b' }}>{step.step}</div>
                  <h4 className="font-bold mb-2" style={{ color: step.titleColor || '#111827' }}>{step.title}</h4>
                  <p className="text-base text-gray-700 leading-relaxed"></p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="bg-[#0D5939] bg-gradient-to-r from-gray-800/30 rounded-2xl p-8 md:p-16 text-center border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: ctaTitleColor || '#ffffff' }}>{ctaTitle}</h2>
            <p className="mb-10 max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: ctaDescColor || 'rgba(255, 255, 255, 0.8)' }}>{ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {(ctaButtons || []).map((btn, idx) => {
                if (btn.variant === 'solid') {
                  return (
                    <a key={idx} href={getHomeHashUrl(btn.link || '#')} className={`px-10 py-3.5 bg-[#f59e0b] font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-[#d97706] transition-all shadow-lg shadow-yellow-500/20' : ''}`} style={{ color: btn.textColor || '#ffffff' }}>
                      {btn.text}
                    </a>
                  );
                }
                return (
                  <a key={idx} href={getHomeHashUrl(btn.link || '#')} className={`px-10 py-3.5 bg-white/5 border border-white/10 font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-white/10 transition-all' : ''}`} style={{ color: btn.textColor || '#ffffff' }}>
                    {btn.text}
                  </a>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

// Components: Dịch vụ Công nghệ thông tin
export const AdminDichVuCNTT = ({
  breadcrumb,
  heroTitle,
  heroTitleColor,
  heroDesc,
  heroDescColor,
  heroBtnText,
  heroBtnColor,
  heroBtnLink,
  heroImage,
  featuresTitle,
  featuresTitleColor,
  features,
  processTitle,
  processTitleColor,
  processSubtitle,
  processSubtitleColor,
  processSteps,
  ctaTitle,
  ctaTitleColor,
  ctaDesc,
  ctaDescColor,
  ctaButtons,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#f8fafc' });
  const isAnimated = animate === true || animate === 'true';

  return (
    <div className={`antialiased text-base min-h-screen ${isAnimated ? 'animate-fade-in-up' : ''}`} style={bgStyle}>
      <main className="pt-8 md:pt-10">
        <div className="container mx-auto px-6 py-6">

          {/* BREADCRUMB */}
          {breadcrumb && (
            <section className="text-left mb-10 text-base">
              <nav className="text-sm mb-2 text-gray-500 font-medium">
                {breadcrumb.split('>').map((part, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const text = part.trim();

                  let href = '#';
                  if (index === 0) href = '/vi/trang-chu';
                  if (index === 1) href = '/vi/trang-chu#dich-vu';

                  return (
                    <span key={index}>
                      {isLast ? (
                        <span className="text-gray-900">{text}</span>
                      ) : (
                        <a href={getHomeHashUrl(href)} className="hover:text-[#f59e0b] transition-colors duration-300">{text}</a>
                      )}
                      {!isLast && <span className="mx-2">&gt;</span>}
                    </span>
                  );
                })}
              </nav>
            </section>
          )}

          {/* HERO SECTION */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-20 lg:mb-32">
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: heroTitleColor || '#eab308' }}>
                {heroTitle}
              </h1>
              <p className="max-w-xl text-lg mb-10 leading-relaxed" style={{ color: heroDescColor || '#374151' }}>
                {heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {heroBtnText && (
                  <a href={getHomeHashUrl(heroBtnLink || '#')} className={`px-8 py-3.5 bg-[#f59e0b] font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-[#d97706] transition-all shadow-lg shadow-yellow-500/20' : ''}`} style={{ color: heroBtnColor || '#ffffff' }}>
                    {heroBtnText}
                  </a>
                )}
              </div>
            </div>
            <div className="relative max-w-[600px] mx-auto w-full">
              <div className={`rounded-lg overflow-hidden shadow-2xl aspect-[16/9] ${isAnimated ? 'transition-transform duration-500 hover:scale-105' : ''}`}>
                {heroImage && (
                  <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: featuresTitleColor || '#111827' }}>{featuresTitle}</h2>
              <div className="w-16 h-1 bg-[#f59e0b] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {(features || []).map((feature, idx) => (
                <div key={idx} className={`bg-white border border-gray-200 shadow-sm rounded-xl p-8 text-left ${isAnimated ? 'transition-all hover:shadow-md hover:border-[#f59e0b]/40 group' : ''}`}>
                  <div className={`w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 ${isAnimated ? 'group-hover:bg-green-500/20 transition-colors' : ''}`}>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-4" style={{ color: feature.titleColor || '#111827' }}>{feature.title}</h4>
                  <p className="text-base leading-relaxed" style={{ color: feature.descColor || '#374151' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: processTitleColor || '#111827' }}>{processTitle}</h2>
              <p className="mt-2 max-w-2xl mx-auto" style={{ color: processSubtitleColor || '#4b5563' }}>{processSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {(processSteps || []).map((step, idx) => (
                <div key={idx} className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm ${isAnimated ? 'transition-all hover:shadow-md' : ''}`}>
                  <div className="text-3xl font-bold mb-4" style={{ color: step.stepColor || '#f59e0b' }}>{step.step}</div>
                  <h4 className="font-bold mb-2" style={{ color: step.titleColor || '#111827' }}>{step.title}</h4>
                  <p className="text-base text-gray-700 leading-relaxed"></p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="bg-[#0D5939] bg-gradient-to-r from-gray-800/30 rounded-2xl p-8 md:p-16 text-center border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: ctaTitleColor || '#ffffff' }}>{ctaTitle}</h2>
            <p className="mb-10 max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: ctaDescColor || 'rgba(255, 255, 255, 0.8)' }}>{ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {(ctaButtons || []).map((btn, idx) => {
                if (btn.variant === 'solid') {
                  return (
                    <a key={idx} href={getHomeHashUrl(btn.link || '#')} className={`px-10 py-3.5 bg-[#f59e0b] font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-[#d97706] transition-all shadow-lg shadow-yellow-500/20' : ''}`} style={{ color: btn.textColor || '#ffffff' }}>
                      {btn.text}
                    </a>
                  );
                }
                return (
                  <a key={idx} href={getHomeHashUrl(btn.link || '#')} className={`px-10 py-3.5 bg-white/5 border border-white/10 font-bold rounded-lg text-center ${isAnimated ? 'hover:bg-white/10 transition-all' : ''}`} style={{ color: btn.textColor || '#ffffff' }}>
                    {btn.text}
                  </a>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

// Components: Bài viết
export const AdminBaiViet = (props) => {
  return (
    <AdminErrorBoundary>
      <AdminBaiVietInner {...props} />
    </AdminErrorBoundary>
  );
};

const AdminBaiVietInner = ({
  breadcrumb,
  title,
  titleColor,
  subtitle,
  subtitleColor,
  sidebarTitle,
  postLinkText,
  serviceLinkText,
  viewAllServicesText,
  viewAllServicesUrl,
  posts,
  services,
  emptyText,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#F8FAFC' });
  const isAnimated = animate === true || animate === 'true';

  const safeServices = Array.isArray(services) ? services : [];
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const nextService = (e) => {
    e.preventDefault();
    if (safeServices.length > 1) {
      setCurrentServiceIndex((prev) => (prev === safeServices.length - 1 ? 0 : prev + 1));
    }
  };

  const prevService = (e) => {
    e.preventDefault();
    if (safeServices.length > 1) {
      setCurrentServiceIndex((prev) => (prev === 0 ? safeServices.length - 1 : prev - 1));
    }
  };

  // Reset index if services array changes
  useEffect(() => {
    if (currentServiceIndex >= safeServices.length) {
      setCurrentServiceIndex(0);
    }
  }, [safeServices.length, currentServiceIndex]);

  // Auto-play the sidebar slider every 5 seconds
  useEffect(() => {
    if (!isAnimated || safeServices.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev === safeServices.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [safeServices.length, isAnimated]);

  return (
    <div className={`antialiased text-base min-h-screen ${isAnimated ? 'animate-fade-in-up' : ''}`} style={bgStyle}>
      <main className="pt-6 md:pt-8">
        <div className="container mx-auto px-6 py-6">
          {/* BREADCRUMB */}
          {typeof breadcrumb === 'string' && breadcrumb.trim() !== '' && (
            <section className="text-left mb-8 text-base">
              <nav className="text-sm text-gray-400 flex items-center gap-1 flex-wrap">
                {breadcrumb.split('>').map((part, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const text = part.trim();

                  let href = '#';
                  if (index === 0) href = '/vi/trang-chu';

                  return (
                    <span key={index}>
                      {isLast ? (
                        <span className="text-gray-700 font-medium">{text}</span>
                      ) : (
                        <a href={getHomeHashUrl(href)} className="hover:text-[#f59e0b] transition-colors duration-300">{text}</a>
                      )}
                      {!isLast && <span className="mx-1 text-gray-300">&gt;</span>}
                    </span>
                  );
                })}
              </nav>
            </section>
          )}

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 min-w-0">
              <section className="mb-10">
                <h1 className="text-4xl lg:text-5xl font-bold mb-3 leading-tight" style={{ color: titleColor || '#eab308' }}>
                  {title}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed" style={{ color: subtitleColor || '#374151' }}>
                  {subtitle}
                </p>
                <div className="w-16 h-1 bg-[#f59e0b] mt-5 rounded-full"></div>
              </section>

              {(!Array.isArray(posts) || posts.length === 0) ? (
                <div className="text-center py-24">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p className="text-gray-500 text-lg">{emptyText || 'Chưa có bài viết nào.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post, idx) => {
                    if (!post) return null;
                    return (
                      <div key={idx} className={`group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full ${isAnimated ? 'transition-all duration-300 hover:shadow-md hover:border-yellow-400/50' : ''}`}>
                        <a href={getHomeHashUrl(post.url || '#')} className="w-full h-48 sm:h-52 overflow-hidden relative block flex-shrink-0">
                          <img src={getValidImageUrl(post.image)} alt={typeof post?.title === 'string' ? post.title : 'Bài viết'} className={`w-full h-full object-cover ${isAnimated ? 'group-hover:scale-[1.04] transition-transform duration-500' : ''}`} />
                        </a>

                        <div className="p-5 flex flex-col flex-grow">
                          {post.category && (
                            <span className="inline-block text-[11px] font-semibold text-[#f59e0b] border border-[#f59e0b] rounded-full px-3 py-0.5 mb-3 w-fit">
                              {post.category}
                            </span>
                          )}
                          <h3 className={`text-base font-bold mb-2 leading-snug ${isAnimated ? 'group-hover:!text-yellow-600 transition-colors' : ''}`} style={{ color: post.titleColor || '#111827' }}>
                            <a href={getHomeHashUrl(post.url || '#')} className="line-clamp-2 p-1 -m-1">{post.title}</a>
                          </h3>
                          <p className="text-sm mb-4 flex-grow leading-relaxed line-clamp-3 p-1 -m-1" style={{ color: post.descColor || '#4b5563' }}>
                            {post.description}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
                              <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                {post.date}
                              </span>
                            </div>
                            <a href={getHomeHashUrl(post.url || '#')} className={`text-yellow-600 font-semibold text-xs ${isAnimated ? 'group-hover:underline' : ''}`}>
                              {postLinkText} &rarr;
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* SIDEBAR DỊCH VỤ CỦA CHÚNG TÔI */}
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 lg:sticky lg:top-24 self-start">
              <aside className={`bg-white border-2 border-yellow-500/20 rounded-2xl shadow-xl overflow-hidden ${isAnimated ? 'hover:shadow-2xl transition-all duration-300' : ''}`}>
                <div className="bg-[#0D5939] px-6 py-4 flex items-center justify-center gap-3">
                  <h3 className="text-white text-center font-bold text-lg md:text-xl uppercase tracking-wide">
                    {sidebarTitle}
                  </h3>
                </div>

                {safeServices.length === 0 ? (
                  <div className="p-6 text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <p className="text-gray-500 text-sm">Chưa có dịch vụ nào</p>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      {(() => {
                        const validServiceIndex = currentServiceIndex >= safeServices.length ? 0 : currentServiceIndex;
                        const service = safeServices[validServiceIndex] || {};
                        return (
                          <a href={getHomeHashUrl(service.url || '#')} className="block group">
                            <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                              {getValidImageUrl(service.image) ? (
                                <img src={getValidImageUrl(service.image)} alt={typeof service?.title === 'string' ? service.title : 'Dịch vụ'} className={`w-full h-full object-cover ${isAnimated ? 'group-hover:scale-105 transition-transform duration-500' : ''}`} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D5939]/10 to-[#0D5939]/5">
                                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                </div>
                              )}
                            </div>
                            <div className="p-6 md:p-8">
                              <h4 className={`font-bold text-gray-900 text-lg md:text-xl mb-3 line-clamp-2 leading-snug p-1 -m-1 ${isAnimated ? 'group-hover:text-[#d97706] transition-colors' : ''}`}>
                                {service.title}
                              </h4>
                              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 p-1 -m-1">
                                {service.description}
                              </p>
                              <span className={`inline-flex items-center gap-2 text-sm font-bold text-[#f59e0b] ${isAnimated ? 'group-hover:underline' : ''}`}>
                                {serviceLinkText}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                              </span>
                            </div>
                          </a>
                        );
                      })()}
                      {safeServices.length > 1 && (
                        <>
                          <button onClick={prevService} className={`absolute left-2 top-[30%] -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white shadow-md rounded-full border border-gray-100 text-gray-600 z-10 ${isAnimated ? 'hover:text-[#d97706] hover:scale-110 transition-all' : ''}`} aria-label="Previous service">
                            <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                          </button>
                          <button onClick={nextService} className={`absolute right-2 top-[30%] -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white shadow-md rounded-full border border-gray-100 text-gray-600 z-10 ${isAnimated ? 'hover:text-[#d97706] hover:scale-110 transition-all' : ''}`} aria-label="Next service">
                            <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                          </button>
                        </>
                      )}
                    </div>
                    {safeServices.length > 1 && (
                      <div className="flex items-center justify-center gap-1.5 py-2.5 px-4">
                        {safeServices.map((_, i) => (
                          <button key={i} onClick={() => setCurrentServiceIndex(i)} className={`rounded-full ${isAnimated ? 'transition-all' : ''} ${i === currentServiceIndex ? "w-4 h-1.5 bg-[#f59e0b]" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"}`}></button>
                        ))}
                      </div>
                    )}
                    <div className="px-6 pb-5 pt-3 border-t border-gray-100 bg-gray-50/50">
                      <a href={getHomeHashUrl(viewAllServicesUrl || '/vi/trang-chu#linh-vuc-hoat-dong')} className="flex items-center justify-center gap-2 text-sm font-bold text-[#f59e0b] hover:text-[#d97706] transition-colors">
                        {viewAllServicesText || 'Xem tất cả dịch vụ'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                      </a>
                    </div>
                  </>
                )}
              </aside>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Components: Không Khí Tưng Bừng
export const AdminKhongKhiTungBung = ({
  breadcrumb,
  title,
  titleColor,
  date,
  time,
  category,
  metaColor,
  summary,
  image,
  body,
  tags,
  contactInfo,
  sidebarTitle,
  backLinkText,
  backLinkUrl,
  noServiceText,
  serviceLinkText,
  viewAllServicesText,
  viewAllServicesUrl,
  services,
  relatedTitle,
  relatedPosts,
  background,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { backgroundColor: '#F8FAFC' });
  const isAnimated = animate === true || animate === 'true';

  const safeServices = Array.isArray(services) ? services : [];
  const safeRelatedPosts = Array.isArray(relatedPosts) ? relatedPosts : [];
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const nextService = (e) => {
    e.preventDefault();
    if (safeServices.length > 1) {
      setCurrentServiceIndex((prev) => (prev === safeServices.length - 1 ? 0 : prev + 1));
    }
  };

  const prevService = (e) => {
    e.preventDefault();
    if (safeServices.length > 1) {
      setCurrentServiceIndex((prev) => (prev === 0 ? safeServices.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    if (currentServiceIndex >= safeServices.length) {
      setCurrentServiceIndex(0);
    }
  }, [safeServices.length, currentServiceIndex]);

  useEffect(() => {
    if (!isAnimated || safeServices.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev === safeServices.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [safeServices.length, isAnimated]);

  return (
    <div className={`antialiased text-base min-h-screen pb-12 ${isAnimated ? 'animate-fade-in-up' : ''}`} style={bgStyle}>
      <main className="pt-2 md:pt-4">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          {/* BREADCRUMB */}
          <div className="mb-6">
            {typeof breadcrumb === 'string' && breadcrumb.trim() !== '' && (
              <nav className="text-[13px] md:text-sm text-gray-500 flex flex-wrap items-center gap-1.5 font-medium">
                {breadcrumb.split('>').map((part, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const text = part.trim();
                  return (
                    <span key={index} className="flex items-center gap-1.5">
                      {isLast ? (
                        <span className="text-gray-600 line-clamp-1 max-w-xs">{text}</span>
                      ) : (
                        <a
                          href={
                            text.toLowerCase() === 'trang chủ' ? '/vi/trang-chu' :
                              text.toLowerCase() === 'home' ? '/en/trang-chu' :
                                text.toLowerCase() === 'dịch vụ' ? '/vi/trang-chu#dich-vu' :
                                  ['service', 'services'].includes(text.toLowerCase()) ? '/en/trang-chu#dich-vu' :
                                    ['bài viết', 'hoạt động', 'sự kiện', 'tin tức'].includes(text.toLowerCase()) ? '/vi/trang-bai-viet' :
                                      ['article', 'articles', 'activity', 'activities', 'event', 'events', 'news'].includes(text.toLowerCase()) ? '/en/trang-bai-viet' :
                                        '#'
                          }
                          className={`hover:text-[#d97706] transition-colors ${isAnimated ? "duration-300" : ""}`}
                        >
                          {text}
                        </a>
                      )}
                      {!isLast && <span>›</span>}
                    </span>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Cột trái (Nội dung chính) */}
            <div className="flex-1 min-w-0">
              <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-gray-100">

                  {/* Tiêu đề bài viết */}
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4" style={{ color: titleColor || '#111827' }}>
                    {title}
                  </h1>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400" style={{ color: metaColor || '#9ca3af' }}>
                    {date && (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {date}
                      </div>
                    )}
                    {time && (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {time}
                      </div>
                    )}
                    {category && (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                        {category}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 sm:px-10 pt-10 pb-0">
                  {/* Nội dung bài viết */}
                  <div className="prose prose-lg max-w-none text-gray-700">
                    {summary && (
                      <p className="font-medium text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap">
                        {summary}
                      </p>
                    )}

                    {image && (
                      <figure className="my-8">
                        <img src={getValidImageUrl(image)} alt={title || "Ảnh minh họa"} className="w-full h-auto rounded-lg object-cover" />
                      </figure>
                    )}

                    {body && (
                      <div className="leading-relaxed whitespace-pre-wrap mb-8 text-gray-700 space-y-4">
                        {body}
                      </div>
                    )}

                    {tags && (
                      <div className="mt-8 font-medium text-gray-600 leading-none -mb-4">
                        {tags}
                      </div>
                    )}

                    {contactInfo && (
                      <div className="mt-6 font-medium text-sm text-gray-800 border-t border-gray-900 pt-2 inline-block">
                        <div className="whitespace-pre-wrap first-line:font-bold first-line:font-serif first-line:text-gray-900 first-line:text-base leading-relaxed">{contactInfo}</div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </div>

            {/* Cột phải (Sidebar) */}
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 lg:sticky lg:top-24 self-start">
              <div className="mb-4">
                <a href={getHomeHashUrl(backLinkUrl || '#')} className={`group inline-flex items-center gap-2 text-[#f59e0b] font-bold text-[15px] ${isAnimated ? 'hover:text-[#d97706] transition-colors' : ''}`}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                  <span className={isAnimated ? 'group-hover:translate-x-1.5 transition-transform duration-300' : ''}>
                    {backLinkText || 'Quay lại danh sách'}
                  </span>
                </a>
              </div>
              <aside className={`bg-white border-2 border-yellow-500/20 rounded-2xl shadow-xl overflow-hidden ${isAnimated ? 'hover:shadow-2xl transition-all duration-300' : ''}`}>
                <div className="bg-[#0D5939] px-6 py-4 flex items-center justify-center gap-3">
                  <h3 className="text-white text-center font-bold text-lg md:text-xl uppercase tracking-wide">
                    {sidebarTitle}
                  </h3>
                </div>

                {safeServices.length === 0 ? (
                  <div className="p-6 text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <p className="text-gray-500 text-sm">{noServiceText || 'Chưa có dịch vụ nào'}</p>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      {(() => {
                        const validServiceIndex = currentServiceIndex >= safeServices.length ? 0 : currentServiceIndex;
                        const service = safeServices[validServiceIndex] || {};
                        return (
                          <a href={getHomeHashUrl(service.url || '#')} className="block group">
                            <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                              {getValidImageUrl(service.image) ? (
                                <img src={getValidImageUrl(service.image)} alt={typeof service?.title === 'string' ? service.title : 'Dịch vụ'} className={`w-full h-full object-cover ${isAnimated ? 'group-hover:scale-105 transition-transform duration-500' : ''}`} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D5939]/10 to-[#0D5939]/5">
                                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                </div>
                              )}
                            </div>
                            <div className="p-6 md:p-8">
                              <h4 className={`font-bold text-gray-900 text-lg md:text-xl mb-3 line-clamp-2 leading-snug p-1 -m-1 ${isAnimated ? 'group-hover:text-[#d97706] transition-colors' : ''}`}>
                                {service.title}
                              </h4>
                              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 p-1 -m-1">
                                {service.description}
                              </p>
                              <span className={`inline-flex items-center gap-2 text-sm font-bold text-[#f59e0b] ${isAnimated ? 'group-hover:underline' : ''}`}>
                                {serviceLinkText}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                              </span>
                            </div>
                          </a>
                        );
                      })()}
                      {safeServices.length > 1 && (
                        <>
                          <button onClick={prevService} className={`absolute left-2 top-[30%] -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white shadow-md rounded-full border border-gray-100 text-gray-600 z-10 ${isAnimated ? 'hover:text-[#d97706] hover:scale-110 transition-all' : ''}`} aria-label="Previous service">
                            <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                          </button>
                          <button onClick={nextService} className={`absolute right-2 top-[30%] -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white shadow-md rounded-full border border-gray-100 text-gray-600 z-10 ${isAnimated ? 'hover:text-[#d97706] hover:scale-110 transition-all' : ''}`} aria-label="Next service">
                            <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                          </button>
                        </>
                      )}
                    </div>
                    {safeServices.length > 1 && (
                      <div className="flex items-center justify-center gap-1.5 py-2.5 px-4">
                        {safeServices.map((_, i) => (
                          <button key={i} onClick={() => setCurrentServiceIndex(i)} className={`rounded-full ${isAnimated ? 'transition-all' : ''} ${i === currentServiceIndex ? "w-4 h-1.5 bg-[#f59e0b]" : `w-1.5 h-1.5 bg-gray-300 ${isAnimated ? 'hover:bg-gray-400' : ''}`}`}></button>
                        ))}
                      </div>
                    )}
                    <div className="px-6 pb-5 pt-3 border-t border-gray-100 bg-gray-50/50">
                      <a href={getHomeHashUrl(viewAllServicesUrl || '/vi/trang-chu#linh-vuc-hoat-dong')} className={`flex items-center justify-center gap-2 text-sm font-bold text-[#f59e0b] ${isAnimated ? 'hover:text-[#d97706] transition-colors' : ''}`}>
                        {viewAllServicesText || 'Xem tất cả dịch vụ'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                      </a>
                    </div>
                  </>
                )}
              </aside>
            </div>
          </div>

          {/* Cột Bài viết liên quan (nằm dưới) */}
          {safeRelatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-1 h-7 bg-yellow-400 rounded-full inline-block flex-shrink-0"></span> {relatedTitle || 'Bài viết liên quan'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {safeRelatedPosts.map((post, idx) => {
                  if (!post) return null;
                  return (
                    <div key={idx} className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full ${isAnimated ? 'hover:shadow-md hover:border-yellow-400/50 transition-all duration-300 group' : ''}`}>
                      <a href={getHomeHashUrl(post.url || '#')} className="block relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
                        <img src={getValidImageUrl(post.image)} alt={post.title || 'Bài viết liên quan'} className={`w-full h-full object-cover ${isAnimated ? 'group-hover:scale-[1.04] transition-transform duration-500' : ''}`} />
                      </a>
                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                        <h3 className="font-bold text-[15px] sm:text-base mb-3 leading-snug line-clamp-3 p-1 -m-1" style={{ color: post.titleColor || '#111827' }}>
                          <a href={getHomeHashUrl(post.url || '#')} className={`block ${isAnimated ? 'group-hover:text-[#f59e0b] transition-colors duration-300' : ''}`}>{post.title}</a>
                        </h3>
                        <div className="mt-auto pt-4 flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 font-medium border-t border-gray-100">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            {post.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
};

// Components: Đồng Hành
export const AdminDongHanh = (props) => <AdminKhongKhiTungBung {...props} />;

// Components: Sắm Tết Công Nghệ
export const AdminSamTetCN = (props) => <AdminKhongKhiTungBung {...props} />;

// Components: Bài Viết 4
export const AdminBaiViet4 = (props) => <AdminKhongKhiTungBung {...props} />;

// Components: Bài Viết 5
export const AdminBaiViet5 = (props) => <AdminKhongKhiTungBung {...props} />;
