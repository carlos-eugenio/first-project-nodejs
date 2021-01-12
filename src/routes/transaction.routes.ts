import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

// List all transactions
transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// Income / Outcome
transactionRouter.post('/', (request, response) => {
  try {
    // Recebe dados usuário
    const { title, value, type } = request.body;

    // Cria o novo serviço e passa o repositorio pra ele
    const CreateTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // Executa o servico (execute()) passando os valores recebidos na requisição
    const transaction = CreateTransaction.execute({
      title,
      value,
      type,
    });

    // Retorna a transação
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
