const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
  const queryText = `
    SELECT "favorite".*, "category"."name" AS "category_name"
    FROM "favorite"
    JOIN "category" ON "category"."id" = "favorite"."category_id"
    ORDER BY "favorite"."id" DESC;
  `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error getting favorites`, error);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post("/", (req, res) => {
  console.log(req.body);
  const queryText = `INSERT INTO "favorite" ("url", "category_id")
    VALUES ($1, $2);`;
  pool
    .query(queryText, [req.body.url, req.body.category_id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new favorite`, error);
      res.sendStatus(500);
    });
});

// update given favorite with a category id
router.put("/:id", (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  const favoriteId = req.params.id;
  const categoryId = req.body.category_id;
  const queryText = `UPDATE "favorite" SET "category_id" = $1 WHERE "id" = $2;`;
  pool
    .query(queryText, [categoryId, favoriteId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error updating favorite`, error);
      res.sendStatus(500);
    });
});

// delete a favorite
router.delete("/:id", (req, res) => {
  const queryText = `DELETE FROM "favorite" WHERE "id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error deleting favorite`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
