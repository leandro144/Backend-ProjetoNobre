import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({
    nome: '',
    idade: '',
    cpf: '',
    endereco: '',
    cep: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchData = await fetch('http://localhost:3000/dados', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const res = await fetchData.json();
      setData(res);

      
      setData({
        nome: '',
        idade: '',
        cpf: '',
        endereco: '',
        cep: ''
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={data.nome} onChange={handleChange} placeholder="Nome" />
        <input type="number" name="idade" value={data.idade} onChange={handleChange} placeholder="Idade" />
        <input type="number" name="cpf" value={data.cpf} onChange={handleChange} placeholder="CPF" />
        <input type="text" name="endereco" value={data.endereco} onChange={handleChange} placeholder="Endereço" />
        <input type="number" name="cep" value={data.cep} onChange={handleChange} placeholder="CEP" />
        <button type='submit'>Enviar</button>
      </form>
    </>
  );
}

export default App;
