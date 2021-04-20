const express = require("express")
const notes = require("./notes")

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

    notes.store(title, body)

    response.redirect('list_notes')
})

app.get("/list_notes", (request, response) => {
    const notes_array = notes.index()
    response.render('list_notes', {
        notes: notes_array
    })
})

app.listen(port, () => {
    log('Listening at http://localhost:3000')
})