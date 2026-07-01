import React, { useEffect, useRef, useState } from 'react';
import { DropZone } from '@puckeditor/core';

// Import các file ảnh icon từ thư mục assets
import facebookIcon from '../assets/facebook.svg';
import tiktokIcon from '../assets/tiktok.png';
import linkedinIcon from '../assets/linkedin.svg';

//               Components Header 
export const AdminHeader = ({ logo, links, socials }) => {
  return (
    <>
      <div className="h-[110px] w-full" />
      <header className="bg-white/90 fixed top-0 left-0 right-0 z-50 shadow-md w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-12 h-[110px] overflow-hidden">
        {/* Logo */}
        <div className="flex-shrink-0 self-end pb-1 ml-6">
          {/* Tăng height lên 100px và căn lề dưới 1 chút (pb-1) để không bị quá sát mép */}
          <img src={logo} alt="Logo" className="h-[100px] w-auto object-contain" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-10">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              onClick={(e) => e.preventDefault()}
              className={`font-bold uppercase text-sm transition-colors pb-1 border-b-[3px] ${idx === 0
                ? "text-gray-900 border-orange-500"
                : "text-gray-500 border-transparent hover:border-orange-500"
                }`}
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center space-x-1">
          {socials.map((social, idx) => {
            let iconSrc = null;

            if (social.platform === 'facebook') iconSrc = facebookIcon;
            if (social.platform === 'tiktok') iconSrc = tiktokIcon;
            if (social.platform === 'linkedin') iconSrc = linkedinIcon;

            // Nếu người dùng chọn nền tảng "Khác" thì hiển thị icon mặc định
            if (!iconSrc) {
              return (
                <a
                  key={idx}
                  href={social.url}
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-sm hover:opacity-80 transition-all"
                >
                  🌐
                </a>
              );
            }

            // Hiển thị file ảnh icon
            return (
              <a
                key={idx}
                href={social.url}
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 flex items-center justify-center hover:opacity-80 hover:-translate-y-0.5 transition-all duration-300"
              >
                <img src={iconSrc} alt={social.platform} className="w-full h-full object-contain" />
              </a>
            );
          })}
        </div>
        </div>
      </header>
    </>
  );
};

//               Components Footer
export const AdminFooter = ({
  logo,
  description,
  contactTitle,
  contacts,
  copyright
}) => {
  return (
    <footer className="w-full text-gray-800 mt-auto">
      {/* Khối chính của Footer */}
      <div className="bg-[#fbc500] py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

          {/* Cột trái: Logo và Mô tả */}
          <div className="w-full md:w-5/12 flex flex-col gap-6">
            {logo && (
              <img src={logo} alt="Logo Footer" className="h-[100px] w-auto object-contain self-start" />
            )}
            <p className="text-[15px] font-normal text-gray-900 leading-relaxed tracking-wide">
              {description}
            </p>
          </div>

          {/* Cột phải: Thông tin liên hệ */}
          <div className="w-full md:w-6/12 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#00796b] font-bold text-lg uppercase tracking-wide">
                {contactTitle}
              </h3>
              {/* Dòng kẻ ngang mờ */}
              <div className="w-full h-[1px] bg-yellow-700/20"></div>
            </div>

            <ul className="flex flex-col gap-4 font-normal text-black text-[15px]">
              {contacts.map((contact, idx) => (
                <li key={idx} className={`flex items-start gap-3 ${contact.type !== 'location' ? 'hover:text-white transition-colors cursor-pointer group' : ''}`}>
                  <span className={`mt-1 flex-shrink-0 ${contact.type !== 'location' ? 'group-hover:text-white' : ''}`}>
                    {/* Icon điện thoại */}
                    {contact.type === 'phone' && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M2.25 6.75C2.25 5.507 3.257 4.5 4.5 4.5h2.472c.552 0 1.05.353 1.228.877l1.047 3.093c.18.531-.056 1.132-.544 1.408l-2.023 1.144A15.067 15.067 0 0013.38 17.32l1.144-2.023c.276-.488.877-.724 1.408-.544l3.093 1.047c.524.178.877.676.877 1.228v2.472c0 1.243-1.007 2.25-2.25 2.25A18.75 18.75 0 012.25 6.75z" />
                      </svg>
                    )}
                    {/* Icon Email */}
                    {contact.type === 'email' && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    )}
                    {/* Icon Vị trí */}
                    {contact.type === 'location' && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  <span>{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Thanh bản quyền bên dưới */}
      <div className="bg-[#f28627] text-white py-4 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto flex justify-center items-center text-[13px] opacity-90">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};



// Section component — container có background, padding, và children (slot).
const containerMap = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' };

const AdminSection = ({ container = 'lg', background = {}, padding_x = 4, padding_y = 4 }) => {
  const bgStyle = {};
  if (background.type === 'color') bgStyle.backgroundColor = background.color || 'transparent';
  if (background.type === 'image' && background.bg_image) {
    bgStyle.backgroundImage = `url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
  }
  if (background.type === 'gradient') {
    bgStyle.background = `linear-gradient(${background.direction || 'to right'}, ${background.fromColor || '#fff'}, ${background.toColor || '#000'})`;
  }
  if (background.opacity !== undefined) bgStyle.opacity = background.opacity;

  return (
    <section style={{ ...bgStyle, padding: `${(padding_y || 0) * 4}px ${(padding_x || 0) * 4}px` }}>
      <div style={{ maxWidth: containerMap[container] || '1280px', margin: '0 auto' }}>
        <DropZone zone="content" />
      </div>
    </section>
  );
};

export default AdminSection;

// Components : Về Chúng Tôi
export const AdminVeChungToi = ({ title, content, videoPoster, videoUrl }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const formatContent = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(metik)/gi);
    return parts.map((part, index) =>
      part.toLowerCase() === 'metik' ? (
        <strong key={index} className="font-bold text-gray-900">{part}</strong>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={domRef} className="relative w-full bg-gradient-to-b from-[#ffeed6] to-[#ffe7c7] overflow-hidden py-12 md:py-16">

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {title && (
          <div className="mb-8 md:mb-10">
            <h2 className="text-[19px] md:text-[22px] font-bold text-[#5ba138] uppercase relative inline-block z-10">
              {title}
              <span className="absolute bottom-0 left-[12%] right-[-40%] h-3 md:h-4 bg-[#ffd54f] -z-10 translate-y-1"></span>
            </h2>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className={`w-full md:w-1/2 text-gray-700 text-base md:text-[17px] leading-[1.8] whitespace-pre-line space-y-6 ${isVisible ? 'animate-slide-from-center-left' : 'opacity-0'}`}>
            {formatContent(content)}
          </div>

          <div className={`w-full md:w-1/2 ${isVisible ? 'animate-slide-from-center-right' : 'opacity-0'}`}>
            <div className="w-full h-auto aspect-video rounded-tr-[40px] rounded-bl-[40px] overflow-hidden shadow-xl bg-gray-900 relative">
              <video
                src={videoUrl || ""}
                poster={videoPoster || undefined}
                controls
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components : Sản Phẩm
export const AdminSanPham = ({ breadcrumbs, products }) => {
  return (
    <div className="relative w-full bg-white overflow-hidden pt-4 pb-8 md:pt-6 md:pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center text-[15px] md:text-[17px] mb-8 uppercase">
            {breadcrumbs.map((item, index) => {
              const text = typeof item === 'string' ? item : item.text;
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={index}>
                  <span className={isLast ? "font-bold text-gray-900" : "text-gray-500 font-normal"}>
                    {text}
                  </span>
                  {!isLast && (
                    <span className="mx-2 text-gray-300 font-light">/</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products && products.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="w-full aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 md:p-5 text-center bg-white border-t border-gray-100 flex-grow flex items-center justify-center">
                <h3 className="font-bold text-[#f39223] text-sm lg:text-base">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Components : Sản Phẩm Mới
export const AdminSanPhamMoi = ({ title, products }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className="relative w-full bg-[#fdfbf7] overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[70%] bg-orange-300/30 blur-[120px] -z-0 pointer-events-none rounded-full"></div>

      <div className={`max-w-7xl mx-auto px-6 md:px-12 pt-7 md:pt-8 pb-6 md:pb-8 w-full relative z-10 ${isVisible ? 'animate-slide-up-fade' : 'opacity-0'}`}>
        {title && (
          <div className="mb-8">
            <h2 className="text-[19px] md:text-[22px] font-bold text-[#5ba138] uppercase relative inline-block z-10">
              {title}
              <span className="absolute bottom-0 left-[12%] right-[-30%] h-3 md:h-4 bg-[#ffd54f] -z-10 translate-y-1"></span>
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products && products.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group relative z-20"
            >
              <div className="w-full aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 md:p-5 text-center bg-white border border-gray-100 border-t-0 flex-grow flex items-center justify-center">
                <h3 className="font-bold text-[#f39223] text-sm lg:text-base">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// Components : Giới Thiệu
export const AdminGioiThieu = ({ content, videoPoster, videoUrl }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const formatContent = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(metik)/gi);
    return parts.map((part, index) =>
      part.toLowerCase() === 'metik' ? (
        <strong key={index} className="font-bold text-black">{part}</strong>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={domRef} className="relative w-full bg-white overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50px]'}`}>
            <div className="w-full h-auto aspect-video overflow-hidden shadow-md bg-gray-900 relative">
              <video
                src={videoUrl || ""}
                poster={videoPoster || undefined}
                controls
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className={`w-full md:w-1/2 text-gray-600 text-[17px] md:text-[19px] leading-[1.8] whitespace-pre-line space-y-6 text-justify transition-all duration-1000 ease-out delay-[200ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50px]'}`}>
            {formatContent(content)}
          </div>
        </div>
      </div><a href=""></a>
    </div>
  );
};

// Components : Giới Thiệu Về Metik
export const AdminGioiThieuVeMetik = ({ title, description, blocks }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const blocksRef = useRef([]);

  const formatContent = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(metik)/gi);
    return parts.map((part, index) =>
      part.toLowerCase() === 'metik' ? (
        <strong key={index} className="font-bold text-black">{part}</strong>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsHeaderVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsHeaderVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      blocksRef.current.forEach(block => {
        if (block) block.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    blocksRef.current.forEach(block => {
      if (block) observer.observe(block);
    });

    return () => observer.disconnect();
  }, [blocks]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Hiện mũi tên khi cuộn qua nửa khối
      const isHalfway = (window.innerHeight - rect.top) >= (rect.height / 2);
      setShowScrollTop(isHalfway);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={sectionRef} className="relative w-full bg-gradient-to-b from-[#fdfbf7] from-60% to-[#ffeed6] overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">

        {/* Phần Header (Tiêu đề và mô tả) */}
        <div ref={headerRef} className={`mb-16 md:mb-20 ${isHeaderVisible ? 'animate-slide-up-fade' : 'opacity-0'}`}>
          {title && (
            <h2 className="text-[19px] md:text-[22px] font-bold text-[#5ba138] uppercase relative inline-block z-10 mb-5">
              {title}
              <span className="absolute bottom-0 left-[8%] right-[5%] h-3 md:h-4 bg-[#ffd54f] -z-10 translate-y-1"></span>
            </h2>
          )}
          {description && (
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Các khối nội dung (Hình ảnh và Văn bản) */}
        <div className="flex flex-col gap-8 md:gap-10">
          {blocks && blocks.map((block, idx) => {
            const isLeft = block.imagePosition === 'left';

            return (
              <div
                key={idx}
                ref={el => blocksRef.current[idx] = el}
                className={`group flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-8 overflow-hidden`}
              >

                {/* Ảnh */}
                <div className={`w-full md:w-1/2 opacity-0 ${isLeft ? '-translate-x-[50px]' : 'translate-x-[50px]'} group-[.is-visible]:opacity-100 group-[.is-visible]:translate-x-0 transition-all duration-1000 ease-out`}>
                  <div className="w-full h-auto rounded-tr-[40px] rounded-bl-[40px] overflow-hidden">
                    <img src={block.image} alt={`Giới thiệu ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Chữ */}
                <div className={`w-full md:w-1/2 text-gray-600 text-base md:text-[17px] leading-[1.8] opacity-0 ${isLeft ? 'translate-x-[50px]' : '-translate-x-[50px]'} group-[.is-visible]:opacity-100 group-[.is-visible]:translate-x-0 transition-all duration-1000 ease-out delay-[200ms]`}>
                  {block.isList === 'true' && block.listItems && block.listItems.length > 0 ? (
                    <ul className="space-y-4">
                      {block.listItems.map((item, lIdx) => (
                        <li key={lIdx} className="flex items-start">
                          <span className="mr-3 text-[16px] leading-none pt-[5px] text-gray-600">●</span>
                          <div className="flex-1 whitespace-pre-line">{item.content}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="whitespace-pre-line space-y-4">
                      {formatContent(block.text)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nút cuộn lên đầu trang */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 md:right-8 md:bottom-8 z-50 w-10 h-10 flex items-center justify-center rounded-full border-[1.5px] border-gray-300 bg-[#fdfbf7] text-gray-400 hover:bg-[#f28627] hover:border-[#f28627] hover:text-white transition-all duration-500 shadow-sm ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        title="Lên đầu trang"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

// Components : Khách Hàng Nói Gì
export const AdminKhachHang = ({ title, testimonials }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className="relative w-full bg-gradient-to-b from-[#ffe7c7] to-[#ffdfb8] overflow-hidden pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {title && (
          <div className={`mb-10 ${isVisible ? 'animate-slide-up-fade' : 'opacity-0'}`}>
            <h2 className="text-[19px] md:text-[22px] font-bold text-[#5ba138] uppercase relative inline-block z-10">
              {title}
              <span className="absolute bottom-0 left-[7.5%] right-[6%] h-3 md:h-4 bg-[#ffd54f] -z-10 translate-y-1"></span>
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {Array.isArray(testimonials) && testimonials.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const animationClass = isLeft ? 'animate-slide-from-bottom-left' : 'animate-slide-from-bottom-right';
            return (
              <div key={idx} className={`flex items-center gap-4 md:gap-6 ${isVisible ? animationClass : 'opacity-0'}`} style={{ animationDelay: `${idx * 200}ms` }}>
                {/* Avatar */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[3px] border-[#ffd54f] overflow-hidden flex-shrink-0 shadow-md bg-white">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.name || `Avatar ${idx}`} className="w-full h-full object-cover scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  {/* Stars */}
                  <div className="flex text-yellow-400 text-base md:text-lg mb-1">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  {/* Text */}
                  <p className="text-gray-700 italic text-[14px] md:text-[15px] leading-relaxed">
                    {item.feedback}
                  </p>
                  {/* Author */}
                  <h4 className="font-bold text-[#2d3748] text-sm md:text-base mt-2">
                    {item.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Components : Liên Hệ (Bản Đồ)
export const AdminLienHe = ({ mapUrl, height }) => {
  const currentHeight = height || 550;
  return (
    <div 
      className="w-full relative shadow-inner overflow-hidden bg-gray-100" 
      style={{ height: `${currentHeight}px` }}
    >
      <iframe
        title="Bản đồ liên hệ OCHAO"
        src={mapUrl || "https://maps.google.com/maps?q=C%C3%B4ng%20ty%20C%E1%BB%95%20Ph%E1%BA%A7n%20OCHAO%2C%20L%C3%B4%20C3-1%2C%20%C4%90%C6%B0%E1%BB%9Dng%20D2-N7%2C%20Khu%20C%C3%B4ng%20nghi%E1%BB%87p%20T%C3%A2n%20Ph%C3%BA%20Trung%2C%20X%C3%A3%20C%E1%BB%A7%20Chi%2C%20Tp.%20H%E1%BB%93%20Ch%C3%AD%20L%E1%BB%99%2C%20%C4%90%C6%B0%E1%BB%9Dng%20D2-N7%2FC3-1%20Ch%C3%AD%20L%C3%B4%20C3-1%2C%20Khu%20C%C3%B4ng%20nghi%E1%BB%87p%2C%20C%E1%BB%A7%20Chi%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%20700000%2C%20Vi%E1%BB%87t%20Nam&hl=vi&t=&z=16&ie=UTF8&iwloc=&output=embed"}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full block"
      ></iframe>
    </div>
  );
};
