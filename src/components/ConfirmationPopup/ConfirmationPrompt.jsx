import { useEffect } from 'react';

const ConfirmationPrompt = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [])
}
export default ConfirmationPrompt;