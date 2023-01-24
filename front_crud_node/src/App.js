import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  color: white;
`;

function App() {
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/produtos/get");
      setProdutos(res.data.sort((a, b) => (a.nome_produto > b.nome_produto ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, [setProdutos]);

  return (
    <>
      <Container>
        <Title>Sistema de Produtos</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getProdutos={getProdutos()} />
        <Grid produtos={produtos} getProdutos={getProdutos()} setOnEdit={setOnEdit}  />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
