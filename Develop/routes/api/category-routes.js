const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(catData => {
      res.json(catData)
    }
    )
    .catch(err => {
      console.log(err);
      res.json(err)
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOneCat({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(catData => {
      res.json(catData);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    Category_name: req.body.Category_name
  })
    .then((newCategory) => {
      res.json(newCategory)
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(catData => {
      res.json(catData);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.delete({
    where: {
      id: req.params.id
    }
  })
    .then(catData => {
      res.json(catData);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
