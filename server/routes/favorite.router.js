const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = `SELECT favorite.id, favorite.url, category.name FROM favorite
  JOIN category ON favorite.category_id = category.id;`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error GETTING favorites:' , error);
    res.sendStatus(500);
  })
});

// add a new favorite
router.post('/', (req, res) => {
  const queryText = `INSERT INTO favorite ("url", "category_id") VALUES ($1, $2);`;
  pool.query(queryText, [req.params.url])
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error POSTING favorites:' , error);
    res.sendStatus(500);
  })
});

// update given favorite with a category id
router.put("/:id", (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  const favoriteId = req.params.id;
  const categoryId = req.body.category_id;
  const queryText = `UPDATE "favorite" SET "category_id" = $1 WHERE "id" = $2;`;
  pool.query(queryText, [categoryId, favoriteId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Error updating favorite`, error);
      res.sendStatus(500);
    });
});

// delete a favorite
router.delete('/', (req, res) => {
  const queryText = `DELETE FROM favorite WHERE id=$1;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error DELETING favorite:' , error);
    res.sendStatus(500);
  })
});

module.exports = router;
