import { useState } from 'react';
import './App.css';

function App() {

  const [admin, setAdmin] = useState({
    email: '',
    password: ''
  })

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prevAdmin => ({
      ...prevAdmin,
      [name]: value
    }));
  };

  const handleAdmin = async (e) => {

    e.preventDefault()

    try {
      const fetchData = await fetch('http://localhost:3000/register-admin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
      });

      const res = await fetchData.json();
      console.log(res);
      alert("Admin Registrado com sucesso!!")
    } catch (error) {
      console.log(error);
    }

  }

  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    password: '',
    file: ""
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const formData = new FormData();
  formData.append("file", registerData.file);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegisterData(prevData => ({
      ...prevData,
      file: file
    }));
  }

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
      const formData = new FormData();
      formData.append('nome', registerData.nome);
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);
      formData.append('file', registerData.file);
  
      const fetchData = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: formData,
      });
  
      const res = await fetchData.json();
      console.log(res);
  
      if (fetchData.ok) {
        alert('Usuário registrado com sucesso!');
        setRegisterData({
          nome: '',
          email: '',
          password: '',
          file: ''
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
          file: 'file'
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
        <h1>Registrar Admin</h1>
        <form onSubmit={handleAdmin}>
          <input type="email" name="email" value={admin.email} onChange={handleAdminChange} placeholder="E-mail" />
          <input type="password" name="password" value={admin.password} onChange={handleAdminChange} placeholder="Senha" accept='application/pdf' />
          <button type='submit'>Cadastrar</button>
        </form>
      </div>

      <div>
        <h1>Registrar Usuário</h1>
        <form onSubmit={handleRegisterSubmit} encType="multipart/form-data">
          <input type="text" name="nome" value={registerData.nome} onChange={handleRegisterChange} placeholder="Nome" />
          <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="E-mail" />
          <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Senha" accept='application/pdf' />
          <input type="file" name="file" onChange={handleFileChange} placeholder="File" />
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
