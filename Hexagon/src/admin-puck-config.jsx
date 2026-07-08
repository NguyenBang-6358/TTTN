import React from 'react';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection, { AdminHeader, AdminGioiThieu, AdminLinhVucHoatDong, AdminTinTuc, AdminDoiTacLienKet, AdminLienHe, AdminFooter, AdminGiaiPhapCN, AdminGiaiPhapTC, AdminCungCapTB, AdminDichVuCNTT, AdminBaiViet, AdminKhongKhiTungBung, AdminDongHanh, AdminSamTetCN, AdminBaiViet4, AdminBaiViet5 } from './components/admin-section';
import AdminHero from './components/admin-hero';

export const BACKGROUND_TYPES = [
  { value: 'color', label: 'Màu sắc' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'image', label: 'Hình ảnh' },
  { value: 'image+gradient', label: 'Hình ảnh & Gradient' },
  { value: 'image+color', label: 'Hình ảnh & Màu sắc' }
];

export const GRADIENT_DIRECTIONS = [
  { value: 'none', label: 'Không' },
  { value: 'to right', label: 'Trái -> Phải' },
  { value: 'to left', label: 'Phải -> Trái' },
  { value: 'to bottom', label: 'Trên -> Dưới' },
  { value: 'to bottom right', label: 'Góc trên-trái -> dưới-phải' },
  { value: 'to bottom left', label: 'Góc trên-phải -> dưới-trái' }
];

export const ANIMATE_FIELD = {
  type: 'radio', label: 'Hiệu ứng (Animate)',
  options: [
    { label: 'Bật', value: true },
    { label: 'Tắt', value: false }
  ]
};

export const BACKGROUND_FIELD = {
  type: 'object', label: 'Background',
  objectFields: {
    type: { type: 'select', label: 'Loại', options: BACKGROUND_TYPES },
    color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
    fromColor: { type: 'text', label: 'Gradient từ', default: '#667eea' },
    toColor: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
    direction: { type: 'select', label: 'Hướng gradient', options: GRADIENT_DIRECTIONS },
    bg_image: { type: 'text', label: 'Link ảnh' },
    opacity: { type: 'number', label: 'Độ mờ (0-1)' }
  }
};

//Config — đăng ký components với fields + defaultProps + render.

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
        },
        textColor: { type: 'text', label: 'Màu chữ', default: '#1e293b' },
        animate: {
          type: 'radio', label: 'Hiệu ứng (Animate)',
          options: [
            { label: 'Bật', value: true },
            { label: 'Tắt', value: false }
          ]
        }
      },
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left', animate: false, textColor: '#1e293b' },
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
            { label: 'Căn đều', value: 'justify' }
          ]
        },
        textColor: { type: 'text', label: 'Màu chữ', default: '#334155' },
        animate: ANIMATE_FIELD
      },
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left', textColor: '#334155', animate: false },
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
        },
        animate: {
          type: 'radio', label: 'Hiệu ứng (Animate)',
          options: [
            { label: 'Bật', value: true },
            { label: 'Tắt', value: false }
          ]
        }
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center', animate: false
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
        background: BACKGROUND_FIELD,
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        animate: ANIMATE_FIELD,
        content: { type: 'slot' } // Cho phép nested components
      },
      defaultProps: {
        container: 'lg',
        background: { type: 'color', color: '#ffffff', direction: 'to right' },
        padding_x: 4, padding_y: 4, animate: false,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        tagText: { type: 'text', label: 'Tag (chữ vàng)', contentEditable: true },
        tagColor: { type: 'text', label: 'Màu chữ Tag', default: '#eab308' },
        titles: {
          type: 'array',
          label: 'Danh sách Tiêu đề',
          arrayFields: {
            text: { type: 'text', label: 'Nội dung' },
            color: { type: 'text', label: 'Màu chữ' },
            variant: {
              type: 'select', label: 'Kiểu hiển thị',
              options: [
                { label: 'Bình thường', value: 'normal' },
                { label: 'Gõ chữ (Typewriter)', value: 'typewriter' },
                { label: 'Gradient', value: 'gradient' }
              ]
            }
          },
          getItemSummary: (item) => item.text || 'Tiêu đề'
        },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        subtitleColor: { type: 'text', label: 'Màu chữ mô tả', default: '#e5e7eb' },
        buttons: {
          type: 'array',
          label: 'Danh sách Nút',
          arrayFields: {
            text: { type: 'text', label: 'Tên nút', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn' },
            color: { type: 'text', label: 'Màu chữ', default: '#ffffff' },
            variant: {
              type: 'select', label: 'Kiểu nút',
              options: [
                { label: 'Nút chính (Màu vàng)', value: 'primary' },
                { label: 'Nút phụ (Trong suốt)', value: 'secondary' }
              ]
            }
          },
          getItemSummary: (item) => item.text || 'Nút mới'
        },
        imageUrl: { type: 'text', label: 'Link Ảnh minh họa' },
        scrollText: { type: 'text', label: 'Chữ cuộn xuống', contentEditable: true },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        tagText: 'CÔNG NGHỆ TƯƠNG LAI',
        tagColor: '#eab308',
        titles: [
          { text: 'Giải pháp công nghệ, Cung cấp thiết bị CNTT, Dịch vụ CNTT, Thi công & lắp đặt', color: '#ffffff', variant: 'typewriter' },
          { text: 'HEXAGON Solutions', color: 'linear-gradient(135deg, #ffffff 0%, #a8e6d8 55%, #F7931E 100%)', variant: 'gradient' }
        ],
        subtitle: 'HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
        subtitleColor: '#e5e7eb',
        buttons: [
          { text: 'Khám phá Dịch vụ', url: '#dich-vu', variant: 'primary', color: '#ffffff' },
          { text: 'Liên hệ Tư vấn', url: '#lien-he', variant: 'secondary', color: '#ffffff' }
        ],
        imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp',
        scrollText: 'Cuộn xuống để khám phá',
        background: { type: 'gradient', fromColor: '#135237', toColor: '#41b67d', direction: 'to bottom right' },
        animate: true
      },
      render: (props) => <AdminHero {...props} />
    },

    Header: {
      label: 'Header',
      fields: {
        logoUrl: { type: 'text', label: 'Link Logo' },
        title: { type: 'text', label: 'Tên Thương Hiệu', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu tên thương hiệu', default: '#ffffff' },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD,
        menuItems: {
          type: 'array',
          label: 'Danh sách Menu',
          arrayFields: {
            label: { type: 'text', label: 'Tên menu', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn (URL)' },
            color: { type: 'text', label: 'Màu chữ', default: '#d1d5db' }
          },
          getItemSummary: (item) => item.label
        },
        activeLang: {
          type: 'select', label: 'Ngôn ngữ đang chọn',
          options: [
            { label: 'Tiếng Việt', value: 'vn' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        vnLink: { type: 'text', label: 'Link trang Tiếng Việt' },
        enLink: { type: 'text', label: 'Link trang Tiếng Anh' }
      },
      defaultProps: {
        logoUrl: 'https://beta.hexagon.xyz/assets/images/logo-hhc.png',
        title: 'HEXAGON',
        titleColor: '#ffffff',
        background: { type: 'color', color: '#1A6B49', direction: 'none' },
        animate: true,
        menuItems: [
          { label: 'Trang chủ', url: '#trang-chu', color: '#d1d5db' },
          { label: 'Giới thiệu', url: '#gioi-thieu', color: '#d1d5db' },
          { label: 'Dịch vụ', url: '#dich-vu', color: '#d1d5db' },
          { label: 'Hỗ trợ', url: 'https://support.hexagon.xyz/', color: '#d1d5db' },
          { label: 'Liên hệ', url: '#lien-he', color: '#d1d5db' }
        ],
        activeLang: 'vn',
        vnLink: '/vi/trang-chu',
        enLink: '/en/trang-chu'
      },
      render: (props) => <AdminHeader {...props} />
    },

    GioiThieu: {
      label: 'Giới thiệu',
      fields: {
        imageUrl: { type: 'text', label: 'Link Ảnh' },
        quoteText: { type: 'textarea', label: 'Nội dung trích dẫn', contentEditable: true },
        quoteTextColor: { type: 'text', label: 'Màu chữ trích dẫn', default: '#111827' },
        quoteAuthor: { type: 'text', label: 'Tác giả trích dẫn', contentEditable: true },
        quoteAuthorColor: { type: 'text', label: 'Màu chữ tác giả', default: '#eab308' },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
        description: { type: 'textarea', label: 'Mô tả', contentEditable: true },
        descriptionColor: { type: 'text', label: 'Màu chữ mô tả', default: '#374151' },
        coreValues: {
          type: 'array',
          label: 'Giá trị cốt lõi (4 ô)',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#1D6A49' },
            description: { type: 'textarea', label: 'Mô tả', contentEditable: true },
            descriptionColor: { type: 'text', label: 'Màu chữ mô tả', default: '#4b5563' }
          },
          getItemSummary: (item) => item.title
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        imageUrl: 'https://beta.hexagon.xyz/assets/images/VPX16.jpg',
        quoteText: '"Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"',
        quoteTextColor: '#111827',
        quoteAuthor: 'Hexagon Culture',
        quoteAuthorColor: '#eab308',
        title: 'Về Hexagon',
        titleColor: '#111827',
        description: 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.',
        descriptionColor: '#374151',
        coreValues: [
          { title: 'Sứ mệnh', titleColor: '#1D6A49', description: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.', descriptionColor: '#4b5563' },
          { title: 'Tầm nhìn', titleColor: '#1D6A49', description: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.', descriptionColor: '#4b5563' },
          { title: 'Giá trị cốt lõi', titleColor: '#1D6A49', description: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.', descriptionColor: '#4b5563' },
          { title: 'Nền tảng', titleColor: '#1D6A49', description: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.', descriptionColor: '#4b5563' }
        ],
        background: { type: 'color', color: '#ffffff', direction: 'none' },
        animate: true
      },
      render: (props) => <AdminGioiThieu {...props} />
    },

    LinhVucHoatDong: {
      label: 'Lĩnh vực hoạt động',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#000000' },
        subtitle: { type: 'textarea', label: 'Mô tả', contentEditable: true },
        subtitleColor: { type: 'text', label: 'Màu chữ mô tả', default: '#374151' },
        items: {
          type: 'array',
          label: 'Danh sách lĩnh vực',
          arrayFields: {
            title: { type: 'text', label: 'Tên lĩnh vực', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ lĩnh vực', default: '#FFB800' },
            image: { type: 'text', label: 'Link Ảnh nền' },
            hoverImage: { type: 'text', label: 'Link Ảnh Hover' },
            description: { type: 'text', label: 'Mô tả chi tiết', contentEditable: true },
            descriptionColor: { type: 'text', label: 'Màu chữ mô tả', default: '#1f2937' },
            linkText: { type: 'text', label: 'Chữ Xem chi tiết', contentEditable: true },
            linkColor: { type: 'text', label: 'Màu chữ xem chi tiết', default: '#2563eb' },
            url: { type: 'text', label: 'Đường dẫn Xem chi tiết' }
          },
          getItemSummary: (item) => item.title
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        title: 'Lĩnh vực hoạt động',
        titleColor: '#000000',
        subtitle: 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
        subtitleColor: '#374151',
        items: [
          {
            title: 'Giải pháp công nghệ',
            titleColor: '#FFB800',
            image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            hoverImage: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh...',
            descriptionColor: '#1f2937',
            linkText: 'Xem chi tiết',
            linkColor: '#2563eb',
            url: '/vi/trang-giai-phap-cong-nghe'
          },
          {
            title: 'Giải pháp thi công & lắp đặt',
            titleColor: '#FFB800',
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            hoverImage: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png',
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăn...',
            descriptionColor: '#1f2937',
            linkText: 'Xem chi tiết',
            linkColor: '#2563eb',
            url: '#'
          },
          {
            title: 'Cung cấp thiết bị CNTT',
            titleColor: '#FFB800',
            image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            hoverImage: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png',
            description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và kh...',
            descriptionColor: '#1f2937',
            linkText: 'Xem chi tiết',
            linkColor: '#2563eb',
            url: '#'
          },
          {
            title: 'Dịch vụ Công nghệ thông tin',
            titleColor: '#FFB800',
            image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
            hoverImage: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png',
            description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi...',
            descriptionColor: '#1f2937',
            linkText: 'Xem chi tiết',
            linkColor: '#2563eb',
            url: '#'
          }
        ],
        background: { type: 'color', color: '#f8fafc', direction: 'none' },
        animate: true
      },
      render: (props) => <AdminLinhVucHoatDong {...props} />
    },

    TinTuc: {
      label: 'Tin tức',
      fields: {
        title: { type: 'text', label: 'Tiêu đề khối', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#000000' },
        subtitle: { type: 'text', label: 'Mô tả phụ', contentEditable: true },
        subtitleColor: { type: 'text', label: 'Màu chữ mô tả', default: '#374151' },
        viewAllText: { type: 'text', label: 'Chữ Nút Xem tất cả', contentEditable: true },
        viewAllColor: { type: 'text', label: 'Màu chữ nút xem tất cả', default: '#ffffff' },
        viewAllUrl: { type: 'text', label: 'Link Xem tất cả' },
        items: {
          type: 'array',
          label: 'Danh sách bài viết',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề bài', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
            image: { type: 'text', label: 'Link Ảnh' },
            description: { type: 'text', label: 'Mô tả ngắn', contentEditable: true },
            descriptionColor: { type: 'text', label: 'Màu chữ mô tả', default: '#4b5563' },
            date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
            linkText: { type: 'text', label: 'Chữ Xem chi tiết', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn Xem chi tiết' }
          },
          getItemSummary: (item) => item.title
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        title: 'Tin tức',
        titleColor: '#000000',
        subtitle: 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
        subtitleColor: '#374151',
        viewAllText: 'Xem tất cả bài viết',
        viewAllColor: '#ffffff',
        viewAllUrl: '#',
        items: [
          {
            title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
            titleColor: '#111827',
            image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            description: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra...',
            descriptionColor: '#4b5563',
            date: '26 thg 6, 2026',
            linkText: 'Xem chi tiết',
            url: '#'
          },
          {
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            titleColor: '#111827',
            image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            description: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến tron...',
            descriptionColor: '#4b5563',
            date: '26 thg 6, 2026',
            linkText: 'Xem chi tiết',
            url: '#'
          },
          {
            title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
            titleColor: '#111827',
            image: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            description: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé \'Lục Giác\' để chọn cho m...',
            descriptionColor: '#4b5563',
            date: '26 thg 6, 2026',
            linkText: 'Xem chi tiết',
            url: '#'
          },
          {
            title: 'Bài viết 4',
            titleColor: '#111827',
            image: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            description: 'Bài viết 4',
            descriptionColor: '#4b5563',
            date: '25 thg 6, 2026',
            linkText: 'Xem chi tiết',
            url: '#'
          },
          {
            title: 'Bài viết 5',
            titleColor: '#111827',
            image: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            description: 'Bài viết 5',
            descriptionColor: '#4b5563',
            date: '25 thg 6, 2026',
            linkText: 'Xem chi tiết',
            url: '#'
          }
        ],
        background: { type: 'color', color: '#ffffff', direction: 'none' },
        animate: true
      },
      render: (props) => <AdminTinTuc {...props} />
    },

    DoiTacLienKet: {
      label: 'Đối tác liên kết',
      fields: {
        title: { type: 'text', label: 'Tiêu đề khối', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#000000' },
        logos: {
          type: 'array',
          label: 'Danh sách Logo Đối Tác',
          arrayFields: {
            name: { type: 'text', label: 'Tên đối tác' },
            imageUrl: { type: 'text', label: 'Link Ảnh Logo' }
          },
          getItemSummary: (item) => item.name || 'Logo'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        title: 'Các đối tác liên kết',
        titleColor: '#000000',
        logos: [
          { name: 'Khối E', imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi E.png' },
          { name: 'Khối C', imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi C.png' },
          { name: 'Khối D', imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi D.png' },
          { name: 'Happy Food', imageUrl: 'https://webdemo.hexagon.xyz/medias/Happy Food.png' },
          { name: 'ECOBOOK', imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" width="100" height="60"><g transform="translate(10, 0)"><path d="M 15 25 C 25 15, 38 15, 40 20 C 42 15, 55 15, 65 25 C 55 18, 42 18, 40 23 C 38 18, 25 18, 15 25 Z" fill="%2322c55e"/><path d="M 18 18 C 26 10, 38 10, 40 15 C 42 10, 54 10, 62 18 C 54 12, 42 12, 40 17 C 38 12, 26 12, 18 18 Z" fill="%23eab308"/><path d="M 22 11 C 28 5, 38 5, 40 10 C 42 5, 52 5, 58 11 C 52 7, 42 7, 40 12 C 38 7, 28 7, 22 11 Z" fill="%2322c55e"/></g><text x="50" y="48" font-family="Arial, sans-serif" font-weight="900" font-size="13" fill="%2315803d" text-anchor="middle" letter-spacing="1">ECOBOOK</text></svg>' },
          { name: 'COMOON', imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" width="100" height="60"><g transform="translate(10, 0)"><path d="M 20 12 C 30 5, 50 5, 60 12 C 55 18, 45 18, 40 18 C 35 18, 25 18, 20 12 Z" fill="%2315803d"/><path d="M 22 17 C 30 11, 50 11, 58 17 C 53 23, 47 23, 40 23 C 33 23, 27 23, 22 17 Z" fill="%23eab308"/><path d="M 25 22 C 32 17, 48 17, 55 22 C 50 30, 45 32, 40 32 C 35 32, 30 30, 25 22 Z" fill="%2315803d"/></g><text x="50" y="48" font-family="Arial, sans-serif" font-weight="900" font-size="13" fill="%2315803d" text-anchor="middle" letter-spacing="1">COMOON</text></svg>' },
          { name: 'Binh Minh', imageUrl: 'https://webdemo.hexagon.xyz/medias/B.png' },
          { name: 'Khối F', imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi F.png' }
        ],
        background: { type: 'gradient', fromColor: '#0f826b', toColor: '#86efac', direction: 'to bottom' },
        animate: true
      },
      render: (props) => <AdminDoiTacLienKet {...props} />
    },

    LienHe: {
      label: 'Liên hệ',
      fields: {
        title: { type: 'text', label: 'Tiêu đề khối', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
        subtitle: { type: 'text', label: 'Mô tả phụ', contentEditable: true },
        subtitleColor: { type: 'text', label: 'Màu chữ mô tả', default: '#374151' },
        contactDetails: {
          type: 'array',
          label: 'Thông tin liên hệ',
          arrayFields: {
            iconUrl: { type: 'text', label: 'Link Icon' },
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
            content: { type: 'text', label: 'Nội dung', contentEditable: true },
            contentColor: { type: 'text', label: 'Màu chữ nội dung', default: '#000000' }
          },
          getItemSummary: (item) => item.title || 'Thông tin'
        },
        socialLinks: {
          type: 'array',
          label: 'Mạng xã hội',
          arrayFields: {
            name: { type: 'text', label: 'Tên MXH', contentEditable: true },
            textColor: { type: 'text', label: 'Màu chữ', default: '#0f766e' },
            url: { type: 'text', label: 'Đường dẫn' }
          },
          getItemSummary: (item) => item.name
        },
        mapEmbedUrl: { type: 'text', label: 'Link Google Maps' },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        title: 'Liên hệ với chúng tôi',
        titleColor: '#111827',
        subtitle: 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
        subtitleColor: '#374151',
        contactDetails: [
          { iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="%232dd4bf" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>', title: 'Trụ sở chính', titleColor: '#111827', content: '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh', contentColor: '#000000' },
          { iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="%232dd4bf" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>', title: 'Email', titleColor: '#111827', content: 'info@hexagon.xyz', contentColor: '#000000' },
          { iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="%232dd4bf" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>', title: 'Hotline', titleColor: '#111827', content: '096 446 0333', contentColor: '#000000' }
        ],
        socialLinks: [
          { name: 'Facebook', textColor: '#0f766e', url: '#' },
          { name: 'LinkedIn', textColor: '#0f766e', url: '#' },
          { name: 'YouTube', textColor: '#0f766e', url: '#' },
          { name: 'Zalo', textColor: '#0f766e', url: '#' }
        ],
        mapEmbedUrl: 'https://maps.google.com/maps?width=600&height=400&hl=en&q=615 Au Co&t=p&z=14&ie=UTF8&iwloc=B&output=embed',
        background: { type: 'color', color: '#135237', direction: 'to bottom' },
        animate: true
      },
      render: (props) => <AdminLienHe {...props} />
    },

    Footer: {
      label: 'Footer',
      fields: {
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        textColor: { type: 'text', label: 'Màu chữ', default: '#9ca3af' },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        content: 'Copyright 2026 © Hexagon Corporation. All rights reserved.',
        textColor: '#9ca3af',
        background: { type: 'color', color: '#0D5939', direction: 'none' },
        animate: true
      },
      render: (props) => <AdminFooter {...props} />
    },

    GiaiPhapCN: {
      label: 'Giải Pháp Công Nghệ',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        heroTitle: { type: 'text', label: 'Tiêu đề (Hero)', contentEditable: true },
        heroTitleColor: { type: 'text', label: 'Màu Tiêu đề (Hero)' },
        heroDesc: { type: 'textarea', label: 'Mô tả (Hero)', contentEditable: true },
        heroDescColor: { type: 'text', label: 'Màu Mô tả (Hero)' },
        heroBtnText: { type: 'text', label: 'Tên nút (Hero)', contentEditable: true },
        heroBtnColor: { type: 'text', label: 'Màu chữ Nút (Hero)' },
        heroBtnLink: { type: 'text', label: 'Link nút (Hero)' },
        heroImage: { type: 'text', label: 'Hình ảnh (Hero)' },
        featuresTitle: { type: 'text', label: 'Tiêu đề Giải pháp', contentEditable: true },
        featuresTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề Giải pháp' },
        features: {
          type: 'array',
          label: 'Danh sách Giải pháp',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
            desc: { type: 'textarea', label: 'Mô tả', contentEditable: true },
            descColor: { type: 'text', label: 'Màu chữ Mô tả' }
          },
          getItemSummary: (item) => item.title || 'Giải pháp'
        },
        processTitle: { type: 'text', label: 'Tiêu đề Quy trình', contentEditable: true },
        processTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề Quy trình' },
        processSubtitle: { type: 'text', label: 'Mô tả Quy trình', contentEditable: true },
        processSubtitleColor: { type: 'text', label: 'Màu chữ Mô tả Quy trình' },
        processSteps: {
          type: 'array',
          label: 'Các bước Quy trình',
          arrayFields: {
            step: { type: 'text', label: 'Số thứ tự', contentEditable: true },
            stepColor: { type: 'text', label: 'Màu chữ Số thứ tự' },
            title: { type: 'text', label: 'Tiêu đề bước', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ Tiêu đề bước' }
          },
          getItemSummary: (item) => item.title || 'Bước'
        },
        ctaTitle: { type: 'text', label: 'Tiêu đề CTA', contentEditable: true },
        ctaTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề CTA' },
        ctaDesc: { type: 'textarea', label: 'Mô tả CTA', contentEditable: true },
        ctaDescColor: { type: 'text', label: 'Màu chữ Mô tả CTA' },
        ctaButtons: {
          type: 'array',
          label: 'Danh sách Nút CTA',
          arrayFields: {
            text: { type: 'text', label: 'Tên nút', contentEditable: true },
            textColor: { type: 'text', label: 'Màu chữ Nút' },
            link: { type: 'text', label: 'Đường dẫn' },
            variant: {
              type: 'select',
              label: 'Kiểu nút',
              options: [
                { label: 'Viền sáng (Phụ)', value: 'outline' },
                { label: 'Nền cam (Chính)', value: 'solid' }
              ]
            }
          },
          getItemSummary: (item) => item.text || 'Nút'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Dịch vụ > Giải pháp công nghệ',
        heroTitle: 'Giải pháp công nghệ',
        heroTitleColor: '#eab308',
        heroDesc: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.',
        heroDescColor: '#374151',
        heroBtnText: 'Liên hệ tư vấn',
        heroBtnColor: '#ffffff',
        heroBtnLink: '/vi/trang-chu#lien-he',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
        featuresTitle: 'Giải pháp nổi bật',
        featuresTitleColor: '#111827',
        features: [
          { title: 'Phát triển phần mềm theo yêu cầu', titleColor: '#111827', desc: 'Thiết kế và xây dựng phần mềm "đo ni đóng giày" theo quy trình vận hành riêng của doanh nghiệp, giúp tối ưu hiệu suất và tăng khả năng cạnh tranh.', descColor: '#374151' },
          { title: 'Giải pháp chuyển đổi số doanh nghiệp', titleColor: '#111827', desc: 'Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa quy trình và nâng cao trải nghiệm khách hàng.', descColor: '#374151' },
          { title: 'Xây dựng hệ thống nền tảng & tích hợp', titleColor: '#111827', desc: 'Phát triển hệ thống trung tâm (CRM, ERP, Dashboard...) và kết nối các nền tảng hiện có thành một hệ sinh thái đồng bộ, dữ liệu xuyên suốt.', descColor: '#374151' }
        ],
        processTitle: 'Quy trình thực hiện',
        processTitleColor: '#111827',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        processSubtitleColor: '#4b5563',
        processSteps: [
          { step: '01', stepColor: '#f59e0b', title: 'Khảo sát & phân tích yêu cầu', titleColor: '#111827' },
          { step: '02', stepColor: '#f59e0b', title: 'Thiết kế giải pháp & kiến trúc hệ thống', titleColor: '#111827' },
          { step: '03', stepColor: '#f59e0b', title: 'Phát triển & Thử nghiệm', titleColor: '#111827' },
          { step: '04', stepColor: '#f59e0b', title: 'Triển khai & Bảo trì', titleColor: '#111827' }
        ],
        ctaTitle: 'Sẵn sàng triển khai?',
        ctaTitleColor: '#ffffff',
        ctaDesc: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        ctaDescColor: 'rgba(255, 255, 255, 0.8)',
        ctaButtons: [
          { text: 'Về trang chủ', textColor: '#ffffff', link: '/vi/trang-chu', variant: 'outline' },
          { text: 'Liên hệ ngay', textColor: '#ffffff', link: '/vi/trang-chu#lien-he', variant: 'solid' }
        ],
        background: { type: 'color', color: '#f8fafc' },
        animate: true
      },
      render: (props) => <AdminGiaiPhapCN {...props} />
    },

    GiaiPhapTC: {
      label: 'Giải pháp Thi công & Lắp đặt',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        heroTitle: { type: 'text', label: 'Tiêu đề (Hero)', contentEditable: true },
        heroTitleColor: { type: 'text', label: 'Màu Tiêu đề (Hero)' },
        heroDesc: { type: 'textarea', label: 'Mô tả (Hero)', contentEditable: true },
        heroDescColor: { type: 'text', label: 'Màu Mô tả (Hero)' },
        heroBtnText: { type: 'text', label: 'Tên nút (Hero)', contentEditable: true },
        heroBtnColor: { type: 'text', label: 'Màu chữ Nút (Hero)' },
        heroBtnLink: { type: 'text', label: 'Link nút (Hero)' },
        heroImage: { type: 'text', label: 'Hình ảnh (Hero)' },
        featuresTitle: { type: 'text', label: 'Tiêu đề Giải pháp', contentEditable: true },
        featuresTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề Giải pháp' },
        features: {
          type: 'array',
          label: 'Danh sách Giải pháp',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
            desc: { type: 'textarea', label: 'Mô tả', contentEditable: true },
            descColor: { type: 'text', label: 'Màu chữ Mô tả' }
          },
          getItemSummary: (item) => item.title || 'Giải pháp'
        },
        processTitle: { type: 'text', label: 'Tiêu đề Quy trình', contentEditable: true },
        processTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề Quy trình' },
        processSubtitle: { type: 'text', label: 'Mô tả Quy trình', contentEditable: true },
        processSubtitleColor: { type: 'text', label: 'Màu chữ Mô tả Quy trình' },
        processSteps: {
          type: 'array',
          label: 'Các bước Quy trình',
          arrayFields: {
            step: { type: 'text', label: 'Số thứ tự', contentEditable: true },
            stepColor: { type: 'text', label: 'Màu chữ Số thứ tự' },
            title: { type: 'text', label: 'Tiêu đề bước', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ Tiêu đề bước' }
          },
          getItemSummary: (item) => item.title || 'Bước'
        },
        ctaTitle: { type: 'text', label: 'Tiêu đề CTA', contentEditable: true },
        ctaTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề CTA' },
        ctaDesc: { type: 'textarea', label: 'Mô tả CTA', contentEditable: true },
        ctaDescColor: { type: 'text', label: 'Màu chữ Mô tả CTA' },
        ctaButtons: {
          type: 'array',
          label: 'Danh sách Nút CTA',
          arrayFields: {
            text: { type: 'text', label: 'Tên nút', contentEditable: true },
            textColor: { type: 'text', label: 'Màu chữ Nút' },
            link: { type: 'text', label: 'Đường dẫn' },
            variant: {
              type: 'select',
              label: 'Kiểu nút',
              options: [
                { label: 'Viền sáng (Phụ)', value: 'outline' },
                { label: 'Nền cam (Chính)', value: 'solid' }
              ]
            }
          },
          getItemSummary: (item) => item.text || 'Nút'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Dịch vụ > Giải pháp thi công & lắp đặt',
        heroTitle: 'Giải pháp thi công & lắp đặt',
        heroTitleColor: '#eab308',
        heroDesc: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.',
        heroDescColor: '#374151',
        heroBtnText: 'Liên hệ tư vấn',
        heroBtnColor: '#ffffff',
        heroBtnLink: '/vi/trang-chu#lien-he',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
        featuresTitle: 'Giải pháp nổi bật',
        featuresTitleColor: '#111827',
        features: [
          { title: 'Đánh giá hiện trạng & mức độ trưởng thành số', titleColor: '#111827', desc: 'Phân tích toàn diện hệ thống, quy trình và năng lực công nghệ hiện tại, từ đó xác định mức độ sẵn sàng chuyển đổi số của doanh nghiệp.', descColor: '#374151' },
          { title: 'Xây dựng chiến lược chuyển đổi số tổng thể', titleColor: '#111827', desc: 'Tư vấn lộ trình chuyển đổi số theo từng giai đoạn, phù hợp với mục tiêu kinh doanh, nguồn lực và ngành nghề của doanh nghiệp.', descColor: '#374151' },
          { title: 'Tư vấn lựa chọn công nghệ & giải pháp triển khai', titleColor: '#111827', desc: 'Đề xuất các nền tảng, công nghệ và mô hình triển khai tối ưu (Cloud, AI, Data, CRM, ERP…), đảm bảo hiệu quả đầu tư và khả năng mở rộng.', descColor: '#374151' }
        ],
        processTitle: 'Quy trình thực hiện',
        processTitleColor: '#111827',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        processSubtitleColor: '#4b5563',
        processSteps: [
          { step: '01', stepColor: '#f59e0b', title: 'Khảo sát & đánh giá doanh nghiệp', titleColor: '#111827' },
          { step: '02', stepColor: '#f59e0b', title: 'Xác định mục tiêu & định hướng chuyển đổi', titleColor: '#111827' },
          { step: '03', stepColor: '#f59e0b', title: 'Xây dựng lộ trình & giải pháp', titleColor: '#111827' },
          { step: '04', stepColor: '#f59e0b', title: 'Đồng hành triển khai & tối ưu', titleColor: '#111827' }
        ],
        ctaTitle: 'Sẵn sàng triển khai?',
        ctaTitleColor: '#ffffff',
        ctaDesc: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        ctaDescColor: 'rgba(255, 255, 255, 0.8)',
        ctaButtons: [
          { text: 'Về trang chủ', textColor: '#ffffff', link: '/vi/trang-chu', variant: 'outline' },
          { text: 'Liên hệ ngay', textColor: '#ffffff', link: '/vi/trang-chu#lien-he', variant: 'solid' }
        ],
        background: { type: 'color', color: '#f8fafc' },
        animate: true
      },
      render: (props) => <AdminGiaiPhapTC {...props} />
    },

    CungCapTB: {
      label: 'Cung Cấp Thiết Bị CNTT',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        heroTitle: { type: 'text', label: 'Tiêu đề (Hero)', contentEditable: true },
        heroTitleColor: { type: 'text', label: 'Màu Tiêu đề (Hero)' },
        heroDesc: { type: 'textarea', label: 'Mô tả (Hero)', contentEditable: true },
        heroDescColor: { type: 'text', label: 'Màu Mô tả (Hero)' },
        heroBtnText: { type: 'text', label: 'Tên nút (Hero)', contentEditable: true },
        heroBtnColor: { type: 'text', label: 'Màu chữ Nút (Hero)' },
        heroBtnLink: { type: 'text', label: 'Link nút (Hero)' },
        heroImage: { type: 'text', label: 'Hình ảnh (Hero)' },
        featuresTitle: { type: 'text', label: 'Tiêu đề Giải pháp', contentEditable: true },
        featuresTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề Giải pháp' },
        features: {
          type: 'array',
          label: 'Danh sách Giải pháp',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
            desc: { type: 'textarea', label: 'Mô tả', contentEditable: true },
            descColor: { type: 'text', label: 'Màu chữ Mô tả' }
          },
          getItemSummary: (item) => item.title || 'Giải pháp'
        },
        processTitle: { type: 'text', label: 'Tiêu đề Quy trình', contentEditable: true },
        processTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề Quy trình' },
        processSubtitle: { type: 'text', label: 'Mô tả Quy trình', contentEditable: true },
        processSubtitleColor: { type: 'text', label: 'Màu chữ Mô tả Quy trình' },
        processSteps: {
          type: 'array',
          label: 'Các bước Quy trình',
          arrayFields: {
            step: { type: 'text', label: 'Số thứ tự', contentEditable: true },
            stepColor: { type: 'text', label: 'Màu chữ Số thứ tự' },
            title: { type: 'text', label: 'Tiêu đề bước', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ Tiêu đề bước' }
          },
          getItemSummary: (item) => item.title || 'Bước'
        },
        ctaTitle: { type: 'text', label: 'Tiêu đề CTA', contentEditable: true },
        ctaTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề CTA' },
        ctaDesc: { type: 'textarea', label: 'Mô tả CTA', contentEditable: true },
        ctaDescColor: { type: 'text', label: 'Màu chữ Mô tả CTA' },
        ctaButtons: {
          type: 'array',
          label: 'Danh sách Nút CTA',
          arrayFields: {
            text: { type: 'text', label: 'Tên nút', contentEditable: true },
            textColor: { type: 'text', label: 'Màu chữ Nút' },
            link: { type: 'text', label: 'Đường dẫn' },
            variant: {
              type: 'select',
              label: 'Kiểu nút',
              options: [
                { label: 'Viền sáng (Phụ)', value: 'outline' },
                { label: 'Nền cam (Chính)', value: 'solid' }
              ]
            }
          },
          getItemSummary: (item) => item.text || 'Nút'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Dịch vụ > Cung cấp thiết bị CNTT',
        heroTitle: 'Cung cấp thiết bị CNTT',
        heroTitleColor: '#eab308',
        heroDesc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.',
        heroDescColor: '#374151',
        heroBtnText: 'Liên hệ Tư vấn',
        heroBtnColor: '#ffffff',
        heroBtnLink: '/vi/trang-chu#lien-he',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
        featuresTitle: 'Giải pháp nổi bật',
        featuresTitleColor: '#111827',
        features: [
          { title: 'Xây dựng hệ thống dữ liệu tập trung', titleColor: '#111827', desc: 'Thiết kế và triển khai hệ thống lưu trữ dữ liệu tập trung, giúp doanh nghiệp quản lý, đồng bộ và khai thác dữ liệu hiệu quả.', descColor: '#374151' },
          { title: 'Phân tích dữ liệu & trực quan hóa', titleColor: '#111827', desc: 'Khai thác dữ liệu thông qua báo cáo, dashboard và mô hình phân tích, hỗ trợ ra quyết định nhanh và chính xác.', descColor: '#374151' },
          { title: 'Ứng dụng AI & Machine Learning', titleColor: '#111827', desc: 'Triển khai các mô hình AI như dự đoán, phân loại, chatbot, nhận diện hình ảnh… giúp tự động hóa và tối ưu vận hành.', descColor: '#374151' }
        ],
        processTitle: 'Quy trình thực hiện',
        processTitleColor: '#111827',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        processSubtitleColor: '#4b5563',
        processSteps: [
          { step: '01', stepColor: '#f59e0b', title: 'Thu thập & chuẩn hóa dữ liệu', titleColor: '#111827' },
          { step: '02', stepColor: '#f59e0b', title: 'Thiết kế kiến trúc dữ liệu', titleColor: '#111827' },
          { step: '03', stepColor: '#f59e0b', title: 'Phát triển mô hình & hệ thống', titleColor: '#111827' },
          { step: '04', stepColor: '#f59e0b', title: 'Triển khai & tối ưu liên tục', titleColor: '#111827' }
        ],
        ctaTitle: 'Sẵn sàng triển khai?',
        ctaTitleColor: '#ffffff',
        ctaDesc: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        ctaDescColor: 'rgba(255, 255, 255, 0.8)',
        ctaButtons: [
          { text: 'Về trang chủ', textColor: '#ffffff', link: '/vi/trang-chu', variant: 'outline' },
          { text: 'Liên hệ ngay', textColor: '#ffffff', link: '/vi/trang-chu#lien-he', variant: 'solid' }
        ],
        background: { type: 'color', color: '#f8fafc' },
        animate: true
      },
      render: (props) => <AdminCungCapTB {...props} />
    },

    DichVuCNTT: {
      label: 'Dịch Vụ CNTT',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        heroTitle: { type: 'text', label: 'Tiêu đề (Hero)', contentEditable: true },
        heroTitleColor: { type: 'text', label: 'Màu Tiêu đề (Hero)' },
        heroDesc: { type: 'textarea', label: 'Mô tả (Hero)', contentEditable: true },
        heroDescColor: { type: 'text', label: 'Màu Mô tả (Hero)' },
        heroBtnText: { type: 'text', label: 'Tên nút (Hero)', contentEditable: true },
        heroBtnColor: { type: 'text', label: 'Màu chữ Nút (Hero)' },
        heroBtnLink: { type: 'text', label: 'Link nút (Hero)' },
        heroImage: { type: 'text', label: 'Hình ảnh (Hero)' },
        featuresTitle: { type: 'text', label: 'Tiêu đề Giải pháp', contentEditable: true },
        featuresTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề Giải pháp' },
        features: {
          type: 'array',
          label: 'Danh sách Giải pháp',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
            desc: { type: 'textarea', label: 'Mô tả', contentEditable: true },
            descColor: { type: 'text', label: 'Màu chữ Mô tả' }
          },
          getItemSummary: (item) => item.title || 'Giải pháp'
        },
        processTitle: { type: 'text', label: 'Tiêu đề Quy trình', contentEditable: true },
        processTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề Quy trình' },
        processSubtitle: { type: 'text', label: 'Mô tả Quy trình', contentEditable: true },
        processSubtitleColor: { type: 'text', label: 'Màu chữ Mô tả Quy trình' },
        processSteps: {
          type: 'array',
          label: 'Các bước Quy trình',
          arrayFields: {
            step: { type: 'text', label: 'Số thứ tự', contentEditable: true },
            stepColor: { type: 'text', label: 'Màu chữ Số thứ tự' },
            title: { type: 'text', label: 'Tiêu đề bước', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ Tiêu đề bước' }
          },
          getItemSummary: (item) => item.title || 'Bước'
        },
        ctaTitle: { type: 'text', label: 'Tiêu đề CTA', contentEditable: true },
        ctaTitleColor: { type: 'text', label: 'Màu chữ Tiêu đề CTA' },
        ctaDesc: { type: 'textarea', label: 'Mô tả CTA', contentEditable: true },
        ctaDescColor: { type: 'text', label: 'Màu chữ Mô tả CTA' },
        ctaButtons: {
          type: 'array',
          label: 'Danh sách Nút CTA',
          arrayFields: {
            text: { type: 'text', label: 'Tên nút', contentEditable: true },
            textColor: { type: 'text', label: 'Màu chữ Nút' },
            link: { type: 'text', label: 'Đường dẫn' },
            variant: {
              type: 'select',
              label: 'Kiểu nút',
              options: [
                { label: 'Viền sáng (Phụ)', value: 'outline' },
                { label: 'Nền cam (Chính)', value: 'solid' }
              ]
            }
          },
          getItemSummary: (item) => item.text || 'Nút'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Dịch vụ > Dịch vụ Công nghệ thông tin',
        heroTitle: 'Dịch vụ Công nghệ thông tin',
        heroTitleColor: '#eab308',
        heroDesc: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.',
        heroDescColor: '#374151',
        heroBtnText: 'Liên hệ tư vấn',
        heroBtnColor: '#ffffff',
        heroBtnLink: '/vi/trang-chu#lien-he',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
        featuresTitle: 'Giải pháp nổi bật',
        featuresTitleColor: '#111827',
        features: [
          { title: 'Giải pháp hệ thống camera giám sát', titleColor: '#111827', desc: 'Thiết kế và lắp đặt hệ thống camera an ninh cho văn phòng, nhà xưởng, cửa hàng… với khả năng giám sát từ xa, lưu trữ và cảnh báo thông minh.', descColor: '#374151' },
          { title: 'Giải pháp mạng WiFi doanh nghiệp', titleColor: '#111827', desc: 'Triển khai hệ thống WiFi phủ sóng ổn định, bảo mật cao, đáp ứng số lượng lớn người dùng và thiết bị trong môi trường doanh nghiệp.', descColor: '#374151' },
          { title: 'Giải pháp hạ tầng mạng & tích hợp', titleColor: '#111827', desc: 'Thi công hệ thống mạng tổng thể (LAN, Switch, Router, Server…), đồng bộ với camera và WiFi để đảm bảo vận hành xuyên suốt.', descColor: '#374151' }
        ],
        processTitle: 'Quy trình thực hiện',
        processTitleColor: '#111827',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        processSubtitleColor: '#4b5563',
        processSteps: [
          { step: '01', stepColor: '#f59e0b', title: 'Khảo sát & tư vấn giải pháp', titleColor: '#111827' },
          { step: '02', stepColor: '#f59e0b', title: 'Thiết kế sơ đồ & cấu hình hệ thống', titleColor: '#111827' },
          { step: '03', stepColor: '#f59e0b', title: 'Thi công & lắp đặt', titleColor: '#111827' },
          { step: '04', stepColor: '#f59e0b', title: 'Bàn giao & bảo trì', titleColor: '#111827' }
        ],
        ctaTitle: 'Sẵn sàng triển khai?',
        ctaTitleColor: '#ffffff',
        ctaDesc: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        ctaDescColor: 'rgba(255, 255, 255, 0.8)',
        ctaButtons: [
          { text: 'Về trang chủ', textColor: '#ffffff', link: '/vi/trang-chu', variant: 'outline' },
          { text: 'Liên hệ ngay', textColor: '#ffffff', link: '/vi/trang-chu#lien-he', variant: 'solid' }
        ],
        background: { type: 'color', color: '#f8fafc' },
        animate: true
      },
      render: (props) => <AdminDichVuCNTT {...props} />
    },

    BaiViet: {
      label: 'Bài Viết',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        title: { type: 'text', label: 'Tiêu đề trang', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
        subtitle: { type: 'textarea', label: 'Mô tả trang', contentEditable: true },
        subtitleColor: { type: 'text', label: 'Màu chữ Mô tả' },
        sidebarTitle: { type: 'text', label: 'Tiêu đề Sidebar', contentEditable: true },
        postLinkText: { type: 'text', label: 'Chữ link bài viết', contentEditable: true },
        serviceLinkText: { type: 'text', label: 'Chữ link dịch vụ', contentEditable: true },
        viewAllServicesText: { type: 'text', label: 'Chữ nút xem dv', contentEditable: true, default: 'Xem tất cả dịch vụ' },
        viewAllServicesUrl: { type: 'text', label: 'Link nút xem dv' },
        posts: {
          type: 'array',
          label: 'Danh sách bài viết chính',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề bài viết', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
            image: { type: 'text', label: 'Link ảnh bìa' },
            category: { type: 'text', label: 'Danh mục', contentEditable: true },
            date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            descColor: { type: 'text', label: 'Màu chữ mô tả', default: '#4b5563' },
            url: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title || 'Bài viết'
        },
        services: {
          type: 'array',
          label: 'Danh sách dịch vụ (Sidebar)',
          arrayFields: {
            title: { type: 'text', label: 'Tên dịch vụ', contentEditable: true },
            image: { type: 'text', label: 'Link ảnh' },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn dịch vụ' }
          },
          getItemSummary: (item) => item.title || 'Dịch vụ'
        },
        emptyText: { type: 'text', label: 'Câu thông báo trống', contentEditable: true },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Tin tức',
        title: 'Tin tức',
        titleColor: '#eab308',
        subtitle: 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.',
        subtitleColor: '#374151',
        sidebarTitle: 'Dịch vụ của chúng tôi',
        postLinkText: 'Xem thêm',
        serviceLinkText: 'Tìm hiểu thêm',
        viewAllServicesText: 'Xem tất cả dịch vụ',
        viewAllServicesUrl: '/vi/trang-chu#linh-vuc-hoat-dong',
        emptyText: 'Chưa có bài viết nào.',
        posts: [
          { title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg', category: 'Hoạt động', date: '26 tháng 6, 2026', description: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra...', descColor: '#4b5563', url: '#' },
          { title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg', category: 'Hoạt động', date: '26 tháng 6, 2026', description: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến...', descColor: '#4b5563', url: '#' },
          { title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg', category: 'Sự kiện', date: '26 tháng 6, 2026', description: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé \'Lục Giác\' để chọn cho mình những siêu phẩm ...', descColor: '#4b5563', url: '#' },
          { title: 'Bài viết 4', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png', category: 'Tin tức', date: '25 tháng 6, 2026', description: 'Bài viết 4', descColor: '#4b5563', url: '#' },
          { title: 'Bài viết 5', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg', category: 'Tin tức', date: '25 tháng 6, 2026', description: 'Bài viết 5', descColor: '#4b5563', url: '#' }
        ],
        services: [
          { title: 'Giải pháp công nghệ', image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg', description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.', url: '/vi/trang-giai-phap-cong-nghe' },
          { title: 'Giải pháp thi công & lắp đặt', image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg', description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.', url: '#' },
          { title: 'Cung cấp thiết bị CNTT', image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg', description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.', url: '#' },
          { title: 'Dịch vụ Công nghệ thông tin', image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg', description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.', url: '#' }
        ],
        background: { type: 'color', color: '#F8FAFC' },
        animate: true
      },
      render: (props) => <AdminBaiViet {...props} />
    },

    KhongKhiTungBung: {
      label: 'Không Khí Tưng Bừng',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        title: { type: 'textarea', label: 'Tiêu đề trang', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
        date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
        time: { type: 'text', label: 'Giờ đăng', contentEditable: true },
        category: { type: 'text', label: 'Danh mục', contentEditable: true },
        metaColor: { type: 'text', label: 'Màu chữ Meta' },
        summary: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        image: { type: 'text', label: 'Link ảnh chính' },
        body: { type: 'textarea', label: 'Nội dung HTML/Text', contentEditable: true },
        tags: { type: 'text', label: 'Hashtags', contentEditable: true },
        contactInfo: { type: 'textarea', label: 'Thông tin liên hệ', contentEditable: true },
        sidebarTitle: { type: 'text', label: 'Tiêu đề Sidebar', contentEditable: true },
        backLinkText: { type: 'text', label: 'Chữ link quay lại', contentEditable: true, default: 'Quay lại danh sách' },
        backLinkUrl: { type: 'text', label: 'Link quay lại' },
        noServiceText: { type: 'text', label: 'Chữ khi không có dịch vụ', contentEditable: true, default: 'Chưa có dịch vụ nào' },
        serviceLinkText: { type: 'text', label: 'Chữ link dịch vụ', contentEditable: true },
        viewAllServicesText: { type: 'text', label: 'Chữ nút xem dv', contentEditable: true, default: 'Xem tất cả dịch vụ' },
        viewAllServicesUrl: { type: 'text', label: 'Link nút xem dv' },
        services: {
          type: 'array',
          label: 'Danh sách dịch vụ (Sidebar)',
          arrayFields: {
            title: { type: 'text', label: 'Tên dịch vụ', contentEditable: true },
            image: { type: 'text', label: 'Link ảnh' },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn dịch vụ' }
          },
          getItemSummary: (item) => item.title || 'Dịch vụ'
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề bài viết liên quan', contentEditable: true },
        relatedPosts: {
          type: 'array',
          label: 'Danh sách bài viết liên quan',
          arrayFields: {
            title: { type: 'textarea', label: 'Tiêu đề bài viết', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
            image: { type: 'text', label: 'Link ảnh bìa' },
            date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title || 'Bài viết'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Bài viết > Hoạt động > Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
        title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
        titleColor: '#111827',
        date: '26 tháng 6, 2026',
        time: '02:54',
        category: 'Tiếng Việt',
        metaColor: '#6b7280',
        summary: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra tại khu nghỉ dưỡng Vinpearl Nha Trang.',
        image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
        body: 'Hòa chung không khí rực lửa, đại gia đình HHC đã cùng nhau tham gia các hoạt động tham quan, dã ngoại và tăng cường sự gắn kết tại vùng đảo xinh đẹp của Vinpearl Nha Trang. Tại đây, các thành viên cùng người thân đã được trải nghiệm những giây phút ý nghĩa, ấm áp và tận hưởng những giá trị xứng đáng.\n\nTeambuilding không chỉ là hoạt động để gắn kết tình đồng đội mà còn là dịp để toàn thể các đơn vị, tập thể, và cá nhân cùng nhau nhìn lại và tự hào về những thành tựu đã gặt hái, cũng như những khó khăn, trở ngại mà chúng ta đã cùng nhau vượt qua. Đây chính là bước đà hoàn hảo để chuẩn bị cho một sự khởi đầu trọn vẹn niềm vui, hứa hẹn một hành trình mới với nhiều thắng lợi hơn nữa!\n\nTạm biệt Vinpearl Nha Trang với vô vàn kỷ niệm đẹp, chúng ta hãy cùng nhau mang nguồn năng lượng tích cực này trở lại công việc, tiếp tục đồng lòng, đoàn kết và vững bước tiến lên để chinh phục những mục tiêu lớn hơn.\nHHC - Sẵn sàng bứt phá!',
        tags: '#HexagonCorporation #SGD #Technology',
        contactInfo: 'HEXAGON CORPORATION\nAddress: 615 Au Co Str, Tan Phu Ward, HCMC\nHotline: +84 70 390 9333',
        sidebarTitle: 'Dịch vụ của chúng tôi',
        backLinkText: 'Quay lại danh sách',
        backLinkUrl: '#',
        noServiceText: 'Chưa có dịch vụ nào',
        serviceLinkText: 'Tìm hiểu thêm',
        viewAllServicesText: 'Xem tất cả dịch vụ',
        viewAllServicesUrl: '/vi/trang-chu#linh-vuc-hoat-dong',
        services: [
          { title: 'Giải pháp công nghệ', image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg', description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.', url: '/vi/trang-giai-phap-cong-nghe' },
          { title: 'Giải pháp thi công & lắp đặt', image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg', description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.', url: '#' },
          { title: 'Cung cấp thiết bị CNTT', image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg', description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.', url: '#' },
          { title: 'Dịch vụ Công nghệ thông tin', image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg', description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.', url: '#' }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedPosts: [
          { title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg', date: '26 tháng 6, 2026', url: '#' }
        ],
        background: { type: 'color', color: '#F8FAFC' },
        animate: true
      },
      render: (props) => <AdminKhongKhiTungBung {...props} />
    },

    DongHanh: {
      label: 'Đồng Hành Cùng Sinh Viên',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        title: { type: 'textarea', label: 'Tiêu đề trang', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
        date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
        time: { type: 'text', label: 'Giờ đăng', contentEditable: true },
        category: { type: 'text', label: 'Danh mục', contentEditable: true },
        metaColor: { type: 'text', label: 'Màu chữ Meta' },
        summary: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        image: { type: 'text', label: 'Link ảnh chính' },
        body: { type: 'textarea', label: 'Nội dung HTML/Text', contentEditable: true },
        tags: { type: 'text', label: 'Hashtags', contentEditable: true },
        contactInfo: { type: 'textarea', label: 'Thông tin liên hệ', contentEditable: true },
        sidebarTitle: { type: 'text', label: 'Tiêu đề Sidebar', contentEditable: true },
        backLinkText: { type: 'text', label: 'Chữ link quay lại', contentEditable: true, default: 'Quay lại danh sách' },
        backLinkUrl: { type: 'text', label: 'Link quay lại' },
        noServiceText: { type: 'text', label: 'Chữ khi không có dịch vụ', contentEditable: true, default: 'Chưa có dịch vụ nào' },
        serviceLinkText: { type: 'text', label: 'Chữ link dịch vụ', contentEditable: true },
        viewAllServicesText: { type: 'text', label: 'Chữ nút xem dv', contentEditable: true, default: 'Xem tất cả dịch vụ' },
        viewAllServicesUrl: { type: 'text', label: 'Link nút xem dv' },
        services: {
          type: 'array',
          label: 'Danh sách dịch vụ (Sidebar)',
          arrayFields: {
            title: { type: 'text', label: 'Tên dịch vụ', contentEditable: true },
            image: { type: 'text', label: 'Link ảnh' },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn dịch vụ' }
          },
          getItemSummary: (item) => item.title || 'Dịch vụ'
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề bài viết liên quan', contentEditable: true },
        relatedPosts: {
          type: 'array',
          label: 'Danh sách bài viết liên quan',
          arrayFields: {
            title: { type: 'textarea', label: 'Tiêu đề bài viết', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
            image: { type: 'text', label: 'Link ảnh bìa' },
            date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title || 'Bài viết'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Bài viết > Hoạt động > Đồng hành cùng sinh viên Đại học Văn Hiến tại...',
        title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
        titleColor: '#111827',
        date: '26 tháng 6, 2026',
        time: '01:25',
        category: 'Tiếng Việt',
        metaColor: '#6b7280',
        summary: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trong chương trình "VHE Startup Devote".\n\nTrong khuôn khổ cuộc thi, Lục Giác đã hỗ trợ các bạn sinh viên xây dựng mô hình kinh doanh thiết bị công nghệ điện tử, đồng thời chia sẻ phương pháp trình bày kế hoạch kinh doanh chuyên nghiệp và khả thi.',
        image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
        body: 'Với kinh nghiệm thực tế từ doanh nghiệp cùng sự sáng tạo và linh hoạt của các bạn sinh viên, đội myU đã xuất sắc chinh phục ban giám khảo và mang về giải thưởng cao nhất - Giải Nhất Khởi Nghiệp.\n\nThành công này không chỉ khẳng định sự chuyên nghiệp và tiềm năng của sinh viên Đại học Văn Hiến, mà còn thể hiện tầm nhìn phát triển mạnh mẽ của mô hình kinh doanh đến từ Lục Giác.\nLục Giác hy vọng sẽ tiếp tục đồng hành cùng các bạn sinh viên trong hành trình lan tỏa tinh thần khởi nghiệp trong kỷ nguyên số.',
        tags: '#HexagonCorporation #SGD #Technology',
        contactInfo: 'HEXAGON CORPORATION\nAddress: 615 Au Co Str, Tan Phu Ward, HCMC\nHotline: +84 70 390 9333',
        sidebarTitle: 'Dịch vụ của chúng tôi',
        backLinkText: 'Quay lại danh sách',
        backLinkUrl: '#',
        noServiceText: 'Chưa có dịch vụ nào',
        serviceLinkText: 'Tìm hiểu thêm',
        viewAllServicesText: 'Xem tất cả dịch vụ',
        viewAllServicesUrl: '/vi/trang-chu#linh-vuc-hoat-dong',
        services: [
          { title: 'Giải pháp thi công & lắp đặt', image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg', description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.', url: '#' },
          { title: 'Giải pháp công nghệ', image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg', description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.', url: '/vi/trang-giai-phap-cong-nghe' },
          { title: 'Cung cấp thiết bị CNTT', image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg', description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.', url: '#' },
          { title: 'Dịch vụ Công nghệ thông tin', image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg', description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.', url: '#' }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedPosts: [
          { title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg', date: '26 tháng 6, 2026', url: '#' }
        ],
        background: { type: 'color', color: '#F8FAFC' },
        animate: true
      },
      render: (props) => <AdminDongHanh {...props} />
    },

    SamTetCN: {
      label: 'Sắm Tết Công Nghệ',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        title: { type: 'textarea', label: 'Tiêu đề trang', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
        date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
        time: { type: 'text', label: 'Giờ đăng', contentEditable: true },
        category: { type: 'text', label: 'Danh mục', contentEditable: true },
        metaColor: { type: 'text', label: 'Màu chữ Meta' },
        summary: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        image: { type: 'text', label: 'Link ảnh chính' },
        body: { type: 'textarea', label: 'Nội dung HTML/Text', contentEditable: true },
        tags: { type: 'text', label: 'Hashtags', contentEditable: true },
        contactInfo: { type: 'textarea', label: 'Thông tin liên hệ', contentEditable: true },
        sidebarTitle: { type: 'text', label: 'Tiêu đề Sidebar', contentEditable: true },
        backLinkText: { type: 'text', label: 'Chữ link quay lại', contentEditable: true, default: 'Quay lại danh sách' },
        backLinkUrl: { type: 'text', label: 'Link quay lại' },
        noServiceText: { type: 'text', label: 'Chữ khi không có dịch vụ', contentEditable: true, default: 'Chưa có dịch vụ nào' },
        serviceLinkText: { type: 'text', label: 'Chữ link dịch vụ', contentEditable: true },
        viewAllServicesText: { type: 'text', label: 'Chữ nút xem dv', contentEditable: true, default: 'Xem tất cả dịch vụ' },
        viewAllServicesUrl: { type: 'text', label: 'Link nút xem dv' },
        services: {
          type: 'array',
          label: 'Danh sách dịch vụ (Sidebar)',
          arrayFields: {
            title: { type: 'text', label: 'Tên dịch vụ', contentEditable: true },
            image: { type: 'text', label: 'Link ảnh' },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn dịch vụ' }
          },
          getItemSummary: (item) => item.title || 'Dịch vụ'
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề bài viết liên quan', contentEditable: true },
        relatedPosts: {
          type: 'array',
          label: 'Danh sách bài viết liên quan',
          arrayFields: {
            title: { type: 'textarea', label: 'Tiêu đề bài viết', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
            image: { type: 'text', label: 'Link ảnh bìa' },
            date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title || 'Bài viết'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Bài viết > Sự kiện > Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu...',
        title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
        titleColor: '#111827',
        date: '26 tháng 6, 2026',
        time: '01:00',
        category: 'Tiếng Việt',
        metaColor: '#6b7280',
        summary: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé ‘Lục Giác’ để chọn cho mình những siêu phẩm hỗ trợ đắc lực cho công việc và giải trí:\nHiệu năng đỉnh cao.\nThiết kế thời thượng.\nGiá tốt bất ngờ kèm quà tặng Tết giá trị.',
        image: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
        body: 'Đừng chỉ bắt đầu năm mới - hãy chinh phục nó với những công cụ phù hợp!',
        tags: '#HexagonCorporation #SGD #Technology',
        contactInfo: '',
        sidebarTitle: 'Dịch vụ của chúng tôi',
        backLinkText: 'Quay lại danh sách',
        backLinkUrl: '#',
        noServiceText: 'Chưa có dịch vụ nào',
        serviceLinkText: 'Tìm hiểu thêm',
        viewAllServicesText: 'Xem tất cả dịch vụ',
        viewAllServicesUrl: '/vi/trang-chu#linh-vuc-hoat-dong',
        services: [
          { title: 'Giải pháp thi công & lắp đặt', image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg', description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.', url: '#' },
          { title: 'Giải pháp công nghệ', image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg', description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.', url: '/vi/trang-giai-phap-cong-nghe' },
          { title: 'Cung cấp thiết bị CNTT', image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg', description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.', url: '#' },
          { title: 'Dịch vụ Công nghệ thông tin', image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg', description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.', url: '#' }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedPosts: [
          { title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg', date: '26 tháng 6, 2026', url: '#' },
          { title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg', date: '26 tháng 6, 2026', url: '#' }
        ],
        background: { type: 'color', color: '#F8FAFC' },
        animate: true
      },
      render: (props) => <AdminSamTetCN {...props} />
    },

    BaiViet4: {
      label: 'Bài viết 4',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        title: { type: 'textarea', label: 'Tiêu đề trang', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
        date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
        time: { type: 'text', label: 'Giờ đăng', contentEditable: true },
        category: { type: 'text', label: 'Danh mục', contentEditable: true },
        metaColor: { type: 'text', label: 'Màu chữ Meta' },
        summary: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        image: { type: 'text', label: 'Link ảnh chính' },
        body: { type: 'textarea', label: 'Nội dung HTML/Text', contentEditable: true },
        tags: { type: 'text', label: 'Hashtags', contentEditable: true },
        contactInfo: { type: 'textarea', label: 'Thông tin liên hệ', contentEditable: true },
        sidebarTitle: { type: 'text', label: 'Tiêu đề Sidebar', contentEditable: true },
        backLinkText: { type: 'text', label: 'Chữ link quay lại', contentEditable: true, default: 'Quay lại danh sách' },
        backLinkUrl: { type: 'text', label: 'Link quay lại' },
        noServiceText: { type: 'text', label: 'Chữ khi không có dịch vụ', contentEditable: true, default: 'Chưa có dịch vụ nào' },
        serviceLinkText: { type: 'text', label: 'Chữ link dịch vụ', contentEditable: true },
        viewAllServicesText: { type: 'text', label: 'Chữ nút xem dv', contentEditable: true, default: 'Xem tất cả dịch vụ' },
        viewAllServicesUrl: { type: 'text', label: 'Link nút xem dv' },
        services: {
          type: 'array',
          label: 'Danh sách dịch vụ (Sidebar)',
          arrayFields: {
            title: { type: 'text', label: 'Tên dịch vụ', contentEditable: true },
            image: { type: 'text', label: 'Link ảnh' },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn dịch vụ' }
          },
          getItemSummary: (item) => item.title || 'Dịch vụ'
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề bài viết liên quan', contentEditable: true },
        relatedPosts: {
          type: 'array',
          label: 'Danh sách bài viết liên quan',
          arrayFields: {
            title: { type: 'textarea', label: 'Tiêu đề bài viết', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
            image: { type: 'text', label: 'Link ảnh bìa' },
            date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title || 'Bài viết'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Bài viết > Tin tức > Bài viết 4',
        title: 'Bài viết 4',
        titleColor: '#111827',
        date: '25 tháng 6, 2026',
        time: '18:58',
        category: 'Tiếng Việt',
        metaColor: '#6b7280',
        summary: '',
        image: '',
        body: 'Bài viết 4',
        tags: '',
        contactInfo: '',
        sidebarTitle: 'DỊCH VỤ CỦA CHÚNG TÔI',
        backLinkText: 'Quay lại danh sách',
        backLinkUrl: '#',
        noServiceText: 'Chưa có dịch vụ nào',
        serviceLinkText: 'Tìm hiểu thêm',
        viewAllServicesText: 'Xem tất cả dịch vụ',
        viewAllServicesUrl: '/vi/trang-chu#linh-vuc-hoat-dong',
        services: [
          { title: 'Giải pháp thi công & lắp đặt', image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg', description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.', url: '#' },
          { title: 'Giải pháp công nghệ', image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg', description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.', url: '/vi/trang-giai-phap-cong-nghe' },
          { title: 'Cung cấp thiết bị CNTT', image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg', description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.', url: '#' },
          { title: 'Dịch vụ Công nghệ thông tin', image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg', description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.', url: '#' }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedPosts: [
          { title: 'Bài viết 5', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg', date: '25 tháng 6, 2026', url: '#' }
        ],
        background: { type: 'color', color: '#F8FAFC' },
        animate: true
      },
      render: (props) => <AdminBaiViet4 {...props} />
    },

    BaiViet5: {
      label: 'Bài viết 5',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        title: { type: 'textarea', label: 'Tiêu đề trang', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu chữ Tiêu đề' },
        date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
        time: { type: 'text', label: 'Giờ đăng', contentEditable: true },
        category: { type: 'text', label: 'Danh mục', contentEditable: true },
        metaColor: { type: 'text', label: 'Màu chữ Meta' },
        summary: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        image: { type: 'text', label: 'Link ảnh chính' },
        body: { type: 'textarea', label: 'Nội dung HTML/Text', contentEditable: true },
        tags: { type: 'text', label: 'Hashtags', contentEditable: true },
        contactInfo: { type: 'textarea', label: 'Thông tin liên hệ', contentEditable: true },
        sidebarTitle: { type: 'text', label: 'Tiêu đề Sidebar', contentEditable: true },
        backLinkText: { type: 'text', label: 'Chữ link quay lại', contentEditable: true, default: 'Quay lại danh sách' },
        backLinkUrl: { type: 'text', label: 'Link quay lại' },
        noServiceText: { type: 'text', label: 'Chữ khi không có dịch vụ', contentEditable: true, default: 'Chưa có dịch vụ nào' },
        serviceLinkText: { type: 'text', label: 'Chữ link dịch vụ', contentEditable: true },
        viewAllServicesText: { type: 'text', label: 'Chữ nút xem dv', contentEditable: true, default: 'Xem tất cả dịch vụ' },
        viewAllServicesUrl: { type: 'text', label: 'Link nút xem dv' },
        services: {
          type: 'array',
          label: 'Danh sách dịch vụ (Sidebar)',
          arrayFields: {
            title: { type: 'text', label: 'Tên dịch vụ', contentEditable: true },
            image: { type: 'text', label: 'Link ảnh' },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn dịch vụ' }
          },
          getItemSummary: (item) => item.title || 'Dịch vụ'
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề bài viết liên quan', contentEditable: true },
        relatedPosts: {
          type: 'array',
          label: 'Danh sách bài viết liên quan',
          arrayFields: {
            title: { type: 'textarea', label: 'Tiêu đề bài viết', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu chữ tiêu đề', default: '#111827' },
            image: { type: 'text', label: 'Link ảnh bìa' },
            date: { type: 'text', label: 'Ngày đăng', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title || 'Bài viết'
        },
        background: BACKGROUND_FIELD,
        animate: ANIMATE_FIELD
      },
      defaultProps: {
        breadcrumb: 'Trang chủ > Bài viết > Tin tức > Bài viết 5',
        title: 'Bài viết 5',
        titleColor: '#111827',
        date: '25 tháng 6, 2026',
        time: '',
        category: 'Tiếng Việt',
        metaColor: '#6b7280',
        summary: '',
        image: '',
        body: 'Bài viết 5',
        tags: '',
        contactInfo: '',
        sidebarTitle: 'DỊCH VỤ CỦA CHÚNG TÔI',
        backLinkText: 'Quay lại danh sách',
        backLinkUrl: '#',
        noServiceText: 'Chưa có dịch vụ nào',
        serviceLinkText: 'Tìm hiểu thêm',
        viewAllServicesText: 'Xem tất cả dịch vụ',
        viewAllServicesUrl: '/vi/trang-chu#dich-vu',
        services: [
          { title: 'Giải pháp thi công & lắp đặt', image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg', description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.', url: '#' },
          { title: 'Giải pháp công nghệ', image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg', description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.', url: '/vi/trang-giai-phap-cong-nghe' },
          { title: 'Cung cấp thiết bị CNTT', image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg', description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.', url: '#' },
          { title: 'Dịch vụ Công nghệ thông tin', image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg', description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.', url: '#' }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedPosts: [
          { title: 'Bài viết 4', titleColor: '#111827', image: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg', date: '25 tháng 6, 2026', url: '#' }
        ],
        background: { type: 'color', color: '#F8FAFC' },
        animate: true
      },
      render: (props) => <AdminBaiViet5 {...props} />
    }
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero', 'Header', 'GioiThieu', 'LinhVucHoatDong', 'TinTuc', 'DoiTacLienKet', 'LienHe', 'GiaiPhapCN', 'GiaiPhapTC', 'CungCapTB', 'DichVuCNTT', 'BaiViet', 'KhongKhiTungBung', 'DongHanh', 'SamTetCN', 'BaiViet4', 'BaiViet5'] }
  ],

  // Root config
  root: {
    fields: {
      lang: {
        type: "select",
        label: "Ngôn ngữ trang",
        options: [
          { label: "Tiếng Việt (VI)", value: "vi" },
          { label: "English (EN)", value: "en" }
        ]
      }
    },
    defaultProps: {
      lang: "vi"
    },
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
