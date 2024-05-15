import { useState } from 'react';
import './App.css';

function App() {

  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    password: '',
    file: ""
  });

  const [registerTeacher, setRegisterTeacher] = useState({
    name: '',
    email: '',
    password: '',
    materia: ''
  })


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


  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    setRegisterTeacher(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleRegisterTeacher = async (e) => {
    e.preventDefault();
  
    try {
  
      const fetchTeacher = await fetch('http://localhost:3000/register-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerTeacher) 
      });
  
      const res = await fetchTeacher.json();
      console.log(res);
  
      if (!fetchTeacher.ok) {
        alert('Professor Registrado com sucesso!!');
      } else {
        alert('Erro ao registrar o professor');
      }
    } catch (error) {
      console.error('Erro ao registrar o professor:', error);
    }
  };
  


  return (
    <div className="App">

      <div>
        <h1>Registrar Usuário</h1>
        <form onSubmit={handleRegisterSubmit}>
          <input type="text" name="nome" value={registerData.nome} onChange={handleRegisterChange} placeholder="Nome" />
          <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="E-mail" />
          <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Senha" accept='application/pdf' />
          <input type="file" name="file" onChange={handleFileChange} placeholder="File" />
          <button type='submit'>Registrar</button>
        </form>
      </div>

      <div>
        <form onSubmit={handleRegisterTeacher}>
            <input 
            type="text" 
            name='name' 
            value={registerTeacher.name} 
            onChange={handleTeacherChange} 
            placeholder='NOME'
            required
            />
            <input 
            type="email" 
            name='email' 
            value={registerTeacher.email} 
            onChange={handleTeacherChange} 
            placeholder='EMAIL'
            required
            />
            <input 
            type="password" 
            name='password' 
            value={registerTeacher.password} 
            onChange={handleTeacherChange} 
            placeholder='SENHA'
            required
            />
            <input 
            type="text" 
            name='materia' 
            value={registerTeacher.materia} 
            onChange={handleTeacherChange} 
            placeholder='MATERIA'
            required
            />
            <button type='submit'>CADASTRAR</button>
        </form>
      </div>

    </div>
  );
}

export default App;
