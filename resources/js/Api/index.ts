import axios from "axios";
const base_url = window.origin;
const Traduction = (data = {
    prompt:"Translate this into French , Japanese and Spanish : What rooms do you have available?"})=>axios.post(`${ base_url }/completion/traduction`,data).then(res => res.data);

const Correction=(data={input:"She no went to the market."})=>axios.post(`${ base_url }/completion/correction`,data).then(res => res.data);

export {
    Traduction,
    Correction

}
