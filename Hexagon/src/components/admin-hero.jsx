import React, { useState, useEffect } from 'react';
import { getBackgroundStyle, getHomeHashUrl } from './admin-section';

const Typewriter = ({ text = '', animate = true }) => {
  if (!animate) return <span>{text}</span>;

  const words = String(text || '').split(',').map(w => w.trim().replace(/\s*<br\s*\/?>\s*/gi, '\n')).filter(w => w);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    let timeout;
    const currentWord = words[currentWordIndex] || '';

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  if (words.length === 0) return <span>{text}</span>;

  return (
    <span className="whitespace-pre inline-block min-h-[1.15em] text-left">
      {currentText}
      <span aria-hidden="true" className="inline-block w-[3px] h-[0.85em] ml-1 bg-current align-middle animate-pulse"></span>
    </span>
  );
};

const AdminHero = ({
  tagText,
  tagColor,
  titles,
  subtitle,
  buttons,
  imageUrl,
  scrollText,
  background,
  subtitleColor,
  animate = true
}) => {
  const bgStyle = getBackgroundStyle(background, { background: 'linear-gradient(to bottom right, #135237, #196B49, #41b67d)' });

  return (
    <section id="trang-chu" className="relative pt-0 lg:pt-2 pb-8 lg:pb-16 overflow-hidden" style={bgStyle}>
      <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center">

          {/* Cột trái: Nội dung */}
          <div className="flex flex-col items-start text-left space-y-6 lg:pr-8 -mt-4 lg:-mt-8">
            <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm">
              <span className="text-sm font-bold tracking-wider uppercase" style={tagColor ? { color: tagColor } : { color: '#eab308' }}>
                {tagText || 'CÔNG NGHỆ TƯƠNG LAI'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.15] tracking-tight flex flex-col items-start">
              {(titles || []).map((t, idx) => {
                if (t.variant === 'typewriter') {
                  return (
                    <div key={idx} style={t.color ? { color: t.color } : {}}>
                      <Typewriter text={t.text || 'Tiêu đề'} animate={animate} />
                    </div>
                  );
                }
                if (t.variant === 'gradient') {
                  return (
                    <div
                      key={idx}
                      className="mt-2 w-max whitespace-nowrap"
                      style={{
                        background: t.color || 'linear-gradient(135deg, #ffffff 0%, #a8e6d8 55%, #F7931E 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent'
                      }}
                    >
                      {t.text || 'Tiêu đề'}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="mt-2 w-max whitespace-nowrap" style={t.color ? { color: t.color } : {}}>
                    {t.text || 'Tiêu đề'}
                  </div>
                );
              })}
            </h1>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-xl" style={subtitleColor ? { color: subtitleColor } : {}}>
              {subtitle || 'HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              {(buttons || []).map((btn, idx) => {
                const isPrimary = btn.variant === 'primary';
                const baseClass = "px-8 py-3.5 rounded-lg transition-all text-center text-white";
                const primaryClass = "bg-[linear-gradient(to_right,#ff9902,#f2d337)] hover:brightness-110 shadow-lg shadow-yellow-500/30";
                const secondaryClass = "bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm";
                return (
                  <a key={idx} href={getHomeHashUrl(btn.url || '#')} className={`${baseClass} ${isPrimary ? primaryClass : secondaryClass}`} style={btn.color ? { color: btn.color } : {}}>
                    {btn.text}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Cột phải: Hình ảnh */}
          <div className="relative w-full flex justify-center">
            <div className="relative w-full max-w-none aspect-square">
              <img
                src={imageUrl || 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp'}
                alt="Hero banner"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Mũi tên cuộn xuống */}
      <div className={`absolute inset-x-0 bottom-4 lg:bottom-8 flex justify-center z-20 ${animate ? 'animate-bounce' : ''}`}>
        <a href={getHomeHashUrl('#gioi-thieu')} className="text-gray-300 hover:text-white flex flex-col items-center gap-1 transition-colors">
          <span className="text-sm font-medium tracking-wide">{scrollText || 'Cuộn xuống để khám phá'}</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default AdminHero;
