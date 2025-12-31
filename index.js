const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: true }));

//Routes

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .put((req, res) => {
    //Edit user with ID
    console.log("pending");
  })
  .delete((req, res) => {
    //Delete user with ID
    console.log("pending");
  });

app.post("/api/users", (req, res) => {
  //Add new user logic here
  const body = req.body;
  users.push({ id: users.length + 1 , ...body});
  fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// app.post("/api/users", (req, res) => {
//   //TODO: Add new user logic here
//   return res.json({ message: "Pending" });
// });

// app.patch("/api/users/:id", (req, res) => {
//   //TODO: Edit user with ID
//   return res.json({ message: "Pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   //TODO: Delete user with ID
//   return res.json({ message: "Pending" });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
