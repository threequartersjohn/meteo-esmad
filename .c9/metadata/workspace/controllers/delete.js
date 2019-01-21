{"changed":false,"filter":false,"title":"delete.js","tooltip":"/controllers/delete.js","value":"//controllers para delete\nconst users = require(\"../models/users.js\");\nconst warnings = require(\"../models/warnings.js\");\nconst messages = require(\"../models/messages.js\");\n\nconst msg = require(\"../assets/scripts/errorMessages/getMessages.js\");\n\n\n//USER\n//delete user!!\nconst deleteUser = (req, res) => {\n    users.user.findOneAndDelete({ _id: req.params.id },\n        (error) => {\n            if (error) res.send(error);\n            else res.send(\"success!\");\n        })\n};\n\n//delete all users\nconst deleteAllUsers = (req, res)=>{\n    users.user.deleteMany({}, (error)=>{\n        if(error) res.send(error);\n        else res.send(\"success\");\n    })\n}\n\n//WARNINGS\n//delete warning\nconst deleteWarning = (req, res) => {\n    warnings.warning.findOneAndDelete({ _id: req.params.id },\n        (error) => {\n            if (error) res.send(error)\n            else res.send(\"surresss!!!\")\n        })\n}\n\n//delete ALL warnings\nconst deleteAllWarnings = (req, res) => {\n    warnings.warning.deleteMany({}, (error)=>{\n        if(error) res.send(error);\n        else res.send(\"success!!\");\n    })\n}\n\n//MESSAGES\n//delete message\nconst deleteMessage = (req, res) => {\n    \n    messages.message.findOneAndDelete({ _id: req.params.id },\n        (error) => {\n            if (error) res.send(error);\n            else res.send(\"success\");\n        });\n};\n\n//Delete ALL messages\nconst deleteAllMessages = (req, res)=>{\n    messages.message.deleteMany({}, (error)=>{\n        if(error) res.send(error);\n        else res.send(\"success\");\n    })\n}\n\nmodule.exports = {\n    deleteUser: deleteUser,\n    deleteAllUsers: deleteAllUsers,\n    deleteWarning: deleteWarning,\n    deleteAllWarnings: deleteAllWarnings,\n    deleteMessage: deleteMessage,\n    deleteAllMessages: deleteAllMessages,\n};\n\n","undoManager":{"mark":-1,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":19,"column":36},"end":{"row":19,"column":36},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1545755084757}