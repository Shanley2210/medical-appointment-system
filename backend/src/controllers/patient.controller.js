const patientService = require('../services/patient.service');

const getProfileController = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await patientService.getProfileService(userId);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getProfile:', e);
        return res
            .status(500)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const putProfileController = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        if (!userId || !data) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await patientService.putProfileService(userId, data);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in putProfile:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

module.exports = {
    getProfileController,
    putProfileController
};
