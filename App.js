import './App.css';
import { useState, useEffect } from 'react';
import imgLogo from './gradulogo.ico'

function App() {
  let [student, setStudent] = useState([0, 0, 0, 0, 0, 0, 0]);
  let [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0]);
  let [maxScore, setMaxScore] = useState([17, 15, 12, 9, 33, 27, 17]);
  let titleList = ["기초교양", "균형교양", "학문기초", "전공필수", "전공선택", "심화전공", "자유선택"]
  let [curriculum, setCurriculum] = useState(22);
  let [grade, setGrade] = useState(1);
  let [semester, setSemester] = useState(1);
  let [major, setMajor] = useState(1);

  function update(i, value) {
    let copy = [...student]; 
    value = parseInt(value, 10);
    copy[i] = value;
    setStudent(copy);
  }

  function calculate() {
    let tempResult = [...student];
    let overCredit = 0;

    // 교양 초과학점 계산
    for(let i = 0; i < 3; i++) {
      if(tempResult[i] > maxScore[i]) {
        overCredit += tempResult[i] - maxScore[i];
        tempResult[i] = maxScore[i];
      }
    }
    // 교양 초과학점 -> 자선
    if(overCredit > 10)
      overCredit = 10;
    if(overCredit != 0)
      tempResult[6] = tempResult[6] + overCredit;
    
    // 전공 초과학점 계산
    overCredit = 0;
    for(let i = 3; i < 6; i++) {
      // 전필, 전선 -> 심화
      if(i < 5) {
        if(tempResult[i] > maxScore[i]) {
          overCredit += tempResult[i] - maxScore[i];
          tempResult[i] = maxScore[i];
        }
      }
      else {
        if(overCredit != 0)
          tempResult[i] = tempResult[i] + overCredit;
        // 심화 초과학점 -> 자선
        overCredit = 0;
        if(tempResult[i] > maxScore[i]) {
          overCredit += tempResult[i] - maxScore[i];
          tempResult[i] = maxScore[i];
        }
      }
    }

    if (overCredit != 0) {
      if (tempResult[6] + overCredit > maxScore[6]) {
        tempResult[6] = maxScore[6];
      } else {
        tempResult[6] = tempResult[6] + overCredit;
      }
    }

    setResult(tempResult);
  }

  function curChange(e) {
    setCurriculum(parseInt(e.target.value));
  }

  useEffect(() => {
    let copy = [[7, 13, 9, 12, 30, 27, 32],   //17컴과, 컴정 0
                [7, 13, 18, 12, 30, 27, 23],  //18컴과 1
                [7, 13, 18, 9, 33, 27, 23],   //18컴정 2
                [10, 13, 18, 12, 30, 27, 20], //19컴과, 20 3
                [10, 13, 18, 9, 33, 27, 20],  //19컴정, 21 4
                [17, 15, 12, 9, 33, 27, 17],  //22~ 5
                [7, 13, 9, 12, 30, 0, 59],    //17컴과, 컴정 복전 6
                [7, 13, 18, 12, 30, 0, 50],   //18컴과 복전 7
                [7, 13, 18, 9, 33, 0, 50],    //18컴정 복전 8
                [10, 13, 18, 12, 30, 0, 47],  //19컴과 복전, 20 복전  9
                [10, 13, 18, 9, 33, 0, 47],   //19컴정 복전, 21 복전 10
                [10, 13, 18, 12, 30, 12, 35], //20 부전 11
                [10, 13, 18, 9, 33, 12, 35],  //21 부전 12
                [17, 15, 12, 9, 33, 0, 44],   //22~ 복전 13
                [17, 15, 12, 9, 33, 12, 32]   //22~ 부전 14
              ]

    let index;

    if(major == 1)
      switch(curriculum) {
        case 17:
          index = 0;
          break;
        case 18:
          index = 1;
          break;
        case 19:
          index = 3;
          break;
        case 20:
          index = 3;
          break;
        case 21:
          index = 4;
          break;
        case 22:
          index = 5;
          break;
      }
    else if(major == 2) {
      switch(curriculum) {
        case 17:
          index = 6;
          break;
        case 18:
          index = 7;
          break;
        case 19:
          index = 9;
          break;
        case 20:
          index = 9;
          break;
        case 21:
          index = 10;
          break;
        case 22:
          index = 13;
          break;
      }
    }
    else if(major == 3) {
      switch(curriculum) {
        case 17:
          index = 0;
          break;
        case 18:
          index = 1;
          break;
        case 19:
          index = 3;
          break;
        case 20:
          index = 11;
          break;
        case 21:
          index = 12;
          break;
        case 22:
          index = 14;
          break;
      }
    }
    setMaxScore((maxScore) => copy[index]);
  }, [curriculum, major])

  return (
    <div className="App">
      <div className="container">
        <nav>
          <div className="logo">
            <img src={imgLogo}/>
            <p>GraduKNU</p>
          </div>

          <div className="page-list">
            <ul>
              <li><a>학점계산</a></li>
              <li><a>게시판</a></li>
              <li><a>캘린더</a></li>
            </ul>
          </div>

          <div className="account">
            <button className="color-gr">회원가입</button>
            <button className="color-sb">로그인</button>
          </div>
        </nav>

        <div className="calc-container">
          <div className="calc-box">
            <form>
              <div className="select-div">
                <div className="user-info">
                  <div>
                    <p>학번(교육과정)</p>
                    <select onChange={curChange}>
                      <option value={17}>17</option>
                      <option value={18}>18</option>
                      <option value={19}>19</option>
                      <option value={20}>20</option>
                      <option value={21}>21</option>
                      <option value={22} selected>22~24</option>
                    </select>
                  </div>
                  <div>
                    <p>학년</p>
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <div>
                    <p>학기</p>
                    <select>
                      <option>1</option>
                      <option>2</option>
                    </select>
                  </div>
                </div>
                <div className="major-radio">
                  <div><input type="radio" name="major-select" value="1" onClick={() => {setMajor(1)}}/> <span>기본전공</span></div>
                  <div><input type="radio" name="major-select" value="2" onClick={() => {setMajor(2)}}/> <span>복수전공</span></div>
                  <div><input type="radio" name="major-select" value="3" onClick={() => {setMajor(3)}}/> <span>부전공</span></div>
                </div>
              </div>
              <div className="calc-contents">
                <div><p>기초교양</p> <input type="number" className="credit-input" id="credit-0" onChange={ (e) => { update(0, e.target.value) } }/></div>
                <div><p>균형교양</p> <input type="number" className="credit-input" id="credit-1" onChange={ (e) => { update(1, e.target.value) } }/></div>
                <div><p>학문기초</p> <input type="number" className="credit-input" id="credit-2" onChange={ (e) => { update(2, e.target.value) } }/></div>
                <div><p>전공필수</p> <input type="number" className="credit-input" id="credit-3" onChange={ (e) => { update(3, e.target.value) } }/></div>
                <div><p>전공선택</p> <input type="number" className="credit-input" id="credit-4" onChange={ (e) => { update(4, e.target.value) } }/></div>
                <div><p>자유선택</p> <input type="number" className="credit-input" id="credit-6" onChange={ (e) => { update(6, e.target.value) } }/></div>
              </div>
            </form>
            <button onClick={calculate} className="calc-btn">계산</button>
          </div>
          <div className="calc-box calc-contents">
            <table>
              <tr>
                <th>이수구분</th>
                <th>이수학점</th>
                <th>필요학점</th>
              </tr>
              {
                result.map(function(data, i) {
                  return (
                    <tr key={ i }>
                      <td>{titleList[i]}</td>
                      <td className="user-credit">{data}</td>
                      <td>{maxScore[i]}</td>
                    </tr>
                  )
                })
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
