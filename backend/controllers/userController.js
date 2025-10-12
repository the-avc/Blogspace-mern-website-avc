import User from '../Schema/User.js';

export const searchUsers = async (req, res) => {
    const { query } = req.body;
    
    User.find({ "personal_info.username": new RegExp(query, 'i') })
        .select("personal_info.fullname personal_info.username personal_info.profile_img -_id")
        .then(users => {
            return res.status(200).json({ users });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export const getProfile = async (req, res) => {
    const { username } = req.body;

    User.findOne({ "personal_info.username": username })
        .select("-personal_info.password -google_auth -updateAt")
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

