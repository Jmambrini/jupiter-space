import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import './Question.scss'
import MobileHeader from '../MobileHeader';
import BrowserHeader from '../BrowserHeader';

const { Text } = Typography;

const defaultQuestionNames = [
  { name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit erat porta elementum' },
  { name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit erat porta elementum' },
  { name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit erat porta elementum' },
  { name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit erat porta elementum' },
  { name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit erat porta elementum' },
];

const Question = ({ questionNames = defaultQuestionNames }) => (
  <Layout className='layoutQuestion'>
    <MobileHeader title="Pergunta 1" color="white" />
    <BrowserHeader title="Pergunta 1" />
    <Row>
      <Col sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 12 }}>
        <div className="question-title">
          <p>Quanto é 2 + 2?</p>
        </div>
        {questionNames.map((question, index) => (
          <div key={index} className="box">
            <div key={index} className='button'>
              <Text className="letter-text">{String.fromCharCode(index + 65)}</Text>
              <Text className="question-name">{question.name}</Text>
            </div>
          </div>
        ))}
      </Col>
    </Row>
    <div className="bottom-buttons">
      <button>Anterior</button>
      <button>Próximo</button>
    </div>

  </Layout>
);

export default Question;
