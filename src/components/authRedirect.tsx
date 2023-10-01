import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthRedirect = () => {
  const history = useHistory();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        history.replace('/dashboard');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [history]);
};

export default useAuthRedirect;