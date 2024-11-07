import './App.css';
import { useState } from 'react';

/** 헤더 영역입니다. */
function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode1();
      }}>{props.title}</a></h1>
    </header >
  );
}

/** 전체 목록 영역입니다. */
function Nav(props) {
  const list = [];

  for (let i = 0; i < props.topics.length; i += 1) {
    const topic = props.topics[i];

    list.push(<li key={topic.id}>
      <a href={'/read/' + topic.id} id={topic.id} onClick={(event) => {
        event.preventDefault();
        props.onChangeMode2(Number(event.target.id));
      }}>{topic.title}</a>
    </li>);
  }

  return (
    <nav>
      <ol>
        {list}
      </ol>
    </nav>
  );
}

/** 본문을 표시하기 위한 아티클 영역입니다. */
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

/** 새로운 글을 생성하고 생생된 글의 상세페이지로 이동하기 위한 기능을 위한 컴포넌트 입니다. */
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form method='get' onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type='text' name="title" placeholder='제목을 입력하세요.' /></p>
        <p><textarea name='body' placeholder='본문을 입력하세요.'></textarea></p>
        <p><input type='submit' value="Create"></input></p>
      </form>
    </article>
  );
}

/** 선택한 글을 수정하는 컴포넌트 입니다. */
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form method='get' onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type='text' name="title" placeholder='제목을 입력하세요.' value={title} onChange={(event) => {
          // console.log("title : ", event.target.value);
          setTitle(event.target.value);
        }} /></p>
        <p><textarea name='body' placeholder='본문을 입력하세요.' value={body} onChange={(event) => {
          // console.log("body : ", event.target.value);
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type='submit' value="Update"></input></p>
      </form>
    </article>
  );
}

function App() {
  const [topics, setTopics] = useState([
    { id: 1, title: `html`, body: `html is ...` },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: "javaScript", body: "javaScript is ..." }
  ]);
  const [mode, setMode] = useState(`WELCOME`);
  const [ididid, setIdidid] = useState(null);
  const [nextId, setNextId] = useState(4);
  let content = null;
  let contextControl = null;

  if (mode === 'WELCOME') { /** mode 가 WELCOME 일 때 */
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if (mode === 'READ') { /** mode 가 READ 일 때 */
    let title, body = null;

    for (let i = 0; i < topics.length; i += 1) {
      // console.log(topics[i].id, ididid);
      if (topics[i].id === ididid) {
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Article title={title} body={body} ></Article>;
    contextControl =
      <>
        <li><a href={'/update/' + ididid} onClick={(event) => {
          event.preventDefault();
          setMode(`UPDATE`);
        }}>Update</a></li>
        <li><button type='button' onClick={() => {
          const newTopics = [];

          for (let i = 0; i < topics.length; i += 1) {
            if (topics[i].id !== ididid) {
              newTopics.push(topics[i]);
            }
          }
          setTopics(newTopics);
          setMode("WELCOME");
        }}>Delete</button></li>
      </>;
  } else if (mode === "CREATE") { /** mode 가 CREATE 일 때 */
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {
        id: nextId,
        title: _title,
        body: _body
      };
      /** 원시형 데이터타입이 아닌 참조형 데이터타입은 원본을 복사한 복사본을 push 해야합니다. */
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode(`READ`);
      setIdidid(nextId);
      setNextId(nextId + 1);
    }}></Create>
  } else if (mode === `UPDATE`) { /** mode가 UPDATE 일 때 */
    let title, body = null;

    for (let i = 0; i < topics.length; i += 1) {
      if (topics[i].id === ididid) {
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }

    content = <Update title={title} body={body} onUpdate={(title, body) => {
      console.log(title, body);
      console.log(topics);
      const newTopics = [...topics];
      const updatedTopic = {
        id: ididid,
        title: title,
        body: body
      };
      for (let i = 0; i < newTopics.length; i += 1) {
        if (newTopics[i].id === ididid) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode(`READ`);
    }}></Update>
  }

  return (
    /** 가장 바깥에 div가 있지 않으면 eslint 에러가 발생할 수 있습니다. */
    <div>
      <Header title="WEB" onChangeMode1={() => {
        setMode('WELCOME');
      }} ></Header>
      <Nav topics={topics} onChangeMode2={(_id) => {
        setMode("READ");
        setIdidid(_id);
      }} ></Nav>
      {content}
      <ul>
        <li><a href='/create' onClick={(event) => {
          event.preventDefault();
          setMode(`CREATE`);
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
