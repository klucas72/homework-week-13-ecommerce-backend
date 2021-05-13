const router = require('express').Router();
const { EmptyResultError } = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
    .then(tagData => {
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    }]
  })
    .then(tagData => {
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagData => {
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
});

module.exports = router;
