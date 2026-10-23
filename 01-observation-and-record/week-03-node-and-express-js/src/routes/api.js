const express = require("express");
const router = express.Router();

let students = [
  { id: 1, name: "Asha", branch: "CSE" },
  { id: 2, name: "Ravi", branch: "IT" },
];

router.get("/students", (req, res) => res.json(students));

router.get("/students/:id", (req, res) => {
  const s = students.find((x) => x.id === Number(req.params.id));
  if (!s) return res.status(404).json({ error: "Student not found" });
  res.json(s);
});

router.post("/students", (req, res) => {
  const { name, branch } = req.body;
  if (!name || !branch) return res.status(400).json({ error: "name and branch required" });
  const student = { id: students.length + 1, name, branch };
  students.push(student);
  res.status(201).json(student);
});

module.exports = router;
