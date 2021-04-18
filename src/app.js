const express = require("express")
const notes = require("./notes.js")

const app = express()
const port = 3000

const log  = console.log
// Definir el motor de plantillas
app.set("view engine", "ejs")
//app.use(express.static(__dirname + "/views"))
app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.get("/", (request, response) => {
    response.render("index", {
        message: "Welcome to App Notes!"
    })
})

app.post('/add_note', (request, response) => {
    log(request.body)
    const title = request.body.title
    const body = request.body.body

    notes.addNote(title, body)

    response.redirect('notes_created')
})

app.get('/notes_created', (request, response) => {
    response.render('notes_created')
})

app.listen(port, () => {
    log('Listening at http://localhost:3000')
})