const handleSignin = (db, bcrypt) => (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status (400).json ('Incorrect form submission');
  }
  db
    .select ('email', 'hash')
    .where ('email', '=', req.body.email)
    .from ('login')
    .then (data => {
      const isValid = bcrypt.compareSync (password, data[0].hash);
      if (isValid) {
        return db
          .select ('*')
          .from ('users')
          .where ('email', '=', email)
          .then (user => res.json (user[0]))
          .catch (err => res.status (400).json ('Unable to get user'));
      } else {
        res.status (400).json ('Wrong credientials');
      }
    })
    .catch (err => res.status (400).json ('Wrong credientials'));
};

module.exports = {
  handleSignin,
};
