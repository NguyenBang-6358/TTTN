import React from 'react';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection, { AdminHeader, AdminFooter, AdminSanPhamMoi, AdminSanPham, AdminGioiThieu, AdminGioiThieuVeMetik, AdminVeChungToi, AdminKhachHang, AdminLienHe } from './components/admin-section';
import AdminHero from './components/admin-hero';

import banner1 from './assets/banner 1.webp';
import banner2 from './assets/banner 2.webp';
import hinh001 from './assets/hinh001.webp';
import hinh002 from './assets/hinh002.webp';
import hinh003 from './assets/hinh003.webp';

//Config — đăng ký 5 components với fields + defaultProps

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
        slides: {
          type: 'array',
          label: 'Danh sách Banner',
          arrayFields: {
            imageUrl: { type: 'text', label: 'Đường dẫn ảnh (URL)' }
          },
          getItemSummary: (item, index) => `Banner ${index + 1}`
        }
      },
      defaultProps: {
        slides: [
          { imageUrl: banner1 },
          { imageUrl: banner2 }
        ]
      },
      render: (props) => <AdminHero {...props} />
    },

    Header: {
      label: 'Header',
      fields: {
        logo: { type: 'text', label: 'URL Logo' },
        links: {
          type: 'array',
          label: 'Menu Links',
          arrayFields: {
            text: { type: 'text', label: 'Tên menu', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn' }
          },
          getItemSummary: (item) => item.text || 'Menu item'
        },
        socials: {
          type: 'array',
          label: 'Mạng xã hội',
          arrayFields: {
            platform: {
              type: 'select',
              label: 'Nền tảng',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Tiktok', value: 'tiktok' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Khác', value: 'other' }
              ]
            },
            url: { type: 'text', label: 'Link' }
          },
          getItemSummary: (item) => item.platform || 'Social item'
        }
      },
      defaultProps: {
        logo: 'https://metik.vn/wp-content/uploads/2026/06/logometik.png.webp',
        links: [
          { text: 'TRANG CHỦ', url: '/' },
          { text: 'GIỚI THIỆU', url: '/about' },
          { text: 'SẢN PHẨM', url: '/products' },
          { text: 'TIN TỨC', url: '/news' },
          { text: 'LIÊN HỆ', url: '/contact' }
        ],
        socials: [
          { platform: 'facebook', url: '#' },
          { platform: 'tiktok', url: '#' },
          { platform: 'linkedin', url: '#' }
        ]
      },
      render: (props) => <AdminHeader {...props} />
    },

    SanPhamMoi: {
      label: 'Sản Phẩm Mới',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        products: {
          type: 'array',
          label: 'Danh sách sản phẩm',
          arrayFields: {
            name: { type: 'text', label: 'Tên sản phẩm', contentEditable: true },
            image: { type: 'text', label: 'URL Ảnh' }
          },
          getItemSummary: (item) => item.name || 'Sản phẩm'
        }
      },
      defaultProps: {
        title: 'SẢN PHẨM MỚI',
        products: [
          { name: 'Snack vị Tảo biển', image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg.webp' },
          { name: 'Snack vị BBQ', image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg.webp' },
          { name: 'Snack vị Bắp', image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg.webp' },
          { name: 'Snack vị Phô mai', image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp' }
        ]
      },
      render: (props) => <AdminSanPhamMoi {...props} />
    },

    SanPham: {
      label: 'Sản Phẩm',
      fields: {
        breadcrumbs: {
          type: 'array',
          label: 'Đường dẫn (Breadcrumbs)',
          arrayFields: {
            text: { type: 'text', label: 'Tên mục' }
          },
          getItemSummary: (item) => item.text || 'Mục'
        },
        products: {
          type: 'array',
          label: 'Danh sách sản phẩm',
          arrayFields: {
            name: { type: 'text', label: 'Tên sản phẩm', contentEditable: true },
            image: { type: 'text', label: 'URL Ảnh' }
          },
          getItemSummary: (item) => item.name || 'Sản phẩm'
        }
      },
      defaultProps: {
        breadcrumbs: [
          { text: 'TRANG CHỦ' },
          { text: 'SẢN PHẨM' }
        ],
        products: [
          { name: 'Snack vị Bắp', image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg.webp' },
          { name: 'Snack vị BBQ', image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg.webp' },
          { name: 'Snack vị Phô mai', image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp' },
          { name: 'Snack vị Tảo biển', image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg.webp' }
        ]
      },
      render: (props) => <AdminSanPham {...props} />
    },

    adminGioiThieuVeMetik: {
      label: 'Giới Thiệu Về Metik',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        description: { type: 'textarea', label: 'Mô tả', contentEditable: true },
        blocks: {
          type: 'array',
          label: 'Các khối nội dung',
          arrayFields: {
            image: { type: 'text', label: 'URL Ảnh' },
            text: { type: 'textarea', label: 'Nội dung chữ', contentEditable: true },
            isList: {
              type: 'radio',
              label: 'Định dạng',
              options: [
                { label: 'Đoạn văn', value: 'false' },
                { label: 'Danh sách', value: 'true' }
              ]
            },
            imagePosition: {
              type: 'select',
              label: 'Vị trí ảnh',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Phải', value: 'right' }
              ]
            },
            listItems: {
              type: 'array',
              label: 'Các mục danh sách (nếu có)',
              arrayFields: {
                content: { type: 'textarea', label: 'Nội dung mục', contentEditable: true }
              },
              getItemSummary: (item, index) => item.content ? item.content.substring(0, 20) + '...' : `Mục ${index + 1}`
            }
          },
          getItemSummary: (item, index) => `Khối ${index + 1}`
        }
      },
      defaultProps: {
        title: 'GIỚI THIỆU VỀ METIK',
        description: 'metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.',
        blocks: [
          {
            image: hinh001,
            text: 'Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt. METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng. Sản phẩm được nghiên cứu với nhiều hương vị hấp dẫn như rong biển, bắp, phô mai, BBQ và các hương vị đặc trưng khác.',
            isList: 'false',
            imagePosition: 'left'
          },
          {
            image: hinh002,
            text: '',
            isList: 'true',
            listItems: [
              { content: 'Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.' },
              { content: 'Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.' },
              { content: 'Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.' }
            ],
            imagePosition: 'right'
          },
          {
            image: hinh003,
            text: 'Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.',
            isList: 'false',
            imagePosition: 'left'
          }
        ]
      },
      render: (props) => <AdminGioiThieuVeMetik {...props} />
    },

    adminGioiThieu: {
      label: 'Giới Thiệu',
      fields: {
        content: { type: 'textarea', label: 'Nội dung chữ' },
        videoPoster: { type: 'text', label: 'URL Ảnh bìa Video (nếu có)' },
        videoUrl: { type: 'text', label: 'URL Video' }
      },
      defaultProps: {
        content: 'Với tinh thần “Chạm mê tít – Snap into Joy”, metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, metik mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.\n\nmetik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.',
        videoPoster: '',
        videoUrl: 'https://metik.vn/wp-content/uploads/2026/06/METIK-ChamMeTit.mp4'
      },
      render: (props) => <AdminGioiThieu {...props} />
    },

    VeChungToi: {
      label: 'Về Chúng Tôi',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        content: { type: 'textarea', label: 'Nội dung chữ' },
        videoUrl: { type: 'text', label: 'URL Video' }
      },
      defaultProps: {
        title: 'VỀ CHÚNG TÔI',
        content: 'Với tinh thần “Chạm mê tít – Snap into Joy”, metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, metik mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.\n\nmetik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.',
        videoUrl: 'https://metik.vn/wp-content/uploads/2026/06/METIK-ChamMeTit.mp4'
      },
      render: (props) => <AdminVeChungToi {...props} />
    },

    KhachHang: {
      label: 'Khách Hàng Nói Gì',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        testimonials: {
          type: 'array',
          label: 'Danh sách ý kiến',
          arrayFields: {
            avatar: { type: 'text', label: 'URL Ảnh đại diện' },
            rating: {
              type: 'select',
              label: 'Số sao',
              options: [
                { label: '5 sao', value: 5 },
                { label: '4 sao', value: 4 },
                { label: '3 sao', value: 3 },
                { label: '2 sao', value: 2 },
                { label: '1 sao', value: 1 }
              ]
            },
            feedback: { type: 'textarea', label: 'Ý kiến khách hàng' },
            name: { type: 'text', label: 'Tên/Thông tin khách hàng' }
          },
          getItemSummary: (item) => item.name || 'Ý kiến mới'
        }
      },
      defaultProps: {
        title: 'KHÁCH HÀNG NÓI GÌ?',
        testimonials: [
          {
            avatar: 'https://metik.vn/wp-content/uploads/2021/05/huynhvinh.webp',
            rating: 5,
            feedback: 'Snack metik ăn vừa giòn, vừa ngon vừa cuốn miệng. Em thường lựa chọn để mang theo tới trường',
            name: 'Sinh viên Huỳnh Vĩnh, TP.HCM'
          },
          {
            avatar: 'https://metik.vn/wp-content/uploads/2021/05/myduyen.webp',
            rating: 5,
            feedback: '"metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu. Hy vọng nhãn hàng trong tương lai sẽ ra nhiều sản phẩm độc đáo hơn nữa."',
            name: 'Bạn Mỹ Duyên, Đồng Tháp'
          }
        ]
      },
      render: (props) => <AdminKhachHang {...props} />
    },

    LienHe: {
      label: 'Liên Hệ',
      fields: {
        mapUrl: { type: 'text', label: 'URL nhúng bản đồ' },
        height: { type: 'number', label: 'Chiều cao (px)', min: 200, max: 800 }
      },
      defaultProps: {
        mapUrl: 'https://maps.google.com/maps?q=C%C3%B4ng%20ty%20C%E1%BB%95%20Ph%E1%BA%A7n%20OCHAO%2C%20L%C3%B4%20C3-1%2C%20%C4%90%C6%B0%E1%BB%9Dng%20D2-N7%2C%20Khu%20C%C3%B4ng%20nghi%E1%BB%87p%20T%C3%A2n%20Ph%C3%BA%20Trung%2C%20X%C3%A3%20C%E1%BB%A7%20Chi%2C%20Tp.%20H%E1%BB%93%20Ch%C3%AD%20L%E1%BB%99%2C%20%C4%90%C6%B0%E1%BB%9Dng%20D2-N7%2FC3-1%20Ch%C3%AD%20L%C3%B4%20C3-1%2C%20Khu%20C%C3%B4ng%20nghi%E1%BB%87p%2C%20C%E1%BB%A7%20Chi%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%20700000%2C%20Vi%E1%BB%87t%20Nam&hl=vi&t=&z=16&ie=UTF8&iwloc=&output=embed',
        height: 550
      },
      render: (props) => <AdminLienHe {...props} />
    },

    Footer: {
      label: 'Footer',
      fields: {
        logo: { type: 'text', label: 'URL Logo' },
        description: { type: 'textarea', label: 'Mô tả', contentEditable: true },
        contactTitle: { type: 'text', label: 'Tiêu đề liên hệ', contentEditable: true },
        contacts: {
          type: 'array',
          label: 'Danh sách liên hệ',
          arrayFields: {
            type: {
              type: 'select',
              label: 'Loại',
              options: [
                { label: 'Điện thoại', value: 'phone' },
                { label: 'Email', value: 'email' },
                { label: 'Địa chỉ', value: 'location' }
              ]
            },
            text: { type: 'text', label: 'Nội dung', contentEditable: true }
          },
          getItemSummary: (item) => item.text || 'Liên hệ mới'
        },
        copyright: { type: 'text', label: 'Copyright', contentEditable: true }
      },
      defaultProps: {
        logo: 'https://metik.vn/wp-content/uploads/2026/06/logometik.png.webp',
        description: 'METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.',
        contactTitle: 'THÔNG TIN LIÊN HỆ',
        contacts: [
          { type: 'phone', text: '(+84) 79 721 3333' },
          { type: 'email', text: 'sale@ochao.vn' },
          { type: 'location', text: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM..' }
        ],
        copyright: 'Copyright 2026 © METIK. All rights reserved'
      },
      render: (props) => <AdminFooter {...props} />
    }
  },


  // Sidebar categories
  categoryGroups: [
    { title: 'Bố cục chính', components: ['Header', 'Section', 'Hero', 'Footer'] },
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image', 'SanPhamMoi', 'SanPham', 'adminGioiThieu', 'adminGioiThieuVeMetik', 'KhachHang', 'LienHe'] },
    { title: 'Nâng cao', components: ['Hero'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
