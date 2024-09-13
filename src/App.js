import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useCallback } from 'react';

function App() {

  const url = 'https://back-end-lista-tarefas.vercel.app/tarefas'
  const [tarefas, setTarefas] = useState([])
  const [inputTarefa, setInputTarefa] = useState({})
  const [inputNovaTarefa, setInputNovaTarefa] = useState("")


  //Get tarefas
  const  submitNovaTarefa = useCallback(
    (e) =>{
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

      fetch(url, obj).then(()=> listarTarefas())
      setInputNovaTarefa("")

  },[inputNovaTarefa])


  //Delete
  const submitDelet = useCallback((e,id)=>{
      let novaUrl = url + "/" + id
      let obj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }

      fetch(novaUrl, obj)
      .then(() => listarTarefas())
      .catch((err) => console.log(err))

  },[url])


  //Controle o input de edição
  const alterEditInput = useCallback((e, id)=>{
      setInputTarefa({...inputTarefa, [id]: e.target.value})
    },[inputTarefa])
  

  //Edição
  const submitEditar = useCallback((e, id)=>{
    if(inputTarefa[id]!== "" & inputTarefa[id] !== null ){
      alterEditInput(e, id)
      let novaUrl = url + "/" + id
      let body = {
        tarefa: inputTarefa[id]
      }
      let obj = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
  
        fetch(novaUrl, obj)
        .then(() => listarTarefas())
        .catch((err) => console.log(err))
    }
  },[inputTarefa, alterEditInput])


  //Listagem de tarefas
  const listarTarefas = async () => {
    await fetch(url)
          .then((res) => res.json())
          .then((data) => setTarefas([...data]))
  }


  useEffect(()=>{
    listarTarefas()
  },[submitNovaTarefa, inputNovaTarefa])

  return (
    <div className='pt-5'>
      <Container>
        <Row className='text-center'><h1>Tarefas</h1></Row>
        <Row>
          <Col className='d-flex flex-column m-5'>
              <form className='d-flex flex-column' onSubmit={submitNovaTarefa}> 
                <label>
                  Adicione uma nova tarefa:
                  <input className='mb-3 mt-3 form-control' type="text" value={inputNovaTarefa} placeholder='Digite aqui sua tarefa' onChange={(e) => setInputNovaTarefa(e.target.value)} />
                </label>
                <input type='submit' className='btn btn-success mb-3' value="Nova Tarefa"/>
              </form>
          </Col>
        </Row>

        <Row>
          <Col>
            <ul className='list-unstyled m-5'>
              {tarefas.map((tarefa) =>(
                <li className='d-flex flex-column justify-content-around  mb-3' key={tarefa.id}>
                  <label> {tarefa.tarefa } </label>
                  <div className="d-flex flex-column justify-content-around">
                    <input className='form-control' type="text" placeholder='Editar' value={inputTarefa[tarefa.id] || ""} onChange={(e) => alterEditInput(e, tarefa.id)}/> 
                    <button className='btn btn-warning' onClick={(e)=>submitEditar(e, tarefa.id)}>Editar</button>
                    </div>
                  <button className='btn btn-danger' onClick={(e) => submitDelet(e,tarefa.id)}>Excluir</button>
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
