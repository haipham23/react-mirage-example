import React, { useState, memo } from 'react';
import axios from 'axios';

import './Register.css';

const Input = memo(({
  name,
  type,
  onChange,
  value,
}) => (
  <input
    type={type}
    name={name}
    autoComplete="off"
    placeholder={name}
    value={value}
    onChange={onChange}
    data-testid={`${name}-form`}
  />
), (prev, next) => prev.value === next.value);


const Register = memo(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const onUsernameChange = ({ target: { value }}) => setUsername(value);
  const onPasswordChange = ({ target: { value }}) => setPassword(value);

  const onSave = async () => {
    setIsLoading(true);

    try {
      const { data: { id } } = await axios.post(
        'http://local.mock/api/users',
        { username, password }
      );
      setUserId(id);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      {
        userId && (
          <h1 data-testid="register-done">Register success!</h1>
        )
      }
      {
        !userId && (
          <>
            <h1 data-testid="register-start">Register</h1>
            <Input
              name="username"
              type="text"
              onChange={onUsernameChange}
              value={username}
            />
            <Input
              name="password"
              type="password"
              onChange={onPasswordChange}
              value={password}
            />
            <button
              onClick={onSave}
              disabled={isLoading}
              data-testid="save-button"
            >
              Save
            </button>
          </>
        )
      }
    </div>
  );
});

export default Register;
