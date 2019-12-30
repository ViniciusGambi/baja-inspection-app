import { AsyncStorage } from 'react-native';

export const _retrieveForm = async () => {
    try {
        const value = await AsyncStorage.getItem('forms');
        let json = [];
        if (value !== null) {
            json = JSON.parse(value);
        }
        return json;
    } catch (error) {
        return null;
    }
};

export const _storeForm = async (data) => {
    try {
        let jsonString = JSON.stringify(data);
        await AsyncStorage.setItem('forms', jsonString);
    } catch (error) {
        alert('err');
    }
};