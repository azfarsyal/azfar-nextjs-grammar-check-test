import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        toast.error('User Unauthorized! Please log in to get access.');
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    }, []);

    if (isAuthenticated === null) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
