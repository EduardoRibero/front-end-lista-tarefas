import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import "./App.css"

function App() {

  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      tarefa : "Qualquer tarefa exemplo"
    },
    {
      id: 34,
      tarefa : "Qualquer  exemplo"
    },
    {
      id: 4354,
      tarefa : "Qualquer tarefa "
    },
    {
      id: 4354,
      tarefa : " tarefa exemplo"
    }
  ])

  return (
    <div className='text-center'>
      <Container>
        <Row><h1 className='m-3'>Lista de tarefas</h1></Row>
        <Row>
          <Col className='d-flex flex-column m-5'>
              <label className='mb-3'>Adicione uma nova tarefa:</label>
              <input className='mb-3' type="text" placeholder='Digite aqui sua tarefa' />
              <button className='mb-3 w-25'>Adicionar</button>
          </Col>
        </Row>

        <Row>
          <Col>
            <ul className='m-5'>
              {tarefas.map((tarefa) =>(
                <li className='border mb-3' key={tarefa.id}>{tarefa.tarefa} <button>Deletar</button> <button>Alterar</button></li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
