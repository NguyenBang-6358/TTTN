import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Puck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import puckConfig from '../admin-puck-config';
import { getPage, savePage } from '../utils/db';

const initialPuckData = {
  content: [],
  root: { props: { lang: 'vi' } }
};

const generateSlug = (text) => {
  if (!text) return '/';
  return '/' + text.toString().toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const AdminEditor = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('new') === 'true';

  const [pageData, setPageData] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (isNew) {
      setPageData(initialPuckData);
      setTitle('Trang mới');
      setSlug('/trang-moi');
    } else {
      const existingPage = getPage(pageId);
      if (existingPage) {
        setPageData(existingPage.puckData || initialPuckData);
        setTitle(existingPage.title || '');
        setSlug(existingPage.slug || '');
      } else {
        alert('Trang không tồn tại!');
        navigate('/admin');
      }
    }
  }, [pageId, isNew, navigate]);

  const handlePublish = async (data) => {
    // Extract lang from root props to save at top level
    const lang = data.root?.props?.lang || 'vi';
    
    savePage({
      id: pageId,
      title,
      slug,
      lang,
      status: 'Đã xuất bản',
      puckData: data
    });
    
    alert('Đã lưu trang thành công!');
    navigate('/admin');
  };

  if (!pageData) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col h-screen">
      {/* Editor Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Quay lại
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setTitle(newTitle);
                  if (!slugEdited) {
                    setSlug(generateSlug(newTitle));
                  }
                }}
                placeholder="Nhập tiêu đề trang..."
                className="font-bold text-lg outline-none text-slate-800 bg-transparent placeholder-gray-400 border-b border-dashed border-gray-300 focus:border-blue-500 pb-0.5 min-w-[200px]"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <span>Slug:</span>
              <input 
                type="text" 
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugEdited(true);
                }}
                placeholder="/duong-dan"
                className="outline-none bg-transparent border-b border-dashed border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden [&>div]:!h-full">
        <Puck
          config={puckConfig}
          data={pageData}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
};

export default AdminEditor;
