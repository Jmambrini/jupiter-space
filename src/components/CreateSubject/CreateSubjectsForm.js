import React from 'react'
import { Input, Row, Col, Select } from 'antd';
import 'antd/dist/antd.css';
import './CreateSubjectsForm.scss'
import listaAlunos from './listaAlunos';

import listaMaterias from './listaMaterias';
import BottomButton from '../BottomButton';
import MobileHeader from '../MobileHeader';
import BrowserHeader from '../BrowserHeader';

import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';

const { Option } = Select;
const { TextArea } = Input;


const CreateSubjectsForm = () => {
  // const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [auxList, setAuxList] = React.useState([]);
  const pageLocation = useLocation().pathname;
  var page;
  if(pageLocation === ROUTES.SUBJECTS_NEW){
    page = 'Editar disciplina';
  }

  
  
  const handleSelect = (e) => {
    const aux = listaMaterias.filter((v) => v.name === e).map((v) => (v.alunos))[0]
    const auxDesc = listaMaterias.filter((v) => v.name === e).map((v) => (v.description))[0]
    const arrayAux = [];
    for(let i in aux){
      arrayAux.push(listaAlunos.filter(v => v.USPN === aux[i].USPN)[0]);
    }
    
    // setName(e);
    setAuxList(arrayAux);
    setDescription(auxDesc);
  }

  const handleSubmit = (values) => {  
    // console.log(editPage);
     
  }


  const list = listaMaterias.map((v) => (<Option value={v.name} key={v.cod}>{v.cod} - {v.name}</Option>))
    return (
      <div className="CreateSubjectsForm">
        <MobileHeader title={page} color="white" />
        <BrowserHeader title={page} />
          <Row>
            <Col sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 12 }}>
              <Select 
                placeholder="Nome da disciplina" 
                type="text" 
                id="name"       
                onChange={handleSelect}          
              >
              {  
                list
              }    
              </Select>

              <TextArea 
                className='item-box'
                placeholder="Descrição"
                id="description"
                autoSize={{ minRows: 3, maxRows: 5 }}
                value={description}            
                disabled       
              />

              <TextArea 
                className='item-box'
                placeholder="Alunos"
                id="students"
                autoSize={{ minRows: 3, maxRows: 8 }}
                value={auxList.map(v => (
                  
                    v.name + '- Número USP: ' + v.USPN + '\n'
                 
                )).join('')}           
                disabled       
              />
            </Col>
          </Row>

          <Row>
            <Col xs={{ span: 22 }} lg={{ span: 16 }}>
              <BottomButton title={page} onClick={handleSubmit}/>     
            </Col>
          </Row>
      </div>
    );
  
}



export default CreateSubjectsForm

