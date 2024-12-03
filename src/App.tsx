import { useState } from 'react';
import { MapMaker } from './components/MapMaker';
import { Viewer } from './components/Viewer';

function App() {
  const [showMapMaker, setShowMapMaker] = useState(false);
  return (
    <>
      {showMapMaker ? (
        <MapMaker onClose={() => setShowMapMaker(false)} />
      ) : (
        <Viewer onEditMap={() => setShowMapMaker(true)} />
      )}
    </>
  );
}

export default App;
