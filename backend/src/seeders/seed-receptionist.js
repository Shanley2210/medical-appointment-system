'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Receptionists', [
            {
                userId: '18',
                image: 'image.png',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: '19',
                image: 'image.png',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: '20',
                image: 'image.png',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
