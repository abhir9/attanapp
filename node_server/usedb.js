
module.exports = function(req, res, next) {
        console.debug('--------loading db--------'+process.env[req.body.organisationId] + '/---/' + req.body.organisationId)
        global.db= global.client.db(req.body.organisationId);
        console.debug('--------using db---',global.db.databaseName);
        next();
};