const express = require("express");
const cors = require("cors");
const { readJsonFile, writeJsonFile } = require("./fsUtils");

const app = express();

app.use(cors())

app.use((req, _, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.json());


app.get("/api/data", (req, res) => {
    const data = require("./data.json")
    res.send(data);
    res.end()
});


app.post("/api/data/:listId/newwish", (req, res) => {
    let newWish = ""
    console.log(req.body)
    req.on("data", (chunk) => newWish += chunk).on("end", () => newWish = (JSON.parse(newWish)))

    readJsonFile("./data.json").then(data => {
        console.log(data[0].list)
        let wish = {}
        if (data[0].list.length === 0) {

            wish = { id: 1, title: newWish.name, status: false, priority: newWish.priority }
        } else {
            wish = { id: data[0].list[data[0].list.length - 1].id + 1, title: newWish.name, status: false, priority: newWish.priority }
        }
        data[0].list = [...data[0].list, wish]
        console.log(data[0].list)
        writeJsonFile("./data.json", data)
        res.send(data)
    })
})




app.patch("/api/data/:listId/status/:itemId", (req, res) => {
    const data = require("./data.json");
    const listId = req.params.listId;
    const itemId = req.params.itemId;
    const list = data.find(list => list.id.toString() === listId);
    const item = list.list.find(item => item.id.toString() === itemId);
    item.status = !item.status
    writeJsonFile("./data.json", data);
    res.send(data)
    console.log(item)
    res.end()
});




app.delete("/api/data/:listId/status/:itemId", (req, res) => {

    const listId = req.params.listId;
    const itemId = req.params.itemId;
    readJsonFile("./data.json").then(data => {
        let list = data.find(list => list.id.toString() === listId);

        list.list = list.list.filter(item => item.id.toString() !== itemId ? item : null)
        const newData = data.filter(list => list.id.toString() !== listId ? list : null)
        writeJsonFile("./data.json", data);
        res.send(data)
        res.end()
    })

});




const PORT = 3000
app.listen(PORT, console.log("App running at port: " + PORT))