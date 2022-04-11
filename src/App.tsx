import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import {globalStyles} from './app.styled';
import {Example} from './views';

export const App = () => {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/example" element={<Example />} />
        <Route path="*" element={<Navigate to="/example" />} />
      </Routes>
    </BrowserRouter>
  );
};
