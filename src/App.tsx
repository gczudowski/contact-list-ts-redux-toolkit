import { Provider } from 'react-redux';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import CONFIG from 'config';
import MainPage from '@src/pages/mainPage/MainPage';
import { MediaQueries } from '@src/types/css';
import { ToastContainer } from 'react-toastify';
import { store } from '@src/app/store';
import 'react-toastify/dist/ReactToastify.css';

function App(): ReactElement {
  return (
    <AppContainer>
      <AppContent>
        <Provider store={store}>
          <ToastContainer />
          <MainPage />
        </Provider>
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AppContent = styled.div`
  width: 340px;

  ${[CONFIG.MEDIA_QUERIES[MediaQueries.SM] as string]} {
    width: 280px;
  }
`;

export default App;
