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

// --- Component 1: Các Ban Chuyên Môn (AdminDepartments) ---
export const AdminDepartments = ({
  title = "CÁC BAN CHUYÊN MÔN",
  subtitle = "CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
  titleColor = "#2b569a",
  subtitleColor = "#2b569a",
  background = {},
  items = []
}) => {

  const getSectionBg = () => {
    if (background.type === 'color') return { backgroundColor: background.color || '#efe6fc' };
    if (background.type === 'gradient') {
      return { background: `linear-gradient(${background.gradientDirection || '135deg'}, ${background.gradientFrom || '#efe6fc'}, ${background.gradientTo || '#e3f2fd'})` };
    }
    return { background: 'linear-gradient(135deg, #efe6fc 0%, #e3f2fd 100%)' }; // Default matching mockup background
  };

  return (
    <section className="py-20 px-4 transition-all" style={getSectionBg()}>
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
              const isGiaoThuong = item.iconUrl.toLowerCase().includes('giaothuong');
              const isKhoiNghiep = item.iconUrl.toLowerCase().includes('khoinghiep');
              const isXaHoi = item.iconUrl.toLowerCase().includes('xahoi');
              const isVanHoa = item.iconUrl.toLowerCase().includes('vanhoa');
              let sizeClasses = "w-24 h-24";
              if (isGiaoThuong) {
                sizeClasses = "w-48 h-[120px]";
              } else if (isKhoiNghiep) {
                sizeClasses = "w-32 h-32";
              } else if (isXaHoi) {
                sizeClasses = "w-32 h-32";
              } else if (isVanHoa) {
                sizeClasses = "w-20 h-20";
              }

              // Tự động chạy ngầm bộ lọc loại bỏ nền tối và đẩy nét vẽ thành trắng tinh cho tất cả các định dạng hình ảnh (PNG, JPG, SVG, ...)
              iconElement = (
                <img
                  src={item.iconUrl}
                  alt={item.title}
                  className={`${sizeClasses} object-contain ${isXaHoi ? 'mb-[-16px]' : 'mb-0'} mix-blend-screen transform transition-transform hover:scale-110 duration-200`}
                  style={{
                    filter: 'grayscale(100%) brightness(70%) contrast(1000%)',
                    mixBlendMode: 'screen'
                  }}
                />
              );
            }

            return (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-22px)] max-w-[380px] h-[280px] flex flex-col justify-center items-center p-8 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{
                  borderRadius: item.cardRadius || '80px 1px 80px 1px',
                  background: 'linear-gradient(135deg, #2fa5f8 0%, #157fdc 50%, #0b3a75 100%)',
                  boxShadow: '0 10px 25px -5px rgba(21, 127, 220, 0.4)'
                }}
              >
                {/* Icon Area */}
                <div className="mb-2 -mt-8">
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
                    className="inline-flex items-center text-sm tracking-wider font-semibold border border-white/50 bg-white/15 hover:bg-white/25 active:bg-white/35 text-white px-5 py-2 transition-all duration-200"
                    style={{ borderRadius: item.btnRadius || '30px' }}
                  >
                    {item.btnText} &rarr;
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
const OrgStructureColumn = ({ column }) => {
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

  if (bgConfig.type === 'color' && bgConfig.color) {
    cardStyle.backgroundColor = bgConfig.color;
  } else if (bgConfig.type === 'image' && bgConfig.imageUrl) {
    cardStyle.backgroundImage = `url('${bgConfig.imageUrl}')`;
    cardStyle.backgroundSize = 'contain';
    cardStyle.backgroundPosition = 'bottom left';
    cardStyle.backgroundRepeat = 'no-repeat';
    cardStyle.backgroundColor = bgConfig.color || '#ffffff';
  } else if (isTextType) {
    cardStyle.backgroundColor = '#ffffff';
  }

  const cardClass = isTextType
    ? "rounded-2xl p-8 border border-slate-100/80 shadow-xl flex flex-col justify-between min-h-[500px] relative overflow-hidden transition-all duration-300"
    : "bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-100/80 shadow-xl flex flex-col justify-between min-h-[500px] relative overflow-hidden transition-all duration-300 hover:shadow-2xl";

  return (
    <div className={cardClass} style={cardStyle}>
      <div>
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
          <div className="relative overflow-hidden w-full">
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
                        className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-slate-100/50 hover:border-slate-100 transition-all duration-200 shadow-sm"
                      >
                        {/* Circular Avatar */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={member.avatarUrl || 'https://via.placeholder.com/80'}
                            alt={member.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-sky-400 p-0.5"
                          />
                        </div>

                        {/* Info */}
                        <div className="font-sans text-xs md:text-sm text-gray-700 leading-tight space-y-0.5">
                          <div><span className="font-bold text-slate-800">Họ tên:</span> <span className="font-medium text-slate-700">{member.name}</span></div>
                          <div><span className="font-bold text-slate-800">Chức vụ CLB:</span> <span className="font-medium text-slate-700">{member.clbRole}</span></div>
                          <div><span className="font-bold text-slate-800">Chức vụ Doanh nghiệp:</span> <span className="font-medium text-slate-700">{member.bizRole}</span></div>
                          <div><span className="font-bold text-slate-800">Doanh nghiệp:</span> <span className="font-medium text-slate-700">{member.bizName}</span></div>
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

// --- Component 2: Về Câu Lạc Bộ & Cơ Cấu Tổ Chức (AdminOrgStructure) ---
export const AdminOrgStructure = ({
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
      bgStyle.backgroundImage = `url(${background.imageUrl})`;
      bgStyle.backgroundSize = 'cover';
      bgStyle.backgroundPosition = 'center';
    } else if (background.type === 'gradient') {
      bgStyle.background = `linear-gradient(${background.gradientDirection || '135deg'}, ${background.gradientFrom || '#efe6fc'}, ${background.gradientTo || '#e3f2fd'})`;
    } else {
      bgStyle.backgroundImage = `radial-gradient(circle at 80% 20%, rgba(233, 213, 255, 0.45) 0%, rgba(243, 244, 246, 0.95) 70%, rgba(243, 244, 246, 1) 100%)`;
    }
    return bgStyle;
  };

  return (
    <section
      className="py-20 px-4 transition-all relative overflow-hidden bg-cover bg-center"
      style={getSectionBg()}
    >
      {/* Decorative Lotus Petals Overlay */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-200/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-200/20 rounded-full blur-[80px] pointer-events-none" />

      <div className={`mx-auto grid gap-8 items-stretch relative z-10 ${getGridClass(displayColumns.length)}`}>
        {displayColumns.map((col, idx) => (
          <OrgStructureColumn key={idx} column={col} />
        ))}
      </div>
    </section>
  );
};

export default AdminSection;
