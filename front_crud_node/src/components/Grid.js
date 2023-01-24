import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #232324;
  padding: 20px;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset #303031;
  padding-bottom: 5px;
  color: white;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  color: #fff;

  #icon {
    color: green !important;
  }
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const TdI = styled.td`
  color: #01e45c;
  cursor: pointer;

  #icon {
    color: green !important;
  }
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ produtos, setProdutos, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id_produto) => {
    await axios
      .delete("http://localhost:8800/produtos/deletar/" + id_produto)
      .then(({ data }) => {
        const newArray = produtos.filter((produto) => produto.id_produto !== id_produto);

        toast.success(data);
        setProdutos(newArray);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Preço</Th>
          <Th onlyWeb>Quantidade</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {produtos.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome_produto}</Td>
            <Td width="30%">R$ {item.preco_produto}</Td>
            <Td width="20%" onlyWeb>
              {item.qntd_produto}
            </Td>
            <TdI id='icon' alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </TdI>
            <TdI id='icon' alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id_produto)} />
            </TdI>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
