const {
    login,
    refreshtokenFn,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    setFcmToken,
} = require("./login");
const createUser = require("./createUser");
const { listUsers, getUserWithId } = require("./listUsers");
const removeUser = require("./removeUser");
const createItem = require("./createItem");
const { listItems, listDeletedItems } = require("./listItems");
const getItemById = require("./getItemById");
const updateItem = require("./updateItem");
const { removeItem, deleteItem } = require("./removeItem");
const removeAssignment = require("./removeNotificationAccess");
const assignNotification = require("./assignNotificationAccess");
const searchItem = require("./searchItem");

module.exports = {
    login,
    createUser,
    listUsers,
    getUserWithId,
    removeUser,
    createItem,
    listItems,
    listDeletedItems,
    getItemById,
    updateItem,
    removeItem,
    removeAssignment,
    assignNotification,
    refreshtokenFn,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    setFcmToken,
    searchItem,
    deleteItem,
};
