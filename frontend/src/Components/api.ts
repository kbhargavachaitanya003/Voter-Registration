import axios from "axios";

export const checkDrivingLicense = async (drivingLicense: number) => {
    const { data } = await axios.get(`http://localhost:8080/api/checkDrivingLicense/${drivingLicense}`);
    return data;
};

export const getSignature = async (drivingLicense: number) => {
    const { data } = await axios.get(`http://localhost:8080/api/getDrivingLicense/${drivingLicense}`);
    return data;
};

export const savePersonalDetails = async (postingPersonalDetails: any) => {
    const { data } = await axios.post('http://localhost:8080/api/savePersonalDetails', postingPersonalDetails);
    return data;
}

export const saveAddress = async (postingAddress: any) => {
    const { data } = await axios.post('http://localhost:8080/api/saveAddress', postingAddress);
    return data;
}

export const saveSignatureDetails = async (postingSignatureDetails: any) => {
    const { data } = await axios.post('http://localhost:8080/api/saveSignatureDetails', postingSignatureDetails);
    return data;
}

export const sendEmail = async (emailData: any) => {
    const response = await axios.post('http://localhost:8080/api/sendMail', emailData);
    return response.data;
};

export const getFile = async (referenceNumber: number) => {
    const { data } = await axios.get(`http://localhost:8080/generateReport?referenceNumber=${referenceNumber}`, {
        responseType: 'blob',
    });
    return data;
} 