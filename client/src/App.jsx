import { useState } from 'react';
import './App.css';
import * as React from 'react';

import BasicLayout from './containers/Layout';
import ArticleList from './containers/ArticleListView';

function App() {
  const [count, setCount] = useState(0)

  return (
      <BasicLayout>
        <ArticleList/>
      </BasicLayout>
  )
}

// let router = createBrowserRouter([
//   {
//     path: "/",
//     element: <ArticleList />,
//     //loader: rootLoader,
//     children: [
//       {
//         path: "new",
//         element: <NewNote />,
//         action: newNoteAction,
//       },
//       {
//         path: "note/:noteId",
//         element: <Note />,
//         loader: noteLoader,
//         action: noteAction,
//         errorElement: <h2>Note not found</h2>,
//       },
//     ],
//   },
// ]);

export default App
