module.exports = function (req, res, next) {
    console.log('--------loading route------make----', req.body);
    db.collection('user').find({
        deviceId: req.body.device.id
    }, function (err, userData) {
        if (err) {
            console.log(err, '-------errr----');
            return res.send({success: false});
        }
        userData.toArray().then((user) => {
            console.log(user, '-------user----');

            if (user && user.length > 0) {
                res.send({success: false, message: "Already Registered !!"});
            }
            else {
                db.collection("user").insert({
                    deviceId: req.body.device.id,
                    organisationId: req.body.organisationId,
                    device: req.body.device,
                    profile: req.body.profile,
                    recentactivity: false,
                    lastupdated: new Date()
                }, function (err, user) {
                    console.log(user);
                    if (err) {
                        res.send({success: false});
                    } else {
                        res.send({"success": true, message: "Registered Successfully !!"});
                    }
                });
            }
        })
    });
};