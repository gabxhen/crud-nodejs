import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #232324;
  padding: 20px;
  border-radius: 5px;
  width: 650px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4%;
`;

const Input = styled.input`
  width: 125px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  font-weight: 500;
  outline: none;
`;

const Label = styled.label`
  font-size: 0.8rem;
  color: #e9e9e9 !important;
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  color: #232324 !important;
  font-weight: 500;
  background-color: #01e45c;
  color: white;
  height: 42px;
`;

const Form = ({ getProdutos, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const produto = ref.current;

      produto.nome_produto.value = onEdit.nome_produto;
      produto.preco_produto.value = onEdit.preco_produto;
      produto.qntd_produto.value = onEdit.qntd_produto;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = ref.current;

    if (
      !produto.nome_produto.value ||
      !produto.preco_produto.value ||
      !produto.qntd_produto.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/produtos/editar/" + onEdit.id_produto, {
          nome_produto: produto.nome_produto.value,
          preco_produto: produto.preco_produto.value,
          qntd_produto: produto.qntd_produto.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/produtos/criar", {
          nome_produto: produto.nome_produto.value,
          preco_produto: produto.preco_produto.value,
          qntd_produto: produto.qntd_produto.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    produto.nome_produto.value = "";
    produto.preco_produto.value = "";
    produto.qntd_produto.value = "";

    
    setOnEdit(null);
    getProdutos();    
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome_produto" placeholder="Ex: Celular" />
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input name="preco_produto" placeholder="Ex: 132.89, 190" />
      </InputArea>
      <InputArea>
        <Label>Quantidade</Label>
        <Input name="qntd_produto" placeholder="Ex: 32" />
      </InputArea>

      <Button type="submit">Cadastrar</Button>
    </FormContainer>
  );
};

export default Form;
