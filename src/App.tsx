/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from "react";
import "./App.css";
import { FemaleOrNot } from "./pages/FemaleOrNot";
import { Wrapper } from "./shared/components/Wrapper";
import { url } from "./api/api";

function Header() {
  return (
    <footer>
      <h1>Rick and Morty</h1>
    </footer>
  );
}

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState();
  const [isFemale, setIsFemale] = useState(false);

  useEffect(() => {
      if (selectedCharacter?.gender === 'Female') {
        setIsFemale(true);
      } else{
        setIsFemale(false);
      }

      fetch(`${url}character`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data: Response) => {
        setData(data);
      }).finally(() => {
          setLoading(false);
      });
  }, [selectedCharacter]);

  return (
    <Wrapper>
      <Header />
      <FemaleOrNot isFemale={isFemale} />
      {
        selectedCharacter?.name ? (
          <div className="selected">
            <h3>Выбранный персонаж: </h3>
            <div>
              <div>
                <span className="title">Gender: </span>
                <span className="list_content">{selectedCharacter.gender}</span>
              </div>
              <div>
                <span className="title">Status: </span>
                <span className="list_content">{selectedCharacter.status}</span>
              </div>
              <div>
                <span className="title">Species: </span>
                <span className="list_content">{selectedCharacter.species}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="selected">
            <h3>Вы пока никого не выбрали, нажмите по персонажу: </h3>
            <div>
                <span className="title">Name: </span>
              </div>
              <div>
                <span className="title">Status: </span>
              </div>
              <div>
                <span className="title">Species: </span>
              </div>
          </div>
        )
      }
      {
        loading ? <strong style={{fontSize: '50px', color: "black"}}>Loading...</strong> : (
            <div className="wrapper">
              {
                data?.results.map((item) => {
                  return (
                      <div onClick={() => setSelectedCharacter(item)} className="card" >
                        <div className="image_container">
                          <img className="image" src={item.image}  alt="" />
                          <strong>{item.name}</strong>
                        </div>
                        <div className="list">
                          <div>
                            <span className="title">Gender: </span>
                            <span className="list_content">{item.gender}</span>
                          </div>
                          <div>
                            <span className="title">Status: </span>
                            <span className="list_content">{item.status}</span>
                          </div>
                          <div>
                            <span className="title">Species: </span>
                            <span className="list_content">{item.species}</span>
                          </div>
                        </div>
                      </div>
                  )
                })
              }
            </div>
        )
      }
    </Wrapper>
  );
}

export default App;
