const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhM2YxZGI2MC0xYjhlLTRjYWUtYjQyNy1kMjA0NjY3MWQzMDUiLCJlbWFpbCI6ImMubGFuY2luZTk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzOWMyZjE1MzM5YmRmYTJiMzBkOSIsInNjb3BlZEtleVNlY3JldCI6ImVlZDNhZTEyZWZhM2QzMDdmM2UzN2YwNGQ0NGFkMjFkZjVjMjRhN2NmMTViMTgxNmNjY2M3YzUyZjA1NDY4MDciLCJpYXQiOjE3MDgwODY2MDl9.aHVWi9FpddAScpL7OoAVcszkGXUl7LxYAvDaUKdx7W0'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "C:\\Users\\mamy conde\\Workshop2\\ressources\\TD2\\IPFS-command.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
