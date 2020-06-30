import React from 'react';
import { withFirebase } from '../Firebase';
import { Layout, Typography, Row, Col } from 'antd';
import './QuizList.scss'
import MobileHeader from '../MobileHeader';
import BrowserHeader from '../BrowserHeader';
import BottomButton from '../BottomButton';

const { Text } = Typography;

class Quiz extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      quizzes: [],
    };
  }

  componentDidMount() {
    const { firebase } = this.props;

    var aux = [];
    firebase.getQuizzes().on('value', snapshot => {
      const message = snapshot.val();
      var uids = Object.keys(message);
      const quizzes = Object.values(message)
      for (let i in uids) {
        aux.push({
          ...quizzes[i],
          "code": uids[i],
        })
      }
      this.setState({ quizzes })
    })
  }

  render() {
    const { quizzes } = this.state;

    return (
        <Layout className='layoutQuizList'>
          <MobileHeader title="Perguntas" color="white" />
          <BrowserHeader title="Perguntas" />
          <Row>
            <Col sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 12 }}>
              {quizzes.map((quiz, index) => (
                <div key={index} className="box">
                  <div className="number">
                    <Text className="number-text">{index + 1}</Text>
                  </div>
                  <div key={index} className='button'>
                    <Text className="quiz-name">{quiz.query}</Text>
                    <i className="icon fas fa-chevron-right" />
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <div className="space"></div>
          <BottomButton title="Criar pergunta" />
        </Layout>
      
    )
  }
};

export default withFirebase(Quiz);
