import User from '../Schema/User.js';

export const searchUsers = async (req, res) => {
    const { query } = req.body;
    
    if (!query || !query.trim()) {
        return res.status(400).json({ error: "Search query is required" });
    }

    const searchRegex = new RegExp(query.trim(), 'i');
    
    User.find({ 
        $or: [
            { "personal_info.username": searchRegex },
            { "personal_info.fullname": searchRegex }
        ]
    })
        .select("personal_info.fullname personal_info.username personal_info.profile_img -_id")
        .limit(10) // Limit results to prevent large responses
        .then(users => {
            return res.status(200).json({ users });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export const getProfile = async (req, res) => {
    const { username } = req.body;

    if (!username || !username.trim()) {
        return res.status(400).json({ error: "Username is required" });
    }

    User.findOne({ "personal_info.username": username.trim() })
        .select("-personal_info.password -google_auth -updateAt")
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json(user);
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

