import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';

function App() {

  const url = 'http://localhost:8080/tarefas'
  const [tarefas, setTarefas] = useState([])

  useEffect(()=>{
    async function listarTarefas() {
      await fetch(url).then((res) => res.json())
                      .then((data) => setTarefas([...data]))
    }
    listarTarefas()
  },[])

  return (
    <div className='text-center pt-5'>
      <Container>
        <Row className='justify-content-center'><h1>Lista de tarefas</h1></Row>
        <Row>
          <Col className='d-flex flex-column m-5'>
              <h4 className='mb-3'>Adicione uma nova tarefa:</h4>
              <input className='mb-3 form-control' type="text" placeholder='Digite aqui sua tarefa' />
              <button className='btn btn-success mb-3 w-25'>Adicionar</button>
          </Col>
        </Row>

        <Row>
          <Col>
            <ul className='list-unstyled m-5'>
              {tarefas.map((tarefa) =>(
                <li className=' mb-3' key={tarefa.id}>{tarefa.tarefa } <button className='btn btn-danger'>Deletar</button> <button className='btn btn-warning'>Alterar</button></li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
