const server = require('express').Router();
const {User, Operation, Category} = require('../db.js');
const cors = require('cors');
const passport = require('passport');

server.use(cors());


// GET - All operations
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
});

// GET - Delete all operations
server.delete('/', async(req, res) => {
  await Operation.destroy({
  })
    .then(() => {
    res.status(200).send('Operations deleted')
  }).catch((e) => {
    console.log(e)
    res.status(400).send(e)
  })
})

// GET - Operations by category
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

// GET - User operations

server.get('/userOperations=:id', passport.authenticate("jwt",{session:false}), (req, res) => {
  const {id} = req.params;
  Operation.findAll({
    where: {
      UserId: id
    },
    attributes: {
      exclude: ['CategoryId']
    },
    include: [
      {model: Category, attributes: ['name'] }
    ]
  }).then((operations) => {
    res.status(200).json(operations);
  }).catch(error => {
    console.error(error);
    res.status(400).send(error)
  })
})

// GET - Total amount
server.get('/total=:id'/*,passport.authenticate("jwt",{session:false})*/, (req, res) => {
  const { id } = req.params;
  Operation.findAll({
    where: {
      UserId: id
    },
    include: {
      all: true
    }
  }).then((operations) => {
    let total = 0;
    operations.forEach((operation) => {
      if(operation.type === 'income') {
        total += operation.amount;
      };
      if(operation.type === 'outcome') {
        total -= operation.amount;
      }
    })
    res.json(total);
  }).catch((e) => res.send(e))
})

// server.get('/user=:id', passport.authenticate("jwt",{session:false}), (req, res) => {
//   const {id} = req.params;
//   Operation.findAll({
//     where: {
//       UserId: id
//     },
//     attributes: {
//       exclude: ['CategoryId']
//     },
//     include: [
//       {model: Category, attributes: ['name'] }
//     ]
//   }).then((operations) => {
//     res.status(200).json(operations);
//   }).catch(error => {
//     console.error(error);
//     res.status(400).send(error)
//   })
// })

// POST - Create income
server.post('/income', (req, res) => {
  const {desciption, amount, date, type, CategoryId, UserId} = req.body;
  Operation.create({
    desciption,
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

// POST - Create outcome
server.post('/outcome', (req, res) => {
  const {desciption, amount, date, type, CategoryId, UserId} = req.body;
  Operation.create({
    desciption,
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

// GET - Recent user categories

server.post('/recents', (req, res) => {
  
})  
module.exports = server