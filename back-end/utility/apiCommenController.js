const { v4: uuidv4 } = require('uuid');

// The below function is for file upload
const fs = require('fs');
const path = require('path');

// Below are the function for validating email.
exports.isvalidEmail = (email) => 
    {
        const regex = (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,})+$/);
        if (regex.test(email))
        {
            const domain = email.split(`@`)[1]; // get domain name after `@` symbol
            const domainParts = domain.split(`.`); // split domain name by `.` separator
            return domainParts[1] === domainParts[2] ? false : true
        }
        else
        {
            return false
        }
};
    
// Below is function which eliminate the space from the string.
exports.hasOnlyNonSpaces = (name) => {
    return name.trim().length !== name.length;
};



exports.generateProductCode = (title) => {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  const formattedTitle = title.split(' ').join('-').toUpperCase();
  return `${formattedTitle}-${uniqueId}-${timestamp}`;
};




exports.fileUpload = async (attachments, uploadPath) => {
    if (!attachments || !Array.isArray(attachments)) {
        return { message: 'INVALIDATTACHMENT' };
    }

    const uploadResults = [];

    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    for (const attachment of attachments) {
        let fileExtension = attachment.name.split('.').pop().toLowerCase(); // get the file extension
        if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
            let randomNumber = Math.floor(Math.random() * 1000000); // generate random number
            let filename = `${randomNumber}_${attachment.name}`; // create a unique file name

            try {
                await new Promise((resolve, reject) => {
                    attachment.mv(path.join(uploadPath, filename), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                uploadResults.push({ file: filename, status: 'success' });
            } catch (err) {
                uploadResults.push({ file: attachment.name, status: 'fail', error: err.message });
            }
        } else {
            uploadResults.push({ file: attachment.name, status: 'fail', message: 'INVALIDFORMAT' });
        }
    }

    return uploadResults;
};
