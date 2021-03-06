/**
 *  Chief controller
 *  Handles requests related to games (see routes)
 *
 * @author Jack W Beaver <s526937@nwmissouri.edu>
 */

const db = require('../models/index');

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = (req, res) => {
  db.models.Chief.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET one JSON by ID
module.exports.findOne = (req, res) => {
  const { id } = req.params;
  db.models.Chief.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// HANDLE EXECUTE DATA MODIFICATION REQUESTS -----------------------------------

// POST /save
module.exports.saveNew = async (req, res) => {
  try {
    await db.models.Chief.create(req.body);
    return res.redirect('/chief');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.Chief.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/Chief');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const { reqId } = req.params.chiefId;
    const deleted = await db.models.Chief.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/chief');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show rabbit/index.ejs');
  res.render('chief/index.ejs', { title: 'Chiefs', req });
};

// GET /create
module.exports.showCreate = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show chief/create.ejs for ${req.params.id}`);
};

// GET /delete/:id
module.exports.showDelete = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show chief/delete.ejs for ${req.params.id}`);
};

// GET /details/:id
module.exports.showDetails = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show chief/details.ejs for ${req.params.id}`);
};

// GET /edit/:id
module.exports.showEdit = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show chief/edit.ejs for ${req.params.id}`);
};
