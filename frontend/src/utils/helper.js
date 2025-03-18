export const validateEmail =(email) =>{
    const regex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export const addThousandsSeparator = (num) => {
    if (!num || isNaN(num)) return "";
  
    return num.toLocaleString();
  };
  