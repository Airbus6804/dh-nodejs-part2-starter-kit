import express from "express";
import morgan from "morgan";
import { db, setupDb}   from './dbSetup.js'
import {getAllPlanets} from './controllers/server.js'


const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
    console.log("use");
    next()
})

console.log(db);
setupDb()




let planets = [
    {
        id: 1,
        planet: "earth",
    },
    {
        id: 2,
        planet: "mars",
    },
];



app.get("/api/v1/planets", getAllPlanets);

app.get("/api/v1/planets/:id", (req, res) => {
    const { id: stringId } = req.params;
    const id = Number(stringId);
    console.log(id);
    if (!id) {
        res.status(404).send("id obbligatorio");
    }
    const planet = planets.find((planet) => planet.id === id);
    if (planet) return res.status(200).json(planet);

    return res.status(200).send("Pianeta non trovato");
});

app.post("/api/v1/planets", (req, res) => {
    console.log(req.body);
    const { id: stringId, planet } = req.body;
    const id = Number(stringId);
    if (id && planet) {
        planets.push({ id, planet });
        return res.status(200).send("Planet added successfully");
    }
    res.status(500).send("Internal server error");
});

app.put("/api/v1/planets", (req, res) => {
    console.log(req.body);
    const { id: stringId, planet:name  } = req.body;
    const id = Number(stringId);
    if (id && name) {
        planets = planets.map((planet) => {
            if(planet.id === id) return {...planet, planet: name}
            
            return planet;
        });

        res.status(200).json(planets)
    }
});

app.delete("/api/v1/planets", (req, res) => {
    const { id: stringId } = req.body;
    const id = Number(stringId);

    planets = planets.filter(planet => planet.id !== id);
    res.status(200).json(planets)
});

app.listen(3000, () => {
    console.log("listening");
});
