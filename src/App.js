import * as React from 'react';
import './App.css';
import HomePage from './pages/Home';
import { Provider } from 'react-redux'
import { store } from './redux'
import { ChakraProvider } from '@chakra-ui/react';
import WatchListPage from './pages/WatchList';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        {/* <WatchListPage></WatchListPage> */}
      </ChakraProvider>
  </Provider>

  );
}


export default App;
