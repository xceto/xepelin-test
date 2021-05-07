const shortUrl = require('./schema/schema');

const getUrl = (url) => shortUrl.find({ domain: url });
const saveUrl = (url) => shortUrl.create({ domain: url }).then((result) => result);

const shorten = async (req, res) => {
  const { url } = req.body;
  const formatUrl = url.split('.com/')[1];
  const fromGetUrl = await getUrl(formatUrl);
  if (fromGetUrl.message) return res.status(500).json({ code: 500, error: { message: 'Internal Problem' } });
  if (fromGetUrl.length === 0) {
    const toSaveUrl = await saveUrl(formatUrl);
    if (toSaveUrl.message) {
      return res.status(500).message({ error: { message: 'Internal Problem' } });
    }
    res.status(208).json({
      code: 201,
      data: { id: toSaveUrl._id },
    });
  }
  res.status(208).json({
    code: 208,
    data: { id: fromGetUrl[0]._id },
  });
};

const getFromId = (req, res) => {
  const { id } = req.params;
  shortUrl.find({ _id: id })
    .then((result) => {
      if (result.length === 0) return res.status(404).json({ message: 'Not found ' });
      res.status(200).json({
        code: 200,
        data: {
          url: `${process.env.DOMAIN_SHORTCUT}/${result._id}`,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json('InternalProblem');
    });
};

const formatDomain = (domain) => {
  const newDomain = domain.replace('www.', '');
  console.log(newDomain);
  return newDomain;
}


// refactoring
const domain = (req, res) => shortUrl.find()
  .then((result) => {
    if (result.length === 0) return res.json(404).json({ message: 'empty domain' });
    const formatDomainResults = result.map(async (results) => {
      results.domain = formatDomain(results.domain);
      console.log(results.domain)
      return results;
    })
    return formatDomainResults
  })

module.exports = {
  shorten,
  getFromId,
  domain,
};
