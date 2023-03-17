import moment from 'moment';


export const dateFormat = (str: string): string => moment(str).isValid() ? moment(str).format('DD/MM/YYYY') : 'N/A';


export const setItemToLocal = (key: string, data: any) => localStorage.setItem(key,JSON.stringify(data)); 
export const getItemFromLocal = (key: string) => localStorage.getItem(key);


export const fileToBase64 = (file :any) => new Promise((resolve, reject) =>
{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const currencyFormat = (value:any) =>
{
    if (!value) return 0.00.toFixed(2);

    if (typeof value === "number")
        return value.toFixed(2)

    return parseFloat(value).toFixed(2);
}
