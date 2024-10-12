import { SelectedAppTableData } from "@/types";

export const debounce = (fn: (...args: any[]) => void, delay: number | undefined) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args:any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export const fontFamily =
  "'Poppins','Inter','Open Sans','Montserrat',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji'";

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const convertTableData = (data: SelectedAppTableData[]) => {
    return data.map(item => {
        return {
            key: item.key,
            application: {name: item.application.name},
            attachedPolicy: item.attachedPolicy,
            permissions: item.permissions,
        }
    });
}
export const getRandomColor=()=> {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



//* Link for dark theme
//* https://chatgpt.com/share/6707b0aa-1e58-8008-9ae4-7643e9ff1bec