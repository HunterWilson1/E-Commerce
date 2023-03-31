const router = require('express').Router();
//const { json } = require('sequelize/types');
//const { endsWith } = require('sequelize/types/lib/operators');
const { Sequelize } = require('sequelize')
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!singleTag){
      res.status(404).json({ message: 'No tag with this id'});
      return;
    }
  res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const makeTag = await Tag.create(req.body);
    res.status(200).json(makeTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updateTag) {
      res.status(404).json({ message: "No tag by this id"})
      return;
    }
    res.status(200).json( {message: "Update successful"});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: {id: req.params.id}
    });
    if (!delTag) {
      res.status(404).json({ message: "No tag with this id"});
      return;
    }
    res.status(200).json({message: "tag was deleted"});
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
