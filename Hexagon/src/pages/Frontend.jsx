import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Render } from '@puckeditor/core';
import puckConfig from '../admin-puck-config';
import { getPageBySlug } from '../utils/db';

const Frontend = () => {
  const location = useLocation();
  const [lang, setLang] = useState('vi'); // Default language
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // The slug is the path
  const slug = location.pathname;

  useEffect(() => {
    setLoading(true);
    // Find the page in DB that matches the current slug
    const page = getPageBySlug(slug);
    if (page && page.puckData) {
      setPageData(page.puckData);
      setLang(page.lang || 'vi'); // Cập nhật ngôn ngữ thực tế của trang
      document.title = page.title || 'Hexagon';
    } else {
      setPageData(null);
      document.title = '404 - Không tìm thấy trang';
    }
    setLoading(false);
  }, [slug]);

  const isInitialMount = React.useRef(true);

  useEffect(() => {
    // Check if it's a page reload (F5)
    const navEntries = window.performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    if (isInitialMount.current && isReload) {
      isInitialMount.current = false;
      const currentPath = window.location.pathname;
      const isHome = currentPath === '/' || currentPath === '/vi/trang-chu' || currentPath === '/en/trang-chu';
      
      if (!isHome) {
        window.location.href = currentPath.startsWith('/en') ? '/en/trang-chu' : '/vi/trang-chu';
        return;
      }

      if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      return;
    }

    isInitialMount.current = false;

    if (!loading && location.hash) {
      if (!window.location.hash) return; // Hash was cleared due to F5 reload

      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150); // Delay slightly to ensure Puck has rendered the components
      return () => clearTimeout(timer);
    }
  }, [loading, location.hash, pageData]);

  const toggleLang = (newLang) => {
    setLang(newLang);
  };

  return (
    <div className="min-h-screen bg-white">


      {/* Main Content Rendered by Puck */}
      <main>
        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-500">Đang tải nội dung...</div>
        ) : pageData ? (
          <Render config={puckConfig} data={pageData} />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center px-4">

            <p className="text-gray-500">
              Truy cập <a href="/admin" className="text-blue-600 underline">Trang Quản Trị</a> để tạo nội dung hoặc xem <a href="/vi/trang-chu" className="text-blue-600 underline">trang web review</a> để xem giao diện hoàn thiện.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Frontend;
