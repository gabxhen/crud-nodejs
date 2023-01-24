import { db } from "../db.js";

export const getProdutos = (_, res) => {
  const q = "SELECT * FROM produto";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getProdutosPorId = (req, res) => {
  const q = "SELECT * FROM produto WHERE `id_produto` = ?";

  db.query(q, [req.params.id_produto], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addProduto = (req, res) => {
  const q =
    "INSERT INTO produto(`nome_produto`, `preco_produto`, `qntd_produto`) VALUES(?)";

  const values = [
    req.body.nome_produto,
    req.body.preco_produto,
    req.body.qntd_produto,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto criado com sucesso.");
  });
};

export const updateProduto = (req, res) => {
  const q =
    "UPDATE produto SET `nome_produto` = ?, `preco_produto` = ?, `qntd_produto` = ? WHERE `id_produto` = ?";

  const values = [
    req.body.nome_produto,
    req.body.preco_produto,
    req.body.qntd_produto,
  ];

  db.query(q, [...values, req.params.id_produto], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

export const deleteProduto = (req, res) => {
  const q = "DELETE FROM produto WHERE `id_produto` = ?";

  db.query(q, [req.params.id_produto], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};
