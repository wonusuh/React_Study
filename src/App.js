import './App.css';

/** 헤더 영역입니다. */
function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
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
        props.onChangeMode(event.target.id);
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

function App() {
  const topics = [
    { id: 1, title: `html`, body: `html is ...` },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: "javaScript", body: "javaScript is ..." }
  ];

  return (
    /** 가장 바깥에 div가 있지 않으면 eslint 에러가 발생할 수 있습니다. */
    <div>
      <Header title="WEB" onChangeMode={() => {
        alert('Header');
      }} />
      <Nav topics={topics} onChangeMode={(id) => {
        alert(id);
      }} />
      <Article title="Welcome" body="Hello, Web" />
    </div>
  );
}

export default App;
