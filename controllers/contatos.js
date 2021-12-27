module.exports = (app) => {
  const ContatosController = {
    index(req, res) {
      const { usuario } = req.session;
      res.render('contatos/index', { usuario });
    }
  };
  return ContatosController;
}