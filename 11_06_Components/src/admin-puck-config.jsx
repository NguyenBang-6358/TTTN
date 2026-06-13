import React from 'react';
import { FieldLabel } from '@measured/puck';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection, { AdminDepartments, AdminOrgStructure } from './components/admin-section';
import AdminHero from './components/admin-hero';

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

    Hero: {
      label: 'Hero Banner',
      fields: {
        topText: { type: 'text', label: 'Chữ trên cùng' },
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
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
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
        titleSize: '60px',
        subtitle: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sứ mệnh nghĩa tình quê hương.',
        subtitleColor: '#ffffff',
        subtitleSize: '18px',
        boxRadius: '20px 120px 20px 60px',
        buttons: [
          { text: 'Tham gia cộng đồng', url: '#', style: 'primary', btnColor: '#1e83fdff', btnRadius: '30px', btnAlign: 'justify-center', btnTextColor: '#ffffff', btnTextSize: '14px' }
        ],
        background: {
          type: 'image',
          imageUrl: '/sen_hong.jpg'
        },
        layout: { align: 'left' }
      },
      render: (props) => <AdminHero {...props} />
    },

    Departments: {
      label: 'Các Ban Chuyên Môn',
      fields: {
        title: { type: 'text', label: 'Tiêu đề lớn' },
        titleColor: { type: 'text', label: 'Màu tiêu đề lớn' },
        subtitle: { type: 'text', label: 'Tiêu đề phụ' },
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
            title: { type: 'text', label: 'Tên Ban' },
            iconUrl: { type: 'text', label: 'Đường dẫn Icon (hỗ trợ .png, .jpg, .svg, ...)' },
            cardRadius: {
              type: 'custom',
              render: ({ onChange, value }) => (
                <PxInput label="Bo góc Card" value={value} onChange={onChange} />
              )
            },
            btnText: { type: 'text', label: 'Text nút' },
            btnUrl: { type: 'text', label: 'Link nút' },
            btnRadius: {
              type: 'custom',
              render: ({ onChange, value }) => (
                <PxInput label="Bo góc nút" value={value} onChange={onChange} />
              )
            }
          },
          getItemSummary: (item) => item.title || "Ban chuyên môn"
        }
      },
      defaultProps: {
        title: 'CÁC BAN CHUYÊN MÔN',
        titleColor: '#2b569a',
        subtitle: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        subtitleColor: '#2b569a',
        background: { type: 'gradient', gradientFrom: '#efe6fc', gradientTo: '#e3f2fd', gradientDirection: '135deg' },
        items: [
          { title: 'Ban Kinh tế - Đầu tư', iconUrl: '/icon_kinhte.jpg', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' },
          { title: 'Ban Văn hóa - Thể thao', iconUrl: '/icon_vanhoa.jpg', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' },
          { title: 'Ban Xã hội - Cộng đồng', iconUrl: '/icon_xahoi.jpg', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' },
          { title: 'Ban Khởi nghiệp', iconUrl: '/icon_khoinghiep.jpg', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' },
          { title: 'Ban Giao thương quốc tế', iconUrl: '/icon_giaothuong.jpg', btnText: 'Xem hoạt động', btnUrl: '#', cardRadius: '80px 1px 80px 1px', btnRadius: '30px' }
        ]
      },
      render: (props) => <AdminDepartments {...props} />
    },

    OrgStructure: {
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
            title: { type: 'text', label: 'Tiêu đề cột' },
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
            content: { type: 'textarea', label: 'Nội dung văn bản (Nếu có)' },
            members: {
              type: 'array',
              label: 'Danh sách nhân sự',
              arrayFields: {
                name: { type: 'text', label: 'Họ tên' },
                clbRole: { type: 'text', label: 'Chức vụ CLB' },
                bizRole: { type: 'text', label: 'Chức vụ DN' },
                bizName: { type: 'text', label: 'Doanh nghiệp' },
                avatarUrl: { type: 'text', label: 'URL ảnh đại diện' }
              },
              getItemSummary: (item) => item.name || "Nhân sự"
            }
          },
          getItemSummary: (item) => item.title || "Cột nội dung"
        }
      },
      defaultProps: {
        background: {
          type: 'gradient',
          gradientFrom: '#efe6fc',
          gradientTo: '#e3f2fd',
          gradientDirection: '135deg'
        },
        columns: [
          {
            title: 'VỀ CÂU LẠC BỘ',
            type: 'text',
            background: { type: 'image', color: '#ffffff', imageUrl: '/background_clb.png' },
            content: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối - đồng hành - sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.'
          },
          {
            title: 'CƠ CẤU TỔ CHỨC',
            type: 'members',
            background: { type: 'color', color: '#ffffff' },
            members: [
              { name: 'Trần Văn Khang', clbRole: 'Ủy viên BCH', bizRole: 'Tổng Giám đốc', bizName: 'Công ty CP Logistics Đồng Tháp', avatarUrl: 'https://bio.linkcdn.cc/instabio.cc/www/v4.1/jason-lee.png' },
              { name: 'Đỗ Thu Trang', clbRole: 'Thủ quỹ CLB', bizRole: 'Giám đốc Tài chính', bizName: 'Công ty TNHH Sen Việt', avatarUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS3sbIMeUbUEXnTTtbMRkORbWsyh3mWj0Vj1d_QAjjYbQ1AS9hs' },
              { name: 'Vũ Hoàng Long', clbRole: 'Ủy viên BCH', bizRole: 'Giám đốc Điều hành', bizName: 'Công ty Công nghệ số Mekong', avatarUrl: 'https://img.vietcetera.com/uploads/avatar-images/11-oct-2023/vu-hoang-long-nguoi-ke-chuyen-1696993305459-160x160.jpg' }
            ]
          }
        ]
      },
      render: (props) => <AdminOrgStructure {...props} />
    }
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero', 'Departments', 'OrgStructure'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
