const fs = require("fs");
const chalk = require("chalk");

const log = console.log;

const listNotes = function () {
    const notes = loadNotes();
    notes.forEach((element) => displayNote(element.title, element.body));
    return notes
};

const readNote = function (title) {
    const notes = loadNotes();
    foundNote = notes.find((element) => element.title === title);
    if (!foundNote) return log(chalk.red("The note does not exist"));
    displayNote(foundNote.title, foundNote.body)
};

const addNote = function (title, body) {
    let notes = loadNotes();

    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length > 0) return log("The note already exists");
    note = {
        title: title,
        body: body,
    };
    notes.push(note);
    saveNotes(notes);
};

const modifyNote = function (title, newTitle) {
    let notes = loadNotes();
    noteIndex = notes.findIndex((element) => element.title === title);
    if (noteIndex === -1) return log(chalk.red("We couldn't find the note you were looking for"));
    notes[noteIndex].title = newTitle
    log(chalk.blue("The note was modified"))
    saveNotes(notes);
};

const removeNote = function (title) {
    let notes = loadNotes();
    noteIndex = notes.findIndex((element) => element.title === title);
    if (noteIndex === -1) return log(chalk.red("We couldn't find the note you were looking for"));
    notes.splice(noteIndex, 1), log("The note was removed")
    saveNotes(notes);
};

const loadNotes = function () {
    try {
        dataBuffer = fs.readFileSync("notes.json");
        data = dataBuffer.toString();
        nostesJSON = JSON.parse(data);
        return nostesJSON;
    } catch (error) {
        log("File does not exist!");
        return [];
    }
};

const saveNotes = function (notes) {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJSON);
};

const displayNote = function (title = '', body = '') {
    log(chalk.blue(title) + "\t" + body)
}

module.exports = {
    listNotes: listNotes,
    readNote: readNote,
    addNote: addNote,
    modifyNote: modifyNote,
    removeNote: removeNote,
};
