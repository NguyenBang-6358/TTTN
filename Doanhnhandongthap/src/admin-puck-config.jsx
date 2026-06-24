import React from 'react';
import { FieldLabel } from '@measured/puck';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection, { AdminGioiThieu, AdminCacBanChuyenMon, AdminCoCauToChuc, AdminHoiVien, AdminHoiVienDetail, AdminHanhTrinh, AdminTinTucSuKien, AdminThamGiaCongDong, AdminLienHe, AdminFooter } from './components/admin-section';
import AdminHero, { AdminHeader } from './components/admin-hero';

// Component input thông minh tự động thêm px khi gõ số và enter/blur
const PxInput = ({ label, value, onChange }) => {
  const [localVal, setLocalVal] = React.useState(value || "");
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    setLocalVal(value || "");
  }, [value]);

  const handleBlurOrEnter = (val) => {
    const trimmed = String(val).trim();
    if (trimmed && !isNaN(trimmed) && trimmed !== "") {
      const formatted = `${trimmed}px`;
      setLocalVal(formatted);
      onChange(formatted);
    } else {
      onChange(trimmed);
    }
  };

  return (
    <FieldLabel label={label}>
      <input
        type="text"
        value={localVal}
        onChange={(e) => setLocalVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleBlurOrEnter(e.target.value);
            e.target.blur();
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          handleBlurOrEnter(e.target.value);
        }}
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: isFocused ? '1px solid #3b82f6' : '1px solid #cbd5e1',
          boxShadow: isFocused ? '0 0 0 1px #3b82f6' : 'none',
          fontSize: '14px',
          width: '100%',
          boxSizing: 'border-box',
          outline: 'none',
          color: '#0f172a',
          backgroundColor: '#ffffff',
          transition: 'border-color 0.2s, box-shadow 0.2s'
        }}
      />
    </FieldLabel>
  );
};

//Config — đăng ký 5 components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        level: {
          type: 'select', label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 }
          ]
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' },
            { label: 'Đều', value: 'justify' }
          ]
        }
      },
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Ảnh',
      fields: {
        src: { type: 'text', label: 'URL ảnh' },
        alt: { type: 'text', label: 'Alt text' },
        width: { type: 'text', label: 'Chiều rộng', default: '100%' },
        height: { type: 'text', label: 'Chiều cao', default: 'auto' },
        borderRadius: { type: 'text', label: 'Bo góc', default: '0' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            fromColor: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            toColor: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            direction: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            bg_image: { type: 'text', label: 'URL ảnh nền' },
            opacity: { type: 'number', label: 'Độ mờ', min: 0, max: 1, step: 0.1, default: 1 }
          }
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' } // Cho phép nested components
      },
      defaultProps: {
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },
    Header: {
      label: 'Header / Navbar',
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        title: { type: 'text', label: 'Tên CLB', contentEditable: true },
        menu1: { type: 'text', label: 'Menu 1', contentEditable: true },
        url1: { type: 'text', label: 'Link 1' },
        menu2: { type: 'text', label: 'Menu 2', contentEditable: true },
        url2: { type: 'text', label: 'Link 2' },
        menu3: { type: 'text', label: 'Menu 3', contentEditable: true },
        url3: { type: 'text', label: 'Link 3' },
        menu4: { type: 'text', label: 'Menu 4', contentEditable: true },
        url4: { type: 'text', label: 'Link 4' },
        menu5: { type: 'text', label: 'Menu 5', contentEditable: true },
        url5: { type: 'text', label: 'Link 5' },
        menu6: { type: 'text', label: 'Menu 6', contentEditable: true },
        url6: { type: 'text', label: 'Link 6' },
        background: {
          type: 'object',
          label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại nền',
              options: [
                { label: 'Ảnh (Mặc định)', value: 'image' },
                { label: 'Màu sắc', value: 'color' },
                { label: 'Gradient', value: 'gradient' }
              ]
            },
            imageUrl: { type: 'text', label: 'URL Ảnh' },
            color: { type: 'text', label: 'Màu nền' },
            gradientFrom: { type: 'text', label: 'Gradient từ' },
            gradientTo: { type: 'text', label: 'Gradient đến' },
            gradientDirection: { type: 'text', label: 'Hướng gradient' }
          }
        }
      },
      defaultProps: {
        logoUrl: '/logo_header.png',
        title: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        menu1: 'Trang chủ', url1: '#',
        menu2: 'Giới thiệu', url2: '#',
        menu3: 'Hội viên', url3: '#',
        menu4: 'Hoạt động Ban', url4: '#',
        menu5: 'Tin tức & Sự kiện', url5: '#',
        menu6: 'Liên hệ', url6: '#',
        background: { type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/hieuunghero.webp' }
      },
      render: (props) => <AdminHeader {...props} />
    },
    Hero: {
      label: 'Hero Banner',
      fields: {
        topText: { type: 'text', label: 'Chữ trên cùng', contentEditable: true },
        topTextColor: { type: 'text', label: 'Màu chữ trên cùng' },
        topTextSize: {
          type: 'custom',
          render: ({ onChange, value }) => (
            <PxInput label="Cỡ chữ trên cùng" value={value} onChange={onChange} />
          )
        },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề' },
        titleSize: {
          type: 'custom',
          render: ({ onChange, value }) => (
            <PxInput label="Cỡ chữ tiêu đề" value={value} onChange={onChange} />
          )
        },
        subtitle: { type: 'textarea', label: 'Mô tả', contentEditable: true },
        subtitleColor: { type: 'text', label: 'Màu chữ mô tả' },
        subtitleSize: {
          type: 'custom',
          render: ({ onChange, value }) => (
            <PxInput label="Cỡ chữ mô tả" value={value} onChange={onChange} />
          )
        },
        boxRadius: {
          type: 'custom',
          render: ({ onChange, value }) => (
            <PxInput label="Bo góc cụm nội dung" value={value} onChange={onChange} />
          )
        },
        buttons: {
          type: 'array',
          label: 'Danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            style: {
              type: 'select',
              label: 'Style mặc định',
              options: [
                { label: 'Primary (Xanh)', value: 'primary' },
                { label: 'Outline (Viền trắng)', value: 'outline' },
                { label: 'Secondary (Xám)', value: 'secondary' }
              ]
            },
            btnColor: { type: 'text', label: 'Màu nền nút tự chọn (Ví dụ: #0088cc)' },
            btnRadius: {
              type: 'custom',
              render: ({ onChange, value }) => (
                <PxInput label="Bo góc nút tự chọn" value={value} onChange={onChange} />
              )
            },
            btnTextColor: { type: 'text', label: 'Màu chữ nút tự chọn' },
            btnTextSize: {
              type: 'custom',
              render: ({ onChange, value }) => (
                <PxInput label="Cỡ chữ nút" value={value} onChange={onChange} />
              )
            },
            btnAlign: {
              type: 'select',
              label: 'Căn lề danh sách nút',
              options: [
                { label: 'Trái', value: 'justify-start' },
                { label: 'Giữa', value: 'justify-center' },
                { label: 'Phải', value: 'justify-end' }
              ]
            }
          },
          getItemSummary: (item) => item.text
        },
        background: {
          type: 'object',
          label: 'Background',
          objectFields: {
            type: {
              type: 'select',
              label: 'Loại nền',
              options: [
                { label: 'Màu sắc', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Hình ảnh / GIF', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền (Ví dụ: #ffffff hoặc red)', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#a6e1ff' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#e3f7ff' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL hình ảnh nền (hỗ trợ .png, .jpg, .gif, ...)' }
          }
        },
        layout: {
          type: 'object',
          label: 'Bố cục',
          objectFields: {
            align: {
              type: 'select',
              label: 'Vị trí cụm nội dung',
              options: [
                { label: 'Bên trái', value: 'left' },
                { label: 'Nằm giữa', value: 'center' },
                { label: 'Bên phải', value: 'right' }
              ]
            }
          }
        }
      },
      defaultProps: {
        topText: 'LAN TỎA GIÁ TRỊ ĐẤT',
        topTextColor: '#ffffff',
        topTextSize: '12px',
        title: 'Sen Hồng',
        titleColor: '#ffe082',
        titleSize: '85px',
        subtitle: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sứ mệnh nghĩa tình quê hương.',
        subtitleColor: '#ffffff',
        subtitleSize: '18px',
        boxRadius: '20px 120px 20px 60px',
        buttons: [
          { text: 'Tham gia cộng đồng', url: '#', style: 'primary', btnColor: '#0088ff', btnRadius: '30px', btnAlign: 'justify-center', btnTextColor: '#ffffff', btnTextSize: '14px' }
        ],
        background: {
          type: 'image',
          imageUrl: 'https://webdemo.hexagon.xyz/medias/hieuunghero.webp'
        },
        layout: { align: 'left' }
      },
      render: (props) => <AdminHero {...props} />
    },

    CacBanChuyenMon: {
      label: 'Các Ban Chuyên Môn',
      fields: {
        title: { type: 'text', label: 'Tiêu đề lớn', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu tiêu đề lớn' },
        subtitle: { type: 'text', label: 'Tiêu đề phụ', contentEditable: true },
        subtitleColor: { type: 'text', label: 'Màu tiêu đề phụ' },
        background: {
          type: 'object',
          label: 'Background',
          objectFields: {
            type: {
              type: 'select',
              label: 'Loại nền',
              options: [
                { label: 'Màu sắc', value: 'color' },
                { label: 'Gradient', value: 'gradient' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#f0f9ff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#f0f4f8' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#d9e2ec' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: 'to bottom' }
          }
        },
        items: {
          type: 'array',
          label: 'Danh sách các ban',
          arrayFields: {
            title: { type: 'text', label: 'Tên Ban', contentEditable: true },
            iconUrl: { type: 'text', label: 'Đường dẫn Icon (hỗ trợ .png, .jpg, .svg, ...)' },
            cardRadius: {
              type: 'custom',
              render: ({ onChange, value }) => (
                <PxInput label="Bo góc Card" value={value} onChange={onChange} />
              )
            },
            btnText: { type: 'text', label: 'Text nút', contentEditable: true },
            btnUrl: { type: 'text', label: 'Link nút' },
            btnRadius: {
              type: 'custom',
              render: ({ onChange, value }) => (
                <PxInput label="Bo góc nút" value={value} onChange={onChange} />
              )
            }
          },
          defaultItemProps: {
            title: 'Tên Ban Mới',
            iconUrl: 'https://via.placeholder.com/100',
            cardRadius: '80px 1px 80px 1px',
            btnText: 'Xem hoạt động',
            btnUrl: '#',
            btnRadius: '30px'
          },
          getItemSummary: (item) => item.title || "Ban chuyên môn"
        }
      },
      defaultProps: {
        title: 'CÁC BAN CHUYÊN MÔN',
        titleColor: '#2b569a',
        subtitle: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        subtitleColor: '#2b569a',
        background: { type: 'gradient', gradientFrom: '#f0e0ff', gradientTo: '#d4e0ff', gradientDirection: '180deg' },
        items: [
          { title: 'Ban Kinh tế - Đầu tư', iconUrl: '/icon_kinhte.png', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' },
          { title: 'Ban Văn hóa - Thể thao', iconUrl: '/icon_xahoi.png', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' },
          { title: 'Ban Xã hội - Cộng đồng', iconUrl: '/icon_vanhoa.png', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' },
          { title: 'Ban Khởi nghiệp', iconUrl: '/icon_khoinghiep.png', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' },
          { title: 'Ban Giao thương quốc tế', iconUrl: '/icon_giaothuong.png', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' }
        ]
      },
      render: (props) => <AdminCacBanChuyenMon {...props} />
    },

    CoCauToChuc: {
      label: 'Cơ Cấu Tổ Chức',
      fields: {
        background: {
          type: 'object',
          label: 'Background',
          objectFields: {
            type: {
              type: 'select',
              label: 'Loại nền',
              options: [
                { label: 'Màu sắc', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Hình ảnh / GIF', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền (Ví dụ: #ffffff hoặc red)', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#efe6fc' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#e3f2fd' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: '135deg' },
            imageUrl: { type: 'text', label: 'URL hình ảnh nền (hỗ trợ .png, .jpg, .gif, ...)' }
          }
        },
        columns: {
          type: 'array',
          label: 'Danh sách các cột',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề cột', contentEditable: true },
            type: {
              type: 'select',
              label: 'Loại cột',
              options: [
                { label: 'Chỉ chứa văn bản', value: 'text' },
                { label: 'Chỉ chứa danh sách nhân sự', value: 'members' },
                { label: 'Hỗn hợp (Văn bản + Nhân sự)', value: 'mixed' }
              ]
            },
            background: {
              type: 'object',
              label: 'Background Cột',
              objectFields: {
                type: {
                  type: 'select',
                  label: 'Loại nền',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Hình ảnh', value: 'image' }
                  ],
                  default: 'color'
                },
                color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
                imageUrl: { type: 'text', label: 'URL hình ảnh nền' }
              }
            },
            content: { type: 'textarea', label: 'Nội dung văn bản (Nếu có)', contentEditable: true },
            members: {
              type: 'array',
              label: 'Danh sách nhân sự',
              arrayFields: {
                name: { type: 'text', label: 'Họ tên', contentEditable: true },
                clbRole: { type: 'text', label: 'Chức vụ CLB', contentEditable: true },
                bizRole: { type: 'text', label: 'Chức vụ DN', contentEditable: true },
                bizName: { type: 'text', label: 'Doanh nghiệp', contentEditable: true },
                avatarUrl: { type: 'text', label: 'URL ảnh đại diện' }
              },
              defaultItemProps: {
                name: 'Họ tên nhân sự',
                clbRole: 'Chức vụ CLB',
                bizRole: 'Chức vụ DN',
                bizName: 'Tên doanh nghiệp',
                avatarUrl: '/avatar-1.png'
              },
              getItemSummary: (item) => item.name || "Nhân sự"
            }
          },
          defaultItemProps: {
            title: 'Tiêu đề cột mới',
            type: 'members',
            background: { type: 'color', color: '#ffffff' },
            content: 'Nội dung văn bản cột...',
            members: []
          },
          getItemSummary: (item) => item.title || "Cột nội dung"
        }
      },
      defaultProps: {
        background: {
          type: 'image',
          imageUrl: 'https://webdemo.hexagon.xyz/medias/hoavanvct.png'
        },
        columns: [
          {
            title: 'VỀ CÂU LẠC BỘ',
            type: 'text',
            background: { type: 'color', color: '#ffffff', imageUrl: '' },
            content: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối - đồng hành - sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.'
          },
          {
            title: 'CƠ CẤU TỔ CHỨC',
            type: 'members',
            background: { type: 'color', color: '#ffffff' },
            members: [
              { name: 'Trần Văn Khang', clbRole: 'Ủy viên BCH', bizRole: 'Tổng Giám đốc', bizName: 'Công ty CP Logistics Đồng Tháp', avatarUrl: '/avatar-1.png' },
              { name: 'Đỗ Thu Trang', clbRole: 'Thủ quỹ CLB', bizRole: 'Giám đốc Tài chính', bizName: 'Công ty TNHH Sen Việt', avatarUrl: '/avatar-2.png' },
              { name: 'Vũ Hoàng Long', clbRole: 'Ủy viên BCH', bizRole: 'Giám đốc Điều hành', bizName: 'Công ty Công nghệ số Mekong', avatarUrl: '/avatar-3.png' }
            ]
          }
        ]
      },
      render: (props) => <AdminCoCauToChuc {...props} />
    },

    HoiVien: {
      label: 'Hội Viên CLB',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu tiêu đề' },
        background: {
          type: 'object',
          label: 'Background',
          objectFields: {
            type: {
              type: 'select',
              label: 'Loại nền',
              options: [
                { label: 'Màu sắc', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Hình ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#a6e1ff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#a6e1ff' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#e3f7ff' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: 'to bottom' },
            imageUrl: { type: 'text', label: 'URL hình ảnh nền (Ví dụ: /sen_hong.jpg)' }
          }
        },
        partners: {
          type: 'array',
          label: 'Danh sách đối tác/hội viên',
          arrayFields: {
            name: { type: 'text', label: 'Tên hội viên', contentEditable: true },
            logoUrl: { type: 'text', label: 'URL Logo (Ảnh)' }
          },
          defaultItemProps: {
            name: 'Tên hội viên mới',
            logoUrl: ''
          },
          getItemSummary: (item) => item.name || "Hội viên"
        }
      },
      defaultProps: {
        title: 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        titleColor: '#0f4c81',
        background: { type: 'gradient', gradientFrom: '#a8dfff', gradientTo: '#e8f4ff', gradientDirection: 'to bottom' },
        partners: [
          { name: 'COMOON', logoUrl: '/comoon.jpg' },
          { name: 'Khối B', logoUrl: '/Logo Khoi B.png' },
          { name: 'Khối C', logoUrl: '/Logo Khoi C.png' },
          { name: 'Khối D', logoUrl: '/Logo Khoi D.png' },
          { name: 'Khối E', logoUrl: '/Logo Khoi E.png' },
          { name: 'Khối F', logoUrl: '/Logo Khoi F.png' },
          { name: 'Happy Food', logoUrl: '/Happy Food.png' },
          { name: 'Eco Book', logoUrl: '/ecobook.jpg' }
        ]
      },
      render: (props) => <AdminHoiVien {...props} />
    },

    HoiVienDetail: {
      label: 'Hội Viên (Chi Tiết)',
      fields: {
        title: { type: 'text', label: 'Tiêu đề chính', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu tiêu đề' },
        subtitle: { type: 'text', label: 'Tiêu đề phụ', contentEditable: true },
        imageUrl: { type: 'text', label: 'URL Ảnh' },
        descriptions: {
          type: 'array',
          label: 'Các đoạn mô tả',
          arrayFields: {
            text: { type: 'textarea', label: 'Nội dung đoạn mô tả', contentEditable: true }
          },
          defaultItemProps: { text: 'Nội dung mô tả mới...' },
          getItemSummary: (item) => item.text ? item.text.toString().substring(0, 30) + '...' : 'Đoạn mô tả'
        },
        benefitsTitle: { type: 'text', label: 'Tiêu đề hộp Quyền lợi', contentEditable: true },
        benefits: {
          type: 'array',
          label: 'Quyền lợi hội viên',
          arrayFields: {
            text: { type: 'text', label: 'Nội dung quyền lợi', contentEditable: true }
          },
          defaultItemProps: { text: 'Quyền lợi mới...' },
          getItemSummary: (item) => item.text ? item.text.toString() : 'Quyền lợi'
        },
        stats: {
          type: 'array',
          label: 'Các thông số thống kê',
          arrayFields: {
            number: { type: 'text', label: 'Chỉ số (vd: 500+)', contentEditable: true },
            label: { type: 'text', label: 'Mô tả chỉ số', contentEditable: true }
          },
          defaultItemProps: {
            number: '100+', label: 'Mô tả thống kê'
          },
          getItemSummary: (item) => item.label ? item.label.toString() : 'Thống kê'
        }
      },
      defaultProps: {
        title: "HỘI VIÊN",
        titleColor: "#0f5b94",
        subtitle: "Cộng đồng doanh nhân cùng phát triển",
        imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        descriptions: [
          { text: "Hội viên là lực lượng nòng cốt tạo nên sự kết nối, chia sẻ và phát triển trong cộng đồng doanh nghiệp Đồng Tháp." },
          { text: "Việc tham gia hội viên mở ra cơ hội mở rộng mạng lưới, trao đổi kinh nghiệm, tiếp cận chương trình hỗ trợ và đồng hành trong các hoạt động xúc tiến thương mại." }
        ],
        benefitsTitle: "Quyền lợi hội viên",
        benefits: [
          { text: "Tham gia các chương trình kết nối doanh nghiệp" },
          { text: "Tiếp cận hoạt động đào tạo và hội thảo chuyên đề" },
          { text: "Nhận thông tin thị trường và cơ hội hợp tác" },
          { text: "Tham gia các hoạt động cộng đồng doanh nhân" },
          { text: "Đồng hành cùng các chương trình phát triển địa phương" }
        ],
        stats: [
          { number: "800+", label: "Hội viên" },
          { number: "120+", label: "Đối tác" },
          { number: "40+", label: "Sự kiện / năm" },
          { number: "12", label: "Nhóm kết nối" }
        ]
      },
      render: (props) => <AdminHoiVienDetail {...props} />
    },

    GioiThieu: {
      label: 'Giới Thiệu',
      fields: {
        title: { type: 'text', label: 'Tiêu đề chính', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu tiêu đề' },
        subtitle: { type: 'text', label: 'Tiêu đề phụ', contentEditable: true },
        imageUrl: { type: 'text', label: 'URL Ảnh' },
        descriptions: {
          type: 'array',
          label: 'Các đoạn mô tả',
          arrayFields: {
            text: { type: 'textarea', label: 'Nội dung đoạn mô tả', contentEditable: true }
          },
          defaultItemProps: { text: 'Nội dung mô tả mới...' },
          getItemSummary: (item) => item.text ? item.text.toString().substring(0, 30) + '...' : 'Đoạn mô tả'
        },
        coreValues: {
          type: 'array',
          label: 'Các giá trị cốt lõi (Tầm nhìn, Sứ mệnh...)',
          arrayFields: {
            label: { type: 'text', label: 'Nhãn (vd: Tầm nhìn:)', contentEditable: true },
            content: { type: 'textarea', label: 'Nội dung', contentEditable: true }
          },
          defaultItemProps: { label: 'Giá trị mới:', content: 'Nội dung...' },
          getItemSummary: (item) => item.label ? item.label.toString() : 'Giá trị cốt lõi'
        },
        stats: {
          type: 'array',
          label: 'Các thông số thống kê',
          arrayFields: {
            number: { type: 'text', label: 'Chỉ số (vd: 500+)', contentEditable: true },
            label: { type: 'text', label: 'Mô tả chỉ số', contentEditable: true }
          },
          defaultItemProps: {
            number: '100+', label: 'Mô tả thống kê'
          },
          getItemSummary: (item) => item.label || 'Thống kê'
        }
      },
      defaultProps: {
        title: "GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP",
        titleColor: "#0f5b94",
        subtitle: "Kết nối – Đồng hành – Phát triển",
        imageUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
        descriptions: [
          { text: "Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương." },
          { text: "Với tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh." }
        ],
        coreValues: [
          { label: "Tầm nhìn:", content: "Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập." },
          { label: "Sứ mệnh:", content: "Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững." }
        ],
        stats: [
          { number: "500+", label: "Doanh nghiệp tham gia" },
          { number: "50+", label: "Sự kiện kết nối mỗi năm" },
          { number: "100%", label: "Hướng đến phát triển bền vững" }
        ]
      },
      render: (props) => <AdminGioiThieu {...props} />
    },

    HanhTrinh: {
      label: 'Hành Trình Kiến Tạo',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu tiêu đề' },
        titleSize: {
          type: 'custom',
          render: ({ onChange, value }) => (
            <PxInput label="Cỡ chữ tiêu đề" value={value} onChange={onChange} />
          )
        },
        background: {
          type: 'object',
          label: 'Background',
          objectFields: {
            type: {
              type: 'select',
              label: 'Loại nền',
              options: [
                { label: 'Màu sắc', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Hình ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#f0e0ff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#f0e0ff' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#d4e0ff' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: '180deg' },
            imageUrl: { type: 'text', label: 'URL hình ảnh nền' }
          }
        },
        items: {
          type: 'array',
          label: 'Danh sách thống kê',
          arrayFields: {
            number: { type: 'text', label: 'Số liệu (VD: 500+)', contentEditable: true },
            numberColor: { type: 'text', label: 'Màu số liệu' },
            numberSize: {
              type: 'custom',
              render: ({ onChange, value }) => (
                <PxInput label="Cỡ chữ số liệu" value={value} onChange={onChange} />
              )
            },
            description: { type: 'textarea', label: 'Mô tả', contentEditable: true },
            descColor: { type: 'text', label: 'Màu mô tả' }
          },
          defaultItemProps: {
            number: '0+',
            numberColor: '#1e3a5f',
            numberSize: '52px',
            description: 'Mô tả thống kê mới',
            descColor: '#3a4a6b'
          },
          getItemSummary: (item) => item.number || 'Thống kê'
        }
      },
      defaultProps: {
        title: 'HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ',
        titleColor: '#0b4c8c',
        titleSize: '24px',
        background: { type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/hoa.webp' },
        items: [
          { number: '500+', description: 'Hội viên là các doanh nghiệp và doanh nhân tiêu biểu tại TP.HCM', numberColor: '#1e3a5f', numberSize: '52px', descColor: '#3a4a6b' },
          { number: '20+', description: 'Năm hình thành và phát triển mạng lưới kết nối đồng hương', numberColor: '#1e3a5f', numberSize: '52px', descColor: '#3a4a6b' },
          { number: '1.000+', description: 'Cơ hội giao thương và kết nối đầu tư được khởi tạo mỗi năm', numberColor: '#1e3a5f', numberSize: '52px', descColor: '#3a4a6b' },
          { number: '100+', description: 'Chương trình thiện nguyện và hoạt động hướng về quê hương', numberColor: '#1e3a5f', numberSize: '52px', descColor: '#3a4a6b' }
        ]
      },
      render: (props) => <AdminHanhTrinh {...props} />
    },
    TinTucSuKien: {
      label: 'Tin Tức & Sự Kiện',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ chính' },
        viewMoreText: { type: 'text', label: 'Text Xem thêm', contentEditable: true },
        viewMoreUrl: { type: 'text', label: 'Link Xem thêm' },
        background: {
          type: 'object',
          label: 'Background',
          objectFields: {
            type: {
              type: 'select',
              label: 'Loại nền',
              options: [
                { label: 'Màu sắc', value: 'color' },
                { label: 'Gradient', value: 'gradient' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#f8f4ff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#f0e0ff' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#f8f4ff' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: '180deg' }
          }
        },
        topNews: {
          type: 'array',
          label: 'Tin tức nổi bật (Phía trên)',
          arrayFields: {
            imageUrl: { type: 'text', label: 'URL Ảnh' },
            date: { type: 'text', label: 'Ngày tháng', contentEditable: true },
            title: { type: 'text', label: 'Tiêu đề tin', contentEditable: true },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn bài viết' },
            isNew: {
              type: 'select',
              label: 'Hiển thị nhãn Mới nhất',
              options: [
                { label: 'Có', value: true },
                { label: 'Không', value: false }
              ]
            }
          },
          defaultItemProps: {
            imageUrl: 'https://via.placeholder.com/600x400',
            date: '20/03/2026',
            title: 'Tiêu đề tin nổi bật',
            description: 'Mô tả tóm tắt nội dung tin tức nổi bật...',
            url: '#',
            isNew: true
          },
          getItemSummary: (item) => item.title || 'Tin nổi bật'
        },
        bottomNews: {
          type: 'array',
          label: 'Tin tức phụ (Phía dưới)',
          arrayFields: {
            imageUrl: { type: 'text', label: 'URL Ảnh' },
            date: { type: 'text', label: 'Ngày tháng', contentEditable: true },
            title: { type: 'text', label: 'Tiêu đề tin', contentEditable: true },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          defaultItemProps: {
            imageUrl: 'https://via.placeholder.com/400x300',
            date: '10/03/2026',
            title: 'Tiêu đề tin phụ',
            description: 'Mô tả tóm tắt nội dung tin tức phụ...',
            url: '#'
          },
          getItemSummary: (item) => item.title || 'Tin phụ'
        }
      },
      defaultProps: {
        title: 'TIN TỨC & SỰ KIỆN',
        titleColor: '#0f4c81',
        viewMoreText: 'Xem thêm',
        viewMoreUrl: '#',
        background: { type: 'gradient', gradientFrom: '#f0e0ff', gradientTo: '#f8f4ff', gradientDirection: '180deg' },
        topNews: [
          {
            imageUrl: '/Frame 1.png',
            date: '20/03/2026',
            title: 'Hội thảo kết nối doanh nghiệp chia sẻ xu hướng phát triển',
            description: 'Sự kiện quy tụ nhiều chuyên gia và doanh nhân, cùng thảo luận về chiến lược phát triển, chuyển đổi số và cơ hội hợp tác trong thời đại mới.',
            url: '#',
            isNew: true
          },
          {
            imageUrl: '/Frame 2.png',
            date: '20/03/2026',
            title: 'Kết nối và chia sẻ niềm vui là cách phát triển sự hiệu quả...',
            description: 'Khi chúng ta làm việc với một trái tim mở lòng và tinh thần sẻ chia, áp lực sẽ biến thành động lực, và khó khăn sẽ trở thành trải nghiệm.',
            url: '#',
            isNew: true
          }
        ],
        bottomNews: [
          {
            imageUrl: '/Frame 3.png',
            date: '10/03/2026',
            title: 'Lan tỏa yêu thương thiện nguyện',
            description: 'Các thành viên đã cùng chung tay tổ chức hoạt động trao tặng...',
            url: '#'
          },
          {
            imageUrl: '/Frame 4.png',
            date: '23/02/2026',
            title: 'Hợp tác giữa các doanh nghiệp',
            description: 'Định hướng phát triển tương lai là mở rộng quan hệ hợp tác giữa các ...',
            url: '#'
          },
          {
            imageUrl: '/Frame 5.png',
            date: '23/02/2026',
            title: 'Đẩy mạnh chuyển đổi số ...',
            description: 'Sự phát triển hệ thống chuyển đổi đồng bộ nhằm tối ưu hóa...',
            url: '#'
          }
        ]
      },
      render: (props) => <AdminTinTucSuKien {...props} />
    },
    ThamGiaCongDong: {
      label: 'Tham Gia Cộng Đồng',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề' },
        viewMoreText: { type: 'text', label: 'Chữ xem thêm', contentEditable: true },
        viewMoreUrl: { type: 'text', label: 'Đường dẫn xem thêm' },
        backgroundImageUrl: { type: 'text', label: 'URL Ảnh Nền (bên phải)' },
        background: {
          type: 'object',
          objectFields: {
            type: {
              type: 'select',
              options: [
                { label: 'Gradient', value: 'gradient' },
                { label: 'Màu đơn sắc', value: 'color' }
              ]
            },
            color: { type: 'text', label: 'Màu nền (nếu chọn màu)' },
            gradientFrom: { type: 'text', label: 'Màu bắt đầu' },
            gradientTo: { type: 'text', label: 'Màu kết thúc' },
            gradientDirection: { type: 'text', label: 'Hướng (vd: 135deg)' }
          }
        },
        cards: {
          type: 'array',
          label: 'Các thẻ giá trị',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            description: { type: 'textarea', label: 'Mô tả', contentEditable: true },
            iconUrl: { type: 'text', label: 'URL Icon' }
          },
          defaultItemProps: {
            title: 'Giá trị mới',
            description: 'Mô tả cho giá trị mới...',
            iconUrl: 'https://via.placeholder.com/100'
          },
          getItemSummary: (item) => item.title || 'Giá trị'
        }
      },
      defaultProps: {
        title: 'GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG',
        titleColor: '#0f4c81',
        viewMoreText: 'Xem thêm',
        viewMoreUrl: '#',
        backgroundImageUrl: '/bg-giatri.png',
        background: { type: 'gradient', gradientFrom: '#e0f2fe', gradientTo: '#fbcfe8', gradientDirection: '135deg' },
        cards: [
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
        ]
      },
      render: (props) => <AdminThamGiaCongDong {...props} />
    },
    LienHe: {
      label: 'Liên Hệ',
      fields: {
        title: { type: 'textarea', label: 'Tiêu đề', contentEditable: true },
        email: { type: 'text', label: 'Email', contentEditable: true },
        phone: { type: 'text', label: 'Số điện thoại', contentEditable: true },
        buttonText: { type: 'text', label: 'Chữ trên nút', contentEditable: true },
        buttonUrl: { type: 'text', label: 'Link của nút' },
        backgroundImageUrl: { type: 'text', label: 'URL Ảnh Nền' }
      },
      defaultProps: {
        title: 'QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM',
        email: 'info@dte.hunghau.vn',
        phone: '1800 1568',
        buttonText: 'Đăng ký hội viên',
        buttonUrl: '#',
        backgroundImageUrl: '/bg-lienhe.png'
      },
      render: (props) => <AdminLienHe {...props} />
    },
    Footer: {
      label: 'Footer',
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        title: { type: 'textarea', label: 'Tên CLB', contentEditable: true },
        addressTitle: { type: 'text', label: 'Tiêu đề Trụ sở', contentEditable: true },
        address: { type: 'textarea', label: 'Địa chỉ', contentEditable: true },
        email: { type: 'text', label: 'Email', contentEditable: true },
        hotline: { type: 'text', label: 'Hotline', contentEditable: true },
        linksTitle1: { type: 'text', label: 'Tiêu đề cột Liên kết', contentEditable: true },
        linksColumn1: {
          type: 'array',
          label: 'Liên kết trang',
          arrayFields: {
            label: { type: 'text', label: 'Tên liên kết', contentEditable: true },
            url: { type: 'text', label: 'URL' }
          },
          getItemSummary: (item) => item.label || 'Liên kết'
        },
        linksTitle2: { type: 'text', label: 'Tiêu đề cột Khác', contentEditable: true },
        linksColumn2: {
          type: 'array',
          label: 'Khác',
          arrayFields: {
            label: { type: 'text', label: 'Tên liên kết', contentEditable: true },
            url: { type: 'text', label: 'URL' }
          },
          getItemSummary: (item) => item.label || 'Khác'
        },
        copyright: { type: 'text', label: 'Bản quyền', contentEditable: true },
        socialLinks: {
          type: 'array',
          label: 'Mạng xã hội',
          arrayFields: {
            iconUrl: { type: 'text', label: 'URL Icon' },
            url: { type: 'text', label: 'Link' }
          },
          getItemSummary: (item) => item.url || 'Social'
        },
        bgImage: { type: 'text', label: 'URL Ảnh nền (Hiệu ứng)' }
      },
      defaultProps: {
        logoUrl: '/logo_header.png',
        title: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP. HỒ CHÍ MINH',
        addressTitle: 'TRỤ SỞ CHÍNH',
        address: 'Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, Thành phố Hồ Chí Minh',
        email: 'Email: info@dte.hunghau.vn',
        hotline: 'Hotline: 1800 1568',
        linksTitle1: 'Liên kết trang',
        linksColumn1: [
          { label: 'Trang chủ', url: '#' },
          { label: 'Tin tức và sự kiện', url: '#' },
          { label: 'Về chúng tôi', url: '#' },
          { label: 'Các lĩnh vực hoạt động', url: '#' },
          { label: 'Doanh nghiệp hội viên', url: '#' },
          { label: 'Đăng ký', url: '#' },
          { label: 'Hoạt động Ban', url: '#' }
        ],
        linksTitle2: 'Khác',
        linksColumn2: [
          { label: 'MYH', url: '#' },
          { label: 'MYC', url: '#' },
          { label: 'HHF', url: '#' },
          { label: 'HHE', url: '#' },
          { label: 'HHA', url: '#' },
          { label: 'COWE', url: '#' },
          { label: 'HHN', url: '#' },
          { label: 'HYV', url: '#' }
        ],
        copyright: 'Copyright © CLB Doanh nhan Dong Thap. All rights reserved',
        socialLinks: [
          { iconUrl: '/facebook.svg', url: '#' },
          { iconUrl: '/tiktok.png', url: '#' },
          { iconUrl: '/youtube.png', url: '#' },
          { iconUrl: '/linkedin.svg', url: '#' }
        ],
        bgImage: '/hieuungfooter.webp'
      },
      render: (props) => <AdminFooter {...props} />
    }
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero', 'CacBanChuyenMon', 'CoCauToChuc', 'HoiVien', 'HanhTrinh', 'TinTucSuKien', 'ThamGiaCongDong', 'LienHe', 'Footer'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
