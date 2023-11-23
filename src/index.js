import React from 'react';
import ReactDOM from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react'
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/Home';
import WatchListPage from './pages/WatchList';
import { Provider } from 'react-redux'
import { store } from './redux'
import { ChakraProvider , extendTheme} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Theme from "./theme"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BackTest from './pages/BackTest';
// // const root = ReactDOM.createRoot(document.getElementById('root'));
// const routes = () => (
//   <React.StrictMode>
//     <BrowserRouter>
//   <Provider store={store}>
//       <ChakraProvider>
//       <Routes>
//     <Route path="/" element={<HomePage />}></Route>
//     <Route path="watch/" element={<WatchListPage />}>
//     </Route>
//     </Routes>
//       </ChakraProvider>
//   </Provider>
//   </BrowserRouter>
//   </React.StrictMode>
// );

// export default function RouteApp() {
//   return (
//     <BrowserRouter>
//      <Provider store={store}>
//        <ChakraProvider>
//       <Routes>
//         <Route path="/" element={<HomePage />}>
//           <Route path="watch" element={<WatchListPage />} />
//           {/* <Route path="*" element={<NoPage />} /> */}
//         </Route>
//       </Routes>
//       </ChakraProvider>
//   </Provider>
//     </BrowserRouter>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<RouteApp />);


// export default routes;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "watch",
    element: <WatchListPage />,
  },
  {
    path: "backtest",
    element: <BackTest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
  domain="dev-u83ub6sc8dogbdfj.us.auth0.com"
  clientId="MXKOcj0ExB5cyfuMPFLsl9q40Hes6153"
  redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider  theme={Theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  </Auth0Provider>
);
