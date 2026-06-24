import React from 'react';

// Section component — container có background, padding, và children (slot).
const containerMap = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' };

const AdminSection = ({ container = 'lg', background = {}, padding_x = 4, padding_y = 4, children }) => {
  const bgStyle = {};
  if (background.type === 'color') bgStyle.backgroundColor = background.color || 'transparent';
  if (background.type === 'image' && background.bg_image) {
    bgStyle.backgroundImage = `url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }
  if (background.type === 'gradient') {
    bgStyle.background = `linear-gradient(${background.direction || 'to right'}, ${background.fromColor || '#fff'}, ${background.toColor || '#000'})`;
  }
  if (background.opacity !== undefined) bgStyle.opacity = background.opacity;

  return (
    <section className="relative transition-all" style={{ ...bgStyle, padding: `${(padding_y || 0) * 4}px ${(padding_x || 0) * 4}px` }}>
      <div style={{ maxWidth: containerMap[container] || '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
};

// --- Component 1: Các Ban Chuyên Môn (AdminCacBanChuyenMon) ---
export const AdminCacBanChuyenMon = ({
  title = "CÁC BAN CHUYÊN MÔN",
  subtitle = "CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
  titleColor = "#2b569a",
  subtitleColor = "#2b569a",
  background = {},
  items = []
}) => {

  const getSectionBg = () => {
    if (background.type === 'color') return { backgroundColor: background.color || '#f0e0ff' };
    if (background.type === 'gradient') {
      const from = background.gradientFrom || '#f0e0ff';
      const to = background.gradientTo || '#d4e0ff';
      const dir = background.gradientDirection || '180deg';
      if (from === '#f0e0ff' && to === '#d4e0ff' && dir === '180deg') {
        return { background: 'linear-gradient(180deg, #f0e0ff 0%, #dce8ff 45%, #d4e0ff 100%)' };
      }
      return { background: `linear-gradient(${dir}, ${from}, ${to})` };
    }
    return { background: 'linear-gradient(180deg, #f0e0ff 0%, #dce8ff 45%, #d4e0ff 100%)' };
  };

  return (
    <section className="py-20 px-4 md:px-12 lg:px-24 transition-all" style={getSectionBg()}>
      <div className="max-w-7xl mx-auto text-center">
        {/* Title & Subtitle */}
        {title && (
          <h2 className="text-3xl font-bold tracking-wide mb-2 uppercase font-sans" style={{ color: titleColor }}>
            {title}
          </h2>
        )}
        {subtitle && (
          <h3 className="text-xl font-bold tracking-wide mb-12 uppercase font-sans" style={{ color: subtitleColor }}>
            {subtitle}
          </h3>
        )}

        {/* Card Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {items.map((item, index) => {
            // Lấy icon từ URL
            let iconElement = null;
            if (item.iconUrl) {
              const cleanIconUrl = item.iconUrl.replace('.jpg', '.png');
              iconElement = (
                <img
                  src={cleanIconUrl}
                  alt={item.title}
                  className="w-16 h-16 object-contain transform transition-transform duration-300 group-hover:scale-110"
                  style={{
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              );
            }

            return (
              <div
                key={index}
                className="group w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-22px)] max-w-[380px] h-[280px] flex flex-col justify-center items-center p-8 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                style={{
                  borderRadius: item.cardRadius || '80px 1px 80px 1px',
                  background: 'linear-gradient(135deg, #2fa5f8 0%, #157fdc 50%, #0b3a75 100%)',
                  boxShadow: '0 10px 25px -5px rgba(21, 127, 220, 0.4)'
                }}
              >
                {/* Icon Area */}
                <div className="mb-4 -mt-10">
                  {iconElement}
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold tracking-wide font-sans mb-6 text-center">
                  {item.title}
                </h4>

                {/* Glassmorphic Button */}
                {item.btnText && (
                  <a
                    href={item.btnUrl || '#'}
                    className="inline-flex items-center gap-3 text-sm tracking-wider font-semibold border border-white/50 bg-white/15 hover:bg-white hover:text-[#0b4d75] active:bg-white/90 text-white px-5 py-2 transition-all duration-300"
                    style={{ borderRadius: item.btnRadius || '30px' }}
                  >
                    <span>{item.btnText}</span>
                    <span>&rarr;</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Sub-component: Cột trong Cơ Cấu Tổ Chức ---
const OrgStructureColumn = ({ column, index }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 3;
  const members = column.members || [];
  const totalPages = Math.ceil(members.length / itemsPerPage);

  // An toàn: Nếu người dùng xóa nhân sự khiến tổng số trang giảm xuống dưới trang hiện tại
  React.useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0 && currentPage !== 0) {
      setCurrentPage(0);
    }
  }, [totalPages, currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const isTextType = column.type === 'text' || column.type === 'mixed';
  const isMembersType = column.type === 'members' || column.type === 'mixed';

  const bgConfig = column.background || { type: 'default' };
  const cardStyle = {};

  if (bgConfig.type === 'image' && bgConfig.imageUrl) {
    cardStyle.backgroundImage = `url('${bgConfig.imageUrl}')`;
    cardStyle.backgroundSize = 'contain';
    cardStyle.backgroundPosition = 'bottom left';
    cardStyle.backgroundRepeat = 'no-repeat';
    cardStyle.backgroundColor = bgConfig.color || '#ffffff';
  } else if (index === 0) {
    // Default dual images for VỀ CÂU LẠC BỘ (rendered as separate elements for hover effects)
    cardStyle.backgroundColor = '#ffffff';
  } else if (bgConfig.type === 'color' && bgConfig.color) {
    cardStyle.backgroundColor = bgConfig.color;
  } else if (isTextType) {
    cardStyle.backgroundColor = '#ffffff';
  }

  const cardClass = isTextType
    ? "rounded-2xl p-8 border border-slate-100/80 shadow-xl flex flex-col justify-between min-h-[500px] relative overflow-hidden transition-all duration-300 puck-card-group"
    : "bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-100/80 shadow-xl flex flex-col justify-between min-h-[500px] relative transition-all duration-300 puck-card-group";

  return (
    <div className={cardClass} style={cardStyle}>
      {index === 0 && (
        <>
          <style>{`
            /* Khi di chuột vào riêng khung Card Về Câu Lạc Bộ */
            .puck-card-group:hover .puck-card-bg-left {
              transform: scale(1.08) translateX(-8px) !important;
            }
            .puck-card-group:hover .puck-card-bg-right {
              transform: scale(1.08) translateX(8px) !important;
            }

            /* Khi di chuột trực tiếp vào ảnh bên trái */
            .puck-card-bg-left:hover {
              transform: scale(1.08) translateX(-8px) !important;
            }
            .puck-card-bg-left:hover ~ .puck-card-bg-right {
              transform: scale(1.08) translateX(8px) !important;
            }

            /* Khi di chuột trực tiếp vào ảnh bên phải */
            .puck-card-bg-right:hover {
              transform: scale(1.08) translateX(8px) !important;
            }
            .puck-card-group:has(.puck-card-bg-right:hover) .puck-card-bg-left {
              transform: scale(1.08) translateX(-8px) !important;
            }
          `}</style>
          <div
            className="absolute bottom-0 left-0 w-[45%] h-[200px] bg-no-repeat bg-contain bg-left-bottom pointer-events-auto transition-transform duration-500 ease-out puck-card-bg-left"
            style={{
              backgroundImage: "url('/bg-clb-1.png')",
              zIndex: 15,
              transformOrigin: 'left bottom'
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[45%] h-[200px] bg-no-repeat bg-contain bg-right-bottom pointer-events-auto transition-transform duration-500 ease-out puck-card-bg-right"
            style={{
              backgroundImage: "url('/bg-clb-2.png')",
              zIndex: 15,
              transformOrigin: 'right bottom'
            }}
          />
        </>
      )}
      <div className="absolute inset-0 z-20 pointer-events-auto" />
      <div className="relative z-30">
        {column.title && (
          <h2 className="text-2xl font-extrabold text-[#1e3a8a] tracking-wide mb-6 uppercase font-sans">
            {column.title}
          </h2>
        )}

        {/* Text Content */}
        {isTextType && column.content && (
          <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap font-sans text-sm md:text-base mb-6">
            {column.content}
          </p>
        )}

        {/* Leadership Cards List */}
        {isMembersType && members.length > 0 && (
          <div className="relative overflow-hidden w-[calc(100%+160px)] -ml-[80px] px-[80px] py-8 -my-8">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => {
                const pageMembers = members.slice(pageIdx * itemsPerPage, (pageIdx + 1) * itemsPerPage);
                return (
                  <div key={pageIdx} className="w-full flex-shrink-0 space-y-4 pr-1">
                    {pageMembers.map((member, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-3 md:gap-5 p-2 pr-4 md:pr-6 rounded-[50px] border border-transparent bg-transparent hover:bg-white hover:shadow-[0_12px_40px_rgba(15,76,129,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-default w-full"
                      >
                        {/* Circular Avatar */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={(member.avatarUrl || 'https://via.placeholder.com/80').replace(/ /g, '%20')}
                            alt={member.name}
                            className="w-[60px] h-[60px] md:w-[88px] md:h-[88px] rounded-full object-cover ring-[4px] md:ring-[6px] ring-transparent group-hover:ring-sky-50/80 group-hover:shadow-[0_8px_20px_rgba(15,76,129,0.12)] transition-all duration-300"
                          />
                        </div>

                        {/* Info */}
                        <div className="font-sans text-xs md:text-sm leading-relaxed space-y-0.5 py-2 pr-2 flex-1 min-w-0 break-words">
                          <div><span className="font-bold text-[#0b4d75]">Họ tên:</span> <span className="font-medium text-slate-700">{member.name}</span></div>
                          <div><span className="font-bold text-[#0b4d75]">Chức vụ CLB:</span> <span className="font-medium text-slate-700">{member.clbRole}</span></div>
                          <div><span className="font-bold text-[#0b4d75]">Chức vụ Doanh nghiệp:</span> <span className="font-medium text-slate-700">{member.bizRole}</span></div>
                          <div><span className="font-bold text-[#0b4d75]">Doanh nghiệp:</span> <span className="font-medium text-slate-700">{member.bizName}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer controls or graphic */}
      {isMembersType && totalPages > 1 ? (
        <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-100">
          <button
            onPointerDownCapture={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handlePrev();
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
            className="w-8 h-8 rounded-lg bg-[#e0f2fe] text-[#0b2447] font-bold hover:bg-sky-200 active:bg-sky-300 flex items-center justify-center transition-all focus:outline-none"
          >
            &lt;
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onPointerDownCapture={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentPage(i);
                }}
                onClick={(e) => e.stopPropagation()}
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
                className={`transition-all duration-300 focus:outline-none ${i === currentPage ? 'w-8 h-1.5 rounded-full bg-[#0b2447]' : 'w-2 h-2 rounded-full bg-[#bae6fd] hover:bg-sky-300'}`}
              />
            ))}
          </div>
          <button
            onPointerDownCapture={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleNext();
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
            className="w-8 h-8 rounded-lg bg-[#e0f2fe] text-[#0b2447] font-bold hover:bg-sky-200 active:bg-sky-300 flex items-center justify-center transition-all focus:outline-none"
          >
            &gt;
          </button>
        </div>
      ) : null}
    </div>
  );
};

// --- Component 2: Về Câu Lạc Bộ & Cơ Cấu Tổ Chức (AdminCoCauToChuc) ---
export const AdminCoCauToChuc = ({
  leftTitle = "VỀ CÂU LẠC BỘ",
  leftContent = "CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối - đồng hành - sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.",
  rightTitle = "CƠ CẤU TỔ CHỨC",
  background = {},
  members = [],
  columns = []
}) => {
  // Tương thích ngược nếu chưa cấu hình columns mới
  let displayColumns = columns;
  if (!displayColumns || displayColumns.length === 0) {
    displayColumns = [
      {
        title: leftTitle,
        type: 'text',
        content: leftContent
      },
      {
        title: rightTitle,
        type: 'members',
        members: members
      }
    ];
  }

  // Lấy class grid dựa trên số lượng cột
  const getGridClass = (count) => {
    if (count === 1) return "grid-cols-1 max-w-2xl";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-6xl";
    if (count === 3) return "grid-cols-1 lg:grid-cols-3 max-w-7xl";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl";
  };

  const getSectionBg = () => {
    const bgStyle = {};
    if (background.type === 'color') {
      bgStyle.backgroundColor = background.color || '#ffffff';
    } else if (background.type === 'image' && background.imageUrl) {
      bgStyle.backgroundImage = `url(${background.imageUrl}), linear-gradient(180deg, #e8f4ff 0%, #ece6ff 60%, #f0e0ff 100%)`;
      bgStyle.backgroundSize = 'contain, auto';
      bgStyle.backgroundPosition = 'center';
      bgStyle.backgroundRepeat = 'no-repeat, no-repeat';
    } else if (background.type === 'gradient') {
      bgStyle.background = `linear-gradient(${background.gradientDirection || '135deg'}, ${background.gradientFrom || '#efe6fc'}, ${background.gradientTo || '#e3f2fd'})`;
    } else {
      bgStyle.backgroundImage = `url('https://webdemo.hexagon.xyz/medias/hoavanvct.png'), linear-gradient(180deg, #e8f4ff 0%, #ece6ff 60%, #f0e0ff 100%)`;
      bgStyle.backgroundSize = 'contain, auto';
      bgStyle.backgroundPosition = 'center';
      bgStyle.backgroundRepeat = 'no-repeat, no-repeat';
    }
    return bgStyle;
  };

  return (
    <section
      className="py-20 px-4 md:px-12 lg:px-24 transition-all relative overflow-hidden bg-cover bg-center"
      style={getSectionBg()}
    >
      {/* Decorative Lotus Petals Overlay */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-200/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-200/20 rounded-full blur-[80px] pointer-events-none" />

      <div className={`mx-auto grid gap-8 items-stretch relative z-10 ${getGridClass(displayColumns.length)}`}>
        {displayColumns.map((col, idx) => (
          <OrgStructureColumn key={idx} column={col} index={idx} />
        ))}
      </div>
    </section>
  );
};

// --- Component 2B: Giới Thiệu (AdminGioiThieu) ---
export const AdminGioiThieu = ({
  title = "GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP",
  titleColor = "#0f5b94",
  imageUrl = "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
  subtitle = "Kết nối – Đồng hành – Phát triển",
  descriptions = [
    { text: "Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương." },
    { text: "Với tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh." }
  ],
  coreValues = [
    { label: "Tầm nhìn:", content: "Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập." },
    { label: "Sứ mệnh:", content: "Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững." }
  ],
  stats = [
    { number: "500+", label: "Doanh nghiệp tham gia" },
    { number: "50+", label: "Sự kiện kết nối mỗi năm" },
    { number: "100%", label: "Hướng đến phát triển bền vững" }
  ]
}) => {
  return (
    <section className="py-8 md:py-12 px-4 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-[32px] md:text-[36px] font-bold uppercase font-sans mb-4 tracking-tight" style={{ color: titleColor }}>
            {title}
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content: Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-16">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img src={imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c"} alt="Giới thiệu" className="w-full h-auto max-h-[400px] rounded-2xl shadow-lg object-cover" />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <h3 className="text-[26px] md:text-[28px] font-bold leading-snug" style={{ color: titleColor }}>
              {subtitle}
            </h3>
            {descriptions && descriptions.map((desc, idx) => (
              <p key={idx} className="text-gray-500 leading-relaxed text-[15px]">
                {desc.text}
              </p>
            ))}

            {/* Vision & Mission Box */}
            <style>{`
              .puck-content-wrapper * {
                display: inline !important;
                margin: 0 !important;
              }
            `}</style>
            <div className="bg-slate-50 border-l-[4px] border-orange-500 p-6 rounded-xl mt-4">
              {coreValues && coreValues.map((val, idx) => (
                <div key={idx} className={`text-gray-700 text-[15px] leading-relaxed inline-puck-fields block ${idx !== coreValues.length - 1 ? 'mb-4' : ''}`}>
                  <strong className="font-bold text-gray-800">{val.label}</strong>{" "}
                  <span className="puck-content-wrapper">{val.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-[0_4px_35px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center justify-center text-center">
                <h4 className="text-[32px] font-bold mb-3" style={{ color: titleColor }}>
                  {stat.number}
                </h4>
                <p className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- Component 2C: Hội Viên Chi Tiết (AdminHoiVienDetail) ---
export const AdminHoiVienDetail = ({
  title = "HỘI VIÊN",
  titleColor = "#0f5b94",
  imageUrl = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  subtitle = "Cộng đồng doanh nhân cùng phát triển",
  descriptions = [
    { text: "Hội viên là lực lượng nòng cốt tạo nên sự kết nối, chia sẻ và phát triển trong cộng đồng doanh nghiệp Đồng Tháp." },
    { text: "Việc tham gia hội viên mở ra cơ hội mở rộng mạng lưới, trao đổi kinh nghiệm, tiếp cận chương trình hỗ trợ và đồng hành trong các hoạt động xúc tiến thương mại." }
  ],
  benefitsTitle = "Quyền lợi hội viên",
  benefits = [
    { text: "Tham gia các chương trình kết nối doanh nghiệp" },
    { text: "Tiếp cận hoạt động đào tạo và hội thảo chuyên đề" },
    { text: "Nhận thông tin thị trường và cơ hội hợp tác" },
    { text: "Tham gia các hoạt động cộng đồng doanh nhân" },
    { text: "Đồng hành cùng các chương trình phát triển địa phương" }
  ],
  stats = [
    { number: "800+", label: "Hội viên" },
    { number: "120+", label: "Đối tác" },
    { number: "40+", label: "Sự kiện / năm" },
    { number: "12", label: "Nhóm kết nối" }
  ]
}) => {
  return (
    <section className="py-8 md:py-12 px-4 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-[32px] md:text-[36px] font-bold uppercase font-sans mb-4 tracking-tight" style={{ color: titleColor }}>
            {title}
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content: Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-16">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img src={imageUrl} alt="Hội viên" className="w-full h-auto max-h-[450px] rounded-2xl shadow-lg object-cover" />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <h3 className="text-[26px] md:text-[28px] font-bold leading-snug" style={{ color: titleColor }}>
              {subtitle}
            </h3>
            {descriptions && descriptions.map((desc, idx) => (
              <p key={idx} className="text-gray-500 leading-relaxed text-[15px]">
                {desc.text}
              </p>
            ))}

            {/* Benefits Box */}
            <div className="bg-slate-50 p-6 rounded-xl mt-4">
              <h4 className="font-bold text-[18px] mb-4" style={{ color: titleColor }}>{benefitsTitle}</h4>
              <ul className="flex flex-col">
                {benefits && benefits.map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-3 py-3 ${idx !== benefits.length - 1 ? 'border-b border-gray-200/60' : ''}`}>
                    <span className="text-orange-500 font-bold mt-0.5">✓</span>
                    <span className="text-gray-700 text-[15px]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-6 px-4 flex flex-col items-center justify-center text-center">
                <h4 className="text-[32px] md:text-[36px] font-bold mb-2" style={{ color: titleColor }}>
                  {stat.number}
                </h4>
                <p className="text-gray-500 text-[15px] font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- Component 3: Hội viên CLB (AdminHoiVien) ---
export const AdminHoiVien = ({
  title = "HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
  titleColor = "#0f4c81",
  background = {},
  partners = []
}) => {
  // Kiểm tra nếu đang là ảnh nền mặc định (hieuunghero.webp) mà user không muốn dùng chung nữa
  const isDefaultImage = background.type === 'image' && background.imageUrl && background.imageUrl.includes('hieuunghero.webp');

  const getSectionBg = () => {
    const bgStyle = {};
    if (background.type === 'color' && !isDefaultImage) {
      bgStyle.backgroundColor = background.color || '#a8dfff';
    } else if (background.type === 'image' && background.imageUrl && !isDefaultImage) {
      bgStyle.backgroundImage = `url(${background.imageUrl}), linear-gradient(0deg, #a8dfff 0%, #cdeeff 25%, #66aaff 60%, #3399ff 100%)`;
      bgStyle.backgroundBlendMode = 'screen';
      bgStyle.backgroundSize = 'cover';
      bgStyle.backgroundPosition = 'center';
      bgStyle.backgroundAttachment = 'fixed';
    } else if (background.type === 'gradient' && !isDefaultImage) {
      bgStyle.background = `linear-gradient(${background.gradientDirection || 'to bottom'}, ${background.gradientFrom || '#a8dfff'}, ${background.gradientTo || '#e8f4ff'})`;
    } else {
      // Force the new seamless gradient design
      // Top color #a8dfff syncs with Hero Banner bottom
      // Bottom color #e8f4ff syncs with Cơ Cấu Tổ Chức top
      bgStyle.background = 'linear-gradient(to bottom, #a8dfff 0%, #e8f4ff 100%)';
    }
    return bgStyle;
  };

  // Duplicate items for infinite scroll effect (Marquee)
  // To ensure seamless loop, duplicate it multiple times if the list is too short.
  let displayPartners = [];
  if (partners && partners.length > 0) {
    displayPartners = [...partners, ...partners, ...partners]; // 3 sets for safe infinite scrolling width
  }

  return (
    <section className="py-8 px-4 md:px-12 lg:px-24 overflow-hidden transition-all relative" style={{ ...getSectionBg(), isolation: 'isolate' }}>
      {/* Lớp phủ gradient ở đáy để hòa quyện hoàn toàn vào màu nền khối Cơ Cấu Tổ Chức (#e8f4ff) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#e8f4ff] pointer-events-none" style={{ zIndex: 0 }} />

      <div className="max-w-7xl mx-auto px-4 mb-6 text-center relative z-10">
        {title && (
          <h2 className="text-xl md:text-2xl font-bold tracking-wide uppercase font-sans" style={{ color: titleColor }}>
            {title}
          </h2>
        )}
      </div>

      <style>{`
        /* Dừng animation khi lia chuột vào thẻ (vượt rào Puck Editor) */
        .admin-hoi-vien-marquee:hover .animate-marquee,
        .admin-hoi-vien-marquee:has(.card-partner:hover) .animate-marquee {
          animation-play-state: paused !important;
        }
        /* Cưỡng chế thẻ trắng nhấc lên, tối ưu đồ họa để tránh chớp nháy (Flash Repaint) */
        .card-partner {
          pointer-events: auto !important;
          will-change: transform;
          transform: translateZ(0);
        }
        .card-partner:hover {
          transform: translateY(-8px) translateZ(0) !important;
          box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.15) !important;
          z-index: 50 !important;
        }
      `}</style>

      <div
        className="relative w-full overflow-hidden admin-hoi-vien-marquee pointer-events-auto"
        style={{
          zIndex: 99999,
          height: '140px',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        {/* Khối chứa chạy animation - dừng khi lia chuột bằng CSS thuần (hover:pause) */}
        <div
          className="flex gap-4 absolute top-0 left-0 h-full items-center px-4 w-max animate-marquee"
        >
          {displayPartners.map((partner, idx) => (
            <div
              key={idx}
              className="card-partner flex-shrink-0 w-[170px] h-[90px] bg-white rounded-2xl shadow-sm flex items-center justify-center p-3 transition-transform duration-300 cursor-pointer border border-sky-50 relative"
            >
              {partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={partner.name || "Partner Logo"}
                  className="max-w-full max-h-full object-contain mix-blend-multiply brightness-110 contrast-125"
                />
              ) : (
                <span className="text-sky-600/50 font-bold text-sm text-center px-2">{partner.name || "Logo Placeholder"}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component 4: Hanh Trinh Gia Tri (AdminHanhTrinh) ---
export const AdminHanhTrinh = ({
  title = "HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ",
  titleColor = "#1e3a5f",
  titleSize = "28px",
  background = {},
  items = []
}) => {
  const sectionRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Background — gradient đảo ngược so với Departments để nối liền mạch
  // Departments: #f0e0ff (tím) → #d4e0ff (xanh)
  // HanhTrinh:   #d4e0ff (xanh) → #f0e0ff (tím) — tiếp nối liền mạch
  const getSectionBg = () => {
    if (background.type === 'color') return { backgroundColor: background.color || '#d4e0ff' };
    if (background.type === 'gradient') {
      const from = background.gradientFrom || '#d4e0ff';
      const to = background.gradientTo || '#f0e0ff';
      const dir = background.gradientDirection || '180deg';
      return { background: `linear-gradient(${dir}, ${from}, ${to})` };
    }
    // Mặc định: nối tiếp từ đáy Departments (#d4e0ff) xuống (#f0e0ff)
    return { background: 'linear-gradient(180deg, #d4e0ff 0%, #dce8ff 50%, #f0e0ff 100%)' };
  };

  // URL ảnh hoa nền — lấy từ config hoặc mặc định
  const floralUrl = (background.type === 'image' && background.imageUrl)
    ? background.imageUrl
    : (backgroundImageUrl || 'https://webdemo.hexagon.xyz/medias/hoa.webp');

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-12 lg:px-24 transition-all relative overflow-hidden"
      style={getSectionBg()}
    >
      {/* Ảnh hoa — dùng img + screen blend để nền tối biến mất, chỉ giữ hoa trắng */}
      <img
        src={floralUrl}
        alt=""
        className="absolute pointer-events-none select-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '100%',
          objectFit: 'contain',
          mixBlendMode: 'screen',
          opacity: 0.5
        }}
      />

      {/* Decorative blurs — giống OrgStructure */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-200/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-200/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        {title && (
          <h2
            className="text-center uppercase font-sans"
            style={{
              color: titleColor || '#0b4c8c',
              fontSize: titleSize || '24px',
              fontWeight: 850,
              marginBottom: '70px',
              letterSpacing: '0.05em',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'
            }}
          >
            {title}
          </h2>
        )}

        {/* Stats Grid — 4 cột giống ảnh */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`
              }}
            >
              {/* Số liệu lớn */}
              <span
                className="font-extrabold leading-none mb-4 transition-transform duration-300 group-hover:-translate-y-2"
                style={{
                  fontSize: item.numberSize || '52px',
                  color: item.numberColor || '#1e3a5f',
                  fontFamily: "'Inter', 'Segoe UI', sans-serif"
                }}
              >
                {item.number || '0'}
              </span>

              {/* Mô tả */}
              <p
                className="text-sm font-semibold leading-relaxed font-sans max-w-[220px] transition-transform duration-300 group-hover:-translate-y-2"
                style={{ color: item.descColor || '#3a4a6b' }}
              >
                {item.description || 'Mô tả thống kê'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component 5: Tin Tức & Sự Kiện (AdminTinTucSuKien) ---
export const AdminTinTucSuKien = ({
  title = "TIN TỨC & SỰ KIỆN",
  titleColor = "#0f4c81",
  viewMoreText = "Xem thêm",
  viewMoreUrl = "#",
  background = {},
  topNews = [],
  bottomNews = []
}) => {
  const getSectionBg = () => {
    if (background.type === 'color') return { backgroundColor: background.color || '#f8f4ff' };
    if (background.type === 'gradient') {
      const from = background.gradientFrom || '#f0e0ff';
      const to = background.gradientTo || '#f8f4ff';
      const dir = background.gradientDirection || '180deg';
      return { background: `linear-gradient(${dir}, ${from}, ${to})` };
    }
    return { background: 'linear-gradient(180deg, #f0e0ff 0%, #f8f4ff 100%)' };
  };

  return (
    <section className="py-20 px-4 md:px-12 lg:px-24 transition-all relative overflow-hidden" style={getSectionBg()}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8 pb-4 border-b border-black/5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide uppercase font-sans" style={{ color: titleColor }}>
            {title}
          </h2>
          <a href={viewMoreUrl} className="text-base font-bold hover:underline flex items-center gap-1" style={{ color: titleColor }}>
            {viewMoreText} &rarr;
          </a>
        </div>

        {/* Top News */}
        {topNews && topNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {topNews.map((item, index) => (
              <a key={index} href={item.url || '#'} className="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-2">
                {/* Image Area */}
                <div className="relative h-[250px] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.isNew && (
                    <div className="absolute top-4 right-4 bg-[#ffcc00] text-[#0f4c81] text-xs font-extrabold px-4 py-2 rounded-full z-10 uppercase tracking-wide">
                      Mới nhất
                    </div>
                  )}
                </div>
                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-sm font-semibold text-slate-400 mb-3 block">{item.date}</span>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-snug" style={{ color: titleColor }}>{item.title}</h3>
                  <p className="text-slate-500 mb-6 flex-1 line-clamp-3 text-sm leading-relaxed">{item.description}</p>
                  <span className="text-sm font-bold flex items-center gap-1 mt-auto transition-colors" style={{ color: titleColor }}>
                    Xem thêm &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Bottom News */}
        {bottomNews && bottomNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bottomNews.map((item, index) => (
              <a key={index} href={item.url || '#'} className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-2">
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col relative bg-white">
                  <span className="text-xs font-semibold text-slate-400 mb-3 block">{item.date}</span>
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 leading-snug" style={{ color: titleColor }}>{item.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3 leading-relaxed">{item.description}</p>

                  {/* Arrow button */}
                  <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-[#f4faff] flex items-center justify-center text-[#0b4d75] transition-all duration-300 group-hover:bg-[#0b4d75] group-hover:text-white shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- Component 6: Tham Gia Cộng Đồng (AdminThamGiaCongDong) ---
export const AdminThamGiaCongDong = ({
  title = "GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG",
  titleColor = "#0f4c81",
  viewMoreText = "Xem thêm",
  viewMoreUrl = "#",
  background = {},
  cards = [
    {
      title: "Kết nối chất lượng",
      description: "Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.",
      iconUrl: "/icon_1.png"
    },
    {
      title: "Phát triển kiến thức",
      description: "Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.",
      iconUrl: "/icon_2.png"
    },
    {
      title: "Cơ hội hợp tác",
      description: "Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.",
      iconUrl: "/icon_3.png"
    }
  ],
  backgroundImageUrl = "/bg-giatri.png"
}) => {
  const getSectionBg = () => {
    // Sử dụng chính xác background của bản thiết kế gốc (bao gồm cả ảnh và 2 lớp gradient hòa trộn)
    // Bỏ qua các cài đặt màu nền cũ có thể che khuất ảnh.
    if (backgroundImageUrl) {
      return {
        background: `linear-gradient(180deg, rgba(242, 244, 255, 0.80) 0%, transparent 35%, rgba(240, 185, 252, 0.88) 100%), linear-gradient(to right, rgba(200, 245, 255, 0.95) 0%, rgba(216, 229, 255, 0.70) 50%, rgba(247, 201, 252, 0.20) 100%), url(${backgroundImageUrl}) right center / 85% auto no-repeat`
      };
    }
    return {
      background: 'linear-gradient(180deg, rgba(242, 244, 255, 0.80) 0%, transparent 35%, rgba(240, 185, 252, 0.88) 100%), linear-gradient(to right, rgba(200, 245, 255, 0.95) 0%, rgba(216, 229, 255, 0.70) 50%, rgba(247, 201, 252, 0.20) 100%)'
    };
  };

  return (
    <section className="pt-24 pb-8 px-4 md:px-12 lg:px-24 overflow-hidden relative" style={getSectionBg()}>
      {/* Lớp phủ gradient ở đỉnh để hòa quyện mượt mà vào khối Tin Tức (#f8f4ff) - Không có đường kẻ cứng */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#f8f4ff] to-transparent pointer-events-none" style={{ zIndex: 0 }} />



      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 px-4">
          {title && (
            <h2 className="text-xl md:text-2xl font-bold tracking-wide uppercase font-sans text-center md:text-left" style={{ color: titleColor }}>
              {title}
            </h2>
          )}
          {viewMoreText && (
            <a href={viewMoreUrl} className="text-base font-bold hover:text-blue-600 transition-colors flex items-center gap-1 mt-4 md:mt-0" style={{ color: titleColor }}>
              {viewMoreText} &rarr;
            </a>
          )}
        </div>

        {/* Cards Layout - Responsive flex on mobile, absolute positioning on md+ */}
        <div className="relative mx-auto md:mx-0 flex flex-col gap-6 md:block md:w-[490px] md:h-[630px] w-full max-w-sm md:max-w-full">
          {cards[0] && (
            <div
              className="group hover:-translate-y-2 transition-all duration-300 relative md:absolute md:top-[50px] md:left-0 w-full md:w-[225px] h-auto min-h-[280px] md:h-[300px] z-10 flex flex-col items-center justify-start text-center p-8 md:p-[30px_22px_26px]"
              style={{
                background: 'rgba(255, 255, 255, 0.50)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.82)',
                borderRadius: '70px 15px 70px 15px',
                boxShadow: '0 16px 40px rgba(12, 74, 115, 0.10)'
              }}
            >
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(255,255,255,0.8)] ring-4 ring-blue-50/50 flex-shrink-0">
                <img src={cards[0].iconUrl} alt={cards[0].title} className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-bold text-[16px] mb-2 leading-snug" style={{ color: titleColor }}>{cards[0].title}</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">{cards[0].description}</p>
            </div>
          )}

          {cards[1] && (
            <div
              className="group hover:-translate-y-2 transition-all duration-300 relative md:absolute md:top-[5px] md:left-[260px] w-full md:w-[225px] h-auto min-h-[280px] md:h-[300px] z-20 flex flex-col items-center justify-start text-center p-8 md:p-[30px_22px_26px]"
              style={{
                background: 'rgba(255, 255, 255, 0.50)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.82)',
                borderRadius: '70px 15px 70px 15px',
                boxShadow: '0 16px 40px rgba(12, 74, 115, 0.10)'
              }}
            >
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(255,255,255,0.8)] ring-4 ring-blue-50/50 flex-shrink-0">
                <img src={cards[1].iconUrl} alt={cards[1].title} className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-bold text-[16px] mb-2 leading-snug" style={{ color: titleColor }}>{cards[1].title}</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">{cards[1].description}</p>
            </div>
          )}

          {cards[2] && (
            <div
              className="group hover:-translate-y-2 transition-all duration-300 relative md:absolute md:top-[300px] md:left-[130px] w-full md:w-[225px] h-auto min-h-[280px] md:h-[300px] z-30 flex flex-col items-center justify-start text-center p-8 md:p-[30px_22px_26px]"
              style={{
                background: 'rgba(255, 255, 255, 0.50)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.82)',
                borderRadius: '70px 15px 70px 15px',
                boxShadow: '0 16px 40px rgba(12, 74, 115, 0.10)'
              }}
            >
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(255,255,255,0.8)] ring-4 ring-blue-50/50 flex-shrink-0">
                <img src={cards[2].iconUrl} alt={cards[2].title} className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-bold text-[16px] mb-2 leading-snug" style={{ color: titleColor }}>{cards[2].title}</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">{cards[2].description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// --- Component 7: Liên Hệ (AdminLienHe) ---
export const AdminLienHe = ({
  title = "QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM",
  email = "info@dte.hunghau.vn",
  phone = "1800 1568",
  buttonText = "Đăng ký hội viên",
  buttonUrl = "#",
  backgroundImageUrl = "/bg-lienhe.png"
}) => {
  return (
    <section
      style={{
        padding: '100px 0 160px',
        background: `linear-gradient(180deg, rgba(240, 185, 252, 0.95) 0%, rgba(236, 182, 250, 0.45) 22%, rgba(228, 178, 248, 0.20) 58%, rgba(232, 180, 248, 1.00) 100%), url(${backgroundImageUrl}) center center / cover no-repeat`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#0f4c81] mb-12 whitespace-pre-line uppercase font-sans tracking-wide leading-relaxed">
          {title}
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          {/* Email Badge */}
          <div className="bg-white/90 backdrop-blur-md rounded-full px-8 py-3 flex items-center gap-3 shadow-md w-full sm:w-auto min-w-[250px] justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white group">
            <span className="text-gray-400 text-xl transition-transform duration-300 group-hover:scale-110 group-hover:text-gray-600">✉</span>
            <span className="font-bold text-[#0f4c81] text-sm">
              {email}
            </span>
          </div>

          {/* Phone Badge */}
          <div className="bg-white/90 backdrop-blur-md rounded-full px-8 py-3 flex items-center gap-3 shadow-md w-full sm:w-auto min-w-[250px] justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white group">
            <span className="text-red-500 text-xl transition-transform duration-300 group-hover:scale-110 group-hover:text-red-600">📞</span>
            <span className="font-bold text-[#0f4c81] text-sm">
              {phone}
            </span>
          </div>
        </div>

        <a href={buttonUrl} className="inline-block bg-[#1a5b8c] text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(26,91,140,0.4)] hover:bg-[#114066] hover:scale-105 text-sm uppercase tracking-wider">
          {buttonText}
        </a>
      </div>
    </section>
  );
};

// --- Component 8: Footer (AdminFooter) ---
export const AdminFooter = ({
  logoUrl = "/logo_header.png",
  title = "CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP. HỒ CHÍ MINH",
  addressTitle = "TRỤ SỞ CHÍNH",
  address = "Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, Thành phố Hồ Chí Minh",
  email = "Email: info@dte.hunghau.vn",
  hotline = "Hotline: 1800 1568",
  linksTitle1 = "Liên kết trang",
  linksColumn1 = [
    { label: "Trang chủ", url: "#" },
    { label: "Tin tức và sự kiện", url: "#" },
    { label: "Về chúng tôi", url: "#" },
    { label: "Các lĩnh vực hoạt động", url: "#" },
    { label: "Doanh nghiệp hội viên", url: "#" },
    { label: "Đăng ký", url: "#" },
    { label: "Hoạt động Ban", url: "#" }
  ],
  linksTitle2 = "Khác",
  linksColumn2 = [
    { label: "MYH", url: "#" },
    { label: "MYC", url: "#" },
    { label: "HHF", url: "#" },
    { label: "HHE", url: "#" },
    { label: "HHA", url: "#" },
    { label: "COWE", url: "#" },
    { label: "HHN", url: "#" },
    { label: "HYV", url: "#" }
  ],
  copyright = "Copyright © CLB Doanh nhan Dong Thap. All rights reserved",
  socialLinks = [
    { iconUrl: "/facebook.svg", url: "#" },
    { iconUrl: "/tiktok.png", url: "#" },
    { iconUrl: "/youtube.png", url: "#" },
    { iconUrl: "/linkedin.svg", url: "#" }
  ],
  bgImage = "/hieuungfooter.webp"
}) => {
  return (
    <footer
      style={{
        background: 'linear-gradient(rgb(232, 180, 248) 0%, rgb(201, 184, 245) 25%, rgb(139, 158, 240) 60%, rgb(106, 123, 232) 100%)',
        color: 'rgb(26, 35, 126)',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="pt-20 pb-6 text-sm font-sans"
    >

      <style>{`
        .social-link-container {
          cursor: pointer !important;
          display: inline-block !important;
          pointer-events: auto !important;
        }
        .social-icon-element {
          transition: transform 0.3s ease !important;
          will-change: transform;
          pointer-events: none !important;
        }
        .social-link-container:hover .social-icon-element {
          transform: translateY(-4px) scale(1.05) !important;
        }
      `}</style>
      {/* Background Effect */}
      <img
        src="/vector-footer-1.png"
        alt="vector footer 1"
        className="absolute left-0 top-0 w-[42%] md:w-[35%] h-auto object-contain object-left-top pointer-events-none opacity-80"
      />
      <img
        src="/vector-footer-2.png"
        alt="vector footer 2"
        className="absolute right-0 bottom-8 w-[75%] md:w-[65%] h-auto object-contain object-right-bottom pointer-events-none opacity-80"
        style={{
          filter: 'brightness(0) invert(1)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)'
        }}
      />
      {bgImage && (
        <img
          src={bgImage}
          alt="footer background"
          className="absolute bottom-2 right-0 w-[43%] h-[81%] object-contain object-right-bottom opacity-100 pointer-events-none mix-blend-screen"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Left Column */}
          <div className="md:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <img src={logoUrl} alt="Logo" className="w-[72px] h-[72px] object-contain flex-shrink-0" />
              <h2 className="text-[#1a237e] font-bold whitespace-pre-line text-[13px] leading-[1.4] tracking-wide text-center">
                {title}
              </h2>
            </div>

            <div className="mt-4">
              <h3 className="text-[#1a237e] font-bold mb-4 uppercase tracking-wider text-[14px]">{addressTitle}</h3>
              <div className="space-y-4 font-normal opacity-90 text-[13px]">
                <p className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-[28px] h-[28px] flex items-center justify-center bg-white rounded-full shadow-sm"><img src="/map.svg" alt="Address" className="w-[24px] h-[24px]" /></span>
                  <span className="leading-relaxed">{address}</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-[28px] h-[28px] flex items-center justify-center bg-white rounded-full shadow-sm"><img src="/mail.svg" alt="Email" className="w-[24px] h-[24px]" /></span>
                  <span>{email}</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-[28px] h-[28px] flex items-center justify-center bg-white rounded-full shadow-sm"><img src="/phone.svg" alt="Phone" className="w-[24px] h-[24px]" /></span>
                  <span>{hotline}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="md:col-span-3">
            <h3 className="font-bold mb-6 text-[14px]">{linksTitle1}</h3>
            <ul className="space-y-4 font-medium opacity-90 text-[13px]">
              {linksColumn1.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} className="inline-block hover:text-pink-500 hover:translate-x-2 transition-all duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3">
            <h3 className="font-bold mb-6 text-[14px]">{linksTitle2}</h3>
            <ul className="space-y-4 font-medium opacity-90 text-[13px]">
              {linksColumn2.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} className="inline-block hover:text-pink-500 hover:translate-x-2 transition-all duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white">
          <p className="opacity-90">{copyright}</p>
          <div className="flex gap-4 relative z-50 pointer-events-auto">
            {socialLinks.map((social, idx) => (
              <div key={idx} className="social-link-container w-6 h-6">
                <a
                  href={social.url}
                  className="block w-full h-full"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={social.iconUrl} alt="Social" className="social-icon-element w-full h-full object-contain" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminSection;
