import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { store } from './store';
import { routes } from './routes';
import i18n from './i18n';

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={routes} />
      </I18nextProvider>
    </Provider>
  );
};

export default App;
