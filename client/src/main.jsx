import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import './index.css'

import 'vite/modulepreload-polyfill';

import Root from './routes/root'
import ErrorPage from './routes/error-page'
import ArticleDetail from './routes/article-detail'

import ArticleList from './containers/ArticleListView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root><ArticleList/></Root>,
    errorElement: <ErrorPage/>,
  },{
    path: '/:articleID',
    element: <Root><ArticleDetail/></Root>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
