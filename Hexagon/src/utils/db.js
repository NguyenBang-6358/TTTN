import initialData from '../data/initialData.json';

const STORAGE_KEY = 'hexagon_pages';

export const getPages = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  
  // Nếu localStorage trống, sử dụng dữ liệu từ file JSON
  if (initialData && initialData.length > 0) {
    // Tự động nạp vào localStorage luôn để người dùng dùng tiếp
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  
  return [];
};

export const getPage = (id) => {
  const pages = getPages();
  return pages.find(p => p.id === id);
};

export const getPageBySlug = (slug) => {
  const pages = getPages();
  return pages.find(p => p.slug === slug);
};

export const getPageBySlugAndLang = (slug, lang) => {
  const pages = getPages();
  return pages.find(p => p.slug === slug && p.lang === lang);
};

export const savePage = (pageData) => {
  const pages = getPages();
  const existingIndex = pages.findIndex(p => p.id === pageData.id);
  
  if (existingIndex >= 0) {
    pages[existingIndex] = { ...pages[existingIndex], ...pageData, updatedAt: new Date().toISOString() };
  } else {
    pages.push({
      ...pageData,
      id: pageData.id || crypto.randomUUID(),
      updatedAt: new Date().toISOString()
    });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
};

export const deletePage = (id) => {
  let pages = getPages();
  pages = pages.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
};

export const duplicatePage = (id) => {
  const page = getPage(id);
  if (!page) return null;
  
  // Create a new ID
  const newId = crypto.randomUUID();
  
  // Logic for translation: if vi -> en, if en -> vi
  const newLang = page.lang === 'vi' ? 'en' : 'vi';
  
  // Clone puckData and update the lang field in the root props
  const newPuckData = JSON.parse(JSON.stringify(page.puckData));
  if (!newPuckData.root) newPuckData.root = {};
  if (!newPuckData.root.props) newPuckData.root.props = {};
  newPuckData.root.props.lang = newLang; // Set new lang in Puck data

  const newPage = {
    ...page,
    id: newId,
    title: `${page.title} (${newLang.toUpperCase()})`,
    lang: newLang,
    updatedAt: new Date().toISOString(),
    puckData: newPuckData
  };
  
  const pages = getPages();
  pages.push(newPage);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  
  return newId;
};

// Seed initial data if empty
export const seedInitialData = () => {
  if (getPages().length === 0) {
    savePage({
      id: 'home-vi',
      title: 'Trang Chủ',
      slug: '/',
      lang: 'vi',
      status: 'Đã xuất bản',
      puckData: {
        content: [],
        root: { props: { lang: 'vi' } }
      }
    });
  }
};
