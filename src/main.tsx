import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { NotificationProvider } from './context/notificationContext.tsx'
import { ConfigProvider } from 'antd'
import { fontFamily } from './utils/index.ts'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        token: {
          fontFamily: fontFamily
        }
      }}>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
