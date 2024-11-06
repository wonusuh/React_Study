import './App.css';

/** 헤더 영역입니다. */
function Header() {
  return (
    < header >
      <h1><a href="/">WEB</a></h1>
    </header >
  );
}

/** 전체 목록 영역입니다. */
function Nav() {
  return (
    <nav>
      <ol>
        <li><a href='/read/1'>html</a></li>
        <li><a href='/read/2'>css</a></li>
        <li><a href='/read/3'>javascript</a></li>
      </ol>
    </nav>
  );
}

/** 본문을 표시하기 위한 아티클 영역입니다. */
function Article() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB
    </article>
  );
}

function App() {
  return (
    /** 가장 바깥에 div가 있지 않으면 eslint 에러가 발생할 수 있습니다. */
    <div>
      <Header></Header>
      <Header></Header>
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

export default App;
