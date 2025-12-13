const express = require('express');
const mongoose = require('mongoose');

/**Any measurements are in mm and will be converted to thousandth of an inch where necessary
 * Any createdBy/updatedBy fields will contain the ID of a user.
 */

const threadsFamilySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    createdBy: {
        type: String,
    },
    updatedAt: {
        type: Date,
    },
    updatedBy: {
        type: String
    }
});

const ThreadFamilyModel = mongoose.model('ThreadFamily',threadsFamilySchema);

module.exports = ThreadFamilyModel;