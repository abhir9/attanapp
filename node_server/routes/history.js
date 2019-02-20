var datentime = require("../utility/datentime");
module.exports = function (req, res, next) {
    console.log('--------loading route------history----', req.body);
    db.collection('user').find({
        deviceId: req.body.device.id
    }, function (err, userData) {
        if (err) {
            console.log(err, '-------errr----');
            return res.send({success: false});
        }
        userData.toArray().then((user) => {
            console.log(user, '-------user----', user[0]._id);
            db.collection(user[0]._id + "").aggregate(
                [
                    {
                        $group: {
                            _id: {
                                "year": "$year",
                                "month": "$month",
                                "date": "$date",
                                "time": "$time",
                                "type": "$type"
                            }
                        }
                    },
                    {$sort: {'_id.year': -1, '_id.month': -1, '_id.date': -1, '_id.time': 1, '_id.type': 1}}
                ]
            )
                .toArray().then((historydata) => {
                console.log("---------", historydata.length);
                if (historydata && historydata.length > 0) {
                    var hist = {};
                    for (var index in historydata) {
                        var history = historydata[index]._id
                        hist[history.year] = hist[history.year] ? hist[history.year] : {};
                        if (datentime().month === history.month) {
                            hist[history.year][history.month] = hist[history.year][history.month] ? hist[history.year][history.month] : {};
                            hist[history.year][history.month][history.date] = hist[history.year][history.month][history.date] ? hist[history.year][history.month][history.date] : {};
                            if (history.type) {
                                hist[history.year][history.month][history.date].login = (isNaN(new Date(history.date + " " + history.time) - new Date(history.date + ' ' + hist[history.year][history.month][history.date].login)) || (new Date(history.date + " " + history.time) - new Date(history.date + ' ' + hist[history.year][history.month][history.date].login)) < 0) ? history.time : hist[history.year][history.month][history.date].login;
                            }
                            else {
                                hist[history.year][history.month][history.date].logout = (isNaN(new Date(history.date + " " + history.time) - new Date(history.date + ' ' + hist[history.year][history.month][history.date].login)) || (new Date(history.date + " " + history.time) - new Date(history.date + ' ' + hist[history.year][history.month][history.date].login)) > 0) ? history.time : hist[history.year][history.month][history.date].login
                            }

                        }
                    }
                    res.send({"success": true, history: hist, message: "History Record Successfully !!"});
                }
                else {
                    res.send({success: false});
                }
            })
        })
    });
};