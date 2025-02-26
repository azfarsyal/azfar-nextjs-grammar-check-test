import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      router.replace('/live-grammar-check');
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('authToken', data.token);
        toast.success(data.message);
        router.push('/live-grammar-check');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something went wrong while logging in');
    }
  };

  if (loading) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <br />
        <button type='submit' style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  button: {
    marginTop: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '8px 16px',
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  input: {
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease-in-out',
    width: '280px',
  },
};
