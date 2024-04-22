import { useState } from 'react';
import './App.css';

function App() {
  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const fetchData = await fetch('http://localhost:3000/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });
  
      const res = await fetchData.json();
      console.log(res);
  
      if (fetchData.ok) { 
        alert('Usuário registrado com sucesso!');
        setRegisterData({
          nome: '',
          email: '',
          password: '',
        });
      } else {
        alert('Email já cadastrado na base de dados');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchData = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const res = await fetchData.json();
      console.log(res);
      if (fetchData.ok) { 
        alert('Usuário logado com sucesso!');
        setRegisterData({
          nome: '',
          email: '',
          password: '',
        });
      } else {
        alert('Email ou senha incorreto!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div>
        <h1>Registrar Usuário</h1>
        <form onSubmit={handleRegisterSubmit}>
          <input type="text" name="nome" value={registerData.nome} onChange={handleRegisterChange} placeholder="Nome" />
          <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="E-mail" />
          <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Senha" />
          <button type='submit'>Registrar</button>
        </form>
      </div>

      <div>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="E-mail" />
          <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Senha" />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;
