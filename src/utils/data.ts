const hoje = new Date()
const dataNow: string = hoje.getDate().toString().padStart(2,'0') + "/" + String(hoje.getMonth() + 1).padStart(2,'0') + "/" + hoje.getFullYear() + ` as ` + hoje.toLocaleTimeString();

export default dataNow;