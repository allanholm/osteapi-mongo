var Cheese = require('./cheese.model');

module.exports = function(app) {
  // create a cheese
  app.post('/api/v1/cheeses', function(request, response, next) {
    try {
      var cheese = new Cheese({
        name: request.fields.name,
        price: request.fields.price,
        weight: request.fields.weight,
        strength: request.fields.strength,
        brand: request.fields.brand
      });
      cheese.save();

      response.status(201);
      response.json(cheese);
    } catch (error) {
      return next(error);
    }
  });

  // get all cheeses
  app.get('/api/v1/cheeses', async function(request, response, next) {
    try {
      var result = await Cheese.find();
      response.json(result);
    } catch (error) {
      return next(error);
    }
  });

  // get single cheese by id
  app.get('/api/v1/cheeses/:id', async function(request, response, next) {
    try {
      var result = await Cheese.findById(request.params.id);

      if (!result) {
        response.status(404);
        response.end();
        return;
      }

      response.json(result);
    } catch (error) {
      return next(error);
    }
  });

  // update a cheese
  app.patch('/api/v1/cheeses/:id', async function(request, response, next) {
    try {
      var { name, price, weight, strength, brand } = request.fields;
      var updateObject = {};

      if (name) updateObject.name = name;
      if (price) updateObject.price = price;
      if (weight) updateObject.weight = weight;
      if (strength) updateObject.strength = strength;
      if (brand) updateObject.brand = brand;
      
      await Cheese.findByIdAndUpdate(request.params.id, updateObject);

      var cheese = await Cheese.findById(request.params.id);

      response.status(200);
      response.json(cheese);
    } catch (error) {
      return next(error);
    }
  });

  // delete a single cheese
  app.delete('/api/v1/cheeses/:id', async function(request, response, next) {
    try {
      await Cheese.findByIdAndRemove(request.params.id);
      response.status(204);
      response.end();
    } catch (error) {
      return next(error);
    }
  });
};