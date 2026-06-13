import { Puck } from "@measured/puck";
import "@measured/puck/dist/index.css";
import { puckConfig } from "./admin-puck-config.jsx"; // Gọi file cấu hình của giảng viên

// Khởi tạo dữ liệu trang trống ban đầu để kéo thả
const initialData = {
  content: [],
  root: {},
};

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Puck 
        config={puckConfig} 
        data={initialData} 
        onPublish={(data) => console.log("Dữ liệu khi bấm Publish:", data)} 
      />
    </div>
  );
}

export default App;