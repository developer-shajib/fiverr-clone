'use client';

import store from '@/features/store.jsx';
import { Provider } from 'react-redux';

function ChildrenProvider({ children }) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}

export default ChildrenProvider;
