const express = require("express");
const axios = require("axios");
const app = express();
const ejs = require("ejs");
//const path = require("path");

app.set("view engine", "ejs");
app.listen(3000, () => {
console.log("Server started on port 3000");
console.log(" http://localhost:3000/");
});

app.get("/", async (req, res) => {
  try {
    const pokemonIds = [18, 6, 43];
    const data = await Promise.all(
      pokemonIds.map(async (id) => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        return {
          name: response.data.name,
          order: response.data.order,
          type: response.data.types.map((type) => type.type.name).join("/"),
          image: response.data.sprites.front_default,
        };
      })
    );

    res.render("index", {data});} 
    catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching Pokémon data");
  }
});
