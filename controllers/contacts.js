const User=require('../models/user');

exports.get = async function(req, res, next){
    const userId=req.params.userId;
    try{
        const fetchedUser=await User.findById(userId).populate('contacts');
        if(!fetchedUser){
            const err=new Error('Invalid UserId');
            throw err;
        }
        res.status(200).json({
            'contacts': fetchedUser.contacts.map(function(contact){
                return {
                    email: contact.email
                };
            })
        });
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.post=async function(req, res, next){
    const userId=req.params.userId;
    const contactUser=req.body.userId;
    if(userId==contactUser){
        return res.status(401).json({
            'message': 'Contact Invalid'
        });
    }
    try{
        const fetchedUser=await User.findById(userId);
        if(!fetchedUser){
            const err=new Error('Invalid UserId');
            throw err;
        }
        const fetchedContact=await User.findById(contactUser);
        if(!fetchedContact){
            const err=new Error('Invalid UserId');
            throw err;
        }

        let contacts=fetchedUser.contacts;      /* this is an array */
        const id = contacts.find(function(contact){
            return contact==contactUser;
        });
        if(id==contactUser){
            return res.status(401).json({
                'message': 'Contact exists'
            });
        }
        else{
            contacts.push(fetchedContact);
            const updateResult = await User.update({_id: userId}, {$set: {contacts: contacts} } );
            if(!updateResult){
                const err=new Error('Update failed');
                throw err;
            }
            return res.status(200).json({
                'message': 'User added to contacts'
            });
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.delete=async function(req, res, next){
    const userId=req.params.userId;
    const contactUser=req.body.userId;
    if(userId==contactUser){
        return res.status(401).json({
            'message': 'Contact Invalid'
        });
    }
    try{
        const fetchedUser=await User.findById(userId);
        if(!fetchedUser){
            const err=new Error('Invalid UserId');
            throw err;
        }
        const fetchedContact=await User.findById(contactUser);
        if(!fetchedContact){
            const err=new Error('Invalid UserId');
            throw err;
        }
        let contacts=fetchedUser.contacts;      /* this is an array */
        const id = contacts.find(function(contact){
            return contact==contactUser;
        });
        if(id!=contactUser){
            const err=new Error('User not in contacts');
            throw err;
        }
        let contacts_updated=[];
        contacts.forEach(element => {
            if(element!=contactUser){
                contacts_updated.push(element);
            }
        });
        const updateResult = await User.update({_id: userId}, {$set: {contacts: contacts_updated} } );
        if(!updateResult){
            const err=new Error('Contact delete failed');
            throw err;
        }
        return res.status(200).json({
            'message': 'Contact deleted'
        });
    }catch(err){
        console.log(err);
        throw err;
    }
}