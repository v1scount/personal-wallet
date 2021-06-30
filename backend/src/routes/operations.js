const server = require('express').Router();
const {User, Operation, Category} = require('../db.js');
const cors = require('cors');

server.use(cors());


// Todas las operaciones
server.get('/', (req, res) => {
  Operation.findAll({
    include: {
      all: true
    }
  })
  .then((operations) => {
    res.status(200).json(operations)
  }).catch((e) => {
    res.status(400).json(e);
  })
})

// Operaciones de una categoria
server.get('/category=:id', (req, res) => {
  const {id} = req.params;
  Operation.findAll({
    where: {
      CategoryId: id
    }
  }).then((operations) => {
    res.status(200).json(operations);
  }).catch(error => {
    console.error(error);
    res.status(400).send(error)
  })
})

// Operaciones de una user
server.get('/user=:id', (req, res) => {
  const {id} = req.params;
  Operation.findAll({
    where: {
      UserId: id
    }
  }).then((operations) => {
    res.status(200).json(operations);
  }).catch(error => {
    console.error(error);
    res.status(400).send(error)
  })
})

server.get('/total', (req, res) => {
  Operation.findAll({
    include: {
      all: true
    }
  }).then((operations) => {
    let total = {
      value: 0,
      operations: 0
    };
    operations.forEach(operation => {
      total.value += operation.amount;
      total.operations += 1;
    }
      );
    res.json(total);

  }).catch((e) => res.send(e))
})

server.post('/new', (req, res) => {
  const {concept, amount, date, type, CategoryId, UserId} = req.body;
  Operation.create({
    concept,
    amount,
    date,
    type,
    CategoryId,
    UserId,
  }).then((operation) => {
    // operation.addCategory(category);
    res.status(200).json(operation);
  }).catch((error) => {
    console.log(error)
    res.status(401).send(error)
  })
})
module.exports = server