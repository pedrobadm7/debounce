import { useState, useEffect } from 'react'
import './App.css'
import { callAPI } from './callAPI';
import { useDebounce } from './useDebounce';
import { useIsFirstRender } from './useIsFirstRender';



function App() {
  const [isLiked, setIsLiked] = useState(false)
  const isFirstRender = useIsFirstRender();

  const debouncedValue = useDebounce(isLiked, 2000)

  useEffect(() => {
    // Essa proxima linha é pra impedir o useEffect de rodar no primeiro render,
    // fazendo assim com que não chame a api com um valor defaultt do seu estado de like
    if (!isFirstRender) {
      callAPI(isLiked);
    }
  }, [debouncedValue])

  function handleLikePost() {
    setIsLiked(prevState => !prevState);
  }

  return (
    <div className="App">
      <div style={{
        marginBottom: 24
      }}>
        isLiked: {String(isLiked)}
      </div>
      <button
        onClick={handleLikePost}
      >{isLiked ? 'Descurtir' : 'Curtir'}</button>
    </div>
  )
}

export default App
