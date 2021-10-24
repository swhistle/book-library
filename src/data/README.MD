## Mongo DB queries 
 
 - Запрос для вставки данных о двух книгах в коллекцию books:

`
db.books.insertMany([
    {
        title: "Iliad",
        description: 'The Iliad is an epic poem written by the Greek poet Homer. It tells the story of the last year of the Trojan War fought between the city of Troy and the Greeks.',
        authors: "Homer",
        fileCover: "soft"
    },
    {
        title: "The Clouds",
        description: 'The Clouds is a Greek comedy play written by the playwright Aristophanes. A lampooning of intellectual fashions in classical Athens, it was originally produced at the City Dionysia in 423 BC and was not as well received as the author had hoped, coming last of the three plays competing at the festival that year. It was revised between 420 and 417 BC and was thereafter circulated in manuscript form.',
        authors: "Aristophanes",
        fileCover: "soft"
    }
])
`

 - Запрос для поиска полей документов коллекции books по полю title:

`
db.books.find({title: "Iliad"})
`

 - Запрос для редактирования полей: description и authors коллекции books по _id записи:

`
db.books.updateOne(
    {
        _id: ObjectId("61752c876c86b189ce0b61c2")
    },
    {
        $set: { description: "updated description", authors: "updated authors" }
    }
)
`

 - Запрос для добавления поля availabilityStatus коллекции books всем записям:
 
 `
 db.books.updateMany({}, {$set: {availabilityStatus: "available"}})
 `
 
  - Запрос для удаления поля fileCover коллекции books у всех записей:
  
  `
  db.books.updateMany({}, {$unset: {fileCover: ""}})
  `