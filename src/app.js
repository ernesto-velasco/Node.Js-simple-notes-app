const { response } = require("express")
const express = require("express")
var expressLayouts = require('express-ejs-layouts')
const notes = require("./notes")

const log  = console.log

// express config
const app = express()
const port = 3000
app.set("view engine", "ejs")
app.use(expressLayouts);
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

// display a listing of the resource
app.get("/", (request, response) => {
    const notes_array = notes.index()
    response.render('notes/index', {
        pageTitle: "Index",
        notes: notes_array
    })
})

// show the form for creating a new resource
app.get("/notes/create", (request, response) => {
    response.render("notes/create", {
        pageTitle: "Create a new note",
        message: "Welcome to App Notes!"
    })
})

// store a newly created resource in storage
app.post('/notes/store', (request, response) => {
    log(request.body)
    const title = request.body.title
    const body = request.body.body

    notes.store(title, body)

    response.redirect('/')
})

// display the specified resource
app.get("/notes/:title(*)", (request, response) => {
    title = request.params.title
    note = notes.show(title)
    note ? response.render("notes/show",{
        pageTitle: title,
        note: note
    }) : response.redirect("/not-found")
})

// show the form for editing the specified resource
app.get("/notes/edit/:title(*)", (request, response) => {
    title = request.params.title
    note = notes.show(title)
    note ? response.render("notes/edit",{
        pageTitle: "Edit a note",
        note: note
    }) : response.redirect("/not-found")
})

// update the specified resource in storage
app.post("/notes/update", (request, response) => {
    title = request.body.title
    newTitle = request.body.new_title
    newBody = request.body.new_body
    notes.update(title, newTitle, newBody)
    response.redirect("/")
})

// remove the sprecified resource from storage
app.post("/notes/delete", (request, response) => {
    title = request.body.title
    notes.destroy(title)
    response.redirect("/")
})

app.use(function (req, res) {
    res.status(404).render('error-404', {
        pageTitle: "Error 404 - Not Found"
    });
});

app.listen(port, () => {
    log('Listening at http://localhost:3000')
})