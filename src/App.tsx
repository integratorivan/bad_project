import { useEffect, useState } from "react";
import "./App.css";

function Header() {
  return (
    <footer>
      <h1>Rick and Morty</h1>
    </footer>
  );
}

type Response = {
  info: {
    count: number;
    pages: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prev: any;
    next: string;
  },
  results: {
    created: string;
    episode: [string];
    gender: string;
    id: number;
    image: string;
    location: {
      name: string;
      url: string;
    },
    name: string;
    origin: {
      name: string;
      url: string;
    },
    species: string;
    status: string;
    type: string;
    url: string;
  }[]
}

function App() {
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data: Response) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  console.log('test')

  return (
    <>
      <Header />
      {
        loading ? <strong>Loading...</strong> : (
            <div className="wrapper">
              {
                data?.results.map((item) => {
                  return (
                      <div className="card" >
                        <div className="image_container">
                          <img className="image" src={item.image}  alt="" />
                          <strong>{item.name}</strong>
                        </div>
                        <div className="list">
                          <p>Gender: {item.gender}</p>
                          <p>Status: {item.status}</p>
                          <p>Species: {item.species}</p>
                        </div>
                      </div>
                  )
                })
              }
            </div>
        )
      }
    </>
  );
}

export default App;
