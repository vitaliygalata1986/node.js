const getUsersHandler = (req, res) => {
  res.send('Get users route');
};

const getSingleUserHandler = (req, res) => {
  res.send(`Get user route. UserId ${req.params.userId}`);
};

const postsUsersHandler = (req, res) => {
  res.send('Posts users route');
};

module.exports = {
  getUsersHandler,
  getSingleUserHandler,
  postsUsersHandler,
};
