import LogoutButton from '@/components/LogoutButton';
import withAuth from '@/hoc/withAuth';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const MAX_CHAR_LIMIT = 1000;
function LiveGrammarCheck() {
  const [text, setText] = useState('');
  const [grammarMistakes, setGrammarMistakes] = useState([]);

  useEffect(() => {
    if (text.trim().length === 0) {
      setGrammarMistakes([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      checkGrammarMistakes(text);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const checkGrammarMistakes = async (inputText) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const res = await fetch('/api/check-grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      if (res.ok) {
        setGrammarMistakes(data.matches || []);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error checking grammar:', error);
      toast.error('Something went wrong while checking grammar');
    }
  };

  const getHighlightedText = () => {
    if (grammarMistakes.length === 0) return text;

    let updatedText = text;
    let offsetPosition = 0;

    grammarMistakes.forEach((grammarMistake) => {
      const { offset, length, replacements } = grammarMistake;
      const mistakeStart = offset + offsetPosition;
      const mistakeEnd = mistakeStart + length;
      const errorText = updatedText.slice(mistakeStart, mistakeEnd);
      const suggestedReplacement =
        replacements.length > 0 ? replacements[0].value : errorText;

      const highlightedGrammarMistakeHTML = `<span style="color: red; font-weight: bold;" title="Suggestion: ${suggestedReplacement}">${errorText}</span>`;

      updatedText =
        updatedText.slice(0, mistakeStart) +
        highlightedGrammarMistakeHTML +
        updatedText.slice(mistakeEnd);
      offsetPosition += highlightedGrammarMistakeHTML.length - length;
    });

    return updatedText;
  };

  return (
    <div style={styles.container}>
      <LogoutButton />

      <h2 style={styles.heading}>Live Grammar Checker</h2>

      <div
        style={styles.preview}
        dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
      />

      <textarea
        rows='6'
        cols='50'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Please type here and see highlighted grammar mistakes'
        style={styles.textarea}
        maxLength={MAX_CHAR_LIMIT}
      />
      <p style={styles.charCounter}>
        {text.length} / {MAX_CHAR_LIMIT} characters
      </p>
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
    padding: '8px 16px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  preview: {
    border: '1px solid #ddd',
    padding: '15px',
    margin:'20px',
    minHeight: '80px',
    background: '#f9f9f9',
    textAlign: 'left',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
  },
  textarea: {
    width: '80%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    minHeight: '120px',
    resize: 'vertical',
    background: '#fff',
    transition: 'border 0.3s',
  },
  charCounter: {
    marginTop: '5px',
    fontSize: '14px',
    color: '#666',
  },
};

export default withAuth(LiveGrammarCheck);
