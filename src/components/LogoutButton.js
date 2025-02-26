import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully!');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
}

const styles = {
  button: {
    marginBottom: '10px',
    cursor: 'pointer',
    padding: '8px 16px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};
