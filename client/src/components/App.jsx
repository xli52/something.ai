import './App.scss';
import React, { useState } from 'react';
import Nav from './Nav';
import Chat from './Chat';
import Home from './Home';

const HOME = 'HOME';
const CHAT = 'CHAT';

function App() {
  const [page, setPage] = useState(CHAT);

  return (
    <>
      <Nav
        setPage={setPage}
      />
      <main>
        {page === HOME &&
          <Home
            setPage={setPage}
          />
        }
        {page === CHAT &&
          <Chat />
        }
      </main>
    </>
  );
}

export default App;
