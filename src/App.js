import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  return (
    <div className='text-center'>
      <Container>
        <Row><h1 className='m-3'>Lista de tarefas</h1></Row>
        <Row>
          <Col>
            <form className='m-5'>
              <label>
                Adicione uma nova tarefa:
                <input type="text" placeholder='Digite aqui sua tarefa' />
              </label>
              <input type="submit" value="Adicionar" />
            </form>
          </Col>
        </Row>
      </Container>

        <form action=""></form>
    </div>
  );
}

export default App;
