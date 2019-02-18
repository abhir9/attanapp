module.exports = function(req, res, next) {
    console.log('--------loading route------check--',req.body)
    db.collection('user').find({
        deviceId: req.body.device.id
    },function (err,userData) {
        if(err)
        { console.log('-------err----------',err);
        return res.send({success: false});}
        userData.toArray().then((user)=>{
            console.log('-------user result----------',user);
            if ((user && user.length===0)) {
            return res.send({success: false, isNew:true});
        } else if(user && user.length>0){
console.log('----connecting to ',user[0]._id,'--- collection for insert log');
                var timeNow= new Date();
                db.collection(user[0]._id+"").insertOne({
                    type: !user[0].recentactivity,
                    // ip:req
                    device: req.body.device,
                    time:timeNow
                });
                db.collection('user').updateOne({_id:user[0]._id},{
                    $set:{recentactivity:!user[0].recentactivity,lastupdated:timeNow},
                },(err,result)=>{
                    if(err)
                    {console.log(err);
                    res.send({success: false});}
console.log('-------success------',result);
                    res.send({"success":true,"name":user[0].profile.name,"designation":user[0].profile.designation,"avatar":"http://192.168.0.133:3000/images/profile.jpg", "time":timeNow.toLocaleString(),"type": (user[0].recentactivity ? "login" : "logout")})
                })
        }
        })
    })
};