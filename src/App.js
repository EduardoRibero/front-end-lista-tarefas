import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';

function App() {

  const url = 'http://localhost:8080/tarefas'
  const [tarefas, setTarefas] = useState([])

  const [inputTarefa, setInputTarefa] = useState("")

  const [inputNovaTarefa, setInputNovaTarefa] = useState("")

  const  submitNovaTarefa = (e) =>{
      e.preventDefault()
      let body = {
        tarefa: `${inputNovaTarefa}`
      }
      let obj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }

      fetch(url, obj)
      setInputNovaTarefa("")

  }

  useEffect(()=>{
    async function listarTarefas() {
      await fetch(url).then((res) => res.json())
                      .then((data) => setTarefas([...data]))
    }
    listarTarefas()
  },[submitNovaTarefa, inputNovaTarefa])

  return (
    <div className='text-center pt-5'>
      <Container>
        <Row className='justify-content-center'><h1>Tarefas</h1></Row>
        <Row>
          <Col className='d-flex flex-column m-5'>
              <form onSubmit={submitNovaTarefa}> 
                <label>
                  Adicione uma nova tarefa:
                  <input className='mb-3 form-control' type="text" value={inputNovaTarefa} placeholder='Digite aqui sua tarefa' onChange={(e) => setInputNovaTarefa(e.target.value)} />
                </label>
                <input type='submit' className='btn btn-success mb-3 w-25' value="Nova Tarefa"/>
              </form>
          </Col>
        </Row>

        <Row>
          <Col>
            <ul className='list-unstyled m-5'>
              {tarefas.map((tarefa) =>(
                <li className='d-flex justify-content-around  mb-3' key={tarefa.id}>
                  <label> {tarefa.tarefa } </label>
                  <div className="d-flex justify-content-around">
                    <input className='form-control w-100' type="text" value={inputTarefa} placeholder='Editar' onChange={(e) => {
                      setInputTarefa(e.target.value)
                      console.log(e.target.value)}}/> 
                    <button className='btn btn-warning'>Editar</button>
                    </div>
                  <button className='btn btn-danger'>Excluir</button>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
