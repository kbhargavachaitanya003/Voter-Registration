import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const checkDrivingLisense = async (drivingLisense: number) => {
    try{
        const { data } = await axios.get(`http://localhost:8080/api/checkDrivingLisense/${drivingLisense}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const useCheckDrivingLisense = (drivingLisense: number) => {
    return useQuery({
        queryKey: ['checkDrivingLisense', drivingLisense], 
        queryFn: () => checkDrivingLisense(drivingLisense)});
}

export default useCheckDrivingLisense;