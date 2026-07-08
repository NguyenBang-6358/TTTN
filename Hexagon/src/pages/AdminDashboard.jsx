import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPages, deletePage, duplicatePage } from '../utils/db';

const AdminDashboard = () => {
  const [pages, setPages] = useState([]);
  const [langFilter, setLangFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = () => {
    setPages(getPages());
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa trang này?')) {
      deletePage(id);
      loadPages();
    }
  };

  const handleDuplicate = (id) => {
    const newId = duplicatePage(id);
    if (newId) {
      loadPages();
      alert('Nhân bản thành công! Vui lòng vào bản copy để dịch nội dung sang tiếng Anh.');
    }
  };

  const handleCreateNew = () => {
    // Generate a random ID for the new page and go to editor
    const newId = crypto.randomUUID();
    navigate(`/admin/edit/${newId}?new=true`);
  };

  const filteredPages = pages.filter(page => {
    if (langFilter === 'all') return true;
    return page.lang === langFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              📄 Quản lý Pages
            </h1>
            <p className="text-slate-500 mt-1">Tạo và quản lý các trang với PUCK Visual Builder</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>+</span> Tạo Page Mới
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="vi">Tiếng Việt (VI)</option>
              <option value="en">English (EN)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Tất cả</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày cập nhật</label>
            <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-[13px] font-medium text-slate-500">
                <th className="p-4">TIÊU ĐỀ</th>
                <th className="p-4">SLUG</th>
                <th className="p-4">NGÔN NGỮ</th>
                <th className="p-4">TRẠNG THÁI</th>
                <th className="p-4">CẬP NHẬT</th>
                <th className="p-4">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">Chưa có trang nào được tạo.</td>
                </tr>
              ) : filteredPages.map((page) => (
                <tr key={page.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">📄</span>
                      <div>
                        <div className="font-semibold text-slate-800">{page.title || 'Chưa có tiêu đề'}</div>
                        <div className="text-xs text-gray-500">SEO: {page.title || 'Chưa có tiêu đề'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#f8f9fa] text-slate-700 px-2.5 py-1.5 rounded text-[13px]">
                      {page.slug || '/'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${page.lang === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'}`}>
                      {page.lang?.toUpperCase() || 'VI'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      {page.status || 'Đã xuất bản'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {page.updatedAt ? new Date(page.updatedAt).toLocaleDateString('vi-VN') : 'N/A'}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => handleDuplicate(page.id)}
                        className="text-[#6366f1] hover:opacity-70 transition-opacity"
                        title="Tạo bản dịch EN"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      </button>
                      <Link
                        to={`/admin/edit/${page.id}`}
                        className="text-[#3b82f6] hover:opacity-70 transition-opacity"
                        title="Sửa trang"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="text-[#ef4444] hover:opacity-70 transition-opacity"
                        title="Xóa trang"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
