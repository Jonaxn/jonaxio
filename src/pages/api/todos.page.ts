export default function handler(req, res) {
  res.status(200).json({
    todos: [{ title: "buy bread" }, { title: "buy a turtle" }, { title: "buy a football team" }],
  });
}
