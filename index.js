const express = require('express');
const sequelize = require('./config/connection');
// const { locationsRoutes, travellersRoutes, tripsRoutes } = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/locations", locationsRoutes);
// app.use("/api/travellers", travellersRoutes);
// app.use("/api/trips", tripsRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});