import app from "./src/app"

const port = process.env.PORT || 5500

app.listen(port, () => {
  console.log(`Servidor no ar http://localhost:${port}`)
})